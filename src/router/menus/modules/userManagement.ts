import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const userManagement: MenuModule = {
  orderNo: 8,
  menu: {
    path: '/userManagement/index',
    name: t('routes.dashboard.userManagement'),
  },
};
export default userManagement;
