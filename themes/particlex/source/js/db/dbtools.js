let dbName = "";
let dbVersion = 1;
let db = null;
function initDB(dbName, version) {
    this.dbName = dbName;
    this.version = version;
}
function open(objectStores = []) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = (event) => {
            reject(new Error(`无法打开数据库: ${event.target.error}`));
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
            resolve(this.db);
        };

        // 数据库升级时触发，用于创建或修改对象存储空间
        request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            objectStores.forEach(store => {
                if (!this.db.objectStoreNames.contains(store.name)) {
                    const objectStore = this.db.createObjectStore(store.name, {
                        keyPath: store.keyPath || 'id',
                        autoIncrement: store.autoIncrement || false
                    });
                    // 创建索引
                    if (store.indexes) {
                        store.indexes.forEach(index => {
                            objectStore.createIndex(index.name, index.key, index.options || {});
                        });
                    }
                }
            });
        };
    });
}

// 添加数据
function add(storeName, data) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject(new Error('数据库未连接'));
            return;
        }

        const transaction = this.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(data);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(new Error(`添加数据失败: ${event.target.error}`));
        };
    });
}
// 获取数据
function get(storeName, key) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject(new Error('数据库未连接'));
            return;
        }

        const transaction = this.db.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(new Error(`获取数据失败: ${event.target.error}`));
        };
    });
}

// 更新数据
function put(storeName, data) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject(new Error('数据库未连接'));
            return;
        }

        const transaction = this.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(data);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(new Error(`更新数据失败: ${event.target.error}`));
        };
    });
}

// 删除数据
function deleteDB(storeName, key) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject(new Error('数据库未连接'));
            return;
        }

        const transaction = this.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(key);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(new Error(`删除数据失败: ${event.target.error}`));
        };
    });
}

// 获取所有数据
function getAll(storeName) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject(new Error('数据库未连接'));
            return;
        }

        const transaction = this.db.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(new Error(`获取所有数据失败: ${event.target.error}`));
        };
    });
}

// 关闭数据库连接
function close() {
    if (this.db) {
        this.db.close();
        this.db = null;
    }
}
// 删除数据库
function deleteDatabase() {
    return new Promise((resolve, reject) => {
        this.close(); // 先关闭已打开的数据库连接
        const request = indexedDB.deleteDatabase(this.dbName);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(new Error(`删除数据库失败: ${event.target.error}`));
        };
    });
}