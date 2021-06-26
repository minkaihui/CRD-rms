/**获取地址的同ts文件 */
import httpClient from "../httpClient";
import scanAuthorizeApiConfig from "../apiConfig/scanAuthorizeApiConfig";
import { Result } from "/@/models/result";
import { globalConfig } from "/@/myBaseConfig";
export default {
  /**
   *获取扫码登录的二维码路径
   *
   * @param {*} id 自定义编号
   * @param {string} systemName  登录系统名称
   * @param {string} loginPort   登录端口
   * @returns
   */
  GetScanLoginQrCodeSrc(id: any, systemName: string, loginPort: string) {
    return (
      scanAuthorizeApiConfig.GetITalkAuthorizeQrCode +
      "?businessFlagCode=" +
      id +
      "&businessType=" +
      globalConfig.ScanBusinessType.Login +
      "&SystemName=" +
      systemName +
      "&LoginPort=" +
      loginPort
    );
  },

  /*获取扫码授权的二维码路径
   *
   * @param {*} id 自定义编号
   * @param {string} authTypeName  授权类型名称
   * @returns
   */
  GetScanAuthQrCodeSrc(id: any, authTypeName: string) {
    return (
      scanAuthorizeApiConfig.GetITalkAuthorizeQrCode +
      "?businessFlagCode=" +
      id +
      "&businessType=" +
      globalConfig.ScanBusinessType.LSSAuth +
      "&AuthTypeName=" +
      authTypeName
    );
  },

  /**
   *获取扫码的结果
   *
   * @param {*} id 自定义的编号（可guid）
   */
  async GetScanAuthorizeResult(id: any) {
    let data: any = await httpClient.GetWithoutSDK(
      scanAuthorizeApiConfig.GetITalkAuthorizeResult,
      {
        businessFlagCode: id
      }
    );
    var r = new Result();
    if (data) {
      //   console.log(data.data);
      if (data.data.IsITalkReturn) {
        var result = JSON.parse(data.data.AuthorizeResult);
        console.log(result);
        // result.IsSuccess为flase是没有在手机按下授权按钮
        if (result.IsSuccess) {
          r.Success = true;
          r.Data = result.Data;
        } else {
          r.Success = false;
          // r.Message = "授权出错：" + result.ErrorMessage;
        }
      } else {
        r.Success = true;
        r.Message = "ITalk还未返回扫码信息 继续等待!";
        r.Data = null;
      }
    } else {
      r.Success = false;
      r.Message = "参数错误,请重新扫码！";
    }
    return r;
  }
};
