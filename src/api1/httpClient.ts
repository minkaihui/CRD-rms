/* 基础访问封装层 */

import axios from 'axios';
import moment from 'moment';
import baseApiConfig from "./apiConfig/baseApiConfig";
import config from "./config";
import hsdk from "./hsdk";
import util from "/@/js/util";
import { globalConfig, storageKey } from "/@/myBaseConfig";
import { Result } from "/@/models/result";
import italkSdk from "/@/js/italkSdk";
import store from "@/store";
/**
 * Post可选参数
 */
type PostOptions = {
  /**
   * 是否需要带凭证
   */
  IsAuth: boolean;
  tryCount: number;
  ContentType:
    | "application/json"
    | "text/plain"
    | "multipart/form-data"
    | "application/x-www-form-urlencoded";
};

class AipResult<T> {
  /**

     * 错误信息
     */
  ErrorMessage: string | undefined;
  /**
   * 返回数据
   */
  Data!: T;
  ErrorCode: number | undefined;
  output: any;
}

class SDKResult<T> {
  Success: boolean = true;
  Message: string = "";
  Data?: T;
  Code: number = 0;
}

class HttpClient {
  //  Token
  private Token: string = "";
  $message: any;
  error: string | undefined;

  /**
   * 提交数据,如果Token过期会自动刷新Token
   * @param url 提交地址
   * @param postData 提交数据
   * @param options 可选参数
   */
  private async PostWapre(
    url: string,
    postData: any,
    options: PostOptions = {
      IsAuth: true,
      tryCount: 2,
      ContentType: "application/json",
    }
  ): Promise<any> {
    var postConfig = {
      headers: {
        "Content-Type": options.ContentType,
      },
    };
    var result = await axios({
      url: url,
      method: "post",
      headers: postConfig.headers,
      data: JSON.stringify(postData),
    });
    var { data } = result;
    return data;
  }

  /**
   *以非sdk POST方式访问后台
   *
   * @param {string} url  url配置
   * @param {object} postData  参数（以key-value传入）
   * @returns
   */
  async PostWithoutSDK(url: string, postData: object) {
    this.addSupmerManagerLog(url, postData);
    return await axios({
      url: url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: postData,
    });
  }

  /**
   *以非sdk GET方式访问后台
   *
   * @param {string} url  url配置
   * @param {object} getData  参数（以key-value传入）
   * @returns
   */
  async GetWithoutSDK(url: string, getData: object) {
    this.addSupmerManagerLog(url, getData);
    return await axios.get(url, { params: getData });
  }

  /**
   * Hsdk方式数据交互
   * @param url 提交地址
   * @param postData 提交的数据对象
   */
  async Post<T>(url: string, postData: object) {
    //初始化skd  没有登录方法前临时使用
    hsdk.config(
      {
        app_key: "123456",
        authorizetype: "UserName", //必填， 授权类型UserName, Code
      },
      {
        tokenurl: config.TokenHost,
        // code: scanCodeKey  //授权类型为Code
        userid: "123", //授权类型为UserName
        password: "123", //授权类型为UserName
      }
    );
    //去掉分页条件中的空值
    if (
      !!postData &&
      !!(postData as any).page &&
      !!(postData as any).page.QueryConditions
    ) {
      var lastQueryConditions = util.grep(
        (postData as any).page.QueryConditions,
        function(item: any, index: number) {
          return (
            !!item.Values && item.Values.length > 0 && item.Values[0] != ""
          );
        }
      );
      (postData as any).page.QueryConditions = lastQueryConditions;
    }

    //去掉分页条件中的空值
    if (
      !!postData &&
      !!(postData as any).req &&
      !!(postData as any).req.QueryConditions
    ) {
      var lastQueryConditions = util.grep(
        (postData as any).req.QueryConditions,
        function(item: any, index: number) {
          return (
            !!item.Values && item.Values.length > 0 && item.Values[0] + "" != ""
          );
        }
      );
      (postData as any).req.QueryConditions = lastQueryConditions;
    }
    //去掉分页条件中的空值
    if (
      !!postData &&
      !!(postData as any).model &&
      !!(postData as any).model.QueryConditions
    ) {
      var lastQueryConditions = util.grep(
        (postData as any).model.QueryConditions,
        function(item: any, index: number) {
          return (
            !!item.Values && item.Values.length > 0 && item.Values[0] + "" != ""
          );
        }
      );
      (postData as any).model.QueryConditions = lastQueryConditions;
    }
    //去掉分页条件中的空值
    if (
      !!postData &&
      !!(postData as any).dto &&
      !!(postData as any).dto.QueryConditions
    ) {
      var lastQueryConditions = util.grep(
        (postData as any).dto.QueryConditions,
        function(item: any, index: number) {
          return (
            !!item.Values && item.Values.length > 0 && item.Values[0] + "" != ""
          );
        }
      );
      (postData as any).dto.QueryConditions = lastQueryConditions;
    }
    this.addSupmerManagerLog(url, postData);
    let result = await hsdk.request(url, postData);
    return result as SDKResult<T>;
  }

  async addSupmerManagerLog(url: string, postData: any) {
    let superManager = localStorage.getItem(storageKey.superAdministratorKey);
    if (!!superManager) {
      //初始化skd  没有登录方法前临时使用
      hsdk.config(
        {
          app_key: "123456",
          authorizetype: "UserName", //必填， 授权类型UserName, Code
        },
        {
          tokenurl: config.TokenHost,
          // code: scanCodeKey  //授权类型为Code
          userid: "123", //授权类型为UserName
          password: "123", //授权类型为UserName
        }
      );
      let deviceInformation: any = {};
      // 获取登录设备信息
      let deviceInformationStr = sessionStorage.getItem("DeviceInformation");
      if (deviceInformationStr) {
        deviceInformation = JSON.parse(deviceInformationStr);
      }
      let userInfo = JSON.parse(
        localStorage.getItem(storageKey.userInfoKey) || "{}"
      );
      if (!!userInfo && !!userInfo.UserID) {
        let logInfo = {
          SuperUserID: superManager,
          UserID: userInfo.UserID,
          userName: userInfo.UserName,
          HandleApi: url,
          HandleText: JSON.stringify(postData),
          HandleTime: new Date(),
          HandleSource: deviceInformation.platform || "无法识别",
          HandleApp: "LSS",
        };
        hsdk.request(baseApiConfig.AddSuperMangerLogList, {
          dtoList: [logInfo],
        });
      }
    }
  }

  /**
   * 用户登录
   * @param userName
   * @param password
   */
  async Login(context: any, param: any) {
    var self = this;
    let params: any = {
      UserName: param.username,
      Password: param.password,
      ShopCode: "",
      AppType: "APP05",
    };

    hsdk.config(
      {
        app_key: "123456",
        // authorizetype: "UserName", //必填， 授权类型UserName, Code
      },
      {
        tokenurl: config.TokenHost,
        userid: param.username, //授权类型为UserName
        password: param.password, //授权类型为UserName
      }
    );

    var result: any = await self.Post(baseApiConfig.LoginAsync, params);
    if (result.Success) {
      this.LoginSuccessHandale(context, result);
    }
    return result;
  }
  /**
   * 免登录获取用户信息
   * @param userName
   * @param password
   * @param isJumpAdmin  是否跳过管理员
   */
  async GetRtsUserInfoByName(
    context: any,
    username: string,
    isJumpAdmin: boolean = false
  ) {
    var self = this;
    let params: any = {
      UserName: username,
      IsJumpAdmin: isJumpAdmin,
      AppType: "APP05",
    };

    hsdk.config(
      {
        app_key: "123456",
        // authorizetype: "UserName", //必填， 授权类型UserName, Code
      },
      {
        tokenurl: config.TokenHost,
        userid: username, //授权类型为UserName
        password: username, //授权类型为UserName
      }
    );

    var result: any = await self.Post(
      baseApiConfig.GetRtsUserInfoByName,
      params
    );
    if (result.Success) {
      this.LoginSuccessHandale(context, result);
    }
    return result;
  }

  LoginSuccessHandale(context: any, result: any) {
    let userinfo = JSON.parse(result.Data.Data);
    let shopInfo: any = {};
    let roleList: any = []; //用户角色列表
    let franchiseeList: any = []; //加盟商列表
    let relationShopList: any = []; //加盟商关联门店列表
    let relationLocationList: any = []; //物流关联门店
    let isOfficeAdminLogin: boolean = result.Data.isOfficeAdminLogin;
    if (result.Data.shopInfo) {
      shopInfo = JSON.parse(result.Data.shopInfo);
    }
    if (result.Data.roleList) {
      roleList = JSON.parse(result.Data.roleList);
    }
    if (result.Data.franchiseeList) {
      franchiseeList = JSON.parse(result.Data.franchiseeList);
    }
    if (result.Data.relationShopList) {
      relationShopList = JSON.parse(result.Data.relationShopList);
    }
    if (result.Data.relationLocationList) {
      relationLocationList = JSON.parse(result.Data.relationLocationList);
    }
    if (!userinfo.ShopCode && shopInfo && shopInfo.ShopCode) {
      userinfo.ShopCode = shopInfo.ShopCode;
      userinfo.ShopName = shopInfo.ShopName;
    }
    var lastUserInfo = {
      UserID: userinfo.UserID, //用户ID
      UserName: userinfo.UserName, //用户名称
      ECode: userinfo.ECode, //用户工号
      EName: userinfo.EName, //用户工号
      TenantID: userinfo.TenantID, //租户ID
      TenantName: userinfo.TenantName,
      ShopCode: userinfo.ShopCode,
      ShopName: userinfo.ShopName,
      ShopTypeCode: shopInfo.TypeCode,
      ShopTypeName: shopInfo.TypeName,
      ManagerCode: userinfo.ManagerCode, //店经理工号
      ManagerName: userinfo.ManagerName, //店经理名称
      DeptID: userinfo.DeptID, //部门ID
      DeptName: userinfo.DeptName, //部门名称
      DeptFullName: userinfo.DeptFullName, //部门全名
      DeptFullID: userinfo.DeptFullID, //部门路径编号
      PosCode: userinfo.PosCode, //岗位编号
      TitleID: userinfo.TitleID, //职称编号
      LevelID: userinfo.LevelID, //职级编号
      PosName: userinfo.PosName, //岗位名称
      TitleName: userinfo.TitleName, //职称名称
      LevelName: userinfo.LevelName, //职级名称
      IsShopManager: userinfo.IsShopManager, //是否店经理
      IsTechnician: userinfo.IsTechnician, //是否技师
      IsFL: userinfo.IsFL, //是否副理
      IsZG: userinfo.IsZG, //是否主管
      IsGW: userinfo.IsGW, //是否顾问
      IsSY: userinfo.IsSY, //是否收银员
      FuliClass: userinfo.FuliClass || "", //副理班次
      FuliClassDesc: userinfo.FuliClassDesc || "", //副理班次描述
      ShopInfo: shopInfo, //门店信息
      RoleList: roleList, //关联的系统角色
      FranchiseeList: franchiseeList, //加盟商列表
      RelationShopList: relationShopList, //加盟关联的门店列表
      RelationLocationList: relationLocationList, //物流登录关联库位
      RoleNames: "",
      IsOfficeAdminLogin: isOfficeAdminLogin, //是否行政区管理员登录
      time: +new Date(),
    };

    //行政区管理员登录只有一个门店给门店信息赋值
    if (isOfficeAdminLogin && relationShopList.length == 1) {
      lastUserInfo.ShopCode = shopInfo.ShopCode;
      lastUserInfo.ShopName = shopInfo.ShopName;
      lastUserInfo.ShopTypeCode = shopInfo.ShopTypeCode;
      lastUserInfo.ShopTypeName = shopInfo.ShopTypeName;
    }
    //超级管理员登录，给门店登录人后拼出超级管理员名字
    var superAdministratorKey = localStorage.getItem(
      storageKey.superAdministratorKey
    );
    if (superAdministratorKey) {
      lastUserInfo.UserName =
        lastUserInfo.UserName + "【" + superAdministratorKey + "】"; //用户名称+(超级管理员名称)
      lastUserInfo.EName =
        lastUserInfo.EName + "【" + superAdministratorKey + "】"; //用户名称+(超级管理员名称)
    }
    if (!!roleList && roleList.length > 0) {
      let roleNames = "";
      roleList.forEach((item: any) => {
        roleNames += item.RoleName + "|";
      });
      roleNames = roleNames.substr(0, roleNames.length - 1);
      lastUserInfo.RoleNames = roleNames;
    }
    localStorage.setItem(storageKey.userInfoKey, JSON.stringify(lastUserInfo));
    //登录成功skd初始化
    hsdk.config(
      {
        app_key: "123456",
        // authorizetype: "UserName", //必填， 授权类型UserName, Code
      },
      {
        tokenurl: config.TokenHost,
        userid: lastUserInfo.UserName, //授权类型为UserName
        password: lastUserInfo.UserName, //授权类型为UserName
      }
    );
  }
}
export default new HttpClient();
