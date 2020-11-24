/* eslint-disable */
import Player from '../../player';
import RotateIcon from '../assets/rotate.svg';
let s_rotate = function () {
    let player = this
    let util = Player.util
    if (!player.config.rotate) {
        return
    }
    let btn = util.createDom('hk-rotate', `<hk-icon class="hkplayer-icon">${RotateIcon}</hk-icon>`, {}, 'hkplayer-rotate pipnone');

    let tipsText = player.lang.ROTATE_TIPS
    let tips = util.createDom('hk-tips', `<span class="hkplayer-tip-rotate">${tipsText}</span>`, {}, 'hkplayer-tips')
    btn.appendChild(tips)
    player.once('ready', () => {
        player.controls.appendChild(btn)
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault()
            e.stopPropagation()
            player.emit('rotateBtnClick')
        })
    })
}

Player.install('s_rotate', s_rotate)
