## hkplayer-hls插件
用于播放hls形式的直播、点播
### 开发
```
1、cd packages/hkplayer-hls
2、npm i
3、npm run dev
```
### 使用
```
import HlsJsPlayer from '@baidu/hkplayer-hls';
const player = new HlsJsPlayer({
    id: 'mse',
    autoplay: true,
    url: this.hlsUrl, // m3u8地址
    isLive: true, // 如果是直播的话传这个参数
    useHls: true, // 是否使用hls.js进行解码
    hlsOpts: {} // hls.js其他参数
});
```