import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/sharedFolders',
  name: 'SharedFolders',
  component: LAYOUT,
  redirect: '/sharedFolders/index',
  meta: {
    title: t('routes.dashboard.sharedFolders'),
    icon: 'ant-design:plus-outlined',
  },
  children: [
    {
      path: 'index',
      name: 'SharedFoldersPage',
      component: () => import('/@/views/sys/sharedFolders/index.vue'),
      meta: {
        title: t('routes.dashboard.sharedFolders'),
        icon: 'ant-design:plus-outlined',
        hideTab:true,
        ignoreKeepAlive:true
      },
    },
  ],
  beforeEnter: (to, from, next) => {
    next(false)
  }
};

export default dashboard;
