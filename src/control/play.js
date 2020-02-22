import Player from '../player'
import SVG from '../utils/svg'

let play = function () {
	let player = this
	let root = player.controls; let util = Player.util; let scale = player.config.iconScale || 0.0320625
	let iconPath = {
		play: 'M21.2,17.3l-9.8,5.9c-1.8,1.1-4.1,0.5-5.2-1.3c-0.4-0.6-0.5-1.3-0.5-2V8.1c0-2.1,1.7-3.8,3.8-3.8c0.7,0,1.4,0.2,2,0.5l9.8,5.9c1.8,1.1,2.4,3.4,1.3,5.2C22.2,16.5,21.7,16.9,21.2,17.3z',
		pause: 'M20.57,25.5a3.9,3.9,0,0,1-3.929-3.861V6.361a3.93,3.93,0,0,1,7.858,0V21.639A3.9,3.9,0,0,1,20.57,25.5Zm-13.14,0h0A3.9,3.9,0,0,1,3.5,21.639V6.361A3.9,3.9,0,0,1,7.431,2.5h0A3.9,3.9,0,0,1,11.36,6.361V21.639A3.9,3.9,0,0,1,7.431,25.5Z',
		replay: 'M11,5.8l0,2.1c0,0.3-0.2,0.6-0.5,0.6c-0.1,0-0.3,0-0.4-0.1L6.3,5C6.1,4.8,6,4.3,6.3,4c0,0,0,0,0.1-0.1,l3.7-3.3c0.2-0.2,0.6-0.2,0.8,0C10.9,0.8,11,1,11,1.1l0,2.2c4.3,0.2,7.8,3.8,7.8,8.2c0,4.6-3.7,8.2-8.2,8.2s-8.2-3.7-8.2-8.2,c0-1,0.2-2.1,0.6-3c0.3-0.6,1-1,1.6-0.7c0.6,0.3,1,1,0.7,1.6c-0.3,0.7-0.4,1.4-0.4,2.1c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8,C16.2,8.5,13.9,6,11,5.8z'
	}
	let playBtn = player.config.playBtn ? player.config.playBtn : {}
	let btn, path, svg
	if (playBtn.type === 'img') {
		btn = Player.util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height)
	} else {
		btn = util.createDom('hk-play', `<hk-icon class="hkplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <path fill="#fff" d="${iconPath.play}"></path>
          </svg></hk-icon>`, {}, 'hkplayer-play')
		path = btn.querySelector('path')
		svg = new SVG({
			progress: (shape, percent) => {
				path.setAttribute('d', svg.toSVGString(shape))
			},
			from: iconPath.pause,
			to: iconPath.play,
			duration: 50
		})
	}

	let tipsPlay = player.config.lang && player.config.lang === 'zh-cn' ? '播放' : 'Play'
	let tipsPause = player.config.lang && player.config.lang === 'zh-cn' ? '暂停' : 'Pause'
	let tipsReplay = player.config.lang && player.config.lang === 'zh-cn' ? '重播' : 'Replay'
	let tips = util.createDom('hk-tips', tipsPlay, {}, 'hkplayer-tips')
	btn.appendChild(tips)

	let ev = ['click', 'touchstart']
	root.appendChild(btn)
	ev.forEach(item => {
		btn.addEventListener(item, function (e) {
			e.preventDefault()
			e.stopPropagation()
			if (player.ended) {
				return false
			}
			if (player.paused) {
				player.play()
			} else {
				player.pause()
			}
		}, false)
	})

	function playFunc() {
		if (playBtn.type === 'img') {
			btn.style.backgroundImage = `url("${playBtn.url.pause}")`
		} else {
			setTimeout(() => {
				tips.textContent = tipsPause
				if (svg.to !== iconPath.pause) {
					svg.reset(iconPath.pause, iconPath.play)
				}
			}, 80)
		}
	}
	player.on('play', playFunc)

	function pauseFunc() {
		if (playBtn.type === 'img') {
			btn.style.backgroundImage = `url("${playBtn.url.play}")`
		} else {
			setTimeout(() => {
				tips.textContent = tipsPlay
				if (svg.to !== iconPath.play) {
					svg.reset(iconPath.play, iconPath.pause)
				}
			}, 80)
		}
	}
	player.on('pause', pauseFunc)
	function destroyFunc() {
		player.off('play', playFunc)
		player.off('pause', pauseFunc)
		player.off('destroy', destroyFunc)
	}
	player.once('destroy', destroyFunc)
}

Player.install('play', play)
