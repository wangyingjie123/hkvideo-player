import { ajax, sendDanmu, initDanmu, danmu, setDefin } from './tools.js';
const Player = window.Player;
let player;
// ajax('./demo.mp4', 'blob', function(res){
//     const src = URL.createObjectURL(res);
    player = new Player({
        id: 'app',
        cssFullscreen: true,
        fluid: true, // 流式布局
        ignores: ['replay'], // 禁止某个插件执行
        // danmu, // 弹幕选项
        screenShot: true, // 屏幕截图--有跨域限制，url需要是本地blob地址
        playbackRate: [0.75, 1, 1.5, 2], // 倍速播放
        videopip: true, // 原生画中画
        pipConfig: { // 小窗大小及位置
            width: 580,
            height: 326.25,
            // left: 120,
            // top: 80,
            // bottom: 100,
            // right: 100,
            prevPos: true
        },
        playNext: {
            urlList: [
                'https://s3.bytecdn.cn/ies/fe_app_new/musics/tvc-v3.d84159ab.mp4',
                {
                    url: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/461b1dc0-c2e5-4bce-9c58-5ffea8f26c27.mp4',
                    img: 'https://p3-xg.byteimg.com/img/tos-cn-i-0000/4b14415a387a4e348b585d632d5be45a~tplv-crop-center:336:188.webp',
                    title: '细纹退散，38岁拥有迷人星星眼，最全眼部保养干货',
                    duration: '03:40'
                }
            ],
            // playNextFun: () => window.location.reload()
        },
        // closeFocusVideoFocus: true,
        // diyDuration: 300, // 自定义时长
        // enterLogo: 'https://pic.rmb.bdstatic.com/baidu-rmb-video-cover-1/2019-10/1571972106218/c91ded088044.png',
        // url: 'https://storage.googleapis.com/media-session/caminandes/short.mp4'
        url: 'https://haokanupdate.cdn.bcebos.com/hk-intro-video.mp4'
    });
// });

// initDanmu(player); // 弹幕初始化
// setDefin(player); // 设置清晰度
document.querySelector('#sendDanmu').onclick = () => {
    sendDanmu(player);
};
document.querySelector('#button').onclick = function () {
    player.getPIP();
}
// let getpiped = false;
// const pip = () => {
//     const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
//     if (windowScroll > 600) {
//         if (getpiped) return;
//         player.getPIP();
//         getpiped = true;
//     } else {
//         if (!getpiped) return;
//         player.exitPIP();
//         getpiped = false;
//     }
// };
// window.addEventListener('scroll', pip);
// window.scrollTo(0, 601);