---
title: ubuntu安装nodejs
date: 2025-07-11 17:37:26
categories:
    - nodejs
---
nodejs安装
<!--more-->
# 1.下载nvm管理器。（使用这个的原因是：nvm管理器可以管理多个node版本）
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

# 2.激活nvm管理器
```sh
source ~/.bashrc
```

# 3.安装最新node版本
```sh
nvm install --lts
```
# 4.如果想要切换node版本
```sh
nvm use 版本号
```