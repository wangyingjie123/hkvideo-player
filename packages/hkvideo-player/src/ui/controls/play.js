/* eslint-disable */
import Player from '../../player';
import SVG from '../../utils/svg';
import PlayIcon from '../jsonpath/play.json';
let s_play = function () {
    let player = this;
    let util = Player.util;
    let playBtn = player.config.playBtn ? player.config.playBtn : {};
    let btn = null, svgPath = null, isEnd = false;
    if (playBtn.type === 'img') {
        btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
    } else {
        // const replayIcon = player.config.ignores.indexOf('replay') > -1 ?
        // `<div class="hkplayer-icon-replay">${ReplayIcon}</div>` : '';
        btn = util.createDom('hk-play',
        `<hk-icon class="hkplayer-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                <path d="${PlayIcon.play}"></path>
            </svg>
        </hk-icon>`, {}, 'hkplayer-play')
    };
    svgPath = btn.querySelector('path');
    let svg = new SVG({
        progress: (shape, percent) => {
            svgPath.setAttribute('d', svg.toSVGString(shape))
        },
        from: PlayIcon.from,
        to: PlayIcon.to,
        duration: 200
	});
    let tips = util.createDom('hk-tips', player.lang.PLAY_TIPS, {}, 'hkplayer-tips');
    btn.appendChild(tips);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });
    // 播放
    player.on('playIconChange', _ => {
        if (isEnd) {
            svg.reset(PlayIcon.pause, PlayIcon.replay);
            isEnd = false;
        } else {
            svg.reset(PlayIcon.pause, PlayIcon.play);
        }
        tips.innerText = player.lang.PAUSE_TIPS;;
    });
    // 暂停
    player.on('pauseIconChange', status => {
        if (this.ended) {
            svg.reset(PlayIcon.replay, PlayIcon.pause);
            tips.innerText = player.lang.REPLAY;
            isEnd = true;
        } else {
            svg.reset(PlayIcon.play, PlayIcon.pause);
            tips.innerText = player.lang.PLAY_TIPS;
        }
        
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
