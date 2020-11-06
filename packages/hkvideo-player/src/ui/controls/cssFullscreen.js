/* eslint-disable */
import Player from '../../player';
import RequestCssFullIcon from '../assets/requestCssFull.svg';
import ExitCssFullIcon from '../assets/exitCssFull.svg';
let s_cssFullscreen = function () {
    let player = this
    let util = Player.util
    if (!player.config.cssFullscreen) {
        return
    }
    let btn = util.createDom('hk-cssfullscreen', `<hk-icon class="hkplayer-icon">
        <div class="hkplayer-icon-requestfull">${RequestCssFullIcon}</div>
        <div class="hkplayer-icon-exitfull">${ExitCssFullIcon}</div>
    </hk-icon>`, {}, 'hkplayer-cssfullscreen control')

    let tipsText = {}
    tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS
    tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS
    let tips = util.createDom('hk-tips', `<span class="hkplayer-tip-requestfull">${tipsText.requestfull}</span>
                                        <span class="hkplayer-tip-exitfull">${tipsText.exitfull}</span>`, {}, 'hkplayer-tips')
    btn.appendChild(tips)
    player.once('ready', () => {
        player.controls.appendChild(btn)
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('cssFullscreenBtnClick')
        })
    })
}

Player.install('s_cssFullscreen', s_cssFullscreen)
