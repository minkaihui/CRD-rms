import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/uploadMaterial',
  name: 'UploadMaterial',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:upload-outlined',
    title: t('routes.dashboard.uploadMaterial'),
  },
  children: [
    {
      path: 'index',
      name: 'UploadMaterialPage',
      meta: {
        title: t('routes.dashboard.uploadMaterial'),
        icon: 'ant-design:upload-outlined',
        hideTab:true,
        ignoreKeepAlive:true
      },
    },
  ],
  beforeEnter: (to, from, next) => {
    next(false)
  }
};

export default dashboard;
