document.addEventListener('DOMContentLoaded', () => {
    const appGrid = document.getElementById('app-grid');
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.getElementById('category-buttons');
    const pagination = document.getElementById('pagination');
    const appsPerPage = 12;
    let currentPage = 1;
    let filteredApps = [];
    let totalPages = 0;

    fetch(window.config.server+'/api/getAppStore')
        .then(response => response.json())
        .then(data => {
            let apps=data.data;
            filteredApps =apps;
            renderApps(data.data);
            setupPagination(data.data);
            setupCategoryButtons(data.data);

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                filteredApps = apps.filter(app => (app['名字'].toLowerCase().includes(searchTerm)||app['描述'].toLowerCase().includes(searchTerm)));
                currentPage = 1;
                renderApps(filteredApps);
                setupPagination(filteredApps);
            });

            categoryButtons.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    const selectedCategory = event.target.dataset.category;
                    if (selectedCategory === 'all') {
                        filteredApps = apps;
                    } else {
                        filteredApps = apps.filter(app => app['分类'] === selectedCategory);
                    }
                    currentPage = 1;
                    renderApps(filteredApps);
                    setupPagination(filteredApps);
                    activateCategoryButton(event.target);
                }
            });

            pagination.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    const textContent = event.target.textContent;
                    if (textContent === '上一页') {
                        if (currentPage > 1) {
                            currentPage--;
                            renderApps(filteredApps);
                            setupPagination(filteredApps);
                        }
                    } else if (textContent === '下一页') {
                        if (currentPage < totalPages) {
                            currentPage++;
                            renderApps(filteredApps);
                            setupPagination(filteredApps);
                        }
                    } else if (textContent === '...') {
                        toggleEllipsis();
                    } else {
                        currentPage = parseInt(textContent);
                        renderApps(filteredApps);
                        setupPagination(filteredApps);
                    }
                }
            });
        })
        .catch(error => console.error('加载应用数据失败:', error));
    
    function installApp(appid) {
        for (let i = 0; i < filteredApps.length; i++) {
            if(filteredApps[i]['应用id']==appid){
                let msg = [];
                msg['event'] = 'installApp';
                let app = {};
                app['appid']=filteredApps[i]['应用id'];
                app['name']=filteredApps[i]['名字'];
                app['title']=filteredApps[i]['标题'];
                app['ico']=filteredApps[i]['图标'];
                app['image']=filteredApps[i]['封面'];
                app['url']=filteredApps[i]['地址'];
                app['description']=filteredApps[i]['描述'];
                app['category']=filteredApps[i]['分类'];
                app['public']=filteredApps[i]['是否公开']=="false"?false:true;
                app['openMode']=filteredApps[i]['打开方式'];
                app['canResizable']=filteredApps[i]['是否可调窗口']=="false"?false:true;
                app['width']=filteredApps[i]['宽度'];
                app['height']=filteredApps[i]['高度'];
                msg['data'] = app;
                window.parent.postMessage(msg, '*');
            }
        }
    }
    function onInstallApp() {
        let appid=this.parentNode.getAttribute('data-appid');
        this.innerHTML = '已安装';
        this.removeEventListener('click', this.onInstallApp);
        installApp(appid);
    }
    function renderApps(apps) {
        appGrid.innerHTML = '';
        const start = (currentPage - 1) * appsPerPage;
        const end = start + appsPerPage;
        const paginatedApps = apps.slice(start, end);
        paginatedApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.setAttribute('data-appid',app['应用id']);
            appCard.innerHTML = `
                <img src="${app['图标']}" alt="${app['名字']}">
                <div class="app-details">
                    <h2>${app['名字']}</h2>
                    <span>${app['描述']}</span>
                </div>`+ '<button>安装</button>';
            appGrid.appendChild(appCard);
        });
        let installBtns = document.getElementsByClassName('app-card');
        for (let i = 0; i < installBtns.length; i++) {
            let btn = installBtns[i].getElementsByTagName('button')[0];
            // if (window.parent.IsInstalled(installBtns[i].dataset.appid)) {
            //     btn.innerHTML = '已安装';
            // } else {
            //     btn.innerHTML = '安装';
            //     btn.addEventListener('click', onInstallApp.bind(btn));
            // }
            btn.innerHTML = '安装';
            btn.addEventListener('click', onInstallApp.bind(btn));
        }
    }
    function setupPagination(apps) {
        pagination.innerHTML = '';
        totalPages = Math.ceil(apps.length / appsPerPage);

        // 添加“上一页”按钮
        const prevButton = document.createElement('button');
        prevButton.textContent = '上一页';
        if (currentPage === 1) {
            prevButton.classList.add('disabled');
        }
        pagination.appendChild(prevButton);

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                createPageButton(i);
            }
        } else {
            createPageButton(1);
            if (currentPage > 3) {
                createEllipsisButton();
            }
            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);
            for (let i = start; i <= end; i++) {
                createPageButton(i);
            }
            if (currentPage < totalPages - 2) {
                createEllipsisButton();
            }
            createPageButton(totalPages);
        }

        // 添加“下一页”按钮
        const nextButton = document.createElement('button');
        nextButton.textContent = '下一页';
        if (currentPage === totalPages) {
            nextButton.classList.add('disabled');
        }
        pagination.appendChild(nextButton);

        activatePageButton(currentPage);
    }

    function createPageButton(pageNumber) {
        const button = document.createElement('button');
        button.textContent = pageNumber;
        if (pageNumber === currentPage) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }

    function createEllipsisButton() {
        const button = document.createElement('button');
        button.textContent = '...';
        button.className = 'ellipsis';
        pagination.appendChild(button);
    }

    function activatePageButton(pageNumber) {
        const buttons = pagination.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent === pageNumber.toString()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function activateCategoryButton(button) {
        const buttons = categoryButtons.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    function toggleEllipsis() {
        const ellipsisButtons = pagination.querySelectorAll('.ellipsis');
        ellipsisButtons.forEach(ellipsis => {
            if (ellipsis.textContent === '...') {
                ellipsis.textContent = '展开';
                ellipsis.style.opacity = 1;
                ellipsis.style.pointerEvents = 'auto';
            } else {
                ellipsis.textContent = '...';
                ellipsis.style.opacity = 0.6;
                ellipsis.style.pointerEvents = 'none';
            }
        });

        if (ellipsisButtons.length > 0) {
            const expanded = ellipsisButtons[0].textContent === '展开';
            if (expanded) {
                pagination.innerHTML = '';
                const prevButton = document.createElement('button');
                prevButton.textContent = '上一页';
                if (currentPage === 1) {
                    prevButton.classList.add('disabled');
                }
                pagination.appendChild(prevButton);

                for (let i = 1; i <= totalPages; i++) {
                    createPageButton(i);
                }

                const nextButton = document.createElement('button');
                nextButton.textContent = '下一页';
                if (currentPage === totalPages) {
                    nextButton.classList.add('disabled');
                }
                pagination.appendChild(nextButton);

                activatePageButton(currentPage);
            } else {
                setupPagination(filteredApps);
            }
        }
    }

    function setupCategoryButtons(apps) {
        categoryButtons.innerHTML = '';

        // 添加“全部”按钮
        const allButton = document.createElement('button');
        allButton.textContent = '全部';
        allButton.dataset.category = 'all';
        allButton.classList.add('active');
        categoryButtons.appendChild(allButton);

        // 添加其他分类按钮
        const categories = new Set(apps.map(app => app['分类']));
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.category = category;
            categoryButtons.appendChild(button);
        });
    }

});

