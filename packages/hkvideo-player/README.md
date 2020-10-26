# hkvideo-player
## 1.开发流程
- 推荐安装vscode插件 Live Server，在`example/index.html`右键Open width Live Server
- 启动项目`npm run dev`，即可实时刷新、预览
- 更多命令见`package.json`

## 2.使用文档
[hkvideo-player使用文档及API，戳这里😄](https://juejin.im/post/6883423886927462413)

## 3.更新日志
> @1.0.1（2020.10.15）
- 控制条消失/出现动画代替display:none动画 done
- enter和loading不需要同步, 视频初次播放沉浸式体验效果 done
- 屏幕截图按钮放右边、点击的时候加白色闪光动画， done
- 原生画中画模式  通过`videopip：true`开启 done
- 显示音量大小具体数值 done
- 自定义时长不生效修复diyDuraction  done
- 小窗模式重新调整—位置记忆、拖动时禁止页面滚动、只能在可视区域拖动@爱奇艺  done
- `enterLogo: ‘img’` 可配置--满足各团队logo定制需求 done
> @1.0.2（2020.10.20）
- 清晰度切换加提示，支持hkvideo-mp4插件
> @1.0.3（2020.10.26）
- 体验优化：鼠标位于控制条会触发focus事件，和其它播放器对齐不触发focus
- 升级webpack5.x，webpack-cli4.x，loader，开发效率更高，体积更小