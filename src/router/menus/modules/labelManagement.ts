import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const labelManagement: MenuModule = {
  orderNo: 7,
  menu: {
    path: '/labelManagement/index',
    name: t('routes.dashboard.labelManagement'),
  },
};
export default labelManagement;
