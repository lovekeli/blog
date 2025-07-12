/**
 *  <div class="popover-webdav  <% if (models.cloudStorage !== \'webdav\') { %> hidden<% } %>"> <div class="form-group" id="group-webdavFields"> <label class="col-sm-2 control-label" for="webdavUrl"> {{ i18n(\'WebDAV URL\') }} </label>  <div class="col-sm-10">  <input id="webdavUrl" type="text" name="webdavUrl" class="form-control" value="{{ models.webdavUrl }}" placeholder="{{ i18n(\'Enter WebDAV URL\') }}" /> </div> </div> <div class="form-group" id="group-webdavUser"> <label class="col-sm-2 control-label" for="webdavUser"> {{ i18n(\'Username\') }} </label> <div class="col-sm-10"> <input id="webdavUser" type="text" name="webdavUser" class="form-control" value="{{ models.webdavUser }}" placeholder="{{ i18n(\'Enter username\') }}" />  </div> </div> <div class="form-group" id="group-webdavPassword"> <label class="col-sm-2 control-label" for="webdavPassword">  {{ i18n(\'Password\') }} </label> <div class="col-sm-10"> <input id="webdavPassword" type="password" name="webdavPassword" class="form-control" value="{{ models.webdavPassword }}" placeholder="{{ i18n(\'Enter password\') }}" /> </div>\n </div>\n</div>
 */
document.addEventListener('DOMContentLoaded', function () {
    init();
    let option=document.getElementById('cloudStorage');
    console.log("远程存储选项："+option.value);
    option.addEventListener('change', function () {
        console.log("远程存储选项："+option.value);
        if(option.value=="webdav"){
            AddWebdavOption();
        }
    });
});
function init(){
    console.log("初始化webdav功能");
}
function AddWebdavOption()
{   
    console.log("追加webdav选项");
}
