/* eslint-disable */
import Player from '../../player';
import DownloadIcon from '../assets/download.svg';
let s_download = function () {
    let player = this
    let util = Player.util
    if (!player.config.download) {
        return
    }
    let btn = util.createDom('hk-download', `<hk-icon class="hkplayer-icon">${DownloadIcon}</hk-icon>`, {}, 'hkplayer-download control');

    let tipsText = player.lang.DOWNLOAD_TIPS
    let tips = util.createDom('hk-tips', `<span class="hkplayer-tip-download">${tipsText}</span>`, {}, 'hkplayer-tips')
    btn.appendChild(tips)
    player.once('ready', () => {
        player.controls.appendChild(btn)
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault()
            e.stopPropagation()
            player.emit('downloadBtnClick')
        })
    })
}

Player.install('s_download', s_download)
