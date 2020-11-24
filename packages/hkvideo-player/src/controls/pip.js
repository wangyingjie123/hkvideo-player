/* eslint-disable */
import Player from '../player';
let pip = function () {
    let player = this;
    let util = Player.util;
    let root = player.root;

    function onPipBtnClick(pipswitch) {
        const pipFlag = localStorage.getItem('pipFlag');
        if (!pipFlag) {
            localStorage.setItem('pipFlag', 1);
            return;
        }
        if (pipFlag === '1') {
            util.removeClass(pipswitch, 'hkplayer-switch-active');
            localStorage.setItem('pipFlag', 0);
        } else {
            util.addClass(pipswitch, 'hkplayer-switch-active');
            localStorage.setItem('pipFlag', 1);
        }
    }
    player.on('pipBtnClick', onPipBtnClick);

    function onDestroy() {
        player.off('pipBtnClick', onPipBtnClick);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('pip', pip);
