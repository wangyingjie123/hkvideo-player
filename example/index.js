/* eslint-disable */
import { ajax, sendDanmu, initDanmu, danmu, setDefin, initThumbnail } from './tools.js';
const HkplayerThumbnail = window.thumbnail;
const Player = window.Player;
// let player = new Player({
//         id: 'app',
//         cssFullscreen: true,
//         fluid: true, // 流式布局
//         ignores: ['replay'], // 禁止某个插件执行
//         // danmu, // 弹幕选项
//         screenShot: true, // 屏幕截图--有跨域限制，url需要是本地blob地址
//         playbackRate: [0.75, 1, 1.5, 2], // 倍速播放
//         videopip: true, // 原生画中画
//         pip: true,
//         pipConfig: { // 小窗大小及位置
//             width: 580,
//             height: 326.25,
//             // left: 120,
//             // top: 80,
//             // bottom: 100,
//             // right: 100,
//             prevPos: true
//         },
//         playNext: {
//             urlList: [
//                 'https://s3.bytecdn.cn/ies/fe_app_new/musics/tvc-v3.d84159ab.mp4',
//                 {
//                     url: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/461b1dc0-c2e5-4bce-9c58-5ffea8f26c27.mp4',
//                     img: 'https://p3-xg.byteimg.com/img/tos-cn-i-0000/4b14415a387a4e348b585d632d5be45a~tplv-crop-center:336:188.webp',
//                     title: '细纹退散，38岁拥有迷人星星眼，最全眼部保养干货',
//                     duration: '03:40'
//                 }
//             ],
//             // playNextFun: () => window.location.reload()
//         },
//         autoplay: true,
//         // closeFocusVideoFocus: true,
//         // diyDuration: 300, // 自定义时长
//         // enterLogo: 'xxx',
//         // url: src,
//         url: 'https://s3.bytecdn.cn/ies/fe_app_new/musics/tvc-v3.d84159ab.mp4',
//         // url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
//         // isLive: true
// });
// initDanmu(player); // 弹幕初始化
// setDefin(player); // 设置清晰度
const thumbnail = new HkplayerThumbnail({
    fileInput: document.querySelector('#input'),
    delay: 300, // 延迟
    number: 60, // 数量
    width: 160, // 宽度
    height: 90, // 高度
    column: 10, // 列数
});
initThumbnail(thumbnail);
document.querySelector('#sendDanmu').onclick = () => {
    // sendDanmu(player);
    thumbnail.start();
};
document.querySelector('#button').onclick = function () {
    player.getPIP();
    // player.getCssFullscreen();
}
// 滚动出现小窗
let getpiped = false;
const pip = () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (windowScroll > 600) {
        if (getpiped) return;
        player.getPIP();
        getpiped = true;
    } else {
        if (!getpiped) return;
        player.exitPIP();
        getpiped = false;
    }
};
// window.addEventListener('scroll', pip);
// window.scrollTo(0, 601);