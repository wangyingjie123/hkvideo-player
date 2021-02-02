/* eslint-disable */
import Player from '../player';
let fullscreen = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    function onFullscreenBtnClick() {
        if (util.hasClass(root, 'hkplayer-is-fullscreen')) {
            player.exitFullscreen(root);
        } else {
            player.getFullscreen(root);
        }
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
