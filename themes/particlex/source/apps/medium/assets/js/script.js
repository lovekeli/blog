// const mangaData = [
//     {
//         "name": "鬼刀",
//         "cover": "https://www.bing.com/th?id=OIP.Dgah6k9oAwFM_-CpBrM2NgHaD-&w=183&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//         "links": {
//             "哔哩哔哩漫画": "https://manga.bilibili.com/detail/mc29481"
//         },
//         "categories": "国漫",
//         "labels": ["奇幻"],
//         "author": "作者A",
//         "description": "xxxxx简介xxxxx简介xxxxx简介xxxxx简介xxxxx简介",
//         "rating": 4.9,
//         "lastUpdate": "2000-01-01",
//         "latestChapter": "更新至 第098话 虫王暴怒！",
//         "status": "连载"
//     }
// ];


let mediaData = [];

// 从 JSON 文件中获取数据并赋值给 MangaData 变量
function fetchMangaData(jsonPath) {
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应不是 OK');
      }
      return response.json();
    })
    .then(data => {
      mediaData = data;
      // 你可以在这里调用渲染函数
      renderMangaData();
    })
    .catch(error => {
      console.error('获取 JSON 文件时出错:', error);
    });
}

// 将json中的数据渲染到items-box里面
function renderMangaData() {

    const itemBox = document.querySelector('.manga-box');

    mediaData.forEach( manga => {
        // # 卡片大盒子 item-card
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card', 'col-sm-4', 'col-md-3', 'col-lg-2');

        // ## 卡片封面 a + img
        const posterLink = document.createElement('a');
        posterLink.href = Object.values(manga.links)[0];
        posterLink.classList.add('item-card-poster','manga-cover');
        posterLink.target = "_blank";

        const posterImage = document.createElement('img');
        posterImage.src = manga.cover;
        posterImage.alt = manga.name;

        posterLink.appendChild(posterImage);

        // ### 封面图片左下角小标签--多个
        const newTabs = document.createElement('div');
        newTabs.classList.add('tabs', 'cls');

        manga.labels.forEach(label => {
            const newTab = document.createElement('span');
            newTab.classList.add('tab', 'fl', 'text-truncate');
            newTab.textContent = label; // 使用当前的标签值
            
            newTabs.appendChild(newTab);
        });

        posterLink.appendChild(newTabs);

        

        // ## 卡片信息 a + div + h3 + small
        const infoLink = document.createElement('a');
        infoLink.href = Object.values(manga.links)[0];
        infoLink.classList.add('item-card-info');
        infoLink.target = "_blank";

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('item-card-title', 'text-truncate');

        const titleH3 = document.createElement('h3');
        titleH3.classList.add('text-truncate');
        titleH3.textContent = manga.name;

        titleDiv.appendChild(titleH3);

        const smallTags = document.createElement('small');
        smallTags.classList.add('tags', 'text-truncate');
        smallTags.textContent = "更新至 " + manga.latestChapter;

        infoLink.appendChild(titleDiv);
        infoLink.appendChild(smallTags);

        itemCard.appendChild(posterLink);
        itemCard.appendChild(infoLink);

        itemBox.appendChild(itemCard);

    });

}


// fetchMangaData('../../data/manga.json');

// 通过API获取B站视频的JSON数据：https://api.bilibili.com/x/web-interface/view?bvid=BV16z421B78Z
