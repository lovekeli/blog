---
title: nodejs爬虫
date: 2025-02-07 12:57:29
categories:
    - nodejs
tags:
    - 网络
---
nodejs爬虫
<!--more-->
1.安装cheerio npm install cheerio
2.加载网页源码
```javascript
function LoadHtml(url,callback){
    https.get(url, (res) => {
        var chunks = [];
        var size = 0;
        res.on('data', (chunk) => {
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', () => {
            var data = Buffer.concat(chunks, size);
            var html = data.toString();
            if(callback)
            {
                callback(html);
            }
        });
        res.on('error', () => {
            callback('');
        });
    });
}
```
3.开始获取节点数据 let $ = cheerio.load(html); let node= $('标签名.类名');
