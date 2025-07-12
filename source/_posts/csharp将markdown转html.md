---
title: c#使用markdown渲染成html
date: 2025-06-11 21:12:35
categories:
    - csharp
tags:
    - 插件
---
Markdig的使用方式
<!--more-->
引入Markdig动态链接库,unity则把文件放入Plugins下：
```csharp
string html = Markdig.Pipeline.Markdown.ToHtml(markdown);
```