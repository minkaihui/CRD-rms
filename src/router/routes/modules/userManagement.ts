import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/userManagement',
  name: 'UserManagement',
  component: LAYOUT,
  redirect: '/userManagement/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:user-outlined',
    title: t('routes.dashboard.userManagement'),
    orderNo: 8,
  },
  children: [
    {
      path: 'index',
      name: 'UserManagementPage',
      component: () => import('/@/views/sys/userManagement/index.vue'),
      meta: {
        title: t('routes.dashboard.userManagement'),
        icon: 'ant-design:user-outlined',
      },
    },
  ],
};

export default dashboard;
