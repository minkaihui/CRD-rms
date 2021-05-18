import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/recycleBin',
  name: 'RecycleBin',
  component: LAYOUT,
  redirect: '/recycleBin/index',
  meta: {
    icon: 'ant-design:delete-outlined',
    title: t('routes.dashboard.recycleBin'),
  },
  children: [
    {
      path: 'index',
      name: 'RecycleBinPage',
      component: () => import('/@/views/sys/recycleBin/index.vue'),
      meta: {
        title: t('routes.dashboard.recycleBin'),
        icon: 'ant-design:delete-outlined',
      },
    },
  ],
};

export default dashboard;
