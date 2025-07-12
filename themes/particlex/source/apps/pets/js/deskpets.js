var wallpapers=[];
function applyWallpaper(idx)
{
    let msg=[];
    msg['event']='pets';
    msg['data']=wallpapers[idx];
    window.parent.postMessage(msg,'*');
}
function initStore()
{
    fetch('./petlist.json').then(response => {
        // 检查响应状态是否为 200-299
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 将响应数据解析为 JSON 格式
        return response.json();
    })
   .then(data => {
        // 处理解析后的 JSON 数据
        wallpapers=data;
        let store=document.getElementById('wallpaperstore');
        for(let i=0;i<data.length;i++){
            let wallpaper=data[i];
            let cacheNode='';
            if(wallpaper['isVideo'])
            {
                cacheNode='<div class="wallpaper">'+
                '<video class="wallpaper-video" src="'+wallpaper['cover']+'" autoplay="autoplay" loop="loop" muted="muted"/></video>'+ 
                 '<button class="applybutton"  onclick='+'"applyWallpaper('+i+')">领养</button></div>';
            }else{
                cacheNode='<div class="wallpaper">'+
                '<img class="wallpaper-img" src="'+wallpaper['cover']+'"/>'+ 
                 '<button class="applybutton" onclick='+'"applyWallpaper('+i+')">领养</button></div>';
            }
            store.insertAdjacentHTML('beforeend',cacheNode);
        }
    })
   .catch(error => {
        // 处理请求过程中发生的错误
        console.error('Fetch error:', error);
    });
}
this.initStore();