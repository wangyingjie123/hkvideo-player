/* eslint-disable */
import Player from '../player';
let contextMenu = function () {
    let player = this;
    let root = player.root;
    let util = Player.util;
    const ctxWidth = 170;
    const ctxHeight = 104;
    let ctxBox = null, ctxList = null, ctxVideoInfo = null, ctxKeyHelp = null;
    // 右键事件
    const contextMenu = (e, ctxCon) => {
        // 右键菜单
        const ctxDom = util.findDom(root, '.hkvideo-ctxmenulist');
        // 确定点击位置
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
            root.appendChild(ctxCon);
            ctxBox = ctxCon;
            ctxList = util.findDom(ctxBox, '.hkvideo-ctxmenulist');
            ctxVideoInfo = util.findDom(ctxBox, '.hkvideo-ctxvideoex');
            ctxKeyHelp = util.findDom(ctxBox, '.hkvideo-ctxmenuhelp');
            ctxList.style.top = offsetY + 'px';
            ctxList.style.left = offsetX + 'px';
            bindEvent();
        }
    }
    const bindEvent = () => {
        // 点击快捷键说明
        const EventArr = [
            // {
            //     close: util.findDom(ctxVideoInfo, '.hkplayer-close'),
            //     box: util.findDom(ctxBox, '.hkvideo-ctxvideoex'),
            //     btn: util.findDom(ctxList, '#videoexplain')
            // },
            {
                close: util.findDom(ctxKeyHelp, '.hkplayer-close'),
                box: util.findDom(ctxBox, '.hkvideo-ctxmenuhelp'),
                btn: util.findDom(ctxList, '#keyexplain')
            }
        ]
        // 全局点击关闭菜单栏
        document.addEventListener('click', _ => util.addClass(ctxList, 'hkplayer-none'));
        ctxList.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        for (const v of EventArr) {
            v.btn.addEventListener('click', (e) => {
                if (util.hasClass(v.box, 'hkplayer-none')) {
                    util.removeClass(v.box, 'hkplayer-none');
                }
                util.addClass(ctxList, 'hkplayer-none');
                e.stopPropagation();
            });
            v.close.addEventListener('click', _ => util.addClass(v.box, 'hkplayer-none'));
        }
    }
    player.on('showCtxMenu', contextMenu);

    function onDestroy() {
        player.off('showCtxMenu', contextMenu);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('contextMenu', contextMenu);