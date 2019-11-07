import Player from '../player'

let cssFullscreen = function () {
  let player = this; let util = Player.util
  if (!player.config.cssFullscreen) {
    return
  }
  let iconPath = {
    active: 'M18.562,22.5H5.439A3.867,3.867,0,0,1,1.5,18.562V5.439A3.867,3.867,0,0,1,5.439,1.5H18.562A3.867,3.867,0,0,1,22.5,5.439V18.562A3.867,3.867,0,0,1,18.562,22.5Zm1.312-17.06a1.24,1.24,0,0,0-1.312-1.312H5.439A1.24,1.24,0,0,0,4.127,5.439V18.562a1.24,1.24,0,0,0,1.312,1.312H18.562a1.24,1.24,0,0,0,1.312-1.312V5.439Zm-2.625,10.5H15.938V17.25a1.24,1.24,0,0,1-1.312,1.312,1.24,1.24,0,0,1-1.312-1.312V14.625a1.24,1.24,0,0,1,1.312-1.312H17.25a1.24,1.24,0,0,1,1.312,1.312A1.24,1.24,0,0,1,17.25,15.938ZM9.376,10.688H6.751A1.24,1.24,0,0,1,5.439,9.376,1.24,1.24,0,0,1,6.751,8.064H8.064V6.751A1.24,1.24,0,0,1,9.376,5.439a1.24,1.24,0,0,1,1.312,1.312V9.376A1.24,1.24,0,0,1,9.376,10.688Z',
    default: 'M18.562,22.5H5.439A3.867,3.867,0,0,1,1.5,18.562V5.439A3.867,3.867,0,0,1,5.439,1.5H18.562A3.867,3.867,0,0,1,22.5,5.439V18.562A3.867,3.867,0,0,1,18.562,22.5Zm1.312-17.06a1.24,1.24,0,0,0-1.312-1.312H5.439A1.24,1.24,0,0,0,4.127,5.439V18.562a1.24,1.24,0,0,0,1.312,1.312H18.562a1.24,1.24,0,0,0,1.312-1.312V5.439ZM17.75,18.562H15.125a1.312,1.312,0,1,1,0-2.625h1.312V14.625a1.312,1.312,0,0,1,2.625,0V17.25A1.24,1.24,0,0,1,17.75,18.562ZM9.876,8.064H8.564V9.376a1.24,1.24,0,0,1-1.312,1.312A1.24,1.24,0,0,1,5.939,9.376V6.751A1.24,1.24,0,0,1,7.251,5.439H9.876a1.24,1.24,0,0,1,1.312,1.312A1.24,1.24,0,0,1,9.876,8.064Z'
  }
  let btn = util.createDom('hk-cssfullscreen', `<hk-icon class="hkplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="${iconPath.default}"></path>
        </svg></hk-icon>`, {}, 'hkplayer-cssfullscreen')
  let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
  let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出网页全屏' : 'Exit full screen'
  let root = player.controls; let container = player.root
  let tips = util.createDom('hk-tips', tipsFull, {}, 'hkplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)
  let getFullscreen = function (el) {
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    util.addClass(el, 'hkplayer-cssfullscreen-active')
    util.addClass(document.body, 'overhidden')
  }
  let exitFullscreen = function (el) {
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    util.removeClass(el, 'hkplayer-cssfullscreen-active')
    util.removeClass(document.body, 'overhidden')
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'hkplayer-cssfullscreen-active') || util.hasClass(container, 'hkplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })
    // 网页全屏退出
    document.onkeydown = function(ev) {
        const oEvent = ev || event;
        // Esc键的keyCode是27
        if (oEvent['keyCode'] !== 27) {
            return;
        }
        if (!util.hasClass(container, 'hkplayer-cssfullscreen-active')) {
            return;
        }
        exitFullscreen(container)
    };
}

Player.install('cssFullscreen', cssFullscreen)
