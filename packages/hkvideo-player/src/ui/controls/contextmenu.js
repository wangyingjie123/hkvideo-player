/* eslint-disable */
import Player from '../../player';
import { version, name } from '../../../package.json';
let s_contextmenu = function () {
    let player = this;
    let util = Player.util;
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
        <div class="hkplayer-close"></div>
    `, {}, 'hkvideo-ctxmenuhelp hkplayer-none');
    // 右键菜单dom
    const ctxList = util.createDom('ul', `
        <li class="hkvideo-ctxmenuitem" id="keyexplain">快捷键说明</li>
        `, 
    {}, 'hkvideo-ctxmenulist');
    // <li class="hkvideo-ctxmenuitem" id="videoexplain">视频统计信息</li>
    // 播放器版本及视频详情
    const ctxPlayer = util.createDom('div', `
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">音量大小：</label>
            <span class="hkvideo-ctxvideoex-text">60%</span>
        </p>
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">视频协议：</label>
            <span class="hkvideo-ctxvideoex-text">60%</span>
        </p>
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">视图尺寸：</label>
            <span class="hkvideo-ctxvideoex-text">60%</span>
        </p>
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">分辨率：</label>
            <span class="hkvideo-ctxvideoex-text">60%</span>
        </p>
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">播放器版本：</label>
            <span class="hkvideo-ctxvideoex-text">${name}@${version}</span>
        </p>
        <div class="hkplayer-close"></div>
    `, {}, 'hkvideo-ctxvideoex hkplayer-none');
    ctxCon.appendChild(ctxKeyHelp);
    ctxCon.appendChild(ctxList);
    ctxCon.appendChild(ctxPlayer);
    player.once('ready', () => {
        if (!player.config.enableContextmenu) {
            player.root.addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopPropagation();
                if (util.hasClass(player.root, 'hkplayer-pip-active') || util.hasClass(player.root, 'hkplayer-nostart')) {
                    return; 
                }
                player.emit('showCtxMenu', e, ctxCon);
            });
        }
    })
}
Player.install('s_contextmenu', s_contextmenu);