import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! 更改后需要清除浏览器缓存 
const setting: ProjectConfig = {
  // 是否显示配置按钮 
  showSettingButton: false,

  // 是否显示主题切换按钮 
  showDarkModeToggle: false,

  // `设置`按钮位置 
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 权限模式 
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // 权限相关的缓存存储在 sessionStorage 或 localStorage 
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 会话超时处理 
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 颜色 
  themeColor: primaryColor,

  // 网站灰色模式，为可能的哀悼日开放 
  grayMode: false,

  // 颜色弱点模式
  colorWeak: false,

  // 是否取消菜单、顶部、多标签页显示，为可能嵌入其他系统 
  fullContent: false,

  // 内容模式 
  contentMode: ContentEnum.FULL,

  // 是否显示标志 
  showLogo: true,

  // 是否显示页脚 
  showFooter: false,

  // 头部配置 
  headerSetting: {
    // 标题背景颜色 
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定在顶部 
    fixed: true,
    // 是否显示顶部 
    show: true,
    // 主题 
    theme: ThemeEnum.LIGHT,
    // 是否开启锁屏功能 
    useLockPage: true,
    // 是否显示全屏按钮 
    showFullScreen: false,
    // 是否显示文档按钮 
    showDoc: false,
    // 是否显示通知按钮 
    showNotice: true,
    // 是否显示菜单搜索 
    showSearch: false,
  },

  // 菜单配置 
  menuSetting: {
    // 侧边栏菜单背景颜色 
    bgColor: SIDE_BAR_BG_COLOR_LIST[3],
    // 是否修复左侧菜单 
    fixed: true,
    // 菜单折叠 
    collapsed: false,
    // 折叠菜单时是否显示菜单名称 
    collapsedShowTitle: false,
    // 是否可以拖动
    // 仅限于左侧菜单的打开，鼠标在菜单右侧有一个拖动条 
    canDrag: false,
    // 是否不显示dom 
    show: true,
    // 是否显示dom 
    hidden: false,
    // 菜单宽度 
    menuWidth: 202,
    //菜单模式 
    mode: MenuModeEnum.INLINE,
   //菜单类型 
    type: MenuTypeEnum.SIDEBAR,
   //菜单主题 
    theme: ThemeEnum.LIGHT,
   //拆分菜单 
    split: false,
   //顶部菜单布局 
    topMenuAlign: 'center',
    //折叠触发位置
    trigger: TriggerEnum.HEADER,
    //开启手风琴模式，只显示一个菜单
    accordion: true,
    //切换页面以关闭菜单 
    closeMixSidebarOnChange: false,
    //模块打开方法 ‘click’ | ‘hover’ 
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    //固定扩展菜单 
    mixSideFixed: false,
  },

  //多标签 
  multiTabsSetting: {
    cache: false,
    //打开 
    show: false,
    //是否可以拖放排序选项卡 
    canDrag: false,
    //开启快速动作
    showQuick: false,
    //是否显示刷新按钮 
    showRedo: false,
    //是否显示折叠按钮
    showFold: false,
  },

  //过渡设置 
  transitionSetting: {
    //是否开启页面切换动画
//禁用状态也会禁用 pageLoadinng 
    enable: true,

   //路由基本切换动画 
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    //是否开启页面切换加载
    //仅在 enable=true 时打开
    openPageLoading: true,

    // 是否打开页面切换顶部进度条
    openNProgress: true,
  },

  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: false,

  // 自动锁屏时间，为0不锁屏。 单位分钟 默认1个小时
  lockTime: 0,

  // 显示面包屑
  showBreadCrumb: false,

  // 是否显示面包屑图标
  showBreadCrumbIcon: false,

  // Use error-handler-plugin  是否使用错误处理插件
  useErrorHandle: true,

  // 是否开启回到顶部
  useOpenBackTop: true,

  //  是否可以嵌入iframe页面
  canEmbedIFramePage: true,

  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,

  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
};

export default setting;
