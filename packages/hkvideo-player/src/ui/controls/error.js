/* eslint-disable */
import Player from '../../player';
let s_error = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;

    let error = util.createDom('hk-error', '<span class="hkplayer-error-text">请<span class="hkplayer-error-refresh">刷新</span>试试</span>', {}, 'hkplayer-error')
    player.once('ready', () => {
        root.appendChild(error);
    });

    let text = error.querySelector('.hkplayer-error-text');
    let refresh = null;

    function onError() {
        // player.controls.style.display = 'none'
        // if (player.error) {
        //   text.innerHTML = player.error
        // } else {
        if (player.config.lang && player.config.lang === 'zh-cn') {
            text.innerHTML = player.config.errorTips || `出错了，请<span class="hkplayer-error-refresh">刷新</span>试试`;
        } else {
            text.innerHTML = player.config.errorTips || `please try to <span class="hkplayer-error-refresh">refresh</span>`;
        }
        // }
        util.addClass(player.root, 'hkplayer-is-error');
        refresh = error.querySelector('.hkplayer-error-refresh');
        if (refresh) {
            ['touchend', 'click'].forEach(item => {
                refresh.addEventListener(item, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    player.autoplay = true;
                    player.once('playing', () => {
                        util.removeClass(player.root, 'hkplayer-is-error');
                    });
                    // player.src = player.config.url
                    window.location.reload();
                })
            })
        }
    }
    player.on('error', onError);

    function onDestroy() {
        player.off('error', onError);
        player.off('destroy', onDestroy);
    };
    player.once('destroy', onDestroy);
}

Player.install('s_error', s_error);
