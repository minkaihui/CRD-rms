import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/labelManagement',
  name: 'LabelManagement',
  component: LAYOUT,
  redirect: '/labelManagement/index',
  meta: {
    icon: 'ant-design:tag-outlined',
    title: t('routes.dashboard.labelManagement'),
  },
  children: [
    {
      path: 'index',
      name: 'LabelManagementPage',
      component: () => import('/@/views/sys/labelManagement/index.vue'),
      meta: {
        title: t('routes.dashboard.labelManagement'),
        icon: 'ant-design:tag-outlined',
      },
    },
  ],
};

export default dashboard;
