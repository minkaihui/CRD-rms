import httpClient from '/@/api1/httpClient';
import { Result } from '/@/models/result';
import store from '@/store/index';
import { parcelApiUrl } from '/@/api1/apiConfig/parcelApiConfig';
import { globalConfig } from '/@/myBaseConfig';
export default {
  /**
   *
   * @param apiUrl 接口名
   * @param param  参数
   * @param isLoadingText  加载动画提示语  默认加载中
   */
  async apiPublic(apiUrl: any, param: any, isLoadingText = '加载中...') {
    const r = new Result();
    if ((store as any).state.commonStore.isLoading) {
      return;
    }
    store.commit('setLoading', { text: isLoadingText, isLoading: true });
    const res: any = await httpClient.Post(parcelApiUrl[apiUrl], param);
    if (res.Success) {
      r.Success = true;
      r.Message = res.Message;
      r.Data = res.Data;
    } else {
      r.Success = false;
      r.Message = res.Message;
      store.commit('setMessage', { type: 'error', message: res.Message });
    }
    store.commit('setLoading', { text: '', isLoading: false });
    return r;
  },
};
