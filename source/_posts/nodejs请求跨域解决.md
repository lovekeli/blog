---
title: nodejs请求跨域解决
date: 2025-07-17 16:20:10
categories:
    - nodejs
tags:
    - express
---
前端提示请求跨域的问题
<!--more-->
1.安装cors
```cmd
npm install cors
```
2.允许所有网站访问
```javascript
const cors = require('cors');
app.use(cors());
```
3.指定网站访问
```javascript
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:8080'
    credentials: true
    methods: 'GET,POST,PUT,DELETE'
    allowedHeaders: 'Content-Type,Authorization'
    exposeHeaders: 'Content-Type,Authorization' 
}))
```
4.指定网站访问多个
```javascript
const cors = require('cors');
const whitelist = ['域名1','域名2','域名3'];
const corsOptions = {
  origin: (origin, callback) => {
    // 允许没有 origin 的请求（如 Postman）
    if (!origin) return callback(null, true);
    
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions))
```