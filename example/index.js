import { ajax, sendDanmu, initDanmu, danmu, setDefin } from './tools.js';
const Player = window.Player;
ajax('./haokan.mp4', 'blob', function(res){
    const src = URL.createObjectURL(res);
    let player = new Player({
        id: 'app',
        // diyDuration: 300, // 自定义时长
        cssFullscreen: true,
        fluid: true, // 流式布局
        ignores: ['replay'], // 禁止某个插件执行
        // danmu, // 弹幕选项
        screenShot: true, // 屏幕截图--有跨域限制，url需要是本地blob地址
        playbackRate: [0.75, 1, 1.5, 2], // 倍速播放
        videopip: true, // 原生画中画
        // pipConfig: { // 小窗大小及位置
            // width: 580,
            // height: 326.25,
            // left: 120,
            // top: 80,
            // bottom: 100,
            // right: 100 
        // },
        // enterLogo: 'https://pic.rmb.bdstatic.com/baidu-rmb-video-cover-1/2019-10/1571972106218/c91ded088044.png',
        // url: 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
        url: src
    });
});

// initDanmu(player);
document.querySelector('#sendDanmu').onclick = () => {
    sendDanmu(player);
};
document.querySelector('#button').onclick = function () {
    player.getPIP();
}
