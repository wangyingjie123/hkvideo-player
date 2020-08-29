/* eslint-disable */
import Player from '../../player';
let s_enter = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    // let barStr = '';
    // for (let i = 1; i <= 12; i++) {
    //     barStr += `<div class="hkplayer-enter-bar${i}"></div>`;
    // }
    let enter = util.createDom('hk-enter',
    `<div class="hkplayer-enter-logo"></div><div class="hkplayer-enter-tips"></div>`, {}, 'hkplayer-enter');
    root.appendChild(enter);
}

Player.install('s_enter', s_enter);
