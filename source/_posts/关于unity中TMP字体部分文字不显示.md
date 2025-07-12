---
title: 关于unity中TMP字体部分文字不显示
date: 2025-06-26 15:46:36
categories:
    - unity
tags:
    - unity
---
unity中TMP字体部分文字不显示处理方式
<!--more-->
# 导致不显示的原因
渲染字体的图集空间占满，无法录入新字体。
# 解决方案
1.修改渲染的大小：
选择TMP字体：在Generation Settings中修改图集大小Atlas Width和Atlas Height。
2.允许使用多个渲染图集
在Generation Settings中勾选Multi Atlas Textures。
![](./images/post/关于unity中TMP字体部分文字不显示/1.png)