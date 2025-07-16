---
title: maccms采集接口详解
date: 2025-07-16 09:32:44
categories:
    - api
---
主要介绍maccms的接口参数
<!--more-->
# 一、视频接口
```javascript
/api.php/provide/vod/?ac=list //获取视频列表
/api.php/provide/vod/?ac=detail //获取视频详情
```
# 二、文章接口
```javascript
/api.php/provide/art/?ac=list //获取文章列表
/api.php/provide/art/?ac=detail //获取文章详情
```
# 三、通用参数
## 1.数据接口
|参数名|示例值|是否必填|参数类型|参数描述|
|----- |------|-----|-----|-----|
|mid	|1|	必填|text|模型mid 1影片、2文章、3专题、8明星、9角色、11剧情|
|limit	|20	|必填	|text	|每页条数，支持10,20,30|
|page	|1	|必填	|text	|页码，最多不超过20页，防止非法采集|
|tid	|1	|必填	|text	|分类id|

响应实例：
```json
{
	"code": 1,
	"msg": "数据列表",
	"page": 1,
	"pagecount": 221,
	"limit": 10,
	"total": 2204,
	"list": [
		{
			"vod_id": 3683,
			"type_id": 1,
			"type_id_1": 0,
			"group_id": 0,
			"vod_name": "不表演才艺居然不给我饭吃#抖音汽车",
			...
		},
		{
			"vod_id": 3685,
			"type_id": 1,
			"type_id_1": 0,
			"group_id": 0,
			"vod_name": "所以非要这样吗？#当别人问我上班..",
			...
		},
	]
}
```

## 2.搜索接口
|参数名|示例值|是否必填|参数类型|参数描述|
|----- |------|-----|-----|-----|
|mid	|1	|必填	|text	|模型mid 1影片、2文章、3专题、8明星、9角色、11剧情|
|wd	|招魂	|必填	|text	|关键词|
|limit	|10	|必填	|text	|获取数量|
|imestamp	|1574339368127	|必填	|text	|时间戳|

响应实例：

```json
{
	"code": 1,
	"msg": "数据列表",
	"page": 1,
	"pagecount": 3,
	"limit": 10,
	"total": 25,
	"list": [
		{
			"id": 1593,
			"name": "我也搞不懂他是怎么被困这里的 #宅家dou剧场  #我的观影报告  #萤火计划",
			"en": "woyegaobudongtashizenmebeikunzhelidezhaijiadoujuchangwodeguanyingbaogaoyinghuojihua",
			"pic": "https://p3.douyinpic.com/tos-cn-p-0015/34f94d7f8bda45048c14988492ef9500_1620207826~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202105312051560101501660281A0EC310&biz_tag=feed_cover"
		},
		{
			"id": 1467,
			"name": "假如爱情来临我的心永远不会迟到@DOU+小助手",
			"en": "jiaruaiqinglailinwodexinyongyuanbuhuichidaoDOUxiaozhushou",
			"pic": "https://p3.douyinpic.com/tos-cn-p-0015/be736dd849f744e7848473210c3c8131_1619099706~tplv-dy-360p.jpeg?from=4257465056"
		},
		{
			"id": 1360,
			"name": "有人说我的视频没营养 怎么？你的视频在炖骨头汤？",
			"en": "yourenshuowodeshipinmeiyingyangzenmenideshipinzaidungutoutang",
			"pic": "https://p9.douyinpic.com/tos-cn-p-0015/2af445900fa14c64b03c0d0390e2bd81_1618493679~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=20210531205248010150201080310EC297&biz_tag=feed_cover"
		},
		{
			"id": 1350,
			"name": "有了油菜花，就承托不出我的马甲线了，",
			"en": "youliaoyoucaihuajiuchengtuobuchuwodemajiaxianliao",
			"pic": "https://p26.douyinpic.com/tos-cn-p-0015/47c6c91025a64b6daa95ee55d33fdcff_1618363339~tplv-dy-360p.jpeg?from=4257465056"
		},
		{
			"id": 1301,
			"name": "#抖in美好溧阳 #万物皆可智慧 #没事开心一下 #摆好你的姿态 #没错是我的腿呀 #你的女友已上线请查收",
			"en": "douinmeihaoliyangwanwujiekezhihuimeishikaixinyixiabaihaonidezitaimeicuoshiwodetuiyanidenvyouyishangxianqingchashou",
			"pic": "https://p29.douyinpic.com/tos-cn-p-0015/6b3f2a301a2b40fd805ed8e1c5b57de6_1618228574~tplv-dy-360p.jpeg?from=4257465056"
		},
		{
			"id": 1284,
			"name": "好久没有直播有没有想我的？@抖音小助手 #舞蹈 #创作灵感",
			"en": "haojiumeiyouzhiboyoumeiyouxiangwodedouyinxiaozhushouwudaochuangzuolinggan",
			"pic": "https://p6.douyinpic.com/tos-cn-p-0015/124267af2a314b54bed771e528cac1a8_1618113455~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202105312053370101501821001E0ED364&biz_tag=feed_cover"
		},
		{
			"id": 1246,
			"name": "关于我的故事还是听我的版本好一点#原相机",
			"en": "guanyuwodegushihuanshitingwodebanbenhaoyidianyuanxiangji",
			"pic": "https://p9.douyinpic.com/tos-cn-p-0015/dfa28fcbe6e840f094f824827ff8b7a0_1617918242~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=20210531205331010150157232090F227B&biz_tag=feed_cover"
		},
		{
			"id": 1199,
			"name": "#创作灵感 #牛仔裤 小时候偷喝我爸两罐红牛，追着我打，笑死，我的能量超乎你想象",
			"en": "chuangzuolingganniuzikuxiaoshihoutouhewobaliangguanhongniuzhuizhuowodaxiaosiwodenengliangchaohunixiangxiang",
			"pic": "https://p26.douyinpic.com/tos-cn-p-0015/488f094a79154123ad43f3152ef3fdd7_1617541987~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202105312054250101502221495B0F3590&biz_tag=feed_cover"
		},
		{
			"id": 1189,
			"name": "你有你的背景，我有我的背影，安排#大长腿",
			"en": "niyounidebeijingwoyouwodebeiyinganpaidachangtui",
			"pic": "https://p26.douyinpic.com/tos-cn-p-0015/6f993bd8cd46412c82d41df0f3a64e31_1616750332~tplv-dy-360p.jpeg?from=4257465056"
		},
		{
			"id": 1161,
			"name": "我的小蛮腰中午可以露出来了，继续减肥再瘦十斤#微胖",
			"en": "wodexiaomanyaozhongwukeyiluchulailiaojixujianfeizaishoushijinweipang",
			"pic": "https://p6.douyinpic.com/tos-cn-p-0015/71ccc83db7674648a83d08314a2323de_1617954719~tplv-dy-360p.jpeg?from=4257465056&s=&se=false&sh=&sc=&l=202105312054120101511722311C0F10D3&biz_tag=feed_cover"
		}
	],
	"url": "/index.php/vodsearch/mac_wd-------------.html"
}
```