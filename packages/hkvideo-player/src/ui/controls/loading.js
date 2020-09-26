/* eslint-disable */
import Player from '../../player';
import Loading from '../assets/loading.svg';
let s_loading = function () {
    let player = this
    let root = player.root
    let util = Player.util
    let container = util.createDom('hk-loading', `${Loading}`, {}, 'hkplayer-loading')
    player.once('ready', () => {
        root.appendChild(container)
    })
}

Player.install('s_loading', s_loading)
