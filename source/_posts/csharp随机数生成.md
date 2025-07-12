---
title: csharp随机数生成
date: 2025-02-07 13:00:23
categories:
    - csharp
tags:
    - csharp
---
csharp随机数生成
<!--more-->
```csharp
var Seed = Guid.NewGuid().GetHashCode();
var value = new Random(Seed);
i =value.Next(1,100);
```
