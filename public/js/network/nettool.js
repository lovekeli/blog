const NetTool = {
    Client: null,
    LadJson: function (url, callBack) {
        fetch(url).then((response)=> {
            return response.json();
        }).then((data) => {
            callBack(data);
        });
    },
    LoadWebdavAccounts: function () {
        let accountscfg = window.localStorage.getItem(window.config.webdavaccounts);
        if (accountscfg == null) {
            accountscfg = '[]';
        }
        return accounts = JSON.parse(accountscfg);
    },
    CreateWebdavClient : function (account) {
        let tempArr = account.url.split(':');
        let http = tempArr[0];
        let host = tempArr[1].slice(2);
        let port = tempArr[2].split('/')[0];
        let path = tempArr[2].slice(tempArr[2].indexOf('/'));
        Client = new davlib.DavClient();
        this.Client.initialize(host, port, http, account.name, account.passwd);
    },
    SaveConfig: function () {
        let config = {};
        config.tempDesktopApp = window.localStorage.getItem(window.config.tempDesktopApp);
        config.tempStartApp = window.localStorage.getItem(window.config.tempStartApp);
        Client.PUT(path + '/config.json', JSON.stringify(config), this.handler(201, "出错", "66666", () => {
            console.log('加载配置文件');
        }));
    },
    LoadConfig: function () {
        Client.GET(path + '/config.json', this.handler(200, "出错", "66666", () => {
            console.log('加载配置文件');
        }));
    },
    handler(status, statusstring, content, headers) {
        if (content) {
            if (status != '200' && status != '204') {
                if (status == '207') {

                }
                alert('Error: ' + statusstring);
            } else {
                alert('Content: ' + content);
            }
        }
    }
};

