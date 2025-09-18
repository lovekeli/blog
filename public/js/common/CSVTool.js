const CSV = {
    parse(str) {
        const arr = [];
        const lines = str.replace(/\r/g, "").split("\n").filter(line => line.trim() !== ""); // 去除 \r 并过滤空行
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let fields = line.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/); // 处理引号包裹的字段
            arr.push(fields.map(field => field.replace(/^"|"$/g, ""))); // 去除引号
        }
        return arr;
    },
    stringify(arr) {
        return arr.map(row => row.map(field => `"${field}"`).join(",")).join("\n");
    },
    loadCSV(url,callBack){
        fetch(url).catch(error => {
            console.error("Error loading CSV:", error);
        }).then(data=>{
            return data.text();
        }).then(data=>{
            callBack(this.parse(data));
        });
    },
    parseFromJson(json) {

    },
    Log(){
        console.log('csv');
    }
};