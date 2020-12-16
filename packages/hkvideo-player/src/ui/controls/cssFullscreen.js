/* eslint-disable */
import Player from '../../player';
import cssFull from '../jsonpath/cssFullScreen.json';
import SVG from '../../utils/svg';
let s_cssFullscreen = function () {
    let player = this;
    let util = Player.util;
    if (!player.config.cssFullscreen) {
        return
    }
    let svgPath = null;
    let btn = util.createDom('hk-cssfullscreen', `<hk-icon class="hkplayer-icon">
        <div class="hkplayer-icon-requestfull">
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
                <path class="path" d="${cssFull.from}"></path>
            </svg>
        </div>
    </hk-icon>`, {}, 'hkplayer-cssfullscreen pipnone');
    svgPath = btn.querySelector('path');
    let svg = new SVG({
        progress: (shape, percent) => {
            svgPath.setAttribute('d', svg.toSVGString(shape))
        },
        from: cssFull.from,
        to: cssFull.to,
        duration: 350
	});
    let tips = util.createDom('hk-tips',
        `${player.lang.CSSFULLSCREEN_TIPS}`,
        {}, 'hkplayer-tips');
    btn.appendChild(tips);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });
    ['click', 'touchend'].forEach(item => {
        btn.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            player.emit('cssFullscreenBtnClick');
        })
    });
    player.on('requestCssFullscreen', _ => {
        svg.reset(cssFull.to, cssFull.from);
        tips.innerText = player.lang.EXITCSSFULLSCREEN_TIPS;
        util.addClass(player.root, 'hkplayer-is-cssfullscreen');
        util.addClass(document.body, 'overhidden');
    });
    player.on('exitCssFullscreen', _ => {
        util.removeClass(player.root, 'hkplayer-is-cssfullscreen');
        tips.innerText = player.lang.CSSFULLSCREEN_TIPS;
        svg.reset(cssFull.from, cssFull.to);
        util.removeClass(document.body, 'overhidden');
    });
}

Player.install('s_cssFullscreen', s_cssFullscreen)
