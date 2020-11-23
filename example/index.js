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
        // closeFocusVideoFocus: true,
        // diyDuration: 300, // 自定义时长
        // enterLogo: 'xxx',
        url: 'https://haokanupdate.cdn.bcebos.com/hk-intro-video.mp4',
        // url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
        // isLive: true
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