/* eslint-disable */
import Player from '../../player';
let s_playbackRate = function () {
    let player = this;
    let util = Player.util;
    let selected = 0;
    let rateTpl = [];
    let selectedSpeed = 1;
    if (player.config.playbackRate) {
        player.config.playbackRate.sort((a, b) => a - b);
        player.config.playbackRate.forEach((item, index) => {
            if (player.config.defaultPlaybackRate && player.config.defaultPlaybackRate === item) {
                selected = index;
                selectedSpeed = item;
                player.once('playing', () => {
                    player.video.playbackRate = item;
                });
            } else if (item === 1 || item === '1') {
                selected = index;
            }
            rateTpl.push(`${item}`);
        });
    } else {
        return false;
    }
    let tipsSpeed = player.config.lang && player.config.lang === 'zh-cn' ? '倍速' : 'Speed';
    let list = '<ul class="hkplayer-playback-list">';
    rateTpl.forEach((v, i) => {
        list += `<li class=${v === 1 || v === '1' ? 'selected' : ''}>${v}x</li>`;
    });
    list += '</ul>';
    let ul = util.createDom('hk-playback',
    `${list}<p class='name'><span>${tipsSpeed}</span></p>`, {}, 'hkplayer-playback');
    let root = player.controls;
    root.appendChild(ul);
    ul.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let li = e.target || e.srcElement;
        if (li && li.tagName.toLocaleLowerCase() === 'li') {
            let parent = li.parentNode;
            for (let i = 0; i < parent.children.length; i++) {
                util.removeClass(parent.children[i], 'selected');
                if (li === parent.children[i]) {
                    selected = i;
                }
            }
            util.addClass(li, 'selected');
            ul.querySelector('p').innerHTML = `<span>${rateTpl[selected] == 1 ? '倍速' : rateTpl[selected] + 'x'}</span>`;
            player.video.playbackRate = rateTpl[selected] * 1;
        }
    }, false);
    ul.querySelector('.name').addEventListener('mouseenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        util.addClass(ul, 'hkplayer-playback-active');
    });
    ul.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        util.removeClass(ul, 'hkplayer-playback-active');
    });
    function onBlur() {
        util.removeClass(ul, 'hkplayer-playback-active');
    }
    player.on('blur', onBlur);
    player.on('play', () => {
        let rateNow = parseFloat(rateTpl[selected]);
        if (player.video.playbackRate.toFixed(1) !== rateNow.toFixed(1)) {
            player.video.playbackRate = rateNow;
        }
    });
}
Player.install('s_playbackRate', s_playbackRate);
