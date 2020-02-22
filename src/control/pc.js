import Player from '../player'

let pc = function () {
	let player = this
	let util = Player.util; let controls = player.controls; let root = player.root
	let clk = 0; let _click_
	let centerBtn = player.config.centerBtn ? player.config.centerBtn : {}
	let iconPath, btn, path
	if (centerBtn.type === 'img') {
		btn = Player.util.createImgBtn('start', centerBtn.url.play, centerBtn.width, centerBtn.height)
	} else {
		iconPath = {
			pause: centerBtn.pausePath ? centerBtn.pausePath : 'M21.2,17.3l-9.8,5.9c-1.8,1.1-4.1,0.5-5.2-1.3c-0.4-0.6-0.5-1.3-0.5-2V8.1c0-2.1,1.7-3.8,3.8-3.8c0.7,0,1.4,0.2,2,0.5l9.8,5.9c1.8,1.1,2.4,3.4,1.3,5.2C22.2,16.5,21.7,16.9,21.2,17.3z',
			play: centerBtn.playPath ? centerBtn.playPath : 'M20.57,25.5a3.9,3.9,0,0,1-3.929-3.861V6.361a3.93,3.93,0,0,1,7.858,0V21.639A3.9,3.9,0,0,1,20.57,25.5Zm-13.14,0h0A3.9,3.9,0,0,1,3.5,21.639V6.361A3.9,3.9,0,0,1,7.431,2.5h0A3.9,3.9,0,0,1,11.36,6.361V21.639A3.9,3.9,0,0,1,7.431,25.5Z',
		}
		btn = util.createDom('hk-start', `
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <path d="${iconPath.pause}"></path>
          </svg>`, {}, 'hkplayer-start')
		path = btn.querySelector('path')
	}

	let enter = util.createDom('hk-enter', '<hk-enter-logo class="hkplayer-enter-logo"></hk-enter-logo><hk-enter-tips class="hkplayer-enter-tips"></hk-player-tips>', {}, 'hkplayer-enter')
	let logo = enter.querySelector('.hkplayer-enter-logo')
	root.appendChild(btn)
	root.appendChild(enter)
	let enterTips = enter.querySelector('.hkplayer-enter-tips')
	let enterLogo = new Image()
	enterLogo.onload = () => {
		enterTips.style.display = 'block'
	}
	if (player.config.enterLogo && player.config.enterLogo.url && player.config.enterLogo.width && player.config.enterLogo.height) {
		enterLogo.src = player.config.enterLogo.url

		logo.style.backgroundImage = `url("${player.config.enterLogo.url}")`
		logo.style.width = `${player.config.enterLogo.width}px`
		logo.style.height = `${player.config.enterLogo.height}px`

		logo.style.backgroundSize = `${player.config.enterLogo.width}px ${player.config.enterLogo.height}px`
		logo.style.margin = `-${player.config.enterLogo.height / 2}px auto auto -${player.config.enterLogo.width / 2}px`

		enterTips.style.margin = `${player.config.enterLogo.height - 6}px auto auto -62px`
	} else {
		enterLogo.src = util.getBgImage(logo)
	}

	if (player.config.enterTips && player.config.enterTips.background) {
		enterTips.style.background = `${player.config.enterTips.background}`
	}

	if (player.config.enterBg) {
		if (player.config.enterBg.url) {
			enter.style.backgroundImage = `url("${player.config.enterBg.url}")`
		} else if (player.config.enterBg.color) {
			enter.style.background = player.config.enterBg.color
		}
	}

	function startClcCanplay() {
		util.removeClass(root, 'hkplayer-is-enter')
	}

	function startClcPlaying() {
		util.removeClass(root, 'hkplayer-is-enter')
	}

	function startClc(e) {
		e.preventDefault()
		e.stopPropagation()
		// if (!player.config.url) {
		//   return
		// }
		if (util.hasClass(root, 'hkplayer-nostart')) {
			util.removeClass(root, 'hkplayer-nostart') // for ie quick switch
			util.addClass(root, 'hkplayer-is-enter')
			player.on('canplay', startClcCanplay)
			player.once('playing', startClcPlaying)
			if (!root.querySelector('video')) {
				player.start()
			}
			player.play()
		} else {
			if (player.paused) {
				util.removeClass(root, 'hkplayer-nostart hkplayer-isloading')
				setTimeout(() => {
					player.play()
				}, 10)
			}
		}
	};
	['click', 'touchend'].forEach(item => {
		btn.addEventListener(item, function (e) { startClc(e) }, false)
	})

	function startAniEnd(e) {
		e.preventDefault()
		util.removeClass(btn, 'hkplayer-start-interact')
		btn.style.display = 'none'
	}
	btn.addEventListener('animationend', function (e) { startAniEnd(e) })

	function playFunc() {
		if (centerBtn.type === 'img') {
			btn.style.backgroundImage = `url("${centerBtn.url.pause}")`
		} else {
			path.setAttribute('d', iconPath.pause)
		}
		btn.style.display = 'inline-block'
		util.addClass(btn, 'hkplayer-start-interact')
	}
	player.on('play', playFunc)

	function pauseFunc() {
		if (centerBtn.type === 'img') {
			btn.style.backgroundImage = `url("${centerBtn.url.play}")`
		} else {
			path.setAttribute('d', iconPath.play)
		}
		btn.style.display = 'inline-block'
		util.addClass(btn, 'hkplayer-start-interact')
	}
	player.on('pause', pauseFunc)

	player.onElementClick = function (e, element) {
		e.preventDefault()
		e.stopPropagation()
		let player = this
		if (!player.config.closeVideoClick) {
			clk++
			if (_click_) {
				clearTimeout(_click_)
			}
			if (clk === 1) {
				_click_ = setTimeout(function () {
					if (util.hasClass(player.root, 'hkplayer-nostart')) {
						return false
					} else if (!player.ended) {
						if (player.paused) {
							player.play()
						} else {
							player.pause()
						}
					}
					clk = 0
				}, 200)
			} else {
				clk = 0
			}
		}
	}
	player.video.addEventListener('click', function (e) { player.onElementClick(e, player.video) }, false)

	player.onElementDblclick = function (e, element) {
		e.preventDefault()
		e.stopPropagation()
		let player = this
		if (!player.config.closeVideoDblclick) {
			let fullscreen = controls.querySelector('.hkplayer-fullscreen')
			if (fullscreen) {
				let clk
				if (document.createEvent) {
					clk = document.createEvent('Event')
					clk.initEvent('click', true, true)
				} else {
					clk = new Event('click')
				}
				fullscreen.dispatchEvent(clk)
			}
		}
	}
	player.video.addEventListener('dblclick', function (e) { player.onElementDblclick(e, player.video) }, false)

	function mouseenterFunc() {
		clearTimeout(player.leavePlayerTimer)
		player.emit('focus', player)
	}
	root.addEventListener('mouseenter', mouseenterFunc, false)

	function mouseleaveFunc() {
		if (!player.config.closePlayerBlur) {
			player.leavePlayerTimer = setTimeout(function () {
				player.emit('blur', player)
			}, player.config.leavePlayerTime || 0)
		}
	}
	root.addEventListener('mouseleave', mouseleaveFunc, false)

	function cmouseenterFunc(e) {
		if (player.userTimer) {
			clearTimeout(player.userTimer)
		}
	}
	controls.addEventListener('mouseenter', cmouseenterFunc, false)

	function cmouseleaveFunc(e) {
		if (!player.config.closeControlsBlur) {
			player.emit('focus', player)
		}
	}
	controls.addEventListener('mouseleave', cmouseleaveFunc, false)

	function readyFunc(e) {
		if (player.config.autoplay) {
			player.start()
		}
	}
	player.once('ready', readyFunc)

	function destroyFunc() {
		player.off('canplay', startClcCanplay)
		player.off('playing', startClcPlaying)
		player.off('play', playFunc)
		player.off('pause', pauseFunc)
		player.off('ready', readyFunc)
		player.off('destroy', destroyFunc)
	}
	player.once('destroy', destroyFunc)
}

Player.install('pc', pc)
