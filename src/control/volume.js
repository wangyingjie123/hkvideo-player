import Player from '../player'
import SVG from '../utils/svg'

let volume = function () {
	let player = this; let util = Player.util; let sniffer = Player.sniffer;
	if (player.config.autoplayMuted) {
		player.config.volume = player.config.autoplay ? 0 : player.config.volume
	}

	function canplayVolFunc() {
		if (player.config.autoplay && player.config.autoplayMuted) {
			player.volume = 0
		} else {
			player.volume = player.config.volume
		}
	}
	player.once('canplay', canplayVolFunc)

	let volume = player.config.volume
	let iconPath = {
		small: 'M16.354,15.214a1.061,1.061,0,0,1-.405.08,1.071,1.071,0,0,1-.405-2.063,1.329,1.329,0,0,0,.805-1.127,1.23,1.23,0,0,0-.789-1.068,1.072,1.072,0,0,1,.763-2A3.335,3.335,0,0,1,18.5,12.1,3.44,3.44,0,0,1,16.354,15.214Z',
		muted: 'M22.7,9.934l-2.3,2.314,2.2,2.213a0.977,0.977,0,0,1,0,1.409,0.963,0.963,0,0,1-1.4,0L19,13.657l-2.3,2.314a0.963,0.963,0,0,1-1.4,0,0.977,0.977,0,0,1,0-1.408l2.3-2.314-2.2-2.213a0.977,0.977,0,0,1,0-1.409,0.963,0.963,0,0,1,1.4,0L19,10.84l2.3-2.314a0.963,0.963,0,0,1,1.4,0A0.977,0.977,0,0,1,22.7,9.934Z',
		large: 'M18.462,19.026a1.072,1.072,0,1,1-.886-1.952A5.778,5.778,0,0,0,20.849,12.1,7.427,7.427,0,0,0,18,6.449,1.072,1.072,0,1,1,19.241,4.7,9.562,9.562,0,0,1,23,12.1C23,16.925,18.648,18.943,18.462,19.026Zm-2.108-3.813a1.061,1.061,0,0,1-.405.08,1.071,1.071,0,0,1-.405-2.063,1.329,1.329,0,0,0,.805-1.127,1.23,1.23,0,0,0-.789-1.068,1.072,1.072,0,0,1,.763-2A3.335,3.335,0,0,1,18.5,12.1,3.44,3.44,0,0,1,16.354,15.214Z'
	}
	let v2s = (vol) => {
		let s = ''
		if (vol === 0) {
			s = 'muted'
		} else if (vol < 0.5) {
			s = 'small'
		} else {
			s = 'large'
		}
		return s
	}
	let curIocnPath = iconPath[v2s(volume)]
	let defaultPath = iconPath[v2s(volume)]
	let container = util.createDom('hk-volume', `<hk-icon class="hkplayer-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M11.972,21a1.223,1.223,0,0,1-.86-0.321L4.768,16.393H2.617A1.651,1.651,0,0,1,1,14.786V9.214A1.493,1.493,0,0,1,2.51,7.607H4.66L11,3.321A1.224,1.224,0,0,1,11.865,3a1.651,1.651,0,0,1,1.613,1.607V19.393A1.606,1.606,0,0,1,11.972,21ZM11.435,6.584a0.429,0.429,0,0,0-.666-0.356L5.628,9.643a0.808,0.808,0,0,1-.538.107H3.476a0.428,0.428,0,0,0-.429.427V13.93a0.428,0.428,0,0,0,.429.427H5.09a1.532,1.532,0,0,1,.645.214l5.029,3.4a0.429,0.429,0,0,0,.67-0.353V6.584Z"></path>
                                                        <path d="${defaultPath}"></path>
                                                    </svg>
                                                </hk-icon>
                                                <hk-slider class="hkplayer-slider" tabindex="2">
                                                    <hk-bar class="hkplayer-bar">
                                                        <hk-drag class="hkplayer-drag">
                                                            <kk-drag-dot class="hkplayer-drag-dot"></kk-drag-dot>
                                                        </hk-drag>
                                                    </hk-bar>
                                                </hk-slider>`,
		{}, 'hkplayer-volume'); let root = player.controls
	root.appendChild(container)
	let containerHeight
	let slider = container.querySelector('.hkplayer-slider')
	let bar = container.querySelector('.hkplayer-bar')
	let selected = container.querySelector('.hkplayer-drag')
	let icon = container.querySelector('.hkplayer-icon')
	selected.style.height = `${player.config.volume * 100}%`
	let path = container.querySelectorAll('path')[1]
	let svg = new SVG({
		progress: (shape, percent) => {
			let _p = svg.toSVGString(shape)
			path.setAttribute('d', _p)
			curIocnPath = _p
		},
		from: curIocnPath,
		to: iconPath['large']
	})
	let barSize = null
	let clickvolume = parseFloat(player.config.volume) || 0.6;
	slider.volume = parseFloat(player.config.volume) || 0.6;

	['touchstart', 'mousedown'].forEach(item => {
		bar.addEventListener(item, function (e) {
			e.preventDefault()
			e.stopPropagation()
			player.video.muted = false
			slider.focus()
			util.event(e)
			containerHeight = bar.getBoundingClientRect().height
			let pos = { x: e.clientX, y: e.clientY }; let height = selected.getBoundingClientRect().height; let isMove = false
			let move = function (e) {
				e.preventDefault()
				e.stopPropagation()
				util.event(e)
				isMove = true
				let w = height - e.clientY + pos.y
				let now = w / containerHeight
				selected.style.height = `${w}px`
				player.volume = Math.max(Math.min(now, 1), 0)
			}
			let up = function (e) {
				e.preventDefault()
				e.stopPropagation()
				util.event(e)
				window.removeEventListener('mousemove', move)
				window.removeEventListener('touchmove', move)
				window.removeEventListener('mouseup', up)
				window.removeEventListener('touchend', up)
				if (!barSize) {
					barSize = bar.getBoundingClientRect()
				}
				if (!isMove) {
					let w = barSize.height - (e.clientY - barSize.top)
					let now = w / barSize.height
					selected.style.height = `${w}px`
					if (now <= 0) {
						if (player.volume > 0) {
							selected.volume = player.video.volume
						} else {
							now = selected.volume
						}
					}
					player.volume = Math.max(Math.min(now, 1), 0.01)
				}
				slider.volume = player.volume
				if (player.volume) {
					clickvolume = player.volume
				}
				isMove = false
			}
			window.addEventListener('mousemove', move)
			window.addEventListener('touchmove', move)
			window.addEventListener('mouseup', up)
			window.addEventListener('touchend', up)
			return false
		})
	});

	['touchstart', 'mousedown'].forEach((item) => {
		icon.addEventListener(item, function (e) {
			e.preventDefault()
			e.stopPropagation()
			player.video.muted = false
			if (player.volume === 0) {
				player.volume = clickvolume
				slider.volume = clickvolume
			} else {
				player.volume = 0
			}
		})
	})

	icon.addEventListener('mouseenter', (e) => {
		e.preventDefault()
		e.stopPropagation()
		util.addClass(player.root, 'hkplayer-volume-active')
		container.focus()
	})

	container.addEventListener('blur', (e) => {
		e.preventDefault()
		e.stopPropagation()
		util.removeClass(player.root, 'hkplayer-volume-active')
	})

	container.addEventListener('mouseleave', (e) => {
		e.preventDefault()
		e.stopPropagation()
		util.removeClass(player.root, 'hkplayer-volume-active')
	})

	let _changeTimer = null
	function volumechangeFunc() {
		if (_changeTimer) {
			clearTimeout(_changeTimer)
		}
		_changeTimer = setTimeout(() => {
			svg.reset(iconPath[v2s(player.volume)], curIocnPath)
			curIocnPath = iconPath[v2s[player.volume]]
			if (!containerHeight) {
				containerHeight = bar.getBoundingClientRect().height || 76
			}
			selected.style.height = `${player.volume * containerHeight}px`
		}, 50)
	}
	player.on('volumechange', volumechangeFunc)

	function destroyFunc() {
		player.off('canplay', canplayVolFunc)
		player.off('volumechange', volumechangeFunc)
		player.off('destroy', destroyFunc)
	}
	player.once('destroy', destroyFunc)
}

Player.install('volume', volume)
