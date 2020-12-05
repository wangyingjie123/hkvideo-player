
/* eslint-disable */
import Player from '../../player';
import PlayNextIcon from '../assets/playNext.svg';
let s_playNext = function () {
    let player = this;
    let util = Player.util;
    let nextBtn = player.config.playNext;
    if (!nextBtn || !nextBtn.urlList) {
        return
    }
    let btn = util.createDom('hk-playnext', `<hk-icon class="hkplayer-icon">${PlayNextIcon}</hk-icon>`, {}, 'hkplayer-playnext pipnone');
    let tipsText = player.lang.PLAYNEXT_TIPS;
    let nextTips = util.createDom('hkvideo-playnext', '', {}, 'hkvideo-playnext-tips');
    btn.appendChild(nextTips);
    const nextTip = (item) => {
        if (!item) return;
        let tips;
        if (typeof item === 'string') {
            tips = `<span class="hkplayer-tips">${tipsText}</span>`;
        } else {
            tips = `
                <div class="hkvideo-nextview">
                    <div class="hkvideo-nextview-left">
                        <img src="${item.img || ''}" class="hkvideo-nextview-img"/>
                    </div>
                    <div class="hkvideo-nextview-right">
                        <p class="hkvideo-nextview-tips">接下来播放：</p>
                        <p class="hkvideo-nextview-title">${item.title}</p>
                    </div>
                </div>
            `;
        }
        nextTips.innerHTML = tips;
        // return tips;
    }
    player.on('playerNext', nextTip);
    player.emit('playerNext', nextBtn.urlList[0]);
    player.once('ready', () => {
        player.controls.appendChild(btn);
    });

    btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        // 如果传入自定义参数，则执行自定义函数
        if (nextBtn.playNextFun && typeof nextBtn.playNextFun === 'function') {
            nextBtn.playNextFun();
            return;
        }
        Player.util.addClass(player.root, 'hkplayer-is-enter');
        player.emit('playNextBtnClick');
    })

    let onUrlListEnd = function () {
        Player.util.addClass(player.root, 'hkplayer-playnext-inactive');
    }
    player.on('urlListEnd', onUrlListEnd);

    function onDestroy() {
        player.off('urlListEnd', onUrlListEnd);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy)
}

Player.install('s_playNext', s_playNext)
