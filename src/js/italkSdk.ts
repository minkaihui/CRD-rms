import {
  User,
  Device,
  App,
  PcOtherSDK,
  File,
  Map,
  Is_Mobile
} from "italk-wapsdk";
import { Result } from "/@/models/result";
import util from "./util";
import config from '/@/api1/config';
export default {
  /**
   *判断是不是italk环境
   *
   * @returns
   */
  async isItalkSdkExist() {
    try {
      await User.GetUserInfo();
      return true;
    } catch (error) {
      return false;
    }
  },
  /**
   * 获取设备信息
   */
  async GetSystemInfo() {
    return await Device.GetSystemInfo();
  },
  /**
   * 获取italk用户信息
   */
  async getItalkUser() {
    var r = new Result();
    var italkR = await User.GetUserInfo();
    if (italkR.IsSuccess && italkR.Data != null) {
      r.Data = italkR.Data;
    } else {
      r.Success = false;
      r.Message = italkR.ErrorMessage;
    }
    return r;
  },
  /**
   * 扫一扫
   * @param onlyFromCamera 是否只从相机获取，不允许从相册选择图片
   * @param scanType  扫码的类型  qrCode:二维码  barCode:条码  datamatrix：DataMatrix  pdf417：pdf417
   */
  async italkScan(
    onlyFromCamera: boolean = false,
    scanType: Array<string> = ["qrCode", "barCode"]
  ) {
    var r = new Result();
    var italkR = await Device.ScanCode(onlyFromCamera, scanType);
    if (italkR.IsSuccess && italkR.Data != null) {
      r.Data = italkR.Data;
    } else {
      r.Success = false;
      r.Message = italkR.ErrorMessage;
    }
    return r;
  },
  /**
   *强制设置横屏
   *
   */
  async setHorizontalScreen() {
    await Device.LockOrientation("landscape");
  },
  /**
   *强制设置竖屏
   *
   */
  async setVerticalScreen() {
    await Device.LockOrientation("portrait");
  },

  /**
   *导出excel文件
   *
   * @param {*} rowsData  数据列
   * @param {*} colunms   表头配置
   * @param {string} fileName   文件名
   * @returns
   */
  async italkExportExcel(rowsData: any, colunms: any, fileName: string) {
    let italSdk = await PcOtherSDK.GetSdk();
    if (italSdk == null) {
      return "不是italk环境！";
    }
    var self = this;
    var options = {
      title: "保存导出结果",
      defaultPath: fileName,
      filters: [
        {
          name: "Excel文件",
          extensions: ["xlsx"]
        }
      ]
    };
    var savePath = await italSdk.SelectSaveFilePath(options);
    if (!savePath) {
      return null;
    }
    var headRow: Array<any> = [];
    util.each(colunms, function (index: number, item: any) {
      headRow.push({
        header: item.label,
        key: item.prop
      });
    });
    var excel = italSdk.GetExcelOperateObj();
    excel.AddRow(headRow, rowsData, "第一个sheet");
    excel.SaveToFile(savePath);
    return "";
  },

  /**
   *获取文件信息
   *
   * @param {*} filePath
   * @returns
   */
  async italkGetFileInfo(filePath: any) {
    return await File.GetFileInfo(filePath);
  },

  /**
   *获取文件信息
   *
   * @param {*} filePath
   * @param {*} key
   * @returns
   */
  async italkUploadfile(filePath: any, key: any) {
    let uploadResult: any = await File.Upload(
      filePath,
      key,
      (number: any) => { }
    );
    return uploadResult;
  },

  /**
   *获取文件信息
   *
   * @param {string} content
   * @returns
   */
  async italkPrintHtmle(
    content: string,
    width: number = 900,
    height: number = 900,
    showWaterMark: boolean
  ) {
    let pcOtherSDK: any = await PcOtherSDK.GetSdk();
    pcOtherSDK.PrintHtml(content, {
      width: width,
      height: height,
      showWaterMark: showWaterMark
    });
  },
  /**
   *获取文件信息
   *
   * @param {*} context
   * @returns
   */
  async italkCloseApp() {
    await App.Close();
  },

  async italkGetLocation() {
    var r = new Result();
    let rItalk = await Map.GetLocation("gcj02", false, false);
    if (!rItalk.IsSuccess) {
      r.Success = false;
      r.Message = rItalk.ErrorMessage;
      return r;
    }
    r.Data = rItalk.Data;
    return r;
  },
  // 选择文件
  ChooseImage() {
    return File.ChooseImage();
  },
  async IsMobile() {
    return Is_Mobile;
  },
  // 获取当前版本号
  async GetVersion() {
    var res = await App.GetVersion()
    if (res.Data) {
      return res.Data
    } else {
      return '未获取到版本号'
    }

  },
  // 获取水印
  async showWaterMark(userID: string, userName: string) {
    if (await this.isItalkSdkExist()) {
      await App.ShowWaterMark({ appId: config.AppID, userName: userName, userId: userID })
    }
  }
};
