/* eslint-disable */
import Player from '../../player';
let s_enter = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    let config = player.config;
    let barStr = '<div class="hkplayer-enter-spinner">';
    for (let i = 1; i <= 12; i++) {
        barStr += `<div class="enter-bar hkplayer-enter-bar${i}"></div>`;
    }
    barStr += '</div>';
    // 外部传入logo优先使用
    const enterLogo = config.enterLogo ?
    `<div class="hkplayer-enter-logo">
        <img class="hkplayer-enter-logo-img" src="${config.enterLogo}" alt="logo"/>
    </div><div class="hkplayer-enter-tips"></div>` : barStr;
    let enter = util.createDom('hk-enter', enterLogo, {}, 'hkplayer-enter');
    root.appendChild(enter);
}

Player.install('s_enter', s_enter);
