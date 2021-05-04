import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const sharedFolders: MenuModule = {
  orderNo: 10,
  menu: {
    path: '/sharedFolders/index',
    name: t('routes.dashboard.sharedFolders'),
  },
};
export default sharedFolders;
