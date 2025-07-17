---
title: 解决nodejs使用sqlite数据库时多路由同时连接问题
date: 2025-07-17 16:07:23
categories:
    - nodejs
tags:
    - express
    - 数据库
---
使用sqlite数据库时多路由同时连接问题
<!--more-->
由于sqlite数据库是单线程的，所以当多个路由同时访问数据库时，同时修改数据库文件就会导致数据丢失只保留最后一个修改的数据。
解决方法：
使用better-sqlite3模块来进行控制数据的操作。
1.安装better-sqlite3 
```cmd
npm install better-sqlite3
```
2.创建连接池

```javascript
const Database = require('better-sqlite3');

// 创建单例数据库连接（模拟连接池）
const db = new Database('./assets/db.db', {
  verbose: console.log, // 启用日志
});

// 配置连接选项（根据需要）
db.pragma('journal_mode = WAL');

// 导出数据库实例
module.exports = db;
```
3.路由使用
```javascript
const dbpool = require('./db.js');
let select=dbpool.prepare('SELECT * FROM users where id=?').get('1000'); //返回查询数组,使用?占位符
let insert=dbpool.prepare('INSERT INTO users (name, age) VALUES (?, ?)').run('John', 30); //使用?占位符
console.log(insert.changes); //新增数量
let update=dbpool.prepare('UPDATE users SET name = ? WHERE id = ?').run('Jane', 1000);
console.log(update.changes); //更新数量
let delete=dbpool.prepare('DELETE FROM users WHERE id = ?').run(1000);
console.log(delete.changes); //删除数量
```
4.程序关闭时自动关闭数据库连接
```javascript
process.on('exit', function () {
  dbpool.close();
  console.log('数据库已关闭');
  process.exit(0);
})
```