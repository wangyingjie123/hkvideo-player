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
        {name: 'Esc', text: '退出全屏'},
        {name: '↑', text: '音量提高10%'},
        {name: '↓', text: '音量降低10%'},
        {name: '→', text: '单次快进5秒'},
        {name: '←', text: '单次快退5秒'}
    ]
    for (const v of labels) {
        labelStr += `<li class="hkvideo-ctxmenuhelp-item">
            <label class="menuhelp-label">${v.name}</label>
            <span class="menuhelp-text">：${v.text}</span>
        </li>`
    }
    const ctxCon = util.createDom('hk-contextmenu', '', {}, 'hkvideo-ctxmenu');
    // 快捷键详情
    const ctxKeyHelp = util.createDom('div', `
        <p class="hkvideo-ctxmenuhelp-title">播放快捷键</p>
        <ul class="hkvideo-ctxmenuhelp-list">
            ${labelStr}
        </ul>
        <div class="hkplayer-pip-lay hkvideo-ctxmenuhelp-close"></div>
    `, {}, 'hkvideo-ctxmenuhelp hkplayer-none');
    // 右键菜单dom
    const ctxList = util.createDom('ul', `
        <li class="hkvideo-ctxmenuitem" id="keyexplain">快捷键说明</li>
        <li class="hkvideo-ctxmenuitem">视频统计信息</li>`, 
    {}, 'hkvideo-ctxmenulist');
    // 播放器版本详情
    const ctxPlayer = util.createDom('div', `
        <p class="hkvideo-ctxpldetail-row">
            <label class="hkvideo-ctxpldetail-label">音量大小：</label>
            <span class="hkvideo-ctxpldetail-text">60%</span>
        </p>
        <p class="hkvideo-ctxpldetail-row">
            <label class="hkvideo-ctxpldetail-label">视频协议：</label>
            <span class="hkvideo-ctxpldetail-text">60%</span>
        </p>
        <p class="hkvideo-ctxpldetail-row">
            <label class="hkvideo-ctxpldetail-label">视图尺寸：</label>
            <span class="hkvideo-ctxpldetail-text">60%</span>
        </p>
        <p class="hkvideo-ctxpldetail-row">
            <label class="hkvideo-ctxpldetail-label">分辨率：</label>
            <span class="hkvideo-ctxpldetail-text">60%</span>
        </p>
        <p class="hkvideo-ctxpldetail-row">
            <label class="hkvideo-ctxpldetail-label">播放器版本：</label>
            <span class="hkvideo-ctxpldetail-text">60%</span>
        </p>
        <div class="hkplayer-pip-lay hkvideo-ctxmenuhelp-close"></div>
    `, {}, 'hkvideo-ctxpldetail');
    ctxCon.appendChild(ctxKeyHelp);
    ctxCon.appendChild(ctxList);
    // ctxCon.appendChild(ctxPlayer);
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
            util.removeClass(ctxList, 'hkplayer-none');
            ctxDom.style.top = offsetY + 'px';
            ctxDom.style.left = offsetX + 'px';
        } else {
            player.root.appendChild(ctxCon);
            ctxList.style.top = offsetY + 'px';
            ctxList.style.left = offsetX + 'px';
            bindEvent();
        }
    }
    const bindEvent = () => {
        // 全局点击关闭菜单栏
        document.addEventListener('click', () => {
            util.addClass(ctxList, 'hkplayer-none');
            util.addClass(ctxKeyHelp, 'hkplayer-none');
        });
        ctxList.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        // 点击快捷键说明
        const ctxKeybtn = util.findDom(ctxCon, '#keyexplain');
        ctxKeybtn.addEventListener('click', (e) => {
            util.removeClass(ctxKeyHelp, 'hkplayer-none');
            util.addClass(ctxList, 'hkplayer-none');
            e.stopPropagation();
        });
        // 关闭快捷键说明
        const ctxKeyClose = util.findDom(ctxKeyHelp, '.hkvideo-ctxmenuhelp-close');
        ctxKeyClose.addEventListener('click', () => util.addClass(ctxKeyHelp, 'hkplayer-none'));
        ctxKeyHelp.addEventListener('contextmenu', e => util.addClass(ctxKeyHelp, 'hkplayer-none'));
        ctxKeyHelp.addEventListener('click', e => e.stopPropagation());
    }
    player.on('showCtxMenu', contextMenu);

}
Player.install('s_contextmenu', s_contextmenu);