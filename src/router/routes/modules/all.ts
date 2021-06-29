import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/all',
  name: 'All',
  component: LAYOUT,
  redirect: '/all/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:folder-outlined',
    title: t('routes.dashboard.all'),
    orderNo: 1,
  },
  children: [
    {
      path: 'index',
      name: 'AllPage',
      component: () => import('/@/views/sys/all/index.vue'),
      meta: {
        title: t('routes.dashboard.all'),
        icon: 'ant-design:folder-outlined',
      },
    },
  ],
};

export default dashboard;
