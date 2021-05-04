import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const file: MenuModule = {
  orderNo: 4,
  menu: {
    path: '/file/index',
    name: t('routes.dashboard.file'),
  },
};
export default file;
