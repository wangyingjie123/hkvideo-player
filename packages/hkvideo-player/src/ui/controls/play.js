/* eslint-disable */
import Player from '../../player';
import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import ReplayIcon from '../assets/replaysmall.svg';
let s_play = function () {
    let player = this;
    let util = Player.util;
    let playBtn = player.config.playBtn ? player.config.playBtn : {};
    let btn, iconPlay, iconPause;
    if (playBtn.type === 'img') {
        btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
    } else {
        const replayIcon = player.config.ignores.indexOf('replay') > -1 ?
        `<div class="hkplayer-icon-replay">${ReplayIcon}</div>` : '';
        btn = util.createDom('hk-play',
        `<hk-icon class="hkplayer-icon">
            <div class="hkplayer-icon-play">${PlayIcon}</div>
            <div class="hkplayer-icon-pause">${PauseIcon}</div>
            ${replayIcon}
        </hk-icon>`, {}, 'hkplayer-play')
    };

    let tipsText = {};
    tipsText.play = player.lang.PLAY_TIPS;
    tipsText.pause = player.lang.PAUSE_TIPS;
    tipsText.replay = player.lang.REPLAY;
    const replayTips = player.config.ignores.indexOf('replay') > -1 ?
        `<span class="hkplayer-tip-replay">${tipsText.replay}</span>` : '';
    let tips = util.createDom('hk-tips',
        `<span class="hkplayer-tip-play">${tipsText.play}</span>
        <span class="hkplayer-tip-pause">${tipsText.pause}</span>
        ${replayTips}
        `, {}, 'hkplayer-tips');
    btn.appendChild(tips);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('playBtnClick');
        })
    })
}

Player.install('s_play', s_play);
