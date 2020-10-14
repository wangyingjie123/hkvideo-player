/* eslint-disable */
import Player from '../../player';
import StartPlayIcon from '../assets/startPlay.svg';
import StartPauseIcon from '../assets/startPause.svg';
let s_start = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    let btn = util.createDom('hk-start',
        `<div class="hkplayer-icon-play">${StartPlayIcon}</div>
        <div class="hkplayer-icon-pause">${StartPauseIcon}</div>`, {}, 'hkplayer-start');

    function onPlayerReady(player) {
        util.addClass(player.root, 'hkplayer-skin-default');
        if (player.config) {
            player.config.autoplay && !util.isWeiXin() && util.addClass(player.root, 'hkplayer-is-enter');
            if (player.config.lang && player.config.lang === 'en') {
                util.addClass(player.root, 'lang-is-en');
            } else if (player.config.lang === 'jp') {
                util.addClass(player.root, 'lang-is-jp');
            }
        }
    }

    if (player.isReady) {
        root.appendChild(btn);
        onPlayerReady(player);
    } else {
        player.once('ready', () => {
            root.appendChild(btn);
            onPlayerReady(player);
        });
    }
    player.on('play', () => {
        util.addClass(btn, 'hkplayer-start-interact');
    });
    player.on('pause', () => {
        util.addClass(btn, 'hkplayer-start-interact');
    });
    btn.addEventListener('animationend', () => {
        util.removeClass(btn, 'hkplayer-start-interact');
    });
    player.once('autoplay was prevented', () => {
        util.removeClass(player.root, 'hkplayer-is-enter');
        util.addClass(player.root, 'hkplayer-nostart');
    })

    player.once('canplay', () => {
        util.removeClass(player.root, 'hkplayer-is-enter');
    })

    btn.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        player.emit('startBtnClick');
    }
}

Player.install('s_start', s_start);
