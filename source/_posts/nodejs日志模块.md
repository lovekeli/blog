---
title: nodejs日志模块
date: 2025-07-18 10:10:11
categories:
    - nodejs
---
nodejs使用winston实现输出日志
<!--more-->
# 1. 安装winston
```bash
npm install winston winston-daily-rotate-file
```
# 2. 使用winston
```javascript
const winston = require('winston');
require('winston-daily-rotate-file');

// 日志输出格式（包含时间戳）
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })
);

// 配置每日滚动文件传输
const transport = new (winston.transport.DailyRotateFile)({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,      // 旧日志自动压缩
  maxSize: '20m',           // 单个日志文件最大20MB
  maxFiles: '7d'            // 保留最近7天的日志
});

// 创建logger实例
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    transport,              // 输出到每日文件
    new winston.transport.Console()  // 同时输出到控制台
  ]
});

// 使用示例
logger.info('这是一条普通信息日志');
logger.warn('这是一条警告日志');
logger.error('这是一条错误日志');

// 每周一任务中使用日志
const cron = require('node-cron');
cron.schedule('0 0 0 * * 1', () => {
  logger.info('开始执行每周一定时任务');
  // 任务逻辑...
});
```