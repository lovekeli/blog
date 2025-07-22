YL.static = {
  /** “关于”信息 */
  softwareName: '量子计算机（由天命组织提供的超级计算机）', 
  version: "1.0.0", 
  iconBtnStart: 'html5',
  author: '罗小黑',
  contactInformation: 'null',
  officialWebsite: 'https://onlylovekeli.cn,https://onlylovekeli.pages.dev',
  welcome: '',//加载完毕控制台提示信息
  copyrightDetail: '',//版权详细信息
  otherStatements: '',//其他信息（可留空）

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI基础设置 */
  lang: 'zh-cn', //语言
  localStorageName: "system", //ls存储名
  lockedApps: ['yl-system', 'yl-color-picker', 'yl-browser','lctab',"app-music","app-games","app-wallpaperstore","app-note","app-pdf","app-excel","app-pets","yl-color","githubproxy","reader","medium","webssh"], // 锁定的应用（不允许被脚本修改）
  trustedApps: [], // 受信任的应用（可以使用敏感API）
  debug: false,//启用更多调试信息
  beforeOnloadEnable: false,//启用关闭前询问（打包app时请关闭防止出错）
  WarningPerformanceInIE: false,//在IE下提示体验不佳信息
  languages: {}, //推荐留空，自动从文件加载
  changeable: true,//存档数据是否可被普通用户修改
  dataCenter: true,//是否展示数据管理中心

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI注册信息 */
  authorization: '无忧版',//授权类型
  serialNumber: 123456,//序列号

};
