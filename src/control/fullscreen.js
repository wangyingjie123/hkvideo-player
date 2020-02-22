import Player from '../player'
// 全屏
let fullscreen = function () {
	let player = this; let util = Player.util
	let iconPath = {
		active: 'M20.554,9.574a1.349,1.349,0,0,1-1.428-1.428V4.861H15.841a1.349,1.349,0,0,1-1.428-1.428,1.349,1.349,0,0,1,1.428-1.428h3.713a2.324,2.324,0,0,1,2.428,2.428V8.146A1.349,1.349,0,0,1,20.554,9.574Zm-1,3.856a1.349,1.349,0,0,1,1.428,1.428,1.349,1.349,0,0,1-1.428,1.428H18.269l3.285,3.285a1.38,1.38,0,0,1,0,2,1.381,1.381,0,0,1-2,0L16.27,18.285V19.57A1.349,1.349,0,0,1,14.841,21a1.349,1.349,0,0,1-1.428-1.428V15.857a2.407,2.407,0,0,1,2.428-2.428h3.713ZM8.129,10.574H4.415A1.349,1.349,0,0,1,2.987,9.145,1.349,1.349,0,0,1,4.415,7.717H5.7L2.416,4.433a1.38,1.38,0,0,1,0-2,1.381,1.381,0,0,1,2,0L7.7,5.718V4.433A1.349,1.349,0,0,1,9.128,3a1.431,1.431,0,0,1,1.428,1.428V8.146A2.407,2.407,0,0,1,8.129,10.574ZM3.415,14.429a1.349,1.349,0,0,1,1.428,1.428v3.285H8.129A1.431,1.431,0,0,1,9.557,20.57,1.349,1.349,0,0,1,8.129,22H4.415A2.324,2.324,0,0,1,1.987,19.57V15.857A1.349,1.349,0,0,1,3.415,14.429Z',
		default: 'M19.321,21.336H15.73a1.381,1.381,0,1,1,0-2.762h1.243L13.8,15.4a1.367,1.367,0,1,1,1.934-1.934l3.177,3.177V15.4a1.3,1.3,0,0,1,1.381-1.381A1.384,1.384,0,0,1,21.669,15.4v3.591A2.328,2.328,0,0,1,19.321,21.336ZM20.288,9.319a1.3,1.3,0,0,1-1.381-1.381V4.761H15.73A1.3,1.3,0,0,1,14.349,3.38,1.3,1.3,0,0,1,15.73,2h3.591a2.248,2.248,0,0,1,2.348,2.348V7.938A1.3,1.3,0,0,1,20.288,9.319Zm-11.05.967a1.254,1.254,0,0,1-.967-0.414L5.095,6.695V7.938A1.3,1.3,0,0,1,3.713,9.319,1.3,1.3,0,0,1,2.332,7.938V4.347A2.248,2.248,0,0,1,4.68,2H8.271A1.3,1.3,0,0,1,9.653,3.38,1.3,1.3,0,0,1,8.271,4.761H7.028l3.177,3.177a1.335,1.335,0,0,1,0,1.934A1.254,1.254,0,0,1,9.238,10.286ZM3.713,14.015A1.3,1.3,0,0,1,5.095,15.4v3.177H8.271a1.384,1.384,0,0,1,1.381,1.381,1.3,1.3,0,0,1-1.381,1.381H4.68a2.248,2.248,0,0,1-2.348-2.348V15.4A1.3,1.3,0,0,1,3.713,14.015Z'
	}
	let btn = util.createDom('hk-fullscreen', `<hk-icon class="hkplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="${iconPath.default}"></path>
        </svg></-icon>`, {}, 'hkplayer-fullscreen')
	let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '全屏' : 'Full screen'
	let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出全屏' : 'Exit full screen'
	let root = player.controls; let container = player.root
	let tips = util.createDom('hk-tips', tipsFull, {}, 'hkplayer-tips')
	let path = btn.querySelector('path')
	btn.appendChild(tips)
	let getFullscreen = function (el) {
		let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
		if (cssfullscreenDom) {
			cssfullscreenDom.style.display = 'none'
		}
		path.setAttribute('d', iconPath.active)
		tips.textContent = tipsExitFull
		if (el.requestFullscreen) {
			el.requestFullscreen()
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen()
		} else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
		} else if (player.video.webkitSupportsFullscreen) {
			player.video.webkitEnterFullscreen()
		} else if (el.msRequestFullscreen) {
			el.msRequestFullscreen()
		} else {
			util.addClass(el, 'hkplayer-fullscreen-active')
		}
	}
	let exitFullscreen = function (el) {
		let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
		let iconPath = {
			default: 'M18.562,22.5H5.439A3.867,3.867,0,0,1,1.5,18.562V5.439A3.867,3.867,0,0,1,5.439,1.5H18.562A3.867,3.867,0,0,1,22.5,5.439V18.562A3.867,3.867,0,0,1,18.562,22.5Zm1.312-17.06a1.24,1.24,0,0,0-1.312-1.312H5.439A1.24,1.24,0,0,0,4.127,5.439V18.562a1.24,1.24,0,0,0,1.312,1.312H18.562a1.24,1.24,0,0,0,1.312-1.312V5.439ZM17.75,18.562H15.125a1.312,1.312,0,1,1,0-2.625h1.312V14.625a1.312,1.312,0,0,1,2.625,0V17.25A1.24,1.24,0,0,1,17.75,18.562ZM9.876,8.064H8.564V9.376a1.24,1.24,0,0,1-1.312,1.312A1.24,1.24,0,0,1,5.939,9.376V6.751A1.24,1.24,0,0,1,7.251,5.439H9.876a1.24,1.24,0,0,1,1.312,1.312A1.24,1.24,0,0,1,9.876,8.064Z'
		}
		if (cssfullscreenDom) {
			let cssfullscreentTip = util.findDom(cssfullscreenDom, 'hk-tips')
			let path = cssfullscreenDom.querySelector('path')
			cssfullscreenDom.style.display = 'block'
			cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
			path.setAttribute('d', iconPath.default)
		}
		util.removeClass(el, 'hkplayer-cssfullscreen-active')
		util.removeClass(document.body, 'overhidden')
		path.setAttribute('d', iconPath.default)
		tips.textContent = tipsFull
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		} else {
			util.removeClass(el, 'hkplayer-fullscreen-active')
		}
	}
	root.appendChild(btn);
	['click', 'touchend'].forEach(item => {
		btn.addEventListener(item, function (e) {
			e.preventDefault()
			e.stopPropagation()
			if (util.hasClass(container, 'hkplayer-fullscreen-active') || util.hasClass(container, 'hkplayer-is-fullscreen')) {
				exitFullscreen(container)
			} else {
				getFullscreen(container)
			}
		})
	})
	player.video.addEventListener('webkitendfullscreen', () => {
		player.emit('exitFullscreen')
		path.setAttribute('d', iconPath.default)
	})

	let fullsrceenChangeEv = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
	fullsrceenChangeEv.forEach(item => {
		document.addEventListener(item, function (e) {
			e.preventDefault()
			e.stopPropagation()
			if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
				let cssfullscreenDom = util.findDom(player.controls, 'hk-cssfullscreen')
				let iconPath = {
					default: 'M18.562,22.5H5.439A3.867,3.867,0,0,1,1.5,18.562V5.439A3.867,3.867,0,0,1,5.439,1.5H18.562A3.867,3.867,0,0,1,22.5,5.439V18.562A3.867,3.867,0,0,1,18.562,22.5Zm1.312-17.06a1.24,1.24,0,0,0-1.312-1.312H5.439A1.24,1.24,0,0,0,4.127,5.439V18.562a1.24,1.24,0,0,0,1.312,1.312H18.562a1.24,1.24,0,0,0,1.312-1.312V5.439ZM17.75,18.562H15.125a1.312,1.312,0,1,1,0-2.625h1.312V14.625a1.312,1.312,0,0,1,2.625,0V17.25A1.24,1.24,0,0,1,17.75,18.562ZM9.876,8.064H8.564V9.376a1.24,1.24,0,0,1-1.312,1.312A1.24,1.24,0,0,1,5.939,9.376V6.751A1.24,1.24,0,0,1,7.251,5.439H9.876a1.24,1.24,0,0,1,1.312,1.312A1.24,1.24,0,0,1,9.876,8.064Z'
				}
				if (cssfullscreenDom) {
					let cssfullscreentTip = util.findDom(cssfullscreenDom, 'hk-tips')
					let path = cssfullscreenDom.querySelector('path')
					cssfullscreenDom.style.display = 'block'
					cssfullscreentTip.textContent = player.config.lang && player.config.lang === 'zh-cn' ? '网页全屏' : 'Full screen'
					path.setAttribute('d', iconPath.default)
				}
				util.removeClass(container, 'hkplayer-cssfullscreen-active')
				util.removeClass(document.body, 'overhidden')
				path.setAttribute('d', iconPath.default)
				tips.textContent = tipsFull
				util.removeClass(container, 'hkplayer-fullscreen-active')
			}
		})
	})

	let handle = function (e) {
		let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
		if (fullscreenEl && fullscreenEl === container) {
			util.addClass(container, 'hkplayer-is-fullscreen')
			path.setAttribute('d', iconPath.active)
			tips.textContent = tipsExitFull
			player.emit('requestFullscreen')
		} else {
			util.removeClass(container, 'hkplayer-is-fullscreen')
			path.setAttribute('d', iconPath.default)
			tips.textContent = tipsFull
			player.emit('exitFullscreen')
		}
	}

	btn.addEventListener('mouseenter', (e) => {
		e.preventDefault()
		e.stopPropagation()
		tips.style.left = '50%'
		let rect = tips.getBoundingClientRect()
		let rootRect = container.getBoundingClientRect()
		if (rect.right > rootRect.right) {
			tips.style.left = `${-rect.right + rootRect.right + 16}px`
		}
	});

	['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
		document.addEventListener(item, handle)
	})

	function destroyFunc() {
		['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
			document.removeEventListener(item, handle)
		})
		player.off('destroy', destroyFunc)
	}
	player.once('destroy', destroyFunc)
}

Player.install('fullscreen', fullscreen)
