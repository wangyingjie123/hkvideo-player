/* eslint-disable */
import Player from '../../player';
let s_contextmenu = function () {
    let player = this;
    let util = Player.util;
    const ctxWidth = 170;
    const ctxHeight = 104;
    let labelStr = '';
    const labels = [
        {name: '空格', text: '播放 / 暂停'},
        {name: '↓', text: '音量降低10%'},
        {name: '↑', text: '音量提高10%'},
    ]
    for (const v of labels) {
        labelStr += `<li class="hkvideo-ctxmenuhelp-item">
            <label class="menuhelp-label">${v.name}</label>
            <span class="menuhelp-text">：${v.text}</span>
        </li>`
    }
    const ctxCon = util.createDom('hk-contextmenu', `
        <div class="hkvideo-ctxmenuhelp">
            <p class="hkvideo-ctxmenuhelp-title">播放快捷键</p>
            <ul class="hkvideo-ctxmenuhelp-list">
                ${labelStr}
            </ul>
        </div>
    `, {}, 'hkvideo-ctxmenu');
    const ctxList = util.createDom('ul', `
        <li class="hkvideo-ctxmenuitem">快捷键说明</li>
        <li class="hkvideo-ctxmenuitem">视频统计信息</li>`, 
    {}, 'hkvideo-ctxmenulist');
    ctxCon.appendChild(ctxList);
    const contextMenu = (e) => {
        const ctxDom = util.findDom(player.root, '.hkvideo-ctxmenulist');
        const getRect = player.root.getBoundingClientRect();
        const rootLeft = getRect.left;
        // 元素距离网页顶部高度 = 网页卷起高度 + 元素距离可视区域顶部高度
        const rootTop = document.documentElement.scrollTop + getRect.top;
        const rootWidth = getRect.width - ctxWidth;
        const rootHeight = getRect.height - ctxHeight;
        let pageX = e.pageX - rootLeft;
        let pageY = e.pageY - rootTop;
        const offsetX = pageX > rootWidth ? rootWidth : pageX;
        const offsetY = pageY > rootHeight ? rootHeight : pageY;
        if (ctxDom) {
            ctxDom.style.display = 'block';
            ctxDom.style.top = offsetY + 'px';
            ctxDom.style.left = offsetX + 'px';
        } else {
            player.root.appendChild(ctxCon);
            ctxList.style.top = offsetY + 'px';
            ctxList.style.left = offsetX + 'px';
            document.addEventListener('click', () => ctxList.style.display = 'none');
            ctxList.addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
    player.on('showCtxMenu', contextMenu);

}
Player.install('s_contextmenu', s_contextmenu);