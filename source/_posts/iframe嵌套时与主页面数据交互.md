---
title: iframe嵌套时与主页面数据交互
date: 2025-02-12 15:15:30
categories:
    - 前端
    - html
tags:
    - JavaScript
---
iframe嵌套时与主页面数据交互
<!--more-->
主页面代码：
```javascript
window.addEventListener('message', (e) => {
    if (e.origin === window.location.origin) {
        let tag = e.data['tag']; //此标签用于区分事件
        let data = e.data['data'];
        switch (tag) {
            case 'tag1':
                //TODO
                ; break;
    }
});
```

嵌套的页面
```javascript
let msg = [];
msg['tag'] = 'tag1';
msg['data'] =data;
window.parent.postMessage(msg, '*');
```