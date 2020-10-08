/* eslint-disable */
import Player from '../../player';
let s_contextmenu = function () {
    let player = this;
    let util = Player.util;
    const ctxList = (style) => util.createDom('hk-contextmenu', `
        <ul class="hkvideo-ctxmenulist">
            <li class="hkvideo-ctxmenuitem">快捷键说明</li>
            <li class="hkvideo-ctxmenuitem">视频统计信息</li>
        </ul>
    `, { style }, 'hkvideo-ctxmenu');
    const contextMenu = (e) => {
        const ctxDom = util.findDom(player.root, '.hkvideo-ctxmenu');
        console.log(e);
        if (ctxDom) {
            ctxDom.style.display = 'block';
            ctxDom.style.top = e.offsetY + 'px';
            ctxDom.style.left = e.offsetX + 'px';
        } else {
            player.root.appendChild(ctxList(`left: ${e.offsetX}px; top: ${e.offsetY}px`));
        }
    }
    player.on('showCtxMenu', contextMenu);

}
Player.install('s_contextmenu', s_contextmenu);