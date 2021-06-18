import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const uploadMaterial: MenuModule = {
  orderNo: 10,
  menu: {
    path: '/uploadMaterial/index',
    name: t('routes.dashboard.uploadMaterial'),
  },
};
export default uploadMaterial;
