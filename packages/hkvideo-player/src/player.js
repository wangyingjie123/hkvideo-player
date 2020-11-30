/*
* @file 播放器实例化
* @author wangyingjie07
*/
/* eslint-disable */
import Proxy from './proxy';
import util from './utils/util';
import Database from './utils/database';
import sniffer from './utils/sniffer';
import Errors from './error';
import Draggabilly from 'draggabilly';
import { getAbsoluteURL } from './utils/url';
import downloadUtil from 'downloadjs';
import close from './ui/assets/close.svg';
import { version } from '../package.json';
class Player extends Proxy {
    constructor(options) {
        super(options);
        this.config = util.deepCopy({
            width: 600,
            height: 337.5,
            ignores: [],
            whitelist: [],
            lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
            inactive: 3000,
            volume: 0.6,
            controls: true,
            controlsList: ['nodownload']
        }, options);
        this.version = version;
        this.userTimer = null;
        this.waitTimer = null;
        this.database = new Database();
        this.history = [];
        this.isProgressMoving = false;
        this.root = util.findDom(document, `#${this.config.id}`);
        this.controls = util.createDom('hk-controls', '', {
            unselectable: 'on',
            onselectstart: 'return false'
        }, 'hkplayer-controls');
        if (this.config.isShowControl) {
            this.controls.style.display = 'none';
        }
        if (!this.root) {
            let el = this.config.el;
            if (el && el.nodeType === 1) {
                this.root = el;
            } else {
                this.emit('error', new Errors({
                    type: 'use',
                    errd: {
                        line: 45,
                        handle: 'Constructor',
                        msg: 'container id can\'t be empty'
                    },
                    vid: this.config.vid
                }));
                console.error('container id can\'t be empty');
                return false;
            }
        }
        // this.rootBackup = util.copyDom(this.root)
        util.addClass(this.root, `hkplayer hkplayer-${sniffer.device} hkplayer-nostart ${this.config.controls ? '' : 'no-controls'}`);
        this.root.appendChild(this.controls);
        if (this.config.fluid) {
            this.root.style['max-width'] = '100%'
            this.root.style['width'] = '100%'
            this.root.style['height'] = '0'
            this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`

            this.video.style['position'] = 'absolute'
            this.video.style['top'] = '0'
            this.video.style['left'] = '0'
        } else {
            // this.root.style.width = `${this.config.width}px`
            // this.root.style.height = `${this.config.height}px`
            if (this.config.width) {
                if (typeof this.config.width !== 'number') {
                    this.root.style.width = this.config.width;
                } else {
                    this.root.style.width = `${this.config.width}px`;
                }
            }
            if (this.config.height) {
                if (typeof this.config.height !== 'number') {
                    this.root.style.height = this.config.height;
                } else {
                    this.root.style.height = `${this.config.height}px`;
                }
            }
        }
        if (this.config.execBeforePluginsCall) {
            this.config.execBeforePluginsCall.forEach(item => {
                item.call(this, this);
            })
        }
        if (this.config.controlStyle && util.typeOf(this.config.controlStyle) === 'String') {
            let self = this;
            fetch(self.config.controlStyle, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (obj) {
                        for (var prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                self.config[prop] = obj[prop];
                            }
                        }
                        self.pluginsCall();
                    })
                }
            }).catch(function (err) {
                console.log('Fetch错误:' + err);
            })
        } else {
            this.pluginsCall();
        }
        this.ev.forEach((item) => {
            let evName = Object.keys(item)[0];
            let evFunc = this[item[evName]];
            if (evFunc) {
                this.on(evName, evFunc);
            }
        });

        ['focus', 'blur'].forEach(item => {
            this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
        })
        let player = this;
        this.mousemoveFunc = function (e) {
            player.emit('focus', e);
            if (!player.config.closeFocusVideoFocus) {
                player.video.focus();
            }
        }
        this.video.addEventListener('mousemove', this.mousemoveFunc);
        this.playFunc = function () {
            player.emit('focus');
            if (!player.config.closePlayVideoFocus) {
                player.video.focus();
            }
        }
        player.once('play', this.playFunc);

        this.getVideoSize = function () {
            if (this.video.videoWidth && this.video.videoHeight) {
                let containerSize = player.root.getBoundingClientRect();
                if (player.config.fitVideoSize === 'auto') {
                    if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
                        player.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`;
                    } else {
                        player.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`;
                    }
                } else if (player.config.fitVideoSize === 'fixWidth') {
                    player.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`;
                } else if (player.config.fitVideoSize === 'fixHeight') {
                    player.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`;
                }
            }
        }
        player.once('loadeddata', this.getVideoSize);

        setTimeout(() => {
            this.emit('ready');
            this.isReady = true;
        }, 0)

        if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
            ['video', 'controls'].forEach(item => {
                player[item].addEventListener('keydown', (e) => {
                    player.onKeydown(e, player);
                })
            })
        }
        if (this.config.videoInit) {
            if (util.hasClass(this.root, 'hkplayer-nostart')) {
                this.start();
            }
        }
        if (player.config.rotate) {
            player.on('requestFullscreen', this.updateRotateDeg);
            player.on('exitFullscreen', this.updateRotateDeg);
        }

        function onDestroy() {
            player.root.removeEventListener('mousemove', player.mousemoveFunc);
            player.off('destroy', onDestroy);
        }
        player.once('destroy', onDestroy);
    }

    start(url = this.config.url) {
        let root = this.root;
        let player = this;
        if (!url || url === '') {
            this.emit('urlNull');
        }
        this.logParams.playSrc = url;
        this.canPlayFunc = function () {
            player.off('canplay', player.canPlayFunc);
        }
        if (util.typeOf(url) === 'String') {
            if (url.indexOf('blob:') > -1 && url === this.video.src) {
                // 在Chromium环境下用mse url给video二次赋值会导致错误
            } else {
                this.video.src = url;
            }
        } else {
            url.forEach(item => {
                this.video.appendChild(util.createDom('source', '', {
                    src: `${item.src}`,
                    type: `${item.type || ''}`
                }))
            });
        }
        this.logParams.pt = new Date().getTime()
        this.logParams.vt = this.logParams.pt
        this.loadeddataFunc = function () {
            player.logParams.vt = new Date().getTime()
            if (player.logParams.pt > player.logParams.vt) {
                player.logParams.pt = player.logParams.vt
            }
            player.logParams.vd = player.video.duration
        }
        this.once('loadeddata', this.loadeddataFunc)
        if (this.config.autoplay) {
            this.on('canplay', this.canPlayFunc)
            let playPromise = player.video.play()
            if (playPromise !== undefined && playPromise) {
                playPromise.then(function () {
                    player.emit('autoplay started')
                }).catch(function () {
                    player.emit('autoplay was prevented')
                    Player.util.addClass(player.root, 'hkplayer-is-autoplay')
                })
            }
        }
        if (!this.config.disableStartLoad) {
            this.video.load()
        }
        root.insertBefore(this.video, root.firstChild)
        setTimeout(() => {
            this.emit('complete')
            if (this.danmu && typeof this.danmu.resize === 'function') {
                this.danmu.resize()
            }
        }, 1)
    }

    reload() {
        this.video.load()
        this.reloadFunc = function () {
            // eslint-disable-next-line handle-callback-err
            let playPromise = this.play()
            if (playPromise !== undefined && playPromise) {
                playPromise.catch(err => {})
            }
        }
        this.once('loadeddata', this.reloadFunc)
    }

    destroy(isDelDom = true) {
        let player = this
        clearInterval(this.bulletResizeTimer)
        for (let k in this._interval) {
            clearInterval(this._interval[k])
            this._interval[k] = null
        }
        if (this.checkTimer) {
            clearInterval(this.checkTimer)
        }
        if (this.waitTimer) {
            clearTimeout(this.waitTimer)
        }
        this.ev.forEach((item) => {
            let evName = Object.keys(item)[0]
            let evFunc = this[item[evName]]
            if (evFunc) {
                this.off(evName, evFunc)
            }
        });
        if (this.loadeddataFunc) {
            this.off('loadeddata', this.loadeddataFunc)
        }
        if (this.reloadFunc) {
            this.off('loadeddata', this.reloadFunc)
        }
        if (this.replayFunc) {
            this.off('play', this.replayFunc)
        }
        if (this.playFunc) {
            this.off('play', this.playFunc)
        }
        if (this.getVideoSize) {
            this.off('loadeddata', this.getVideoSize)
        };
        ['focus', 'blur'].forEach(item => {
            this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
        })
        if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
            ['video', 'controls'].forEach(item => {
                if (this[item]) {
                    this[item].removeEventListener('keydown', function (e) {
                        player.onKeydown(e, player)
                    })
                }
            })
        }

        function destroyFunc() {
            this.emit('destroy')
            // this.root.id = this.root.id + '_del'
            // parentNode.insertBefore(this.rootBackup, this.root)

            // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
            this.video.removeAttribute('src') // empty source
            this.video.load()
            if (isDelDom) {
                // parentNode.removeChild(this.root)
                this.root.innerHTML = ''
                let classNameList = this.root.className.split(' ')
                if (classNameList.length > 0) {
                    this.root.className = classNameList.filter(name => name.indexOf('hkplayer') < 0).join(' ')
                } else {
                    this.root.className = ''
                }
            }

            for (let k in this) {
                // if (k !== 'config') {
                delete this[k]
                // }
            }
            this.off('pause', destroyFunc)
        }

        if (!this.paused) {
            this.pause()
            this.once('pause', destroyFunc)
        } else {
            destroyFunc.call(this)
        }
        super.destroy()
    }

    replay() {
        let self = this
        let _replay = this._replay
        // ie9 bugfix
        util.removeClass(this.root, 'hkplayer-ended');
        this.logParams = {
            bc: 0,
            bu_acu_t: 0,
            played: [],
            pt: new Date().getTime(),
            vt: new Date().getTime(),
            vd: 0
        }
        this.logParams.pt = new Date().getTime()
        this.logParams.vt = this.logParams.pt
        this.replayFunc = function () {
            self.logParams.vt = new Date().getTime()
            if (self.logParams.pt > self.logParams.vt) {
                self.logParams.pt = self.logParams.vt
            }
            self.logParams.vd = self.video.duration
        }
        this.once('play', this.replayFunc)
        this.logParams.playSrc = this.video.currentSrc
        if (_replay && _replay instanceof Function) {
            _replay()
        } else {
            this.currentTime = 0
            // eslint-disable-next-line handle-callback-err
            let playPromise = this.play()
            if (playPromise !== undefined && playPromise) {
                playPromise.catch(err => {})
            }
        }
    }

    getFullscreen(el) {
        let player = this;
        if (el.requestFullscreen) {
            el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
        } else if (player.video.webkitSupportsFullscreen) {
            player.video.webkitEnterFullscreen()
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen()
        } else {
            util.addClass(el, 'hkplayer-is-cssfullscreen')
        }
    }
    // 退出全屏
    exitFullscreen(el) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
        util.removeClass(el, 'hkplayer-is-cssfullscreen')
    }
    // 开启原生画中画
    getVideoPip() {
        let player = this;
        if (player.video.requestPictureInPicture) {
            this.video.requestPictureInPicture().catch(err => {});
        }
        util.addClass(player.root, 'hkplayer-is-videopip');
    }
    // 退出原生画中画
    exitVideoPip() {
        let player = this;
        if (document.exitPictureInPicture) {
            document.exitPictureInPicture();
        }
        util.removeClass(player.root, 'hkplayer-is-videopip');
    }
    // css全屏
    getCssFullscreen() {
        let player = this;
        util.addClass(player.root, 'hkplayer-is-cssfullscreen');
        player.emit('requestCssFullscreen');
    }

    exitCssFullscreen() {
        let player = this
        // if (player.config.fluid) {
        //     player.root.style['width'] = '100%'
        //     player.root.style['height'] = '0'
        //     player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
        // }
        util.removeClass(player.root, 'hkplayer-is-cssfullscreen')
        player.emit('exitCssFullscreen')
    }

    getRotateFullscreen() {
        let player = this;
        document.documentElement.style.width = '100%';
        document.documentElement.style.height = '100%';
        if (player.root && !Player.util.hasClass(player.root, 'hkplayer-rotate-fullscreen')) {
            Player.util.addClass(player.root, 'hkplayer-rotate-fullscreen');
        }
        player.emit('getRotateFullscreen');
    }

    exitRotateFullscreen() {
        let player = this
        document.documentElement.style.width = 'unset'
        document.documentElement.style.height = 'unset'
        if (player.root && Player.util.hasClass(player.root, 'hkplayer-rotate-fullscreen')) {
            Player.util.removeClass(player.root, 'hkplayer-rotate-fullscreen')
        }
        player.emit('exitRotateFullscreen')
    }

    download() {
        const url = getAbsoluteURL(this.config.url);
        downloadUtil(url);
    }

    pluginsCall() {
        let self = this
        if (Player.plugins) {
            let ignores = this.config.ignores;
            Object.keys(Player.plugins).forEach(name => {
                let descriptor = Player.plugins[name];
                if (!ignores.some(item => name === item || name === 's_' + item)) {
                    if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
                        if (name === sniffer.device) {
                            setTimeout(() => {
                                descriptor.call(self, self);
                            }, 0)
                        }
                    } else {
                        descriptor.call(this, this)
                    }
                }
            })
        }
    }

    getPIP() {
        // 原生画中画开启的时候不允许小窗
        if (util.hasClass(this.root, 'hkplayer-pip-active')
        || util.hasClass(this.root, 'hkplayer-is-videopip')
        || localStorage.getItem('pipFlag') === '0') {
            return;
        }
        const pipSwitch = this.config.pip ? `<label class="pip-label">
            <span>不再出现</span>
            <div class="pip-label-tips">可在播放器设置中重新打开</div>
        </label>` : '';
        const dragLay = util.createDom('hk-pip-lay', 
        `
        ${pipSwitch}
        ${close}`, {}, 'hkplayer-pip-lay');
        const dragRange = util.createDom('div', '', {}, 'hkplayer-dragrange hiderange');
        this.root.appendChild(dragLay);
        const dragHandle = util.createDom('hk-pip-drag', '<p class="pip-text">按住画面可移动小窗</p>', {
            tabindex: 22
        }, 'hkplayer-pip-drag');
        this.root.appendChild(dragHandle);
        if (!util.findDom(document.body, '.hkplayer-dragrange')) {
            document.body.appendChild(dragRange);
        }
        // eslint-disable-next-line no-unused-vars
        let draggie = new Draggabilly('.hkplayer', {
            handle: '.hkplayer-pip-drag',
            containment: '.hkplayer-dragrange'
        });
        let scrollEvent = null;
        // 鼠标按下
        draggie.on('pointerDown', _ => {
            util.removeClass(document.querySelector('.hkplayer-dragrange'), 'hiderange');
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 拖拽的时候禁止页面滚动
            scrollEvent = () => window.scrollTo(0, scrollTop);
            window.addEventListener('scroll', scrollEvent, false);
        });
        // 鼠标抬起
        draggie.on('pointerUp', (e) => {
            const rect = this.root.getBoundingClientRect()
            const { top, left } = rect;
            window.removeEventListener('scroll', scrollEvent);
            // 记录上次移动位置
            sessionStorage.setItem('dragPos', JSON.stringify({
                left,
                top
            }));
            util.addClass(document.querySelector('.hkplayer-dragrange'), 'hiderange');
        });
        // 小窗默认宽高，左右位置
        let pipWidth = 426, pipHeight = 240, top, left;
        let prevPos = sessionStorage.getItem('dragPos');
        util.addClass(this.root, 'hkplayer-pip-active');
        if (this.config.fluid) {
            this.root.style['padding-top'] = '';
        }
        const { pipConfig } = this.config;
        if (pipConfig) {
            if (pipConfig.width !== undefined) {
                pipWidth = pipConfig.width;
            }
            if (pipConfig.height !== undefined) {
                pipHeight = pipConfig.height;
            }
            if (prevPos && pipConfig.prevPos) {
                let prevPosObj = JSON.parse(prevPos);
                top = prevPosObj.top;
                left = prevPosObj.left;
            }
            if (pipConfig.top !== undefined) {
                top = pipConfig.top;
                this.root.style.bottom = '';
            }
            if (pipConfig.bottom !== undefined) {
                this.root.style.bottom = pipConfig.bottom + 'px';
            }
            if (pipConfig.left !== undefined) {
                left = pipConfig.left;
                this.root.style.right = '';
            }
            if (pipConfig.right !== undefined) {
                this.root.style.right = pipConfig.right + 'px';
            }
        }
        this.root.style.top = top || top == 0 ? top + 'px' : '';
        this.root.style.left = left || left == 0 ? left + 'px' : '';
        this.root.style.width = pipWidth + 'px';
        this.root.style.height = pipHeight + 'px';
        // player.on('ready', () => {
        //     let pipactivePlay = util.findDom(this.controls, '.hkplayer-play');
        //     // 100 是控制条高度 + playicon高度， 居中显示playicon
        //     pipactivePlay.style.top = `${-(pipHeight - 52) / 2}px`;
        // });
        this.emit('pipchange', 'open');
        dragLay.addEventListener('click', (e) => {
            const curtentTar = e.target.tagName.toLocaleLowerCase();
            if (curtentTar === 'span' || curtentTar === 'label') {
                const pipSwitch = util.findDom(this.controls, '#pipSwitch');
                this.emit('pipBtnClick', pipSwitch);
            }
            e.preventDefault();
            e.stopPropagation();
            this.exitPIP();
        });
    }

    exitPIP() {
        util.removeClass(this.root, 'hkplayer-pip-active');
        this.root.style.right = '';
        this.root.style.bottom = '';
        this.root.style.top = '';
        this.root.style.left = '';
        if (this.config.fluid) {
            this.root.style['width'] = '100%';
            this.root.style['height'] = '0';
            this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`;
        } else {
            if (this.config.width) {
                if (typeof this.config.width !== 'number') {
                    this.root.style.width = this.config.width;
                } else {
                    this.root.style.width = `${this.config.width}px`;
                }
            }
            if (this.config.height) {
                if (typeof this.config.height !== 'number') {
                    this.root.style.height = this.config.height;
                } else {
                    this.root.style.height = `${this.config.height}px`;
                }
            }
        }

        let dragLay = util.findDom(this.root, '.hkplayer-pip-lay');
        if (dragLay && dragLay.parentNode) {
            dragLay.parentNode.removeChild(dragLay);
        }
        let dragHandle = util.findDom(this.root, '.hkplayer-pip-drag');
        if (dragHandle && dragHandle.parentNode) {
            dragHandle.parentNode.removeChild(dragHandle);
        }
        this.emit('pipchange', 'close');
    }

    updateRotateDeg() {
        let player = this;
        if (!player.rotateDeg) {
            player.rotateDeg = 0;
        }

        let width = player.root.offsetWidth;
        let height = player.root.offsetHeight;
        let targetWidth = player.video.videoWidth;
        let targetHeight = player.video.videoHeight;

        if (!player.config.rotate.innerRotate && player.config.rotate.controlsFix) {
            player.root.style.width = height + 'px';
            player.root.style.height = width + 'px';
        }

        let scale
        if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
            if (player.config.rotate.innerRotate) {
                if ((targetWidth / targetHeight) > (height / width)) { // 旋转后纵向撑满
                    let videoWidth = 0
                    if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
                        videoWidth = height * targetWidth / targetHeight
                    } else { // 旋转前是横向撑满
                        videoWidth = width
                    }
                    scale = height / videoWidth
                } else { // 旋转后横向撑满
                    let videoHeight = 0
                    if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
                        videoHeight = height
                    } else { // 旋转前是横向撑满
                        videoHeight = width * targetHeight / targetWidth
                    }
                    scale = width / videoHeight
                }
            } else {
                if (width >= height) {
                    scale = width / height
                } else {
                    scale = height / width
                }
            }
            scale = parseFloat(scale.toFixed(5))
        } else {
            scale = 1
        }

        if (player.config.rotate.innerRotate) {
            player.video.style.transformOrigin = 'center center'
            player.video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
            player.video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
        } else {
            if (player.config.rotate.controlsFix) {
                player.video.style.transformOrigin = 'center center'
                player.video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
                player.video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
            } else {
                player.root.style.transformOrigin = 'center center'
                player.root.style.transform = `rotate(${player.rotateDeg}turn) scale(${1})`
                player.root.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${1})`
            }
        }
    }

    rotate(clockwise = false, innerRotate = true, times = 1) {
        let player = this;
        if (!player.rotateDeg) {
            player.rotateDeg = 0
        }
        let factor = clockwise ? 1 : -1

        player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1
        this.updateRotateDeg()

        player.emit('rotate', player.rotateDeg * 360)
    }

    onFocus(e) {
        let player = this
        util.removeClass(this.root, 'hkplayer-inactive')
        if (player.userTimer) {
            clearTimeout(player.userTimer)
        }
        player.userTimer = setTimeout(function () {
            player.emit('blur');
        }, player.config.inactive);
    }

    onBlur() {
        // this.video.blur()
        if ((this.config.enablePausedInactive || !this.paused) && !this.ended && !this.config.closeInactive) {
            util.addClass(this.root, 'hkplayer-inactive')
        }
    }

    onPlay() {
        // util.addClass(this.root, 'hkplayer-isloading');
        util.addClass(this.root, 'hkplayer-playing');
        util.removeClass(this.root, 'hkplayer-pause');
    }

    onPause() {
        util.addClass(this.root, 'hkplayer-pause');
        if (this.userTimer) {
            clearTimeout(this.userTimer);
        }
        this.emit('focus');
    }

    onEnded() {
        util.addClass(this.root, 'hkplayer-ended')
        util.removeClass(this.root, 'hkplayer-playing')
    }

    onSeeking() {
        this.isSeeking = true
        // 兼容IE下无法触发waiting事件的问题 seeking的时候直接触发waiting
        this.onWaiting();
        // util.addClass(this.root, 'seeking');
    }

    onTimeupdate() {
        // for ie,playing fired before waiting
        if (this.waitTimer) {
            clearTimeout(this.waitTimer);
        }
        util.removeClass(this.root, 'hkplayer-isloading');

    }
    // seek完成
    onSeeked() {
        // for ie,playing fired before waiting
        this.isSeeking = false;
        if (this.waitTimer) {
            clearTimeout(this.waitTimer);
        }
        util.removeClass(this.root, 'hkplayer-isloading')
    }

    onWaiting() {
        let self = this
        if (self.waitTimer) {
            clearTimeout(self.waitTimer)
        }
        if (self.checkTimer) {
            clearInterval(self.checkTimer)
            self.checkTimer = null
        }
        let time = self.currentTime
        self.waitTimer = setTimeout(function () {
            util.addClass(self.root, 'hkplayer-isloading')
            self.checkTimer = setInterval(function () {
                if (self.currentTime !== time) {
                    util.removeClass(this.root, 'hkplayer-isloading')
                    clearInterval(self.checkTimer)
                    self.checkTimer = null
                }
            }, 1000)
        }, 500)
    }

    onPlaying() {
        // 兼容safari下无法自动播放会触发该事件的场景
        if (this.paused) {
            return
        }
        this.isSeeking = false
        if (this.waitTimer) {
            clearTimeout(this.waitTimer)
        }
        util.removeClass(this.root, 'hkplayer-isloading hkplayer-nostart hkplayer-pause hkplayer-ended hkplayer-is-error hkplayer-replay')
        util.addClass(this.root, 'hkplayer-playing')
    }

    onKeydown(event, player) {
        // let player = this
        let e = event || window.event;
        if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
            player.emit('focus');
        }
        if (e && (e.keyCode === 40 || e.keyCode === 38)) {
            if (player.controls) {
                let volumeSlider = player.controls.querySelector('.hkplayer-slider')
                if (volumeSlider) {
                    if (util.hasClass(volumeSlider, 'hkplayer-none')) {
                        util.removeClass(volumeSlider, 'hkplayer-none')
                    }
                    if (player.sliderTimer) {
                        clearTimeout(player.sliderTimer)
                    }
                    player.sliderTimer = setTimeout(function () {
                        util.addClass(volumeSlider, 'hkplayer-none')
                    }, player.config.inactive)
                }
            }
            if (e && e.keyCode === 40) { // 按 down
                if (player.volume - 0.1 >= 0) {
                    player.volume = parseFloat((player.volume - 0.1).toFixed(1))
                } else {
                    player.volume = 0
                }
            } else if (e && e.keyCode === 38) { // 按 up
                if (player.volume + 0.1 <= 1) {
                    player.volume = parseFloat((player.volume + 0.1).toFixed(1))
                } else {
                    player.volume = 1
                }
            }
        } else if (e && e.keyCode === 39) { // 按 right
            if (player.currentTime + 5 <= player.duration) {
                player.currentTime += 5
            } else {
                player.currentTime = player.duration - 1
            }
        } else if (e && e.keyCode === 37) { // 按 left
            if (player.currentTime - 5 >= 0) {
                player.currentTime -= 5
            } else {
                player.currentTime = 0
            }
        } else if (e && e.keyCode === 32) { // 按 spacebar
            if (player.paused) {
                // eslint-disable-next-line handle-callback-err
                let playPromise = player.play();
                if (playPromise !== undefined && playPromise) {
                    playPromise.catch(err => {})
                }
            } else {
                player.pause();
            }
        }
        e.stopPropagation();
        e.preventDefault();
    }

    get cumulateTime() {
        if (this.logParams && this.logParams.played instanceof Array) {
            const accTime = util.computeWatchDur(this.logParams.played) || 0
            return Number(accTime.toFixed(3))
        }
        return 0
    }

    static install(name, descriptor) {
        if (!Player.plugins) {
            Player.plugins = {}
        }
        if (!Player.plugins[name]) {
            Player.plugins[name] = descriptor
        }
    }

    static use(name, descriptor) {
        if (!Player.plugins) {
            Player.plugins = {}
        }
        Player.plugins[name] = descriptor
    }
}

Player.util = util
Player.sniffer = sniffer
Player.Errors = Errors

export default Player
