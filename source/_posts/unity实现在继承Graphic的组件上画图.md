---
title: unity实现在继承Graphic的组件上画图
date: 2025-07-29 09:52:43
categories:
    - unity
tags:
    - unity
---
需求来源：需要在图片上或文本上进行标记
<!--more-->
# 实现效果
![](./images/post/unity实现在继承Graphic的组件上画图/1.png)
注意需要将图片勾选Read/Write属性
![](./images/post/unity实现在继承Graphic的组件上画图/2.png)

# 将代码挂载到渲染的组件上，这里只实现了Image、RawImage和Text组件其余的如果需要请自行实现
```csharp
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System.IO;

[RequireComponent(typeof(Graphic))]
public class GraphicDrawer : MonoBehaviour
{
    [Header("绘制设置")]
    public bool IsTest = false; //启用测试
    public Color lineColor = Color.red;        // 线条颜色
    public float lineWidth = 2f;               // 线条宽度
    public bool isDrawingEnabled = true;       // 是否启用绘制
    public int defaultTextureSize = 512;       // 默认纹理尺寸（用于无纹理的Graphic）

    private Graphic targetGraphic;             // 目标Graphic组件
    private Texture2D drawTexture;             // 用于绘制的纹理
    private Color[] originalPixels;            // 原始图像像素
    private bool isDrawing = false;            // 是否正在绘制
    private Vector2 lastPosition;              // 上一个绘制位置
    private RectTransform rectTransform;       // 缓存RectTransform
    private Rect graphicRect;                  // Graphic的矩形区域
    private Vector2 textureSize;               // 纹理尺寸（像素）
    private Canvas canvas;                     // 缓存Canvas
    private Camera uiCamera;                   // UI摄像机
    private bool usingOriginalTexture;         // 是否使用原始纹理
    private RawImage overlayRawImage;          // 用于Text组件的叠加层

    // 线段列表，用于撤销功能
    private List<List<Vector2>> lineSegments = new List<List<Vector2>>();
    private List<Color> lineColors = new List<Color>();
    private List<float> lineWidths = new List<float>();
    private int currentLineIndex = -1;

    void Awake()
    {
        targetGraphic = GetComponent<Graphic>();
        rectTransform = GetComponent<RectTransform>();
        canvas = GetComponentInParent<Canvas>();

        // 获取UI摄像机（如果有）
        if (canvas.renderMode != RenderMode.ScreenSpaceOverlay)
        {
            uiCamera = canvas.worldCamera;
        }

        // 为Text组件创建专用叠加层
        if (targetGraphic is Text)
        {
            CreateTextOverlay();
        }
        if (IsTest)
        {
            InitializeDrawTexture();
        }
    }

    void Start()
    {
        // 确保在Start阶段获取正确的矩形大小
        graphicRect = rectTransform.rect;
    }

    // 为Text组件创建绘制叠加层
    void CreateTextOverlay()
    {
        // 创建一个RawImage作为叠加层
        GameObject overlayObj = new GameObject("TextDrawOverlay");
        overlayObj.transform.SetParent(transform, false);

        overlayRawImage = overlayObj.AddComponent<RawImage>();
        overlayRawImage.raycastTarget = false; // 不阻挡鼠标事件
        overlayRawImage.color = new Color(1, 1, 1, 1); // 完全不透明

        // 匹配Text的大小和位置
        RectTransform overlayRect = overlayObj.GetComponent<RectTransform>();
        overlayRect.anchorMin = Vector2.zero;
        overlayRect.anchorMax = Vector2.one;
        overlayRect.offsetMin = Vector2.zero;
        overlayRect.offsetMax = Vector2.zero;
        overlayRect.pivot = rectTransform.pivot;
    }

    // 初始化绘制纹理
    public void InitializeDrawTexture()
    {
        // 尝试从Graphic获取现有纹理
        Texture existingTexture = GetTextureFromGraphic();

        if (existingTexture != null && existingTexture is Texture2D existingTex2D)
        {
            // 使用现有纹理
            usingOriginalTexture = true;
            textureSize = new Vector2(existingTex2D.width, existingTex2D.height);

            // 创建可写的纹理副本
            drawTexture = new Texture2D((int)textureSize.x, (int)textureSize.y, TextureFormat.RGBA32, false);
            originalPixels = existingTex2D.GetPixels();
            drawTexture.SetPixels(originalPixels);
            drawTexture.Apply();
        }
        else
        {
            // 没有现有纹理，创建新的空白纹理
            usingOriginalTexture = false;
            graphicRect = rectTransform.rect;

            // 计算合适的纹理尺寸
            if (graphicRect.width > 0 && graphicRect.height > 0)
            {
                textureSize = new Vector2(Mathf.CeilToInt(graphicRect.width), Mathf.CeilToInt(graphicRect.height));
            }
            else
            {
                textureSize = new Vector2(defaultTextureSize, defaultTextureSize);
            }

            drawTexture = new Texture2D((int)textureSize.x, (int)textureSize.y, TextureFormat.RGBA32, false);

            // 填充为透明
            Color[] clearPixels = new Color[(int)textureSize.x * (int)textureSize.y];
            for (int i = 0; i < clearPixels.Length; i++)
            {
                clearPixels[i] = Color.clear;
            }
            drawTexture.SetPixels(clearPixels);
            drawTexture.Apply();

            originalPixels = clearPixels;
        }

        // 将新纹理应用到Graphic
        ApplyTextureToGraphic(drawTexture);
    }

    // 从不同的Graphic组件获取纹理
    Texture GetTextureFromGraphic()
    {
        if (targetGraphic is Image image)
        {
            return image.sprite?.texture;
        }
        else if (targetGraphic is RawImage rawImage)
        {
            return rawImage.texture;
        }

        // Text组件通常没有纹理，返回null
        return null;
    }

    // 将纹理应用到不同的Graphic组件
    void ApplyTextureToGraphic(Texture2D texture)
    {
        if (targetGraphic is Image image)
        {
            image.sprite = Sprite.Create(texture,
                new Rect(0, 0, texture.width, texture.height),
                new Vector2(0.5f, 0.5f));
            image.preserveAspect = usingOriginalTexture;
        }
        else if (targetGraphic is RawImage rawImage)
        {
            rawImage.texture = texture;
            rawImage.uvRect = new Rect(0, 0, 1, 1);
        }
        // 对于Text组件，使用叠加层显示绘制内容
        else if (targetGraphic is Text && overlayRawImage != null)
        {
            overlayRawImage.texture = texture;
        }
    }

    void Update()
    {
        if (!isDrawingEnabled) return;

        // 处理鼠标输入
        if (Input.GetMouseButtonDown(0))
        {
            StartDrawing();
        }
        else if (Input.GetMouseButton(0) && isDrawing)
        {
            ContinueDrawing();
        }
        else if (Input.GetMouseButtonUp(0) && isDrawing)
        {
            StopDrawing();
        }

        // 撤销功能 (Ctrl+Z)
        if (Input.GetKey(KeyCode.LeftControl) && Input.GetKeyDown(KeyCode.Z))
        {
            UndoLastLine();
        }

        // 清除所有绘制 (Ctrl+Shift+C)
        if (Input.GetKey(KeyCode.LeftControl) && Input.GetKey(KeyCode.LeftShift) && Input.GetKeyDown(KeyCode.C))
        {
            ClearAllDrawings();
        }

        // 保存图像 (Ctrl+S)
        if (Input.GetKey(KeyCode.LeftControl) && Input.GetKeyDown(KeyCode.S))
        {
            // 示例：保存到默认路径
            string defaultPath = Path.Combine(Application.persistentDataPath, "drawing_result.png");
            SaveImageToLocal(defaultPath);
            Debug.Log("图像已保存到: " + defaultPath);
        }
    }

    // 开始绘制
    void StartDrawing()
    {
        if (RectTransformUtility.RectangleContainsScreenPoint(rectTransform, Input.mousePosition, uiCamera))
        {
            isDrawing = true;
            lastPosition = GetTexturePosition();

            // 开始新的线段
            lineSegments.Add(new List<Vector2>());
            lineSegments[lineSegments.Count - 1].Add(lastPosition);

            // 记录当前线条的颜色和宽度
            lineColors.Add(lineColor);
            lineWidths.Add(lineWidth);

            currentLineIndex = lineSegments.Count - 1;
        }
    }

    // 继续绘制
    void ContinueDrawing()
    {
        Vector2 currentPosition = GetTexturePosition();

        // 只在位置变化明显时才绘制，优化性能
        if (Vector2.Distance(currentPosition, lastPosition) > 0.5f)
        {
            // 绘制线段
            DrawLine(lastPosition, currentPosition, lineColor, lineWidth);

            // 记录线段点
            lineSegments[currentLineIndex].Add(currentPosition);

            lastPosition = currentPosition;
        }
    }

    // 停止绘制
    void StopDrawing()
    {
        isDrawing = false;
    }

    // 获取鼠标在纹理上的精确位置
    Vector2 GetTexturePosition()
    {
        // 1. 将屏幕坐标转换为世界坐标
        RectTransformUtility.ScreenPointToWorldPointInRectangle(
            rectTransform,
            Input.mousePosition,
            uiCamera,
            out Vector3 worldPos);

        // 2. 将世界坐标转换为本地坐标（相对于Graphic的左下角）
        Vector2 localPos = rectTransform.InverseTransformPoint(worldPos);

        // 3. 计算从Graphic左下角到Pivot的偏移
        Vector2 pivotOffset = new Vector2(
            graphicRect.width * rectTransform.pivot.x,
            graphicRect.height * rectTransform.pivot.y
        );

        // 4. 计算鼠标在Graphic矩形内的归一化坐标（0-1范围）
        Vector2 normalizedPos = new Vector2(
            (localPos.x + pivotOffset.x) / graphicRect.width,
            (localPos.y + pivotOffset.y) / graphicRect.height
        );

        // 5. 将归一化坐标转换为纹理像素坐标
        Vector2 texturePos = new Vector2(
            normalizedPos.x * textureSize.x,
            normalizedPos.y * textureSize.y
        );

        // 6. 确保坐标在纹理范围内
        texturePos.x = Mathf.Clamp(texturePos.x, 0, textureSize.x);
        texturePos.y = Mathf.Clamp(texturePos.y, 0, textureSize.y);

        return texturePos;
    }

    // 绘制线段
    void DrawLine(Vector2 start, Vector2 end, Color color, float width)
    {
        // 获取线段上的所有点
        List<Vector2> points = GetPointsAlongLine(start, end);

        // 为每个点绘制一个圆，形成线条
        foreach (Vector2 point in points)
        {
            DrawCircle(point, width / 2, color);
        }

        drawTexture.Apply();

        // 强制更新UI
        targetGraphic.SetAllDirty();
    }

    // 获取线段上的所有点
    List<Vector2> GetPointsAlongLine(Vector2 start, Vector2 end)
    {
        List<Vector2> points = new List<Vector2>();
        float distance = Vector2.Distance(start, end);
        int segments = Mathf.Max(2, (int)distance);

        for (int i = 0; i < segments; i++)
        {
            float t = i / (float)segments;
            Vector2 point = Vector2.Lerp(start, end, t);
            points.Add(point);
        }

        points.Add(end); // 确保包含终点
        return points;
    }

    // 绘制圆
    void DrawCircle(Vector2 center, float radius, Color color)
    {
        int segments = Mathf.Max(8, (int)(radius * Mathf.PI * 2));

        for (int i = 0; i < segments; i++)
        {
            float angle1 = i * 2 * Mathf.PI / segments;
            Vector2 point1 = new Vector2(
                center.x + Mathf.Cos(angle1) * radius,
                center.y + Mathf.Sin(angle1) * radius
            );

            // 填充圆内部
            FillBetweenPoints(center, point1, color);
        }
    }

    // 填充两点之间的区域（用于填充圆）
    void FillBetweenPoints(Vector2 center, Vector2 point, Color color)
    {
        List<Vector2> points = GetPointsAlongLine(center, point);

        foreach (Vector2 p in points)
        {
            SetPixel((int)p.x, (int)p.y, color);
        }
    }

    // 设置像素颜色
    void SetPixel(int x, int y, Color color)
    {
        // 检查坐标是否在纹理范围内
        if (x >= 0 && x < drawTexture.width && y >= 0 && y < drawTexture.height)
        {
            drawTexture.SetPixel(x, y, color);
        }
    }

    // 撤销最后一条线
    public void UndoLastLine()
    {
        if (lineSegments.Count == 0) return;

        // 清除最后一条线
        lineSegments.RemoveAt(lineSegments.Count - 1);
        lineColors.RemoveAt(lineColors.Count - 1);
        lineWidths.RemoveAt(lineWidths.Count - 1);

        // 重新绘制所有线条
        RedrawAllLines();
    }

    // 清除所有绘制
    public void ClearAllDrawings()
    {
        // 恢复原始像素
        drawTexture.SetPixels(originalPixels);
        drawTexture.Apply();

        // 清空线段列表
        lineSegments.Clear();
        lineColors.Clear();
        lineWidths.Clear();

        // 强制更新UI
        targetGraphic.SetAllDirty();
    }

    // 重新绘制所有线条
    void RedrawAllLines()
    {
        // 先清除所有绘制
        drawTexture.SetPixels(originalPixels);

        // 重新绘制每条线
        for (int i = 0; i < lineSegments.Count; i++)
        {
            List<Vector2> points = lineSegments[i];
            Color color = lineColors[i];
            float width = lineWidths[i];

            for (int j = 1; j < points.Count; j++)
            {
                DrawLine(points[j - 1], points[j], color, width);
            }
        }

        drawTexture.Apply();
    }

    /// <summary>
    /// 将当前Graphic的内容保存到本地文件
    /// </summary>
    /// <param name="filePath">保存的文件路径（包含文件名和扩展名）</param>
    /// <returns>是否保存成功</returns>
    public bool SaveImageToLocal(string filePath)
    {
        if (drawTexture == null)
        {
            Debug.LogError("绘制纹理为空，无法保存");
            return false;
        }

        try
        {
            // 创建目录（如果不存在）
            string directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            // 根据文件扩展名选择合适的格式
            byte[] bytes;
            string extension = Path.GetExtension(filePath).ToLower();

            if (extension == ".png")
            {
                bytes = drawTexture.EncodeToPNG();
            }
            else if (extension == ".jpg" || extension == ".jpeg")
            {
                bytes = drawTexture.EncodeToJPG();
            }
            else
            {
                // 默认保存为PNG
                Debug.LogWarning("不支持的文件格式，将保存为PNG格式");
                filePath = Path.ChangeExtension(filePath, ".png");
                bytes = drawTexture.EncodeToPNG();
            }

            // 写入文件
            File.WriteAllBytes(filePath, bytes);
            Debug.Log($"图像已成功保存到: {filePath}");
            return true;
        }
        catch (System.Exception e)
        {
            Debug.LogError($"保存图像失败: {e.Message}");
            return false;
        }
    }

    // 公开方法：设置线条颜色
    public void SetLineColor(Color newColor)
    {
        lineColor = newColor;
    }

    // 公开方法：设置线条宽度
    public void SetLineWidth(float newWidth)
    {
        lineWidth = Mathf.Max(0.5f, newWidth); // 确保宽度不会太小
    }

    // 公开方法：启用/禁用绘制
    public void SetDrawingEnabled(bool enabled)
    {
        isDrawingEnabled = enabled;
    }

    void OnDestroy()
    {
        // 清理为Text创建的叠加层
        if (overlayRawImage != null)
        {
            Destroy(overlayRawImage.gameObject);
        }
    }
}
```

