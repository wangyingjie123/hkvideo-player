/* eslint-disable */
import Player from '../player';
let videopip = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    function onVideoPipBtnClick() {
        if (util.hasClass(root, 'hkplayer-is-videopip')) {
            player.exitVideoPip();
        } else {
            player.getVideoPip(root);
        }
    }
    player.on('videoPipBtnClick', onVideoPipBtnClick);

    function enterVideoPip() {
        let pictureInPictureElement = document.pictureInPictureElement;
        if (pictureInPictureElement && pictureInPictureElement === player.video) {
            util.addClass(root, 'hkplayer-is-videopip');
        } else {
            util.removeClass(root, 'hkplayer-is-videopip');
        }
    };

    ['enterpictureinpicture', 'leavepictureinpicture'].forEach(item => {
        player.video.addEventListener(item, enterVideoPip);
    });

    function onDestroy() {
        player.off('videoPipBtnClick', onVideoPipBtnClick);
        ['enterpictureinpicture', 'leavepictureinpicture'].forEach(item => {
            player.video.removeEventListener(item, enterVideoPip);
        });
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('videopip', videopip);