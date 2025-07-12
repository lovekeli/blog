// 总结：通过API地址获取视频数据，然后通过js提取需要的数据，然后动态渲染到主页，可行的。
// 但是要自己设计好对应的样式

// API地址：https://api.bilibili.com/x/web-interface/view?bvid=BV16z421B78Z，如果是合集JSON会很长要特殊处理
// 假设 jsonDataList 是你的多个 JSON 数据对象数组
const jsonDataList = [
    {"code":0,"message":"0","ttl":1,"data":{"bvid":"BV16z421B78Z","aid":1355834069,"videos":1,"tid":183,"tname":"影视剪辑","copyright":1,"pic":"http://i2.hdslb.com/bfs/archive/d117ebdd20dcd75ab84d50ab504e7780c1c312d9.png","title":"“坦白身份了都不相信，这就是卧底的最高境界！”","pubdate":1719842321,"ctime":1719842321,"desc":"-","desc_v2":[{"raw_text":"-","type":1,"biz_id":0}],"state":0,"duration":131,"mission_id":1729514,"rights":{"bp":0,"elec":0,"download":1,"movie":0,"pay":0,"hd5":1,"no_reprint":0,"autoplay":1,"ugc_pay":0,"is_cooperation":0,"ugc_pay_preview":0,"no_background":0,"clean_mode":0,"is_stein_gate":0,"is_360":0,"no_share":0,"arc_pay":0,"free_watch":0},"owner":{"mid":483053920,"name":"爱剪辑Love","face":"https://i1.hdslb.com/bfs/face/f63ff36af17ad91e597a8905891c7db1aedc9541.jpg"},"stat":{"aid":1355834069,"view":602402,"danmaku":140,"reply":301,"favorite":1381,"coin":208,"share":78,"now_rank":0,"his_rank":0,"like":50379,"dislike":0,"evaluation":"","vt":0},"argue_info":{"argue_msg":"","argue_type":0,"argue_link":""},"dynamic":"","cid":1601911051,"dimension":{"width":1440,"height":1080,"rotate":0},"premiere":null,"teenage_mode":0,"is_chargeable_season":false,"is_story":false,"is_upower_exclusive":false,"is_upower_play":false,"is_upower_preview":false,"enable_vt":0,"vt_display":"","no_cache":false,"pages":[{"cid":1601911051,"page":1,"from":"vupload","part":"studio_video_1719841959035.mp4","duration":131,"vid":"","weblink":"","dimension":{"width":1440,"height":1080,"rotate":0},"first_frame":"http://i2.hdslb.com/bfs/storyff/n240701sa2cpsgw4qvxbad192stq8c8x_firsti.jpg"}],"subtitle":{"allow_submit":false,"list":[{"id":1524142131630108928,"lan":"ai-zh","lan_doc":"中文（自动生成）","is_lock":false,"subtitle_url":"","type":1,"id_str":"1524142131630108928","ai_type":0,"ai_status":2,"author":{"mid":0,"name":"","sex":"","face":"","sign":"","rank":0,"birthday":0,"is_fake_account":0,"is_deleted":0,"in_reg_audit":0,"is_senior_member":0,"name_render":null}}]},"is_season_display":false,"user_garb":{"url_image_ani_cut":""},"honor_reply":{},"like_icon":"","need_jump_bv":false,"disable_show_up_info":false,"is_story_play":1}},
    {"code":0,"message":"0","ttl":1,"data":{"bvid":"BV11M4m117wK","aid":1306026641,"videos":1,"tid":122,"tname":"野生技能协会","copyright":2,"pic":"http://i1.hdslb.com/bfs/archive/58f541dd2c9ba9201c7daabfcd600c9d97699fdc.jpg","title":"使用HTML、CSS和Javascript制作带有图表的响应式仪表盘设计","pubdate":1720743000,"ctime":1720688063,"desc":"https://www.youtube.com/watch?v=YthqiuzEXBs\n源码即将在此发布...\n 在本教程中，我们将指导您使用 HTML、CSS 和 JavaScript 为学习平台创建专业的仪表板用户界面。无论您是网络开发新手还是经验丰富的程序员，都会在这里发现有价值的见解和技术！\n你将学到什么？\n- 构建 HTML 结构： 用条理清晰的 HTML 为仪表盘奠定基础。\n- 使用 CSS 设计风格： 使用 CSS 技术设计现代而有吸引力的界面，包括布局、颜色和字体。\n- 使用 JavaScript 添加交互性： 让仪表盘充满活力并方便用户使用。\n- 创建响应式设计： 确保仪表盘在台式机、平板电脑和智能手机上都美观大方。\n- 自定义组件 构建进度条、图表和交互式时间表等元素。","desc_v2":[{"raw_text":"https://www.youtube.com/watch?v=YthqiuzEXBs\n源码即将在此发布...\n 在本教程中，我们将指导您使用 HTML、CSS 和 JavaScript 为学习平台创建专业的仪表板用户界面。无论您是网络开发新手还是经验丰富的程序员，都会在这里发现有价值的见解和技术！\n你将学到什么？\n- 构建 HTML 结构： 用条理清晰的 HTML 为仪表盘奠定基础。\n- 使用 CSS 设计风格： 使用 CSS 技术设计现代而有吸引力的界面，包括布局、颜色和字体。\n- 使用 JavaScript 添加交互性： 让仪表盘充满活力并方便用户使用。\n- 创建响应式设计： 确保仪表盘在台式机、平板电脑和智能手机上都美观大方。\n- 自定义组件 构建进度条、图表和交互式时间表等元素。","type":1,"biz_id":0}],"state":0,"duration":3416,"rights":{"bp":0,"elec":0,"download":1,"movie":0,"pay":0,"hd5":0,"no_reprint":0,"autoplay":1,"ugc_pay":0,"is_cooperation":0,"ugc_pay_preview":0,"no_background":0,"clean_mode":0,"is_stein_gate":0,"is_360":0,"no_share":0,"arc_pay":0,"free_watch":0},"owner":{"mid":1221413613,"name":"前端亮亮","face":"https://i0.hdslb.com/bfs/face/0c0ab1ad60db2ae1ea8a08aab3530d8966ec0c3c.jpg"},"stat":{"aid":1306026641,"view":663,"danmaku":0,"reply":0,"favorite":31,"coin":0,"share":0,"now_rank":0,"his_rank":0,"like":18,"dislike":0,"evaluation":"","vt":0},"argue_info":{"argue_msg":"","argue_type":0,"argue_link":""},"dynamic":"","cid":1611952454,"dimension":{"width":1920,"height":1080,"rotate":0},"premiere":null,"teenage_mode":0,"is_chargeable_season":false,"is_story":false,"is_upower_exclusive":false,"is_upower_play":false,"is_upower_preview":false,"enable_vt":0,"vt_display":"","no_cache":false,"pages":[{"cid":1611952454,"page":1,"from":"vupload","part":"使用HTML、CSS和Javascript制作带有图表的响应式仪表盘设计","duration":3416,"vid":"","weblink":"","dimension":{"width":1920,"height":1080,"rotate":0},"first_frame":"http://i0.hdslb.com/bfs/storyff/n240711sa2zqdy5b79mdjl1zvw2msb5v_firsti.jpg"}],"subtitle":{"allow_submit":false,"list":[]},"is_season_display":false,"user_garb":{"url_image_ani_cut":""},"honor_reply":{},"like_icon":"","need_jump_bv":false,"disable_show_up_info":false,"is_story_play":1}},
    {"code":0,"message":"0","ttl":1,"data":{"bvid":"BV1iS411c7np","aid":1906055785,"videos":1,"tid":250,"tname":"出行","copyright":1,"pic":"http://i2.hdslb.com/bfs/archive/c8f1dbcfa737231cc544345044d34ae97cc50ff7.jpg","title":"新疆文旅：对！就这么宣传！！","pubdate":1720594800,"ctime":1720594800,"desc":"-","desc_v2":[{"raw_text":"-","type":1,"biz_id":0}],"state":0,"duration":137,"mission_id":1729500,"rights":{"bp":0,"elec":0,"download":1,"movie":0,"pay":0,"hd5":1,"no_reprint":0,"autoplay":1,"ugc_pay":0,"is_cooperation":0,"ugc_pay_preview":0,"no_background":0,"clean_mode":0,"is_stein_gate":0,"is_360":0,"no_share":0,"arc_pay":0,"free_watch":0},"owner":{"mid":670456816,"name":"咕咕啊啊咕","face":"https://i1.hdslb.com/bfs/face/d0b6e3760982fef5e169c866fa95c12c6f138b7f.jpg"},"stat":{"aid":1906055785,"view":823785,"danmaku":1146,"reply":1986,"favorite":6508,"coin":1251,"share":5092,"now_rank":0,"his_rank":0,"like":37048,"dislike":0,"evaluation":"","vt":0},"argue_info":{"argue_msg":"","argue_type":0,"argue_link":""},"dynamic":"","cid":1610800669,"dimension":{"width":1920,"height":1080,"rotate":0},"premiere":null,"teenage_mode":0,"is_chargeable_season":false,"is_story":false,"is_upower_exclusive":false,"is_upower_play":false,"is_upower_preview":false,"enable_vt":0,"vt_display":"","no_cache":false,"pages":[{"cid":1610800669,"page":1,"from":"vupload","part":"新疆文旅：对！就这么宣传！！","duration":137,"vid":"","weblink":"","dimension":{"width":1920,"height":1080,"rotate":0},"first_frame":"http://i2.hdslb.com/bfs/storyff/n240710sa2k3o4neyupsp1wqzsgu7v73_firsti.jpg"}],"subtitle":{"allow_submit":false,"list":[]},"label":{"type":1},"is_season_display":false,"user_garb":{"url_image_ani_cut":""},"honor_reply":{"honor":[{"aid":1906055785,"type":4,"desc":"热门","weekly_recommend_num":0}]},"like_icon":"","need_jump_bv":false,"disable_show_up_info":false,"is_story_play":1}},

    // 其他 JSON 数据对象
  ];
  
  // 解析 JSON 数据的函数
function parseVideoData(jsonData) {
    const videoData = jsonData.data;
  
    return {
      title: videoData.title,
      duration: videoData.duration,
      author: videoData.owner.name,
      pubdate: new Date(videoData.pubdate * 1000).toLocaleString(), // 转换时间戳为北京时间
      videoLink: `https://www.bilibili.com/video/${videoData.bvid}`,
      coverLink: 'https://static-tw.baozimh.com/cover/woduzishengji-duburedicestudio.jpg?w=285&h=375&q=100'
    };
  }
  
  // 处理多个 JSON 数据对象
  function processVideoDataList(dataList) {
    return dataList.map(parseVideoData);
  }
  
  // 渲染视频卡片到页面
  function renderVideoCards(videoDataList) {
    const gallery = document.getElementById('video-gallery');
  
    videoDataList.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.className = 'video-card';
  
      videoCard.innerHTML = `
        <a href="${video.videoLink}" target="_blank">
          <img src="${video.coverLink}" alt="${video.title}">
          <h3>${video.title} -- ${video.author} -- ${video.pubdate} -- ${video.duration}秒</h3>
        </a>
      `;
  
      gallery.appendChild(videoCard);
    });
  }
  
  // 获取并处理视频数据
  const videoDataList = processVideoDataList(jsonDataList);
  renderVideoCards(videoDataList);