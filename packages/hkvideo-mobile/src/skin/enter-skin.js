/* eslint-disable */
import Player from '../player';
import enterLoading from './enterLoading';
let s_enter = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    let config = player.config;
    // 外部传入logo优先使用
    const enterLogo = config.enterLogo ?
    `<div class="hkplayer-enter-logo">
        <img class="hkplayer-enter-logo-img" src="${config.enterLogo}" alt="logo"/>
    </div><div class="hkplayer-enter-tips"></div>` : enterLoading();
    let enter = util.createDom('hk-enter', enterLogo, {}, 'hkplayer-enter');
    root.appendChild(enter);
}

Player.install('s_enter', s_enter);
