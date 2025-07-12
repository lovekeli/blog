---
title: 使用sshwifty搭建在线ssh网站
date: 2025-06-17 11:27:30
categories:
    - 杂谈
---

使用sshwifty搭建在线ssh网站
<!--more-->
# 生成证书和密钥文件
```ssh
openssl req   -newkey rsa:4096 -nodes -keyout domain.key -x509 -days 360 -out domain.crt
```

# 生成容器
```ssh
docker run --detach \
  --restart always \
  --publish 8182:8182 \
  --env SSHWIFTY_DOCKER_TLSCERT="$(cat domain.crt)" \
  --env SSHWIFTY_DOCKER_TLSCERTKEY="$(cat domain.key)" \
  --name sshwifty \
  niruix/sshwifty:latest
```

# 访问网站
http://localhost:8182