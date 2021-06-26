import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const auditList: MenuModule = {
  orderNo: 6,
  menu: {
    path: '/auditList/index',
    name: t('routes.dashboard.auditList'),
  },
};
export default auditList;
