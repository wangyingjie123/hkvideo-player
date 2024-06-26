/* eslint-disable */
import Player from '../player';
let playNext = function () {
    let player = this;
    let nextBtn = player.config.playNext;
    player.currentVideoIndex = -1;

    function onPlayNextBtnClick() {
        if (player.currentVideoIndex + 1 < nextBtn.urlList.length) {
            player.currentVideoIndex++;
            player.video.autoplay = true;
            const nextSrc = nextBtn.urlList[player.currentVideoIndex];
            player.src = typeof nextSrc === 'string' ? nextSrc : nextSrc.url;
            player.emit('playerNext', nextBtn.urlList[player.currentVideoIndex + 1]);
            if (player.currentVideoIndex + 1 === nextBtn.urlList.length) {
                player.emit('urlListEnd');
            }
        }
    }
    player.on('playNextBtnClick', onPlayNextBtnClick);

    function onDestroy() {
        player.off('playNextBtnClick', onPlayNextBtnClick);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('playNext', playNext);