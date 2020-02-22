<<<<<<< HEAD
# haokan-player
##1.代码库地址
[haokan-pc-player](http://icode.baidu.com/repos/baidu/haokan-fe/haokan-pc-player/tree/master)

##2.使用
```javascript { .theme-peacock }
npm install @baidu/hk-player
import Player from '@baidu/hk-player';  
const players = new Player({
    id: 'app',
    url: '',
    cssFullscreen: true, // 网页全屏
    fluid: true, // 流式布局
    autoplay,
});
```
##3.常用api
|属性名 | 含义 | 
|---|---|
|autoplay<input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">设置/返回 自动播放属性</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">buffered</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255);">返回当前缓冲的TimeRange对象集合</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">currentSrc</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255);">设置/返回视频播放地址</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">currentTime</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">设置/返回视频当前播放时间</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">error</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">视频错误信息，该错误会返回当前语言的文本</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">loop</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255);">是否开启了循环播放</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">muted</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">静音</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">pip</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">播放器画中画是否开启</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">readyState</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">返回视频的就绪状态</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">src</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255);">设置/返回当前视频的地址</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">volume</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">设置/返回视频的音量</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">root</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255);">播放器外层容器 DOM</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">controls</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal; background-color: rgb(246, 248, 250);">播放器控制条外层容器 DOM</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">fullscreen</span> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: normal;">播放器是否处于全屏状态</span> | 

##4.方法
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
Player.install('play',function(){}) // 插件的安装方法
player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]); // 清晰读切换
```
##5.事件
|事件名 | 含义 | 
|---|---|
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">play</span><input type="checkbox" class="rowselector hidden"> | 播放 | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">playing</span><input type="checkbox" class="rowselector hidden"> | <div style="text-align: start;">继续播放</div> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">pause</span><input type="checkbox" class="rowselector hidden"> | 暂停 | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">ended</span><input type="checkbox" class="rowselector hidden"> | 结束 | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">error</span><input type="checkbox" class="rowselector hidden"> | 错误 | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">seeking</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">seek播放</span><br> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal;">seeked</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">seek播放结束</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">timeupdate</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">播放时间改变</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">canplay</span><br><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">视频可以播放</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">canplaythrough</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">视频可以流畅播放</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">durationchange</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">时长发生变化</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal;">volumechange</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">音量发生变化</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">bufferedChange</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">缓冲发生变化</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal;">requestFullscreen</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">进入全屏</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">exitFullscreen</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">退出全屏</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">requestCssFullscreen</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(255, 255, 255);">进入样式全屏</span> | 
|<span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">exitCssFullscreen</span><input type="checkbox" class="rowselector hidden"> | <span style="color: rgb(0, 0, 0); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; text-align: start; white-space: normal; background-color: rgb(246, 248, 250);">退出样式全屏</span> | 
###事件注册/注销
####永久注册
```javascript { .theme-peacock }
player.on('事件名',function(){
  //事件名称可以在上述查询
=======
 
 


 
### Start

1. Install

    ```
    $ npm install xgplayer
    ```

2. Usage

    Step 1:

    ```html
    <div id="vs"></div>
    ```
    Step 2:

    ```js
    import Player from 'xgplayer';

    const player = new Player({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    ```

    This is the easiest way to configure the player, then it runs with video. For more advanced content, see the plug-in section or documentation. [more config](http://h5player.bytedance.com/en/config/)




### Plugins

xgplayer provides more plugins. Plugins are divided into two categories: one is self-starting, and another inherits the player's core class named xgplayer. In principle, the officially provided plug-ins are self-starting and the packaged third-party libraries are inherited. Some feature plug-ins themselves can provide a downgrade scenario that suggests a self-start approach, or an inheritance approach if not. The player supports custom plugins for more content viewing [plugins](http://h5player.bytedance.com/en/plugins/)

The following is how to use a self-starting plug-in：

```js
import Player from 'xgplayer';
import 'xgplayer-mp4';

const player = new Player({
    id: 'video',
    url: '//abc.com/test.mp4'
>>>>>>> dd4845450f90021b42adc8aa3a5bc26fa9f274c7
})
```
####一次注册
```javascript { .theme-peacock }
player.once('事件名',function(){

})
```
####事件注销
```javascript { .theme-peacock }
player.off('事件名',function(){

})
```
####事件触发
```javascript { .theme-peacock }
player.emit('事件名')
```




##6.自定义插件开发
```javascript { .theme-peacock }
// pluginName.js
import Player from '@baidu/hk-player';

let pluginName = function(player){
  // 插件逻辑
}

Player.install('pluginName', pluginName);
```

1、播放器的基本功能有，如：清晰度切换、画中画模式、流式布局、网页全屏
