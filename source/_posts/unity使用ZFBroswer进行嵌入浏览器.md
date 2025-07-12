---
title: unity使用ZFBroswer进行嵌入浏览器
date: 2025-06-13 11:52:51
categories:
    - 前端
    - unity
tags:
    - unity
---
unity使用ZFBroswer进行嵌入浏览器
<!--more-->
# 常用方法：
1.加载网页链接：
```csharp
browser.LoadURL("https://www.baidu.com");
```
2.加载网页内容：
```csharp
browser.LoadHTML("<html><body><h1>Hello, World!</h1></body></html>");
```
3.浏览器准备完成事件：
```csharp
browser.WhenReady(()=>{
    Debug.Log("浏览器已准备就绪");
});
```
4.浏览器加载完成事件：
```csharp
browser.WhenLoaded(()=>{
    Debug.Log("浏览器已加载完成");
});
```
5.浏览器每次渲染完成事件：
```csharp
browser.RunOnMainThread(()=>{
    Debug.Log("浏览器已渲染完成");
});
```
6.浏览器执行js代码：
```csharp
browser.EvalJS('alert("hello world")');
```
7.浏览器根据数据生成网页：
```csharp
browser.LoadDataURI('hello world');
```
8.下一页：
```csharp
browser.GoForward();
```
9.上一页
```csharp
browser.GoBack();
```
10.刷新：
```csharp
browser.Reload();
```
11.停止：
```csharp
browser.Stop();
```