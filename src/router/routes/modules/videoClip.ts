import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/videoClip',
  name: 'VideoClip',
  component: LAYOUT,
  redirect: '/videoClip/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 3,
    icon: 'ant-design:play-circle-outlined',
    title: t('routes.dashboard.videoClip'),
  },
  children: [
    {
      path: 'index',
      name: 'VideoClipPage',
      component: () => import('/@/views/sys/videoClip/index.vue'),
      meta: {
        title: t('routes.dashboard.videoClip'),
        icon: 'ant-design:play-circle-outlined',
      },
    },
  ],
};

export default dashboard;
