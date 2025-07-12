---
title: unity自定义编辑器常用函数
date: 2025-03-05 11:04:58
categories:
    - unity
tags:
    - unity
---
unity自定义编辑器常用函数
<!--more-->
# 1.资源刷新
AssetDatabase.Refresh();
# 2.GUI绘制（手动布局）
```csharp
GUI.Label //绘制文本
GUI.Button //绘制按钮
GUI.Box //绘制框
GUI.Slider //绘制滑块
GUI.TextArea //绘制文本域
GUI.TextField //绘制文本框
GUI.Toggle //绘制选择框
GUI.Toolbar //绘制工具栏
```
# 3.GUILayout绘制（自动布局）
```sharp
GUILayout.Label //绘制文本
GUILayout.Button //绘制按钮
GUILayout.Box //绘制框
GUILayout.Slider //绘制滑块
GUILayout.TextArea //绘制文本域
GUILayout.TextField //绘制文本框
GUILayout.Toggle //绘制选择框
GUILayout.Toolbar //绘制工具栏
GUILayout.BeginHorizontal //绘制水平布局
GUILayout.EndHorizontal //结束水平布局
GUILayout.BeginVertical //绘制垂直布局
GUILayout.EndVertical //结束垂直布局
```