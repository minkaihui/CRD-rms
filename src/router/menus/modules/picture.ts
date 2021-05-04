import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const picture: MenuModule = {
  orderNo: 2,
  menu: {
    path: '/picture/index',
    name: t('routes.dashboard.picture'),
  },
};
export default picture;
