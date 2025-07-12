//音乐加载模块
var musicList=[];
let searchTable={};
searchTable.name="搜索结果";
searchTable.cover='';
searchTable.item=[];
searchTable.creatorName="";
searchTable.creatorAvatar="";
musicList.push(searchTable);
let playingTable={};
playingTable.name="正在播放";
playingTable.cover='';
playingTable.item=[];
playingTable.creatorName="";
playingTable.creatorAvatar="";
musicList.push(playingTable);
let historyTable={};
historyTable.name="播放历史";
historyTable.cover='';
historyTable.item=[];
historyTable.creatorName="";
historyTable.creatorAvatar="";
musicList.push(historyTable);
let tableList=[];
function IsExistTable(tableName){
    for(let i=0;i<tableList.length;i++){
        if(tableList[i].name==tableName)
        {
            return true;
        }
    }
    return false;
}
fetch('./musiclist.txt').then(response => response.text()).then((data)=>{
    let tempData = CSV.parse(CryptoJS.AES.decrypt(data, dataSecretKey).toString(CryptoJS.enc.Utf8)).slice(1);
    let allMusicList=[];
    for (let i = 0; i < tempData.length; i++) {
        let music = tempData[i];
        let musicItem = {};
        musicItem.id = music[0];
        musicItem.name = music[1];
        musicItem.artist = music[2];
        musicItem.album = music[3];
        musicItem.source = music[4];
        musicItem.url_id = music[5];
        musicItem.pic_id = music[6];
        musicItem.lyric_id = music[7];
        musicItem.lyric_url = music[8];
        musicItem.pic = music[9];
        musicItem.url = music[10];
        musicItem.table = music[11];
        if(!IsExistTable(musicItem.table)){
            let table={};
            table.name=musicItem.table;
            table.cover='';
            table.item=[];
            table.creatorName="";
            table.creatorAvatar="";
            tableList.push(table);
        }
        allMusicList.push(musicItem);
    }
    for(let i=0;i<tableList.length;i++){
        for(let j=0;j<allMusicList.length;j++){
            if(tableList[i].name==allMusicList[j].table){
                tableList[i].item.push(allMusicList[j]);
            }
        }
    }
    musicList=musicList.concat(tableList);

    //加载模块
    let player=document.createElement("script");
    player.src="./js/player.js";
    document.body.appendChild(player);

    let uiFunc=document.createElement("script");
    uiFunc.src="./js/functions.js";
    document.body.appendChild(uiFunc);
  
    let dataLoad=document.createElement("script");
    dataLoad.src="./js/ajax.js";
    document.body.appendChild(dataLoad);
});

