/* eslint-disable */
import Player from '../player';
let s_time = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    const { diyDuration } = player.config;
    let container = util.createDom('hk-time',
        `<span class="hkplayer-time-current">${player.currentTime || util.format(0)}</span>
        <span>${util.format(diyDuration && diyDuration > player.duration ? diyDuration : player.duration)}</span>`, {}, 'hkplayer-time');
    player.once('ready', () => {
        player.controls.appendChild(container);
    });
    let onTimeChange = function () {
        if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
            // bca-disable-line
            container.innerHTML = `<span class="hkplayer-time-current">${util.format(player.currentTime || 0)}</span>
            <span>${util.format(diyDuration && diyDuration > player.duration ? diyDuration : player.duration)}</span>`;
        }
    }
    player.on('durationchange', onTimeChange);
    player.on('timeupdate', onTimeChange);

    function onDestroy() {
        player.off('durationchange', onTimeChange);
        player.off('timeupdate', onTimeChange);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('s_time', s_time)
