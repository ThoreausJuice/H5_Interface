window.onload = function () {
    var url = "202101.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            var json_data = JSON.parse(request.responseText);

            // html_write(json_data)
            html_pagination(json_data)
        }
    }
}

function html_write(json_data) {
    var html_thead = '';
    var html_tbody = '';

    html_thead += '<tr>';
    for (var key in json_data[0]) {
        html_thead += '<th>' + key + '</th><th>';
    }
    html_thead += '</tr>';

    for (var i = 0; i < json_data.length; i++) {
        html_tbody += '<tr>';
        for (var obj in json_data[0]) {
            html_tbody += '<td>' + json_data[i][obj] + '</td><td>';
        }
        html_tbody += '</tr>';
    }

    var my_thead = document.getElementById('html_thead').innerHTML = html_thead
    var my_tbody = document.getElementById('html_tbody').innerHTML = html_tbody
}

function html_pagination(json_data) {
    let newMain = document.querySelector('html_tbody');//新闻容器
    let pagination = document.querySelector('#pagination1');//分页容器
    let The_number_displayed = 50
    let pageCount = Math.ceil(json_data.length / The_number_displayed); //根据数据的长度计算总共几页
    let json_dataRender = [];//每页要显示的数据
    let p = 1;//根据p值显示每页的数据

    // 表头
    var html_thead = '';
    html_thead += '<tr>';
    for (var key in json_data[0]) {
        html_thead += '<th>' + key + '</th><th>';
    }
    html_thead += '</tr>';
    var my_thead = document.getElementById('html_thead').innerHTML = html_thead

    // 表身
    let render = () => {
    var html_tbody = '';
    json_data_Render = json_data.slice((p - 1) * The_number_displayed, The_number_displayed * p); //每页要显示的数据,一页显示5条
    for (var i = 0; i < json_data_Render.length; i++) {
        html_tbody += '<tr>';
        for (var obj in json_data_Render[0]) {
            html_tbody += '<td>' + json_data_Render[i][obj] + '</td><td>';
        }
        html_tbody += '</tr>';
    }
    var my_tbody = document.getElementById('html_tbody').innerHTML = html_tbody
    };

    // 初始化页面
    render();

    // 渲染分页
    for (let i = 1; i <= pageCount; i++) {
        pagination.innerHTML += `
        <a>
        ${i}
        </a>`;
    }

    let asAll = pagination.querySelectorAll('a');
    //页面刚进来时第一页高亮
    asAll[p - 1].classList.add('active');
    //遍历总页数
    asAll.forEach((item, index) => {
        //点击页数
        item.onclick = function () {
            for (let j = 0; j < asAll.length; j++) {
                asAll[j].classList.remove('active');
            }
            this.classList.add('active');
            p = index + 1; //点击页数，改变p的值，以改变这个页面要显示的数据，达到分页的效果
            render(); //重新渲染页面
        }
    });
    //点击上一页下一页，改变高亮
    let changePageClass = () => {
        for (let j = 0; j < asAll.length; j++) {
            asAll[j].classList.remove('active');
        }
        asAll[p - 1].classList.add('active');
    };
    //上一页
    let prev = document.querySelector('#prev');
    prev.onclick = function (e) {
        if (p <= 1) {
            console.log(p);
            return;
        } else {
            p = p - 1;
            changePageClass();
            render();
        }
    };
    //下一页
    let next = document.querySelector('#next');
    next.onclick = function () {
        if (p >= asAll.length) {
            return;
        }
        p = p + 1;
        changePageClass();
        render();
    }
}


