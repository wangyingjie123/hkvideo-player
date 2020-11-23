## hkplayer-hls插件
用于播放flv形式的直播、点播
### 使用
```
// 1、cdny引入
<script src="../packages/hkvideo-player/browser/index.js"></script>
<script src="../packages/hkvideo-player-flv/browser/index.js"></script>
const Player = window.FlvJsPlayer;
...
// 2、import引入
import 'hkvideo-player';
import FlvJsPlayer from 'hkvideo-player-flv';
// 使用
const player = new HlsJsPlayer({
    id: 'mse',
    autoplay: true,
    url: this.hlsUrl, // flv地址
    isLive: true, // 如果是直播的话传这个参数
    closeVideoClick: true, // 关闭video点击，建议直播传该参数
    flvOptionalConfig: {} // flv.js其他参数
    // https://github.com/bilibili/flv.js/blob/master/docs/api.md#config
});
```