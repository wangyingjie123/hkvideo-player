/* eslint-disable */
import Player from '../../player';
import screenShot from '../assets/screenshot.svg';
let s_screenShot = function () {
    let player = this;
    let util = Player.util;
    if (!player.config.screenShot) {
        return
    }
    if (player.config.url.indexOf('blob:') < 0) {
        return;
    }
    let screenShotText = player.lang.SCREENSHOT;
    let rightControl = util.createDom('hk-right-slide', '', {
        tabindex: 11
    }, 'hkplayer-rightslide');
    let btn = util.createDom('hk-screenshot', 
        `<hk-icon class="hkplayer-icon">
            <div class="hkplayer-icon-screenshot">
                ${screenShot}
            </div>
        </hk-icon>`,
    {}, 'hkplayer-screenshot');
    rightControl.appendChild(btn);
    player.once('ready', () => {
        player.root.appendChild(rightControl);
    });

    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, e => {
            e.preventDefault();
            e.stopPropagation();
            player.emit('screenShotBtnClick');
        })
    })
}

Player.install('s_screenShot', s_screenShot);
