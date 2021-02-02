/* eslint-disable */
import Player from '../../player';
import packageInfo from '../../../package.json';
import close from '../assets/close.svg';
let s_contextmenu = function () {
    let player = this;
    let util = Player.util;
    let labelStr = '';
    let interval = 0;
    let playSrc = player.config.url;
    const { videoInfomation } = player.config;
    const labels = [
        {name: '空格', text: '播放 / 暂停'},
        {name: 'Esc', text: '退出全屏'},
        {name: '↑', text: '音量提高10%'},
        {name: '↓', text: '音量降低10%'},
        {name: '→', text: '单次快进5秒'},
        {name: '←', text: '单次快退5秒'}
    ];
    const information = [
        {label: '网速', value: '----', class: 'netsped'},
        {label: '分辨率', value: '---', class: 'resolive'},
        {label: '音量', value: player.volume, class: 'volumeinfo'},
        {label: '视频宽高', value: player.root.offsetWidth+ ' * ' + player.root.offsetHeight, class: 'videowidth'},
        {label: '视频协议', value: playSrc.slice(0, playSrc.indexOf(':'))},
        {label: '视频类型', value: '---', class: 'videotype'},
        {label: '播放器版本', value: packageInfo.version},
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
        <div class="hkvideo-close">${close}</div>
    `, {}, 'hkvideo-ctxmenuhelp hkplayer-none');
    // 右键菜单dom
    const ctxList = util.createDom('ul', `
        ${videoInfomation ? '<li class="hkvideo-ctxmenuitem" id="videoexplain">视频信息</li>' : ''}
        <li class="hkvideo-ctxmenuitem" id="keyexplain">快捷键说明</li>
        `, 
    {}, 'hkvideo-ctxmenulist');
    let informationText = '';
    information.forEach((v, i) => {
        informationText += `
        <p class="hkvideo-ctxvideoex-row">
            <label class="hkvideo-ctxvideoex-label">${v.label}：</label>
            <span class="${v.class || ''} hkvideo-ctxvideoex-text">${v.value}</span>
        </p>    
        `
    });
    // 播放器版本及视频详情
    const ctxPlayer = util.createDom('div', `
        ${informationText}
        <div class="hkvideo-close">${close}</div>
    `, {}, 'hkvideo-ctxvideoex hkplayer-none');
    ctxCon.appendChild(ctxKeyHelp);
    ctxCon.appendChild(ctxList);
    const newspeed = () => {
        if (navigator.connection && navigator.connection.downlink) {
            const netsped = util.findDom(ctxPlayer, '.netsped');
            netsped.innerText = navigator.connection.downlink * 1024 / 8 + ' kb/s';
        }
        const resolive = util.findDom(ctxPlayer, '.resolive');
        resolive.innerText = player.video.videoWidth + ' * ' + player.video.videoHeight;
    }
    // 视频信息展示
    const infoEvent = () => {
        ctxCon.appendChild(ctxPlayer);
        window.onresize = () => {
            const videowidth = util.findDom(ctxPlayer, '.videowidth');
            videowidth.innerText = player.root.offsetWidth+ ' * ' + player.root.offsetHeight;
        }
        player.on('play', _ => {
            interval = setInterval(newspeed, 1500);
        });
        player.on('pause', _ => clearInterval(interval));
        player.on('volumechange', _ => {
            const volumeinfo = util.findDom(ctxPlayer, '.volumeinfo');
            volumeinfo.innerText = player.video.volume * 100 + '%';
        });
        let videoType = 'mp4';
        if (player.flvOpts) {
            videoType = 'flv';
        } else if (player.hlsOpts) {
            videoType = 'hls';
        }
        util.findDom(ctxPlayer, '.videotype').innerText = videoType;
    }
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
            videoInfomation && infoEvent();
        }
    });
    player.once('destroy', _ => {
        clearInterval(interval);
    });
}
Player.install('s_contextmenu', s_contextmenu);