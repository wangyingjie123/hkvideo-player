/* eslint-disable */
import Player from '../player';
let cssFullscreen = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    function onCssFullscreenBtnClick() {
        if (util.hasClass(root, 'hkplayer-is-cssfullscreen')) {
            player.exitCssFullscreen();
            util.removeClass(document.body, 'overhidden');
        } else {
            player.getCssFullscreen();
            util.addClass(document.body, 'overhidden');
        }
    }
    player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);

    function onDestroy() {
        player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy)
}

Player.install('cssFullscreen', cssFullscreen)
