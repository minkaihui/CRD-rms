import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const videoClip: MenuModule = {
  orderNo: 3,
  menu: {
    path: '/videoClip/index',
    name: t('routes.dashboard.videoClip'),
  },
};
export default videoClip;
