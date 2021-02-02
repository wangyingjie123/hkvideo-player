/* eslint-disable */
import Player from '../player';
// import PlayIcon from '../assets/play.json';
import PauseIcon from '../assets/pause.svg';
import PlayIcon from '../assets/play.svg';
let s_play = function () {
    let player = this;
    let util = Player.util;
    let playBtn = player.config.playBtn ? player.config.playBtn : {};
    let btn = null, svgPath = null, isEnd = false;
    if (playBtn.type === 'img') {
        btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
    } else {
        btn = util.createDom('hk-play',
        `<hk-icon class="hkplayer-icon hkplayer-play-icon">
            ${PlayIcon}
        </hk-icon>
        <hk-icon class="hkplayer-icon hkplayer-pause-icon">
            ${PauseIcon}
        </hk-icon>
        `, {}, 'hkplayer-play');
    };
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });
    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('playBtnClick');
        })
    });
}

Player.install('s_play', s_play);
