import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/uploadMaterial',
  name: 'UploadMaterial',
  component: LAYOUT,
  redirect: '/uploadMaterial/index',
  meta: {
    icon: 'ant-design:folder-outlined',
    title: t('routes.dashboard.uploadMaterial'),
  },
  children: [
    {
      path: 'index',
      name: 'UploadMaterialPage',
      component: () => import('/@/views/sys/uploadMaterial/index.vue'),
      meta: {
        title: t('routes.dashboard.uploadMaterial'),
        icon: 'ant-design:folder-outlined',
      },
    },
  ],
};

export default dashboard;
