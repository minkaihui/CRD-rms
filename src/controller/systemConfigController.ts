import { globalConfig } from '@/myBaseConfig';
import store from '@/store';
export default {
  //百度云上传根目录
  BcebosRootPath() {
    return store.getters.getSystemConfig(
      'BcebosRootPath',
      globalConfig.SystemConfigType.stringType
    );
  },
  //平安投保费率
  PABXFL() {
    return store.getters.getSystemConfig('PABXFL', globalConfig.SystemConfigType.floatType);
  },

  //平安投保单号长度
  PingAnCodeLength() {
    return store.getters.getSystemConfig(
      'PingAnCodeLength',
      globalConfig.SystemConfigType.stringType
    );
  },
};
