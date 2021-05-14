import '/@/design/index.less';
import 'virtual:windi.css';

import { createApp } from 'vue';
import App from './App.vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import router, { setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';

//注册图标Sprite 
import 'vite-plugin-svg-icons/register';

//不按需引入本地开发吗？
//在本地开发的按需介绍中，浏览器请求的数量将增加约20％。
//这可能会减慢浏览器的刷新速度。
//因此，所有内容都在本地开发中引入，并且仅在生产环境中按需引入
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

(async () => {
  const app = createApp(App);

  //配置vuex存储 
  setupStore(app);

  //初始化内部系统配置 
  initAppConfigStore();

  //注册全局组件 
  registerGlobComp(app);

  //多语言配置 
  await setupI18n(app);

  //多语言配置 
  setupRouter(app);

  //路由器防护 
  setupRouterGuard();

  //注册全局指令 
  setupGlobDirectives(app);

  //配置全局错误处理
  setupErrorHandle(app);

  //路线准备好后挂载
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();

  app.mount('#app', true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
