let products = [];
let currentproduct;

const perPage = 16;
let currentPage = 1;
let allPageCount = 1;

let renderProducts=[]; 
let filteredProducts;
let  category = 'all';
function showCategory(category) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    this.category=category;
    // filteredProducts = category === 'all' ? products : products.filter(product => product[6] === category);
    // allPageCount = Math.ceil(filteredProducts.length / perPage);
    currentPage = 1;
    // displayProducts(filteredProducts.slice(0, perPage));
    fetch(window.config.server+'/api/getGameList?page='+currentPage+'&count='+perPage+'&category='+category).then(res => res.json(),{
        method: 'GET',
        credentials: 'include',
    }).then(data => { 
        filteredProducts = data.data;
        renderProducts=filteredProducts;
        allPageCount=data.pagecount;
        currentPage = 1;
        displayProducts(filteredProducts);
    });
}

function searchProducts() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const query = document.getElementById('search-input').value.toLowerCase();
    filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = '<div class="product-name">' + product['名字'] + '</div>'
            + '<img src="' + product['封面'] + '"/>'
            + '<button onclick="openModal(' + i + ')">详情</button>';
        mainContent.appendChild(productDiv);
    };
}
function openModal(idx) {
    currentproduct = filteredProducts[idx];
    document.getElementById('modal-title').innerText = currentproduct['名字'];
    document.getElementById('modal-description').innerText = currentproduct['描述'];
    document.getElementById('product-modal').style.display = 'block';
    document.getElementById('playgame').style.display = currentproduct['下载'] ? 'none' : 'block';
    document.getElementById('downgame').style.display = currentproduct['下载'] ? 'block' : 'none';
    document.getElementById('modal-image').src = currentproduct['封面'];
    document.getElementById('downgame').removeEventListener('click',downloadgame);
    document.getElementById('downgame').addEventListener('click',downloadgame);
}
function showPlayHistory(){
    let historyCfg=window.localStorage.getItem('playhistory');
    if(historyCfg!=null){
        let history = JSON.parse(historyCfg);
        displayProducts(history);
    }else{
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';
    }
}
function downloadgame() {
    window.open(currentproduct['地址']);
}

function closeModal() {
    currentproduct = null;
    document.getElementById('product-modal').style.display = 'none';
}

function playgame() {
    let historyCfg=window.localStorage.getItem('playhistory');
    let history=[];
    if(historyCfg!=null){
        history = JSON.parse(historyCfg);  
    }
    history.push(currentproduct);
    window.localStorage.setItem('playhistory',JSON.stringify(history));
    let app = {};
    app['width']=800;
    app['height']=600;
    app['name'] =  currentproduct['名字'];
    app['appid'] = currentproduct['id'];
    switch(currentproduct['分类']){
        case 'nes':
        case 'gb':
        case 'gba':
        case 'gbc':
        case 'n64':
        case 'psp':
            app['url'] = '/apps/emulator/?rom=' + currentproduct['地址'];
            break;
        case 'ons':
            app['url'] = '/apps/ons/?url=' + currentproduct['地址'];
            break;
    }
    
    app['title'] = currentproduct['名字'];
    app['image'] = currentproduct['封面'];
    app['public'] = false;
    app['openInNewWindow'] = false;
    app['canResizable'] = true;
    let msg = [];
    msg['event'] = 'rungame';
    msg['data'] = app;
    window.parent.postMessage(msg, '*');
    closeModal();
}
// 初始化显示所有商品
function initStore() {
    fetch(window.config.server+'/api/getGameList?page='+currentPage+'&count='+perPage+'&category=all').then(response => {
        // 检查响应状态是否为 200-299
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 将响应数据解析为 JSON 格式
        return response.json();
    }).then(data => {
            // 处理解析后的 JSON 数据
            // products = CSV.parse(CryptoJS.AES.decrypt(data, window.dataSecretKey).toString(CryptoJS.enc.Utf8)).slice(1);
            // let gameCount=products.length;
            let category=data.category;
            let categoryDOM=document.getElementById('categories');
            for(let i=0;i<category.length;i++){
                let categoryItem=document.createElement('li');
                categoryItem.innerText=category[i];
                categoryDOM.appendChild(categoryItem);
                categoryItem.addEventListener('click',function(){
                    showCategory(category[i]);
                });
            }
            let historyplay=document.createElement('li');
            historyplay.innerText='游玩记录';
            historyplay.addEventListener('click',function(){
                showPlayHistory();
            });
            categoryDOM.appendChild(historyplay);
            let gameCount=data.gamecount;
            const iframes = parent.document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                if (iframe.src.includes(window.location.href)) {
                    let winid=iframe.getAttribute('name');
                    let container= window.parent.document.getElementById(winid);
                    container.getElementsByClassName('title')[0].innerHTML+='（数量：'+gameCount+'）';
                    return;
                }
            });
            showCategory('all');
        })
        .catch(error => {
            // 处理请求过程中发生的错误
            console.error('Fetch error:', error);
        });
}
let content = document.getElementById('main-content');
content.addEventListener('scroll', () => {
    const clientHeight = content.clientHeight;
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight;
    if (clientHeight + scrollTop >= scrollHeight) {
        currentPage++;
        currentPage = Math.min(currentPage, allPageCount);
        fetch(window.config.server + '/api/getGameList?page=' + currentPage + '&count=' + perPage+'&category='+category).then(response => {
            // 检查响应状态是否为 200-299
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 将响应数据解析为 JSON 格式
            return response.json();
        }).then(data=>{
            if(currentPage!=1&&currentPage*perPage>renderProducts.length){
                renderProducts=renderProducts.concat(data.data);
            }
            displayProducts(renderProducts);
        });
    }
});
this.initStore();