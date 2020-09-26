/* eslint-disable */
import Player from '../../player';
import DanmuJs from 'danmu.js';
import PanelIcon from '../assets/panel.svg';
let s_danmu = function () {
    let player = this
    let root = player.root
    let util = Player.util
    if (!player.config.danmu) {
        return
    }
    let container = util.createDom('hk-danmu', '', {}, 'hkplayer-danmu')
    player.once('ready', () => {
        root.appendChild(container)
    })
    let config = util.deepCopy({
        container,
        player: player.video,
        comments: [],
        area: {
            start: 0,
            end: 1
        }
    }, player.config.danmu)
    let panelBtn
    if (player.config.danmu.panel) {
        panelBtn = Player.util.createDom('hk-panel', `<hk-panel-icon class="hkplayer-panel-icon">
                                                ${PanelIcon}
                                              </hk-panel-icon>
                                              <hk-panel-slider class="hkplayer-panel-slider">
                                                <hk-hidemode class="hkplayer-hidemode">
                                                  <p class="hkplayer-hidemode-font">屏蔽类型</p>
                                                  <ul class="hkplayer-hidemode-radio">
                                                    <li class="hkplayer-hidemode-scroll" id="false">滚动</li><li class="hkplayer-hidemode-top" id="false">顶部</li><li class="hkplayer-hidemode-bottom" id="false">底部</li><li class="hkplayer-hidemode-color" id="false">色彩</li>
                                                  </ul>
                                                </hk-hidemode>
                                                <hk-transparency class="hkplayer-transparency">
                                                  <span>不透明度</span>
                                                  <input class="hkplayer-transparency-line hkplayer-transparency-color hkplayer-transparency-bar hkplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>
                                                </hk-transparency>
                                                <hk-showarea class="hkplayer-showarea">
                                                  <div class="hkplayer-showarea-name">显示区域</div>
                                                  <div class="hkplayer-showarea-control">
                                                    <div class="hkplayer-showarea-control-up">
                                                      <span class="hkplayer-showarea-control-up-item hkplayer-showarea-onequarters">1/4</span>
                                                      <span class="hkplayer-showarea-control-up-item hkplayer-showarea-twoquarters selected-color">1/2</span>
                                                      <span class="hkplayer-showarea-control-up-item hkplayer-showarea-threequarters">3/4</span>
                                                      <span class="hkplayer-showarea-control-up-item hkplayer-showarea-full">1</span>
                                                    </div>
                                                    <div class="hkplayer-showarea-control-down">
                                                      <div class="hkplayer-showarea-control-down-dots">
                                                        <span class="hkplayer-showarea-onequarters-dot"></span>
                                                        <span class="hkplayer-showarea-twoquarters-dot"></span>
                                                        <span class="hkplayer-showarea-threequarters-dot"></span>
                                                        <span class="hkplayer-showarea-full-dot"></span>
                                                      </div>
                                                      <input class="hkplayer-showarea-line hkplayer-showarea-color hkplayer-showarea-bar hkplayer-gradient" type="range" min="1" max="4" step="1" value="1">
                                                    </div>
                                                  </div>
                                                </hk-showarea>
                                                <hk-danmuspeed class="hkplayer-danmuspeed">
                                                  <div class="hkplayer-danmuspeed-name">弹幕速度</div>
                                                  <div class="hkplayer-danmuspeed-control">
                                                    <div class="hkplayer-danmuspeed-control-up">
                                                      <span class="hkplayer-danmuspeed-control-up-item hkplayer-danmuspeed-small">慢</span>
                                                      <span class="hkplayer-danmuspeed-control-up-item hkplayer-danmuspeed-middle selected-color">中</span>
                                                      <span class="hkplayer-danmuspeed-control-up-item hkplayer-danmuspeed-large">快</span>
                                                    </div>
                                                    <div class="hkplayer-danmuspeed-control-down">
                                                      <div class="hkplayer-danmuspeed-control-down-dots">
                                                        <span class="hkplayer-danmuspeed-small-dot"></span>
                                                        <span class="hkplayer-danmuspeed-middle-dot"></span>
                                                        <span class="hkplayer-danmuspeed-large-dot"></span>
                                                      </div>
                                                      <input class="hkplayer-danmuspeed-line hkplayer-danmuspeed-color hkplayer-danmuspeed-bar hkplayer-gradient" type="range" min="50" max="150" step="50" value="100">
                                                    </div>
                                                  </div>
                                                </hk-danmuspeed>
                                                <hk-danmufont class="hkplayer-danmufont">
                                                  <div class="hkplayer-danmufont-name">字体大小</div>
                                                  <div class="hkplayer-danmufont-control">
                                                    <div class="hkplayer-danmufont-control-up">
                                                      <span class="hkplayer-danmufont-control-up-item hkplayer-danmufont-small">小</span>
                                                      <span class="hkplayer-danmufont-control-up-item hkplayer-danmufont-middle">中</span>
                                                      <span class="hkplayer-danmufont-control-up-item hkplayer-danmufont-large selected-color">大</span>
                                                    </div>
                                                    <div class="hkplayer-danmufont-control-down">
                                                      <div class="hkplayer-danmufont-control-down-dots">
                                                        <span class="hkplayer-danmufont-small-dot"></span>
                                                        <span class="hkplayer-danmufont-middle-dot"></span>
                                                        <span class="hkplayer-danmufont-large-dot"></span>
                                                      </div>
                                                      <input class="hkplayer-danmufont-line hkplayer-danmufont-color hkplayer-danmufont-bar hkplayer-gradient" type="range" min="20" max="30" step="5" value="25">
                                                    </div>
                                                  </div>
                                                </hk-danmufont>
                                              </hk-panel-slider>`, {
            tabindex: 7
        }, 'hkplayer-panel')
        player.once('ready', () => {
            player.controls.appendChild(panelBtn)
        })
    }
    player.once('complete', () => {
        let danmujs = new DanmuJs(config)
        player.emit('initDefaultDanmu', danmujs)
        player.danmu = danmujs

        if (!player.config.danmu.panel) {
            return
        }

        let slider = panelBtn.querySelector('.hkplayer-panel-slider')
        let focusStatus
        let focusarray = ['mouseenter', 'touchend', 'click']
        focusarray.forEach(item => {
            panelBtn.addEventListener(item, function (e) {
                e.preventDefault()
                e.stopPropagation()
                Player.util.addClass(slider, 'hkplayer-panel-active')
                panelBtn.focus()
                focusStatus = true
            })
        })
        panelBtn.addEventListener('mouseleave', function (e) {
            e.preventDefault()
            e.stopPropagation()
            Player.util.removeClass(slider, 'hkplayer-panel-active')
            focusStatus = false
        })
        slider.addEventListener('mouseleave', function (e) {
            e.preventDefault()
            e.stopPropagation()
            if (focusStatus === false) {
                Player.util.removeClass(slider, 'hkplayer-panel-active')
            }
        })

        let danmuConfig = player.config.danmu
        let hidemodeScroll = panelBtn.querySelector('.hkplayer-hidemode-scroll')
        let hidemodeTop = panelBtn.querySelector('.hkplayer-hidemode-top')
        let hidemodeBottom = panelBtn.querySelector('.hkplayer-hidemode-bottom')
        let hidemodeColor = panelBtn.querySelector('.hkplayer-hidemode-color')
        let hidemodeArray = {
            'scroll': hidemodeScroll,
            'top': hidemodeTop,
            'bottom': hidemodeBottom,
            'color': hidemodeColor
        }
        for (let key in hidemodeArray) {
            let keys = key
            let ev = ['touchend', 'click']
            ev.forEach(item => {
                hidemodeArray[keys].addEventListener(item, function (e) {
                    if (hidemodeArray[keys].getAttribute('id') !== 'true') {
                        hidemodeArray[keys].style.color = '#f85959'
                        hidemodeArray[keys].setAttribute('id', 'true')
                        player.danmu.hide(keys)
                    } else {
                        hidemodeArray[keys].style.color = '#aaa'
                        hidemodeArray[keys].setAttribute('id', 'false')
                        player.danmu.show(keys)
                    }
                })
            })
        }
        let transparency = panelBtn.querySelector('.hkplayer-transparency-line')
        let transparencyGradient = panelBtn.querySelector('.hkplayer-transparency-gradient')
        let transparencyValue = 50
        transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)'
        transparency.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            transparencyValue = e.target.value
            transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)'
            danmuConfig.comments.forEach(item => {
                item.style.opacity = transparencyValue / 100
            })
        })
        let showarea = panelBtn.querySelector('.hkplayer-showarea-line')
        showarea.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            let showareaValue = e.target.value
            player.danmu.config.area.end = showareaValue / 100
            player.config.danmu.area.end = showareaValue / 100
            player.danmu.bulletBtn.main.channel.resize()
        })
        let danmuspeed = panelBtn.querySelector('.hkplayer-danmuspeed-line')
        danmuspeed.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            let danmuspeedValue = e.target.value
            danmuConfig.comments.forEach(item => {
                item.duration = (200 - danmuspeedValue) * 100
            })
        })
        let danmufont = panelBtn.querySelector('.hkplayer-danmufont-line')
        danmufont.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            let danmufontValue = e.target.value
            danmuConfig.comments.forEach(item => {
                item.style.fontSize = danmufontValue + 'px'
            })
        })
        if (navigator.userAgent.indexOf("Firefox") > -1) {
            for (let i = 0; i < slider.querySelectorAll('input').length; i++) {
                slider.querySelectorAll('input')[i].style.marginTop = '10px'
            }
        }
    })
}

Player.install('s_danmu', s_danmu)
