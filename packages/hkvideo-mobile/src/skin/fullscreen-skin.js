/* eslint-disable */
import Player from '../player';
import FullScreen from '../assets/fullscreen.svg';
import ExitFullScreen from '../assets/exitfullscreen.svg';
let s_fullscreen = function () {
    let player = this;
    let util = Player.util;
    let fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {};
    let btn = null, svgPath = null;
    if (fullscreenBtn.type === 'img') {
        btn = util.createImgBtn('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height);
    } else {
        btn = util.createDom('hk-fullscreen',
        `<hk-icon class="hkplayer-icon fullscreen">
            ${FullScreen}
        </hk-icon>
        <hk-icon class="hkplayer-icon exit-fullscreen">
            ${ExitFullScreen}
        </hk-icon>
        `, {}, 'hkplayer-fullscreen pipnone');
    }
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });
    // 进入网页全屏
    player.on('requestFullscreen', _ => {
        util.addClass(player.root, 'hkplayer-is-fullscreen');
    });
    // 退出网页全屏
    player.on('exitFullscreen', _ => {
        util.removeClass(player.root, 'hkplayer-is-fullscreen');
    });
    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('fullscreenBtnClick');
        })
    })
}

Player.install('s_fullscreen', s_fullscreen)
