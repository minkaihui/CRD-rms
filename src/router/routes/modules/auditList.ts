import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/auditList',
  name: 'AuditList',
  component: LAYOUT,
  redirect: '/auditList/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:folder-outlined',
    title: t('routes.dashboard.auditList'),
    orderNo: 6,
  },
  children: [
    {
      path: 'index',
      name: 'AuditListPage',
      component: () => import('/@/views/sys/auditList/index.vue'),
      meta: {
        title: t('routes.dashboard.auditList'),
        icon: 'ant-design:folder-outlined',
      },
    },
  ],
};

export default dashboard;
