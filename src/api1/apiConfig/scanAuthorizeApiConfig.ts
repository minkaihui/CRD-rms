/*配置基础接口方法 */
import config from '../config';
export default {
  //获取italk授权二维码
  GetITalkAuthorizeQrCode: config.ScanAuthorizeHost + 'Account/GetITalkAuthorizeQrCode',
  //根据编号返回扫码授权结果
  GetITalkAuthorizeResult: config.ScanAuthorizeHost + 'Account/GetITalkAuthorizeResult',
};
