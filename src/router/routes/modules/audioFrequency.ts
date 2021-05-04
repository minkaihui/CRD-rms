import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/audioFrequency',
  name: 'AudioFrequency',
  component: LAYOUT,
  redirect: '/audioFrequency/index',
  meta: {
    icon: 'ant-design:sound-outlined',
    title: t('routes.dashboard.audioFrequency'),
  },
  children: [
    {
      path: 'index',
      name: 'AudioFrequencyPage',
      component: () => import('/@/views/sys/audioFrequency/index.vue'),
      meta: {
        title: t('routes.dashboard.audioFrequency'),
        icon: 'ant-design:sound-outlined',
      },
    },
  ],
};

export default dashboard;
