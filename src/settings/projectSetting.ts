import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  // 是否显示SettingButton
  showSettingButton: false,

  // 是否显示主题切换按钮
  showDarkModeToggle: false,

  // 设置按钮位置 可选项
  // SettingButtonPositionEnum.AUTO: 自动选择  SettingButtonPositionEnum.HEADER:位于头部 SettingButtonPositionEnum.FIXED 固定在右侧
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 权限模式,默认前端角色权限模式
  permissionMode: PermissionModeEnum.ROLE,

  // 权限缓存存放位置。默认存放于localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 颜色
  themeColor: primaryColor,

  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,

  // 色彩弱化模式
  colorWeak: false,

  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: false,

  // 主题内容宽度
  contentMode: ContentEnum.FULL,

  // 是否显示logo
  showLogo: true,

  // 是否显示底部信息 copyright
  showFooter: false,

  // 头部配置
  headerSetting: {
    // 背景色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定头部
    fixed: true,
    // 是否显示顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 开启锁屏功能
    useLockPage: false,
    // 显示全屏按钮
    showFullScreen: false,
    // 显示文档按钮
    showDoc: false,
    // 显示消息中心按钮
    showNotice: false,
    // 显示菜单搜索按钮
    showSearch: false,
  },

  // 菜单配置
  menuSetting: {
    // 背景色
    bgColor: SIDE_BAR_BG_COLOR_LIST[3],
    //  是否固定住菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: true,
    // 是否可拖拽
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // 是否显示
    show: true,
    // Whether to show dom
    hidden: true,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发器的位置
    trigger: TriggerEnum.HEADER,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 在路由切换的时候关闭左侧混合菜单展开菜单
    closeMixSidebarOnChange: false,
    // 左侧混合菜单模块切换触发方式
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 是否固定左侧混合菜单
    mixSideFixed: true,
  },

  //多标签
  multiTabsSetting: {
    // 是否缓存
    cache: false,
    // 开启
    show: false,
    // 开启快速操作
    canDrag: false,
    // 是否可以拖拽
    showQuick: false,
    // 是否显示刷新那妞
    showRedo: false,
    // 是否显示折叠按钮
    showFold: false,
  },

  // 动画配置
  transitionSetting: {
    //是否开启切换动画
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // 是否打开页面切换顶部进度条
    openNProgress: true,
  },

  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: false,

  // 自动锁屏时间，为0不锁屏。 单位分钟 默认1个小时
  lockTime: 0,

  // 显示面包屑
  showBreadCrumb: true,

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
