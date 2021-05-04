import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/file',
  name: 'File',
  component: LAYOUT,
  redirect: '/file/index',
  meta: {
    icon: 'ant-design:file-outlined',
    title: t('routes.dashboard.file'),
  },
  children: [
    {
      path: 'index',
      name: 'FilePage',
      component: () => import('/@/views/sys/file/index.vue'),
      meta: {
        title: t('routes.dashboard.file'),
        icon: 'ant-design:file-outlined',
      },
    },
  ],
};

export default dashboard;
