import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const audioFrequency: MenuModule = {
  orderNo: 5,
  menu: {
    path: '/audioFrequency/index',
    name: t('routes.dashboard.audioFrequency'),
  },
};
export default audioFrequency;
