## @baidu/haokan-flv插件
用于播放flv形式的直播、点播
### 使用
```
// 1、cdny引入
<script src="../packages/hkplayer/browser/index.js"></script>
<script src="../packages/hkplayer-flv/browser/index.js"></script>
const Player = window.FlvJsPlayer;
...
// 2、import引入
import '@baidu/haokan-player';
import FlvJsPlayer from '@baidu/haokan-flv';
// 使用
const player = new FlvJsPlayer({
    id: 'mse',
    autoplay: true,
    url: this.hlsUrl, // flv地址
    isLive: true, // 如果是直播的话传这个参数
    playReflow: true, // 暂停再播放是否需要重新拉流
    closeVideoClick: true, // 关闭video点击，建议直播传该参数
    flvOptionalConfig: {} // flv.js其他参数
    // https://github.com/bilibili/flv.js/blob/master/docs/api.md#config
});
// 方法
player.pullSteam(); // 重新拉流

```
// 备注
如果直播模式下有控制条控件不使用，比如音量volume，可以使用`ignores: ['volume']`禁止掉，或者直接写css
```
.hkplayer.hkplayer-islive {
    .hkplayer-volume {
        display: none;
    }
}
```