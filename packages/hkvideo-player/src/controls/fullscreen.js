/* eslint-disable */
import Player from '../player';
let fullscreen = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    function onFullscreenBtnClick() {
        if (player.config.rotateFullscreen) {
            if (util.hasClass(root, 'hkplayer-rotate-fullscreen')) {
                player.exitRotateFullscreen();
            } else {
                player.getRotateFullscreen();
            }
        } else {
            if (util.hasClass(root, 'hkplayer-is-fullscreen')) {
                player.exitFullscreen(root);
            } else {
                player.getFullscreen(root);
            }
        }
        // 去掉css全屏给body加的overflow
        util.hasClass(document.body, 'overhidden') && util.removeClass(document.body, 'overhidden');
    }
    player.on('fullscreenBtnClick', onFullscreenBtnClick);

    function onFullscreenChange() {
        let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        if (fullscreenEl && fullscreenEl === root) {
            player.emit('requestFullscreen');
        } else {
            player.emit('exitFullscreen');
        }
        if (player.danmu && typeof player.danmu.resize === 'function') {
            player.danmu.resize();
        }
    };
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
        document.addEventListener(item, onFullscreenChange);
    })

    function onDestroy() {
        player.off('fullscreenBtnClick', onFullscreenBtnClick);
        ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
            document.removeEventListener(item, onFullscreenChange);
        })
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('fullscreen', fullscreen);
