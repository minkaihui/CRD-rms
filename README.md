
## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法
- [Vue-Vben-Admin](https://vvbin.cn/doc-next/) - Vue-Vben-Admin(二次封装Ant-Design-Vue)

## 安装使用

- 获取项目代码

```bash
git clone 
```

- 安装依赖

```bash
cd CRD-rms

yarn install

```

- 运行

```bash
yarn serve
```

- 打包

```bash
yarn build
```

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |


## 相关仓库

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - 用于在线切换主题色等颜色相关配置
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图


## 项目相关

### npm script
        "scripts": {
          # 安装依赖
          "bootstrap": "yarn install",
          # 运行项目
          "serve": "npm run dev",
          # 运行项目
          "dev": "vite",
          # 构建项目
          "build": "vite build && esno ./build/script/postBuild.ts",
          # 清空缓存后构建项目
          "build:no-cache": "yarn clean:cache && npm run build",
          # 生成打包分析，在`MacOS`电脑上执行完成后会自动打开界面，在`Window`电脑上执行完成后需要打开`./build/.cache/stats.html`查看
          "report": "cross-env REPORT=true npm run build",
          # 类型检查
          "type:check": "vue-tsc --noEmit --skipLibCheck",
          # 预览打包后的内容(先打包在进行预览)
          "preview": "npm run build && vite preview",
          # 直接预览本地 dist 文件目录
          "preview:dist": "vite preview",
          # 生成ChangeLog
          "log": "conventional-changelog -p angular -i CHANGELOG.md -s",
          # 删除缓存
          "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
          # 删除 node_modules (`window`系统手动删除该目录较慢，可以使用该命令来进行删除)
          "clean:lib": "rimraf node_modules",
          # 执行 eslint 校验,并修复部分问题
          "lint:eslint": "eslint \"{src,mock}/**/*.{vue,ts,tsx}\" --fix",
          # 执行 prettier 格式化，（该命令会对项目所有代码进行 prettier 格式化，请谨慎执行）
          "lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
          # 执行 stylelint 格式化
          "lint:stylelint": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
          "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
          "lint:pretty": "pretty-quick --staged",
          # 对打包结果进行gzip测试
          "test:gzip": "http-server dist --cors --gzip -c-1",
          # 对打包目录进行brotli测试
          "test:br": "http-server dist --cors --brotli -c-1",
          # 重新安装依赖，，见下方说明
          "reinstall": "rimraf yarn.lock && rimraf package.lock.json && rimraf node_modules && npm run bootstrap",
          "install:husky": "is-ci || husky install",
          # 生成图标集，见下方说明
          "gen:icon": "esno ./build/generate/icon/index.ts",
          "postinstall": "npm run install:husky"
        },

### 项目整体结构补充

- [Vue-Vben-Admin](https://vvbin.cn/doc-next/) 相关可详见Vue-Vben-Admin文档

        ├── build # 打包脚本相关
        │   ├── config # 配置文件
        │   ├── generate # 生成器
        │   ├── script # 脚本
        │   └── vite # vite配置
        ├── mock # mock文件夹
        ├── public # 公共静态资源目录
        ├── src # 主目录
        │   ├── api # 接口文件
        │   ├── assets # 资源文件
        │   │   ├── icons # icon sprite 图标文件夹
        │   │   ├── images # 项目存放图片的文件夹
        │   │   └── svg # 项目存放svg图片的文件夹
        │   ├── components # 公共组件
        │   │   ├── Page_RMS/PageContentWrapper  正中间组件
        │   │   └── Page_RMS/RightPageWrapper  右边组件
        │   ├── design # 样式文件
        │   ├── directives # 指令
        │   ├── enums # 枚举/常量
        │   ├── hooks # hook
        │   │   ├── component # 组件相关hook
        │   │   ├── core # 基础hook
        │   │   ├── event # 事件相关hook
        │   │   ├── setting # 配置相关hook
        │   │   └── web # web相关hook
        │   ├── layouts # 布局文件
        │   │   ├── default # 默认布局
        │   │   ├── iframe # iframe布局
        │   │   └── page # 页面布局
        │   ├── locales # 多语言
        │   ├── logics # 逻辑
        │   ├── main.ts # 主入口
        │   ├── router # 路由配置
        │   ├── settings # 项目配置
        │   │   ├── componentSetting.ts # 组件配置
        │   │   ├── designSetting.ts # 样式配置
        │   │   ├── encryptionSetting.ts # 加密配置
        │   │   ├── localeSetting.ts # 多语言配置
        │   │   ├── projectSetting.ts # 项目配置
        │   │   └── siteSetting.ts # 站点配置
        │   ├── store # 数据仓库
        │   ├── utils # 工具类
        │   └── views # 页面
        ├── test # 测试
        │   └── server # 测试用到的服务
        │       ├── api # 测试服务器
        │       ├── upload # 测试上传服务器
        │       └── websocket # 测试ws服务器
        ├── types # 类型文件
        ├── vite.config.ts # vite配置文件
        └── windi.config.ts # windcss配置文件


### 引用了其他的插件

- [viewerjs](https://fengyuanchen.github.io/viewerjs/) - 用于图片预览(项目中用到了全屏预览和局部预览互相切换)

###  VueUse

[https://vueuse.org/](https://vueuse.org/) 集合了很多常用好用方法，如防抖回流等等

    1.Animation
    2.Component
    3.Formatters 
    4.Misc
    5.Sensors
    6.State
    7.Utilities
    8.Watch
    
###  组件说明---注意

#### 1.使用Ant-Design-Vue组件时请查看 [https://2x.antdv.com/docs/vue/introduce-cn/](https://2x.antdv.com/docs/vue/introduce-cn/)文档
    
#### 2.使用Vue-Vben-Admin组件时请查看双文档 [https://vvbin.cn/doc-next/](https://vvbin.cn/doc-next/)        [https://2x.antdv.com/docs/vue/introduce-cn/](https://2x.antdv.com/docs/vue/introduce-cn/)

#### 3.使用Vue-Vben-Admin中 BasicModal弹框组件时请查看双文档和新增参数
    
    已经做了全局处理
    // 弹框上下线条处理
    .ant-modal-content .ant-modal-header {
     border-bottom: none ;
    }

    //弹框底部样式
    .ant-modal-content .ant-modal-footer {
    padding: 0;
    border-top: none;
    }
    
    新增参数
    名称                       类型                                     说明
    boxSizing               [Number,String](默认0)             所占弹框高度的上中下组件的padding和margin
    HeaderBorder            boolean(默认false)                 是否开启弹框头部和底部下划线
    LeftText                String(默认空不显示)               底部左边文字
    LeftExplainText         String(默认空)                     底部左边说明文字
    FooterStyle             CSSProperties                      底部Style
    HeaderStyle             CSSProperties                      头部Style
    FooterRound             String                             设置底部按钮形状，可选值为 circle、 round 或者不设        
    RButtonStyle            CSSProperties                      底部右边按钮Style


#### 3.使用Vue-Vben-Admin中 ScrollContainer滚动容器组件时请查看新增参数
    
    因原组件没有提供滚动事件

    新增参数
    名称                       类型                                     说明
    handleScroll             function(e,height)                         滚动事件
                             返回的第一个参数代表向上被覆盖的距离(Number)
                             返回的第二个参数代表滚动容器的整体高度(Number)
        

    另外新增自动高度方法     用于ScrollContainer滚动容器组件   填写固定高度时，解决无法使用百分比高度，项目中需要100%

    这里采用的是读取其他组件高度，赋值给ScrollContainer组件需要的固定高度
    适用于两个组件需保持高度一致
    getLeftPage和setLeftPage需要在store/locale 中注册获取方法和存储方法(这里采用vuex存储)
    
    自动高度页面
    <ScrollContainer :style="{ height: scrollHeight +'px' }"></ScrollContainer>

    import { HeightScroll } from '/@/utils/HeightScroll';  详见HeightScroll.ts（根据方法名自动读写）

    const {scrollHeight} = HeightScroll('getLeftPage')//传入获取方法名

    
    需要读取高度的页面       .ManageLeft是需要读取高度的DOM节点的类名也可以是ID
    import { setDOM } from '/@/utils/HeightScroll';
    setDOM('setLeftPage','.ManageLeft')//传入存储方法名








