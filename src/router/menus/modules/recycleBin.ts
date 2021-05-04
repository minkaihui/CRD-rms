import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const recycleBin: MenuModule = {
  orderNo: 8,
  menu: {
    path: '/recycleBin/index',
    name: t('routes.dashboard.recycleBin'),
  },
};
export default recycleBin;
