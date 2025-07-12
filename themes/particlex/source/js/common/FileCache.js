class FileCache {
    constructor(dbName = 'FileCacheDB', storeName = 'files') {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    // 初始化数据库
    initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    // 创建存储对象，以URL为键
                    this.db.createObjectStore(this.storeName, { keyPath: 'url' });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('IndexedDB初始化失败:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // 从缓存获取文件
    getFromCache(url) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(url);

            request.onsuccess = () => {
                resolve(request.result ? request.result.data : null);
            };

            request.onerror = () => {
                console.error('获取缓存失败:', request.error);
                reject(request.error);
            };
        });
    }

    // 保存文件到缓存
    saveToCache(url, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({
                url,
                data,
                timestamp: Date.now() // 记录缓存时间，可用于过期清理
            });

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                console.error('保存缓存失败:', request.error);
                reject(request.error);
            };
        });
    }

    // 核心方法：获取文件（优先缓存）
    async getFile(url) {
        // 先检查缓存
        const cachedData = await this.getFromCache(url);
        if (cachedData) {
            console.log(`从缓存获取: ${url}`);
            return cachedData;
        }

        // 缓存不存在则下载
        console.log(`开始下载: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`下载失败: ${response.statusText}`);
        }

        // 获取ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // 保存到缓存
        await this.saveToCache(url, arrayBuffer);
        console.log(`已缓存: ${url}`);

        return arrayBuffer;
    }

    // 可选：清理过期缓存
    clearExpiredCache(expireTime = 7 * 24 * 60 * 60 * 1000) { // 默认7天过期
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const now = Date.now();
            let deletedCount = 0;

            store.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (now - cursor.value.timestamp > expireTime) {
                        store.delete(cursor.key);
                        deletedCount++;
                    }
                    cursor.continue();
                } else {
                    console.log(`清理了${deletedCount}个过期缓存`);
                    resolve(deletedCount);
                }
            };
        });
    }
    close() {
        if(this.db){
            this.db.close();
            this.db=null;
        }
      
    }
}