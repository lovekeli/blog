window.addEventListener('load', function () {
    let btnSearch = document.getElementById('btnSearch');
    let inputSearch = document.getElementById('inputSearch');
    btnSearch.addEventListener('click',  ()=>{
        if(inputSearch.value=='')return;
        fetch(window.config.server + '/api/videos?pg=1&wd='+inputSearch.value, {
            method: 'Get',
        }).then(res => res.json()).then(data => {
            if (data.code == 200) {
                console.log(data);
            }
        });
    });
});