import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const all: MenuModule = {
  orderNo: 1,
  menu: {
    path: '/all/index',
    name: t('routes.dashboard.all'),
  },
};
export default all;
