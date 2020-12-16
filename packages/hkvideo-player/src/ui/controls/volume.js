/* eslint-disable */
import Player from '../../player';
import volumePath from '../jsonpath/volumePath.json';
import SVG from '../../utils/svg';
let s_volume = function () {
    let player = this;
    let util = Player.util;
    let svgPath = null;
    let volume = player.config.volume;
    let svgType = 'from';
    let container = util.createDom('hk-volume',
        `<hk-icon class="hkplayer-icon">
            <div class="hkplayer-icon-large">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11.972,21a1.223,1.223,0,0,1-.86-0.321L4.768,16.393H2.617A1.651,1.651,0,0,1,1,14.786V9.214A1.493,1.493,0,0,1,2.51,7.607H4.66L11,3.321A1.224,1.224,0,0,1,11.865,3a1.651,1.651,0,0,1,1.613,1.607V19.393A1.606,1.606,0,0,1,11.972,21ZM11.435,6.584a0.429,0.429,0,0,0-.666-0.356L5.628,9.643a0.808,0.808,0,0,1-.538.107H3.476a0.428,0.428,0,0,0-.429.427V13.93a0.428,0.428,0,0,0,.429.427H5.09a1.532,1.532,0,0,1,.645.214l5.029,3.4a0.429,0.429,0,0,0,.67-0.353V6.584Z"></path>
                    <path class="path" d="${volume < 0.5 ? volumePath.to : volumePath.from}"></path>
                </svg>
            </div>
            <div class="hkplayer-icon-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11.972,21a1.223,1.223,0,0,1-.86-0.321L4.768,16.393H2.617A1.651,1.651,0,0,1,1,14.786V9.214A1.493,1.493,0,0,1,2.51,7.607H4.66L11,3.321A1.224,1.224,0,0,1,11.865,3a1.651,1.651,0,0,1,1.613,1.607V19.393A1.606,1.606,0,0,1,11.972,21ZM11.435,6.584a0.429,0.429,0,0,0-.666-0.356L5.628,9.643a0.808,0.808,0,0,1-.538.107H3.476a0.428,0.428,0,0,0-.429.427V13.93a0.428,0.428,0,0,0,.429.427H5.09a1.532,1.532,0,0,1,.645.214l5.029,3.4a0.429,0.429,0,0,0,.67-0.353V6.584Z"></path>
                    <path d="${volumePath.muted}"></path>
                </svg>
            </div>
        </hk-icon>
        <hk-slider class="hkplayer-slider" tabindex="2">
            <hk-volume-val class="hkplayer-volume-val"></hk-volume-val>
            <hk-bar class="hkplayer-bar">
                <hk-drag class="hkplayer-drag"></hk-drag>
            </hk-bar>
        </hk-slider>`,
    {}, 'hkplayer-volume pipnone');
    svgPath = container.querySelector('.path');
    let svg = new SVG({
        progress: (shape, percent) => {
            svgPath.setAttribute('d', svg.toSVGString(shape))
        },
        from: volumePath.from,
        to: volumePath.to,
        duration: 350
	});
    player.once('ready', () => {
        player.controls.appendChild(container);
    });
    let slider = container.querySelector('.hkplayer-slider');
    let bar = container.querySelector('.hkplayer-bar');
    let selected = container.querySelector('.hkplayer-drag');
    let icon = container.querySelector('.hkplayer-icon');
    let volumeVal = container.querySelector('.hkplayer-volume-val');
    selected.style.height = `${volume * 100}%`;
    volumeVal.innerText = 40;
    slider.volume = volume;
    player.on('changeVolPath', (type) => {
        if (type === 'large') {
            svgPath.setAttribute('d', volumePath.from);
            svgType = 'from';
        } else if (type === 'small') {
            svgPath.setAttribute('d', volumePath.to);
            svgType = 'to';
        }
    });
    bar.addEventListener('mousedown', e => {
        e.preventDefault();
        e.stopPropagation();
        player.emit('volumeBarClick', e);
    });

    ['click', 'touchend'].forEach(item => {
        icon.addEventListener(item, e => {
            e.preventDefault();
            e.stopPropagation();
            player.emit('volumeIconClick');
        });
    });

    icon.addEventListener('mouseenter', e => {
        e.preventDefault();
        e.stopPropagation();
        svgType === 'from' ? svg.reset(volumePath.from, volumePath.to) : svg.reset(volumePath.to, volumePath.from);
        player.emit('volumeIconEnter');
    });

    container.addEventListener('mouseleave', e => {
        e.preventDefault();
        e.stopPropagation();
        player.emit('volumeIconLeave');
    });
    player.on('blur', () => player.emit('volumeIconLeave'));
}

Player.install('s_volume', s_volume);
