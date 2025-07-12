---
title: linux后台运行命令
date: 2025-07-11 18:19:24
categories:
    - linux
---
linux后台运行命令
<!--more-->
1. nohup后台运行
```shell
nohup 命令 > 输出文件 &
```
2. 停止运行
```shell
ps aux | grep "你的命令" // 查看进程
kill -9 进程ID
```
