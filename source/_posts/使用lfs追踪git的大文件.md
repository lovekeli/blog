---
title: 使用lfs追踪git的大文件
date: 2025-07-18 09:26:52
categories:
    - unity
tags:
    - unity
---
当文件大于100M时，git无法正常提交，此时可以使用lfs进行追踪
<!--more-->
1. 安装lfs
```git
git lfs install
```
2. 创建.gitattributes文件
将大文件的后缀添加上
```txt
*.fbx filter=lfs diff=lfs merge=lfs -text
*.pdf filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.rar filter=lfs diff=lfs merge=lfs -text
*.7z filter=lfs diff=lfs merge=lfs -text
*.db filter=lfs diff=lfs merge=lfs -text
```
3. 这时就可以提交大文件了
