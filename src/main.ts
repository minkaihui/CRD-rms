import '/@/design/index.less';
import '/@/design/tailwind.css';

// Register icon sprite
import 'virtual:svg-icons-register';

import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';

// Do not introduce on-demand in local development?
// In the local development for introduce on-demand, the number of browser requests will increase by about 20%.
// Which may slow down the browser refresh.
// Therefore, all are introduced in local development, and only introduced on demand in the production environment
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
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
  setupRouterGuard(router);

  //注册全局指令
  setupGlobDirectives(app);

  //配置全局错误处理
  setupErrorHandle(app);

  //路线准备好后挂载
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
