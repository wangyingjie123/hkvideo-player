/* eslint-disable */
import Player from '../../player';
import setUp from '../assets/shezhi.svg';
let s_pip = function () {
    let player = this;
    let util = Player.util;
    let pipswitch = null;
    if (!localStorage.getItem('pipFlag')) {
        localStorage.setItem('pipFlag', 1);
    }
    let btn = util.createDom('hk-pip', `
        <div class="hkplayer-icon">${setUp}</div>
        <div class="setup-list">
            <span class="setup-txt">小窗播放功能</span>
            <div id="pipSwitch" class="hkplayer-switch
            ${localStorage.getItem('pipFlag') === '1' ? 'hkplayer-switch-active' : ''}">
                <span class="txt"></span>
            </div>
        </div>`, {
        tabindex: 9
    }, 'hkplayer-pip pipnone');
    player.once('ready', () => {
        player.controls.appendChild(btn);
        pipswitch = util.findDom(btn, '.hkplayer-switch');
        pipswitch.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            player.emit('pipBtnClick', pipswitch);
        });
    });
}

Player.install('s_pip', s_pip)
