---
title: 关于Unity在编辑器模式下运行单例出现的问题
date: 2025-07-25 14:05:48
categories:
    - unity
tags:
    - unity
---
unity中使用单例模式需要注意的事项
<!--more-->
1.如果在编辑器的Project Settings中的Editor勾选了Enter Play Mode Options,那么unity在编译代码时就只编译一次静态变量、静态函数、静态类。所以如果运行时代码有删除单例的操作，会导致第二次运行时无法找到单例对象，从而导致运行时错误。
2.如果是小型项目的话可以取消勾选该选项。大型项目需要注意正确获取该实例，最好是动态创建防止获取空实例。