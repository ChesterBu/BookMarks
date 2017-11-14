//1.初始化数据
let hashA = init();
let keys = hashA.keys;
let hash = hashA.hash;
let main = document.getElementById("mainx");
//生成键盘
generateKeyboard(keys,hash);
//监听事件
listenToUser(hash);

function generateKeyboard(keys,hash) {
    for(let i=0;i<keys.length;i++){
        let div = tag('div');
        div.className = 'row';
        main.appendChild(div);
        let row = keys[i];
        for(let j = 0;j<row.length;j++){
            let span = createSpan(row[j]);
            let button = createButton(row[j]);
            let img = createImg(hash[row[j]]);
            let kbd = tag('kbd');
            kbd.className = 'key';
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);
            div.appendChild(kbd)
        }

    }
}

function tag(tagname) {
    return document.createElement(tagname);
}

function createSpan(textContent) {
    let span = tag('span');
    span.textContent = textContent;
    span.className = 'text';
    return span;
}

function createButton(id) {
    let button = tag('button');
    button.textContent = 'edit';
    button.id = id;
    button.onclick = function (e) {
        let button2 = e.target;
        let img2 = button2.previousSibling;
        let key = button2.id;
        let x = prompt('给我一个网址');
        if(x){
            hash[key] = x;
            img2.src = 'http://' + x +'/favicon.ico';
        }
        img2.onerror = function (ele) {
            ele.target.src ='//i.loli.net/2017/11/10/5a05afbc5e183.png';
        };
        localStorage.setItem('zzz', JSON.stringify(hash));

    };
    return button;
}

function createImg(domain) {
    let img = tag('img');
    if(domain){
        img.src = 'http://'+ domain + '/favicon.ico'
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function(xxx){
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    };
    return img;
}

function init() {
    let hash = {
        q:'qq.com',
        w:'weibo.com',
        e:'ele.me',
        r:'renren.com',
        t:'tianya.com',
        y:'youtube.com',
        u:'uc.com',
        i:'iqiyi.com',
        o:'opera.com',
        a:'acfun.com',
        s:'sohu.com'
    };

    let keys = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ];

    hash = JSON.parse(localStorage.getItem('zzz') || 'null') || hash;

    return{
        keys:keys,
        hash:hash
    }
}

function listenToUser(hash) {
    document.onkeypress = function (e) {
        let key = e.key;
        let website = hash[key];
        window.open('http://'+website, '_blank')
    }
}