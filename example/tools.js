/* eslint-disable */
function ajax(url, responseType, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.responseType = responseType; // "text"-字符串， "blob"-Blob对象， "arraybuffer"-ArrayBuffer对象
    xhr.onload = function () {
        cb(xhr.response);
    };
    xhr.send();
}
function createDom(el = 'div', tpl = '', attrs = {}, cname = '') {
    let dom = document.createElement(el);
    dom.className = cname;
    dom.innerHTML = tpl;
    Object.keys(attrs).forEach(item => {
        let key = item;
        let value = attrs[item];
        if (el === 'video' || el === 'audio') {
            if (value) {
                dom.setAttribute(key, value);
            }
        } else {
            dom.setAttribute(key, value);
        }
    })
    return dom;
}
function sendDanmu(player) {
    const inputs = document.querySelector('#input');
    if (!inputs.value) {
        alert('弹幕内容不能为空');
        return;
    }
    if (!player.danmu) {
        alert('弹幕容器还未初始化');
        return;
    }
    player.danmu.sendComment({
        duration: 10000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
        realTime: true, // 提前插入该弹幕
        // prior: true,
        id: Math.random() + '', // 弹幕id，需唯一
        color: false, // 该条弹幕为彩色弹幕，默认false
        // txt: document.querySelector('#input').value, // 弹幕文字内容和el参数冲突
        // style: {  // 弹幕自定义样式
        //     color: 'rgb(251, 240, 118)',
        //     transform: 'translate3d(948px, 0px, 1px)',
        //     backgroundImage: 'linear-gradient(to right, rgb(255, 83, 253) 0px, rgb(251, 240, 118) 100%)',
        //     '-webkit-text-fill-color': 'transparent',
        //     'background-repeat': 'repeat',
        //     'background-clip': 'text',
        //     fontSize: '20px',
        //     borderRadius: '50px',
        //     padding: '5px 11px',
        // },
        el: createDom('div', `<p class="danmuel-text">${document.querySelector('#input').value}</p>`, {}, 'danmuel')
    })
    inputs.value = '';
}
// 初始化弹幕
function initDanmu(player) {
    player.once('canplay', () => {
        let i = 0;
        setInterval(() => {
            i++;
            player.danmu.sendComment({
                duration: 10000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                // realTime: true,
                // prior: true,
                id: i + '1', //弹幕id，需唯一
                color: true, //该条弹幕为彩色弹幕，默认false
                txt: `长弹幕长弹幕长弹幕长--第${i + 1}条弹幕`, //弹幕文字内容
                style: {  //弹幕自定义样式
                    color: '#ff9500',
                    fontSize: '20px',
                    border: 'solid 1px #ff9500',
                    borderRadius: '50px',
                    padding: '5px 11px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
            })
        }, 500);
        player.danmu.on('bullet_hover', (res) => {
            console.log(res);
            res.bullet.pauseMove(res.bullet.elPos);
        });
    });
}
// 清晰度切换
function setDefin(player) {
    player.emit('resourceReady', [
        {
            name: '标清',
            url: 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
        },
        {
            name: '高清',
            url: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/461b1dc0-c2e5-4bce-9c58-5ffea8f26c27.mp4'
        },
        {
            name: '超清',
            url: 'https://s3.bytecdn.cn/ies/fe_app_new/musics/tvc-v3.d84159ab.mp4'
        }
    ]);
}
const danmu = {
    comments: [
        {
            duration: 10000,
            id: '1',
            start: 3000,
            txt: '长弹幕长弹幕长弹幕长弹幕长弹幕',
            style: {  //弹幕自定义样式
                color: '#ff9500',
                fontSize: '20px',
                border: 'solid 1px #ff9500',
                borderRadius: '50px',
                padding: '5px 11px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
        }
    ],
    area: {  // 弹幕显示区域
        start: 0, // 区域顶部到播放器顶部所占播放器高度的比例
        end: 0.8 // 区域底部到播放器顶部所占播放器高度的比例
    },
    panel: true, // 弹幕设置面板
    mouseControl: true, // 戍边控制
    mouseControlPause: true, // 鼠标移入暂停
    closeDefaultBtn: false, // 关闭播放器提供的默认开关
    defaultOff: false // 开启此项后弹幕不会初始化，默认初始化弹幕
}
function initThumbnail (thumbnail) {
    thumbnail.on('file', function(file) {
        console.log('Read video successfully: ' + file.name);
    });
    
    thumbnail.on('video', function(video) {
        console.log('Video size: ' + video.videoWidth + ' x ' + video.videoHeight);
        console.log('Video duration: ' + video.duration + 's');
        // thumbnail.start();
    });
    
    thumbnail.on('canvas', function(canvas) {
        console.log('Build canvas successfully');
        console.log('Canvas size: ' + canvas.width + ' x ' + canvas.height);
        console.log('Preview density: ' + thumbnail.density + ' p/s');
    });
    
    thumbnail.on('update', function(url, percentage) {
        console.log('Processing: ' + Math.floor(percentage.toFixed(2) * 100) + '%');
        const app = document.querySelector('#app');
        app.style.backgroundImage = 'url(' + url + ')';
    });
    
    thumbnail.on('download', function(name) {
        console.log('Start download preview: ' + name);
    });
    thumbnail.on('done', function() {
        thumbnail.download();
        console.log('Build preview image complete');
    });
}
export {
    ajax, sendDanmu, createDom, initDanmu, setDefin, danmu, initThumbnail
}