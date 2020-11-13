/* eslint-disable */
import Player from 'hkvideo-player';
import Hls from 'hls.js';
import utils from './utils';
class HlsJsPlayer extends Player {
    constructor(options) {
        super(options);
        this.hlsOpts = options.hlsOpts || {};
        let util = Player.util;
        let player = this;
        this.browser = utils.getBrowserVersion();
        if (player.config.useHls === undefined) {
            if (Player.sniffer.device === 'mobile' && navigator.platform !== 'MacIntel' && navigator.platform !== 'Win32') {
                return
            } else if (this.browser.indexOf('Safari') > -1) {
                player.createLiveDom();
                return
            }
        } else if (!player.config.useHls) {
            return;
        }

        let hls;
        hls = new Hls(this.hlsOpts);
        this.hls = hls;

        Object.defineProperty(player, 'src', {
            get() {
                return player.currentSrc
            },
            set(url) {
                // util.removeClass(player.root, 'hkplayer-is-live');
                const liveDom = document.querySelector('.hkplayer-live');
                if (liveDom) {
                    liveDom.parentNode.removeChild(liveDom);
                }
                // player.config.url = url;
                const paused = player.paused;
                player.hls.stopLoad();
                player.hls.detachMedia();
                player.hls.destroy();
                player.hls = new Hls(player.hlsOpts);
                player.register();
                if (!paused) {
                    player.pause();
                    player.once('pause', () => {
                        player.hls.loadSource(url);
                    });
                } else {
                    player.hls.loadSource(url);
                }
                player.hls.attachMedia(player.video);
                player.once('canplay', () => {
                    player.currentTime = 0;
                    player.play().catch(err => {});
                })
            },
            configurable: true
        });
        this.register();
        this.once('complete', () => {
            hls.attachMedia(player.video);
            player.once('canplay', () => {
                player.play();
            });
            if (player.config.isLive) {
                Player.util.addClass(player.root, 'hkplayer-is-live');
            }
        });
        this.once('destroy', () => {
            hls.stopLoad();
        })
    }
    createLiveDom() {
        let player = this;
        // 目的是取消直播时单击视频暂停/播放事件
        player.config.closeVideoClick = true;
        Player.util.addClass(player.root, 'hkplayer-is-live');
        const live = Player.util.createDom('hk-live', `
            <hk-icon class="hkplayer-icon">
                <div class="hkplayer-icon-refresh">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                        <path d="M7.7244531,15.9890117 C8.31573144,17.8402901 9.72737117,19.4075916 11.6948776,20.1237054 C15.0682339,21.3515067 18.7982092,19.6121907 20.0260105,16.2388343 C20.3093493,15.4603674 21.1701128,15.0589868 21.9485797,15.3423256 C22.369653,15.4955837 22.6804008,15.8177811 22.8321392,16.2045147 C22.8991126,16.348457 22.9439009,16.5048609 22.9621092,16.669293 L22.9712948,16.8362369 L22.9712948,20.8118122 C22.9712948,21.6402393 22.2997219,22.3118122 21.4712948,22.3118122 C20.8054283,22.3118122 20.2408975,21.8779431 20.0449833,21.2774859 C17.5299461,23.3963605 13.9817144,24.1485792 10.6688171,22.9427833 C7.72633612,21.8718078 5.72741466,19.5035839 4.80753054,16.7102769 C4.57000548,15.9890117 4.80753054,15.0778397 5.77322429,14.8372141 C6.73891804,14.5965886 7.50158847,15.2912278 7.7244531,15.9890117 Z M17.0245418,5.0729201 C19.9670228,6.14389561 21.9659443,8.51211942 22.8858284,11.3054265 C23.1233534,12.0266917 22.8858284,12.9378636 21.9201346,13.1784892 C20.9544409,13.4191148 20.1917704,12.7244756 19.9689058,12.0266917 C19.3776275,10.1754132 17.9659878,8.60811173 15.9984814,7.89199796 C12.625125,6.66419665 8.89514969,8.40351269 7.66734838,11.7768691 C7.38400962,12.5553359 6.52324609,12.9567165 5.74477924,12.6733778 C5.32370594,12.5201196 5.01295813,12.1979222 4.86121974,11.8111887 C4.79424633,11.6672464 4.74945801,11.5108424 4.73124969,11.3464104 L4.72206414,11.1794665 L4.72206414,7.20389115 C4.72206414,6.37546403 5.39363701,5.70389115 6.22206414,5.70389115 C6.88793057,5.70389115 7.45246144,6.1377603 7.64837559,6.73821747 C10.1634129,4.61934286 13.7116446,3.86712413 17.0245418,5.0729201 Z" fill="#FFFFFF" fill-rule="nonzero" transform="translate(13.846679, 14.007852) scale(-1, 1) rotate(-155.000000) translate(-13.846679, -14.007852) "></path>
                    </svg>
                </div>
            </hk-icon>
            <hk-tips class="hkplayer-tips">
                <span class="hkplayer-tip-refresh">刷新</span>
            </hk-tips>`, {}, 'hkplayer-live');
        player.controls.appendChild(live);
        live.onclick = () => {
            Player.util.addClass(player.root, 'hkplayer-is-enter');
            player.src = player.config.url;
        }
    }
    register() {
        let hls = this.hls;
        let util = Player.util;
        let player = this;
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(player.config.url);
        });
        hls.on(Hls.Events.LEVEL_LOADED, (name, e) => {
            if (!hls.inited) {
                hls.inited = true;
                if (e && e.details && e.details.live) {
                    player.createLiveDom();
                }
            }
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hls.startLoad();
                        break
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError()
                        break
                    default:
                        player.emit('error', data)
                }
            }
        })
    }
}

HlsJsPlayer.isSupported = Hls.isSupported;

export default HlsJsPlayer;
