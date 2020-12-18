/* eslint-disable */
import Player from '../player';
let play = function () {
    let player = this;
    let util = Player.util;
    let root = player.root;
    function onPlayBtnClick(e) {
        // if (!player.config.allowPlayAfterEnded && player.ended) {
        //     return
        // }
        if (player.paused) {
            if (player.config.isLive) {
                util.addClass(root, 'hkplayer-is-enter');
                player.src = player.config.url;
                return;
            }
            let playPromise = player.play();
            if (playPromise !== undefined && playPromise) {
                playPromise.catch(err => {});
            }
        } else {
            player.pause();
        }
    }
    player.on('playBtnClick', onPlayBtnClick);

    function onDestroy() {
        player.off('playBtnClick', onPlayBtnClick);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('play', play);
