---
title: EasySave插件使用
date: 2025-03-05 17:19:58
categories:
    - unity
tags:
    - 插件
---
EasySave插件使用
<!--more-->
# 1.使用EasySave加载csv文件
···csharp
//加载csv文件
ES3Spreadsheet LoadCSV(string filename,Encoding encoding)
{
    ES3Spreadsheet sheet = new ES3Spreadsheet(); 
    ES3Settings settings = new ES3Settings();
    settings.encoding = encoding;
    sheet.Load(filename, settings);
    return sheet;
}
//读取数据
ES3Spreadsheet sheet =LoadCSV("test.csv",Encoding.UTF8)
for (int row = 0; row < sheet.RowCount; row++)
{
    for (int col = 0; col < sheet.ColumnCount; col++)
    {
        string data=sheet.GetCell<string>(col, row);
    }
}
···