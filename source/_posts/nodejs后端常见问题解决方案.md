---
title: nodejs后端常见问题解决方案
date: 2025-07-17 16:27:30
categories:
    - nodejs
tags:
    - express
---
这里放了一些常遇到的问题
<!--more-->
# 1. 前端提示报错
错误提示：
The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.
这是因为后端没有设置允许携带cookie，解决方法如下：
1. 安装cors
```cmd
npm install cors
```
2. 允许指定网站访问
```javascript
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // 仅允许列表中的域名
  if (whitelist.includes(origin)) { //whitelist 域名列表
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // 处理预请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```