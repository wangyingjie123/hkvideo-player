## @baidu/haokan-mp4插件
一款可以节省流量，无缝清晰度切换的 mp4播放插件
### 开发
```
1、cd packages/hkplayer-mp4
2、npm i
3、npm run dev
```
### 使用
```
import Player from '@baidu/haokan-player';
import '@baidu/haokan-mp4';
const player = new Player({
    id: 'mse',
    src: 'xxxx.mp4',
    preloadTime: 15, // 提前加载x秒
    pluginRule: () => Player.sniffer.browser.name === 'Chrome', // 启用插件规则
});
```