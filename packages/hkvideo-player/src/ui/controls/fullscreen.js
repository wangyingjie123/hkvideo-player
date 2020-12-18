/* eslint-disable */
import Player from '../../player';
import fullScreen from '../jsonpath/fullScreen.json';
import SVG from '../../utils/svg';
let s_fullscreen = function () {
    let player = this;
    let util = Player.util;
    let fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {};
    let btn = null, svgPath = null;
    if (fullscreenBtn.type === 'img') {
        btn = util.createImgBtn('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height);
    } else {
        btn = util.createDom('hk-fullscreen',
        `<hk-icon class="hkplayer-icon">
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="${fullScreen.from}"></path>
            </svg>
        </hk-icon>`, {}, 'hkplayer-fullscreen pipnone');
    }
    svgPath = btn.querySelector('path');
    let svg = new SVG({
        progress: (shape, percent) => {
            svgPath.setAttribute('d', svg.toSVGString(shape))
        },
        from: fullScreen.from,
        to: fullScreen.to,
        duration: 350
	});
    let tips = util.createDom('hk-tips', player.lang.FULLSCREEN_TIPS, {}, 'hkplayer-tips');
    btn.appendChild(tips);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });
    // 进入网页全屏
    player.on('requestFullscreen', _ => {
        util.addClass(player.root, 'hkplayer-is-fullscreen');
        svg.reset(fullScreen.to, fullScreen.from);
        tips.innerText = player.lang.EXITFULLSCREEN_TIPS;
    });
    // 退出网页全屏
    player.on('exitFullscreen', _ => {
        util.hasClass(player.root, 'hkplayer-is-cssfullscreen') && player.emit('exitCssFullscreen');
        util.removeClass(player.root, 'hkplayer-is-fullscreen');
        svg.reset(fullScreen.from, fullScreen.to);
        tips.innerText = player.lang.FULLSCREEN_TIPS;
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
