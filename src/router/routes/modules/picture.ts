import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/picture',
  name: 'Picture',
  component: LAYOUT,
  redirect: '/picture/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:picture-outlined',
    title: t('routes.dashboard.picture'),
    orderNo: 2,
  },
  children: [
    {
      path: 'index',
      name: 'PicturePage',
      component: () => import('/@/views/sys/picture/index.vue'),
      meta: {
        title: t('routes.dashboard.picture'),
        icon: 'ant-design:picture-outlined',
      },
    },
  ],
};

export default dashboard;
