import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/sharedFolders',
  name: 'SharedFolders',
  component: LAYOUT,
  meta: {
    title: t('routes.dashboard.sharedFolders'),
    icon: 'ant-design:plus-outlined',
  },
  children: [
    {
      path: 'index',
      name: 'SharedFoldersPage',
      meta: {
        title: t('routes.dashboard.sharedFolders'),
        icon: 'ant-design:plus-outlined',
        hideTab:true,
        ignoreKeepAlive:true
      },
    },
  ]
};

export default dashboard;
