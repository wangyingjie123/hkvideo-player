/* eslint-disable */
import Player from '../player';
import util from '../utils/util';
import closeIcon from '../ui/assets/close.svg';
let screenShot = function () {
    let player = this;
    let root = player.root;
    let screenShotOptions = player.config.screenShot;
    if (!screenShotOptions) {
        return;
    }
    // 屏幕截图预览
    let preview = null, screenShotImg = '';
    let encoderOptions = 0.92;
    if (screenShotOptions.quality || screenShotOptions.quality === 0) {
        encoderOptions = screenShotOptions.quality;
    }
    let type = screenShotOptions.type === undefined ? 'image/png' : screenShotOptions.type;
    let format = screenShotOptions.format === undefined ? '.png' : screenShotOptions.format;
    // canvas
    let canvas = document.createElement('canvas');
    let canvasCtx = canvas.getContext('2d');
    let img = new Image();
    canvas.width = this.config.width || 600;
    canvas.height = this.config.height || 337.5;
    let flashTimer = 0;
    // 保存到本地
    const saveScreenShot = function (data, filename) {
        let saveLink = document.createElement('a');
        saveLink.href = data;
        saveLink.download = filename;
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        saveLink.dispatchEvent(event);
    }
    // 创建闪光动画
    const screenFlash = () => {
        let ani = util.createDom('div', '', {}, 'hkplayer-rightslide-ani');
        root.appendChild(ani);
        flashTimer = setTimeout(_ => {
            root.removeChild(ani);
        }, 500);
    }
    // 创建预览图
    const createPreview = (img) => {
        const slide = document.querySelector('.hkplayer-rightslide');
        screenShotImg = img.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        if (preview) {
            const prevImg = util.findDom(preview, '.screenshot-prev-img');
            prevImg.src = img;
            util.removeClass(preview, 'hkplayer-none');
            return;
        }
        preview = util.createDom('div', `
            <div class="screenshot-close">
                <span class="screenshot-close-bg"></span>
                ${closeIcon}
                </svg>
            </div>
            <div class="screenshot-prev-top">
                <img class="screenshot-prev-img" src=${img} alt="屏幕截图" />
            </div>
        `, {}, 'screenshot-prev');
        const saveBtn = util.createDom('div',
            '<div class="screenshot-btn-save">保存</div>', {}, 'screenshot-btn');
        preview.appendChild(saveBtn);
        slide.appendChild(preview);
        const closeBtn = util.findDom(preview, '.screenshot-close');
        const saveBtnevent = util.findDom(saveBtn, '.screenshot-btn-save');
        // 保存按钮点击
        saveBtnevent.addEventListener('click', () => saveScreenShot(screenShotImg, `截图_${+new Date}${format}`));
        // 预览图关闭
        closeBtn.addEventListener('click', () => util.addClass(preview, 'hkplayer-none'));
    }
    // 截图按钮点击
    const onScreenShotBtnClick = ()  => {
        canvas.width = player.video.videoWidth || 600;
        canvas.height = player.video.videoHeight || 337.5;
        img.onload = (function () {
            canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
            img.setAttribute('crossOrigin', 'anonymous');
            const imgsrc = canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream');
            img.src = imgsrc;
            createPreview(imgsrc);
            // player.emit('screenShot', screenShotImg);
            // save && saveScreenShot(screenShotImg, '截图' + format);
        })();
        screenFlash();
    }
    player.on('screenShotBtnClick', onScreenShotBtnClick);

    function onDestroy() {
        player.off('screenShotBtnClick', onScreenShotBtnClick);
        clearTimeout(flashTimer);
        player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
}

Player.install('screenShot', screenShot);
