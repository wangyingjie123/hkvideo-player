/*
* @file 播放器实例化
* @author wangyingjie07
*/
/* eslint-disable */
import InitPlayer from './proxy';
import util from '../../hkplayer/src/utils/util';
import sniffer from '../../hkplayer/src/utils/sniffer';
import Errors from './error';
import packageInfo from '../package.json';
class Player extends InitPlayer {
    constructor(options) {
        super(options);
        this.config = util.deepCopy({
            fluid: true,
            ignores: [],
            whitelist: [],
            lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
            inactive: 3000,
            volume: 0.6,
            controls: true,
            closeVideoTouch: true,
            controlsList: ['nodownload']
        }, options);
        this.version = packageInfo.version;
        this.userTimer = null;
        this.waitTimer = null;
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
            this.root.style['max-width'] = '100%';
            this.root.style['width'] = '100%';
            this.root.style['height'] = '0';
            this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`;

            this.video.style['position'] = 'absolute';
            this.video.style['top'] = '0';
            this.video.style['left'] = '0';
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
    // 开始播放
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
            if (url.indexOf('blob:') > -1 && url === this.video.src || ((this.flvOpts || this.hlsOpts) && sniffer.browser.name === 'Chrome')) {
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
        this.logParams.pt = new Date().getTime();
        this.logParams.vt = this.logParams.pt;
        this.loadeddataFunc = function () {
            player.logParams.vt = new Date().getTime();
            if (player.logParams.pt > player.logParams.vt) {
                player.logParams.pt = player.logParams.vt;
            }
            player.logParams.vd = player.video.duration;
        }
        this.once('loadeddata', this.loadeddataFunc);
        if (this.config.autoplay) {
            this.on('canplay', this.canPlayFunc);
            let playPromise = player.video.play();
            if (playPromise !== undefined && playPromise) {
                playPromise.then(function () {
                    player.emit('autoplay started');
                }).catch(function () {
                    player.emit('autoplay was prevented');
                    Player.util.addClass(player.root, 'hkplayer-is-autoplay');
                })
            }
        }
        if (!this.config.disableStartLoad) {
            this.video.load();
        }
        root.insertBefore(this.video, root.firstChild);
        setTimeout(() => {
            this.emit('complete');
            if (this.danmu && typeof this.danmu.resize === 'function') {
                this.danmu.resize();
            }
        }, 1)
    }
    // 重新加载
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
    // 销毁播放器实例
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
                // bca-disable-line
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
    // 重播
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
    // 全屏模式
    getFullscreen(el) {
        let player = this;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT);
        } else if (player.video.webkitSupportsFullscreen) {
            player.video.webkitEnterFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else {
            util.addClass(el, 'hkplayer-is-cssfullscreen');
        }
    }
    // 退出全屏
    exitFullscreen(el) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    // 插件安装
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
    // 聚焦
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
        util.addClass(this.root, 'hkplayer-playing');
        util.removeClass(this.root, 'hkplayer-pause');
    }

    onPause() {
        util.addClass(this.root, 'hkplayer-pause');
        this.emit('pauseIconChange', 'pause');
        if (this.userTimer) {
            clearTimeout(this.userTimer);
        }
        this.emit('focus');
    }

    onEnded() {
        util.addClass(this.root, 'hkplayer-ended');
        util.removeClass(this.root, 'hkplayer-playing');
        this.emit('pauseIconChange', 'replay');
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

Player.util = util;
Player.sniffer = sniffer;
Player.Errors = Errors;

export default Player;
