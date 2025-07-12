---
title: c#连接数据库，提示utf8mb3字符集错误
date: 2025-04-22 14:55:56
categories:
    - 数据库
tags:
    - mysql
---
c#连接数据库，提示utf8mb3字符集错误
<!-- more -->
解决方法：

修改字符集和排序为utf8mb4。

修改数据：
```sql
ALTER DATABASE
    database_name
    CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;
```
修改表：
```sql
ALTER TABLE
    table_name
    CONVERT TO CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```
修改列：
```sql
ALTER TABLE
    table_name
    CHANGE column_name column_name
    VARCHAR(191)
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```