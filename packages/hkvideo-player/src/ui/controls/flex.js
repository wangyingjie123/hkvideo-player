/* eslint-disable */
import Player from '../../player';
let s_flex = function () {
    let player = this
    let root = player.root
    let util = Player.util
    let playceholder = util.createDom('hk-placeholder', '', {}, 'hkplayer-placeholder pipnone')
    player.controls.appendChild(playceholder)
}

Player.install('s_flex', s_flex)
