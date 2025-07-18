---
title: nodejs的定时任务
date: 2025-07-18 09:56:43
categories:
    - nodejs
---
使用node-cron实现定时任务
<!--more-->
# 1. 安装node-cron
```bash
npm install node-cron
```
# 2. 使用node-cron
```javascript
const cron = require('node-cron');

// 定义任务
const weeklyTask = cron.schedule('0 0 0 * * 1', async () => {
  try {
    console.log('开始执行每周一定时任务：' + new Date().toLocaleTimeString());
    
    // 模拟一个异步操作（例如数据库查询、API调用等）
    await performWeeklyTask();
    
    console.log('每周一定时任务执行完成');
  } catch (error) {
    console.error('每周一定时任务执行失败:', error);
    // 这里可以添加错误处理逻辑，如发送警报邮件、记录日志等
  }
});

// 模拟需要执行的任务
async function performWeeklyTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('完成每周一的数据处理任务');
      resolve();
    }, 2000); // 模拟2秒的处理时间
  });
}

// 启动任务
weeklyTask.start();
console.log('每周一定时任务已启动，将于每周一 00:00 执行');

// 监听未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  // 可以选择重启任务或退出程序
});

// 监听未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  // 可以添加相应的处理逻辑
});

// 保持程序持续运行
process.stdin.resume();
```
# 3.Cron 表达式解析
|0 0 0 * * 1|对应的含义|
|----- |------|
|第一个 0|代表秒，取值范围是 0 - 59。|
|第二个 0|代表分，取值范围是 0 - 59。|
|第三个 0|代表小时，取值范围是 0 - 23。|
|第四个 *|代表日，取值范围是 1 - 31。|
|第五个 *|代表月，取值范围是 1 - 12。|
|第六个 1|代表周，取值范围是 0 - 7（0 和 7 都表示周日，1 表示周一，以此类推）。|
