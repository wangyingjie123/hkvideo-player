/* eslint-disable */
import Player from 'hkvideo-player';

let s_inject = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    let timer = 0;
    let container = util.createDom('hk-inject', `<p class="hkvideo-inject-text"></p>`, {}, 'hkvideo-inject');
    player.once('ready', () => {
        player.root.appendChild(container);
    })
    function showTips(tip, hide = false) {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }
        const tipsText = util.findDom(container, '.hkvideo-inject-text');
        tipsText.innerHTML = tip;
        util.addClass(container, 'showTips');
        if (hide) {
            timer = setTimeout(() => {
                util.removeClass(container, 'showTips');
            }, 2000);
        }
    }
    player.on('showTips', showTips);
    function onDestroy() {
        player.off('showTips', showTips);
    }
    player.once('destroy', onDestroy);
}

Player.install('s_inject', s_inject)
