import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/sharedFolders',
  name: 'SharedFolders',
  component: LAYOUT,
  redirect: '/sharedFolders/index',
  meta: {
    icon: 'ant-design:folder-outlined',
    title: t('routes.dashboard.sharedFolders'),
  },
  children: [
    {
      path: 'index',
      name: 'SharedFoldersPage',
      component: () => import('/@/views/sys/sharedFolders/index.vue'),
      meta: {
        title: t('routes.dashboard.sharedFolders'),
        icon: 'ant-design:folder-outlined',
      },
    },
  ],
};

export default dashboard;
