/* eslint-disable */
/*
* @file 画中画
*/
import Player from '../../player';
import sniffer from '../../utils/sniffer';
import RequestFullIcon from '../assets/videopip.svg';
// import ExitFullIcon from '../assets/exitFull.svg';
let s_videopip = function () {
    let player = this;
    let util = Player.util;
    if (!player.config.videopip || !('pictureInPictureEnabled' in document)) return;
    if (sniffer.browser.name !== 'Chrome' && sniffer.browser.name !== 'Safari') return;
    let btn = util.createDom('hk-videopip',
        `<hk-icon class="hkplayer-icon">
            <div class="hkplayer-icon-openpip">${RequestFullIcon}</div>
        </hk-icon>`, {}, 'hkplayer-videopip');
    let tipsText = {};
    tipsText.requestpip = player.lang.OPEN_PIP;
    tipsText.exitpip = player.lang.EXIT_PIP;
    let tips = util.createDom('hk-tips',
        `<span class="hkplayer-tip-openpip">${tipsText.requestpip}</span>
        <span class="hkplayer-tip-exitpip">${tipsText.exitpip}</span>`, {}, 'hkplayer-tips');
    btn.appendChild(tips);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('videoPipBtnClick');
        })
    })
}

Player.install('s_videopip', s_videopip);