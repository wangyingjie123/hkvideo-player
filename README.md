# hkvideo-player
## 1.安装
```
npm install hkvideo-player
```
## 2.使用
```javascript { .theme-peacock } 
import Player from 'hkvideo-player'
const players = new Player({
    id: 'app',
    url: '',
    cssFullscreen: true, // 网页全屏
    fluid: true, // 流式布局
    autoplay,
});
// 2、CDN方式引入
<script src="../browser/index.js" type="text/javascript"></script>
```
## 3.常用api
| 属性名 | 含义 | 值 |
|---|---|---|
| autoplay | 设置/返回 自动播放属性 |  true/false |
| buffered | 返回当前缓冲的TimeRange对象集合 | array |
| currentSrc | 设置/返回视频播放地址 | string |
| currentTime | 设置/返回视频当前播放时间 | number |
| error | 视频错误信息，该错误会返回当前语言的文本 | string |
| loop | 是否开启了循环播放 | true/false |
| muted | 静音 | true/false |
| pip | 播放器画中画是否开启 | true/false |
| readyState | 返回视频的就绪状态 | true/false |
| src | 设置/返回当前视频的地址 | string |
| volume | 设置/返回视频的音量 | 0~1浮点数 |
| root | 播放器外层容器 DOM | dom |
| controls | 播放器控制条外层容器 DOM | dom |
| fullscreen | 播放器是否处于全屏状态 | true/false |
| cssFullscreen | 播放器网页全屏 | true/false |
| ignores | 禁止掉某一个插件 | arr[string] |
| screenShot | 屏幕截图 | true/false |
| fluid | 流式布局（不需要设置宽高）| true/false |
| playbackRate | 倍速播放 | [0.75, 1, 1.5, 2] |
| diyDuration | 自定义总时长 | 秒：number |
| videopip | 开启原生video画中画 | true/false |

## 4.方法
```javascript { .theme-peacock }
player.play() // 播放
player.pause() // 暂停
player.reload() // 重新加载视频
player.destroy() // 播放器销毁
player.getBufferedRange() // 返回当前的缓冲片段时间范围，start表示缓冲起始时间，end表示缓存截止时间
player.getFullscreen(player.root) // 播放器进入全屏
player.exitFullscreen(player.root) // 播放器退出全屏
player.getCssFullscreen() // 播放器进入样式全屏
player.exitCssFullscreen() // 播放器退出样式全屏
player.getPIP() // 播放器获取画中画，可自定义触发画中画功能的条件，不局限于播放器控件中使用
player.exitPIP() // 播放器还原画中画，可自定义触发还原画中画功能的条件，不局限于播放器控件中使用
player.start(url) //  启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
player.replay() //  播放器重播，重播的组件就调用了这个方法
Player.install('play', function(){}) // 插件的安装方法
player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]); // 清晰读切换
```
## 5.事件
|事件名 | 含义 | 
|---|---|
| play | 播放 | 
| playing | 继续播放 | 
| pause | 暂停 | 
| ended | 结束 | 
| error | 错误 | 
| seeking | seek播放 | 
| seeked | seek播放结束 | 
| timeupdate | 播放时间改变 | 
| canplay | 视频可以播放 | 
| canplaythrough | 视频可以流畅播放 | 
| durationchange | 时长发生变化 | 
| volumechange | 音量发生变化 | 
| bufferedChange | 缓冲发生变化 | 
| requestFullscreen | 进入全屏 | 
| exitFullscreen | 退出全屏 | 
| requestCssFullscreen | 进入样式全屏 | 
| exitCssFullscreen | 退出样式全屏 | 
### 事件注册/注销
#### 永久注册
```javascript { .theme-peacock }
player.on('事件名',function(){
  //事件名称可以在上述查询
})
```
#### 一次注册
```javascript { .theme-peacock }
player.once('事件名',function(){

})
```
#### 事件注销
```javascript { .theme-peacock }
player.off('事件名',function(){

})
```
#### 事件触发
```javascript { .theme-peacock }
player.emit('事件名')
```




## 6.自定义插件开发
```javascript { .theme-dark }
// pluginName.js
import Player from 'hkvideo-player';

let pluginName = function(player){
  // 插件逻辑
}

Player.install('pluginName', pluginName);
```
