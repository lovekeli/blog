/**
 * 读取配置示例文件
 * 修改此文件来实现持久化
 * YL.init(data) 中的data必须是ylui接受的数据格式
 * 开发者可以自行决定从静态文件读取（如basic.json）还是从远程服务器拉取（如ajax请求）
 */

YL.onLoad(function () {
  // 读取url中load参数，如localhost/ylui/index.html?load=basic
  var load = Yuri2.parseURL().params.load;
  var file;
  let config = localStorage.getItem(YL.static.localStorageName);
  if (config) {
    YL.init();
  } else {
    // 从json文件读取
    file = file || load || 'basic';
    var save = /^\w+$/.test(file) ? './saves/' + file + '.json' : file;
    Yuri2.loadContentFromUrl(save, 'GET', function (err, text) {
      if (!err) {
        var data = JSON.parse(text);
        YL.init(data);
      } else {
        alert('YLUI读取配置错误，初始化失败');
      }
    });
  }
});
window.addEventListener('message', (e) => {
  if (e.origin === window.location.origin) {
      let event = e.data['event'];
      let data = e.data['data'];
      let app={};
      switch (event) {
        case 'wallpaper':
          let msg=[];
          msg['event']='wallpaper';
          msg['data']=data;
          let wallpaperengine=document.getElementById('wallpaperengine');
          wallpaperengine.contentWindow.postMessage(msg, '*')
          ;break;
        case 'installApp':
          app.url=data.url;
          app.title=data.name;
          app.addressBar=false;
          app.autoRun=0;
          app.background=false;
          app.badge=0;
          app.desc=data.title;
          app.icon={};
          app.icon.type='img';
          app.icon.content=data.ico;
          app.openMode=data.openMode; 
          app.plugin=false;
          app.position={};
          app.position.autoOffset=true;
          app.position.left=true;
          app.position.top=true;
          app.position.x='x*0.05';
          app.position.y='y*0.05';
          app.version='1.0.0';
          app.poweredBy='管理员';
          app.resizable=data.canResizable;
          app.single=true;
          app.size={};
          app.size.height=data.height;
          app.size.width=data.width;
          app.customTile=data.title;
          YL.addApp(data.appid,app);
          YL.addShortcut(data.appid);
          YL.saveCfg();
          ;break;
        case 'rungame':
          app.url=data.url;
          app.title=data.name;
          app.addressBar=false;
          app.autoRun=0;
          app.background=false;
          app.badge=0;
          app.desc=data.title;
          app.icon={};
          app.icon.type='img';
          app.icon.content=data.image;
          app.openMode='normal';
          app.plugin=false;
          app.position={};
          app.position.autoOffset=true;
          app.position.left=true;
          app.position.top=true;
          app.position.x='x*0.05';
          app.position.y='y*0.05';
          app.version='1.0.0';
          app.poweredBy='管理员';
          app.resizable=data.canResizable;
          app.single=true;
          app.size={};
          app.size.height=data.height;
          app.size.width=data.width;
          app.customTile=data.title;
          YL.open(app);
          ;break;
      }
    }
  });