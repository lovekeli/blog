let wallpapers = [];
const wallpapersPerPage = 24;
let currentPage = 1;
let renderWallpapers=[];
let tag='all';
let pageCount = 0;
function applyWallpaper(idx)
{
    let msg=[];
    msg['event']='wallpaper';
    let tempWallpaper={};
    tempWallpaper['url']=renderWallpapers[idx]['链接'];
    tempWallpaper['cover']=renderWallpapers[idx]['封面'];
    tempWallpaper['type']=renderWallpapers[idx]['类型'];
    tempWallpaper['tag']=renderWallpapers[idx]['标签'];
    msg['data']=tempWallpaper;
    window.localStorage.setItem('applyurl',renderWallpapers[idx]['链接']);
    let data={};
    data.key='wallpaper';
    data.wallpaper=renderWallpapers[idx]['链接'];
    window.parent.postMessage(msg,'*');
    let wallpaperDOMs=document.getElementsByClassName('wallpaper');
    for(let i=0;i<wallpaperDOMs.length;i++){
        let img=wallpaperDOMs[i].getElementsByTagName('img')[0];
        let video=wallpaperDOMs[i].getElementsByTagName('video')[0];
        let btn=wallpaperDOMs[i].getElementsByClassName('apply-button')[0];
        if(img){
            btn.textContent=img.src==renderWallpapers[idx]['封面']?'应用中':'应用';
        }
        if(video){
            btn.textContent=video.src==renderWallpapers[idx]['封面']?'应用中':'应用';
        }
    }
}
let currentTag='全部';
let filters=document.getElementById('tagFilter').getElementsByTagName('button');
for(let i=0;i<filters.length;i++){
    filters[i].addEventListener('click',()=>{
        currentPage = 1;
        currentTag=filters[i].innerText;
        displayWallpapers(filters[i].innerText);
    });
}
function displayWallpapers(tag = '全部') {
    const wallpapersContainer = document.getElementById('wallpapers');
    wallpapersContainer.innerHTML = '';

    // const filteredWallpapers = tag === '全部' ? wallpapers : wallpapers.filter(wallpaper => wallpaper[3] === tag);
    // const totalPages = Math.ceil(filteredWallpapers.length / wallpapersPerPage);

    // const startIndex = (currentPage - 1) * wallpapersPerPage;
    // const endIndex = startIndex + wallpapersPerPage;
    // const wallpapersToDisplay = filteredWallpapers.slice(startIndex, endIndex);
    //currentPage=1;
    fetch(window.config.server + '/db/getImg?page=' + currentPage + '&count=' + wallpapersPerPage + '&tag=' + tag).then(response => {
        // 检查响应状态是否为 200-299
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 将响应数据解析为 JSON 格式
        return response.json();
    }).then(data => {
        pageCount=data.pagecount;
        renderWallpapers = data.data;
        for (let i = 0; i < renderWallpapers.length; i++) {
            let wallpaper = renderWallpapers[i];
            const wallpaperElement = document.createElement('div'); window.open
            wallpaperElement.className = 'wallpaper';
            let isApply = window.localStorage.getItem('applyurl') == wallpaper['链接'];
            switch (wallpaper['类型']) {
                case 'iframe':
                case 'img':
                    wallpaperElement.innerHTML = `
                <img src="${wallpaper['封面']}" alt="${wallpaper['标签']}">
                <div class="tag">${wallpaper['标签']}</div>
                <button class="down-button" onclick="window.open('${wallpaper['链接']}')">下载</button>
                <button class="apply-button" onclick="applyWallpaper(${i})">${isApply ? '应用中' : '应用'}</button>
                `;
                    ; break;
                case 'video':
                    wallpaperElement.innerHTML = `
                <video src="${wallpaper['封面']}" autoplay loop muted>
                    Your browser does not support the video tag.
                </video>
                <div class="tag">${wallpaper['标签']}</div>
                <button class="down-button" onclick="window.open('${wallpaper['链接']}')">下载</button>
                <button class="apply-button"  onclick="applyWallpaper(${i})">${isApply ? '应用中' : '应用'}</button>
                `;
                    ; break;
            }
            wallpapersContainer.appendChild(wallpaperElement);
        }

        document.getElementById('pageInfo').textContent = ` ${currentPage} / ${pageCount}`;

        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === pageCount;
    });
    
}
document.getElementById('tagFilter').addEventListener('change', (event) => {
    currentPage = 1;
    displayWallpapers(event.target.value);
});

document.getElementById('prevPage').addEventListener('click', () => {
    currentPage--;
    currentPage = Math.max(currentPage, 1);
    displayWallpapers(currentTag);
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    currentPage = Math.min(currentPage, pageCount);
    displayWallpapers(currentTag);
});

// Initial display
function initStore()
{
    fetch(window.config.server + '/db/getImg?page=' + currentPage + '&count=' + wallpapersPerPage+'&tag='+tag).then(response => {
        // 检查响应状态是否为 200-299
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 将响应数据解析为 JSON 格式
        return response.json();
    })
   .then(data => {
        // 处理解析后的 JSON 数据
        //wallpapers=parseCSV(data);
        // wallpapers=CSV.parse(CryptoJS.AES.decrypt(data, window.dataSecretKey).toString(CryptoJS.enc.Utf8)).slice(1);
        // let tags=[];
        // for(let i=0;i<wallpapers.length;i++){
        //     if(tags.indexOf(wallpapers[i][3])==-1){
        //         tags.push(wallpapers[i][3]);
        //     }
        // }
        let tags=data.tags;
        let tagFilterParent=document.getElementById('tagFilter');
        let btn=document.createElement('button');
        btn.innerText='全部';
        btn.onclick=()=>{
            currentPage = 1;
            currentTag='全部';
            displayWallpapers(currentTag);
        }
        tagFilterParent.appendChild(btn);
        for(let i=0;i<tags.length;i++){
            let tag=tags[i];
            let btn=document.createElement('button');
            btn.innerText=tag;
            btn.onclick=()=>{
                currentPage = 1;
                currentTag=tag;
                displayWallpapers(currentTag);
            }
            tagFilterParent.appendChild(btn);
        }
        currentPage=1;
        displayWallpapers();
    })
   .catch(error => {
        // 处理请求过程中发生的错误
        console.error('Fetch error:', error);
    });
}
this.initStore();
