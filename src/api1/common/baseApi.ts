/**获取地址的同ts文件 */
import httpClient from '../httpClient';
import baseApiConfig from '../apiConfig/baseApiConfig';
import store from '@/store';
import { parcelApiUrl } from '../apiConfig/parcelApiConfig';
import { QueryDataTable } from '/@/models/queryDataTable';
import { storageKey } from '/@/myBaseConfig';
export default {
  //根据用户名和密码获取人员信息
  GetEmployeeInfo: async function (param: any) {
    const result = await httpClient.Post(baseApiConfig.LoginAsync, param);
    return result;
  },

  //根据银行卡号获取银行信息
  GetBankInfoByCardNum: async function (param: any) {
    const result = await httpClient.Post(baseApiConfig.GetBankInfoByCardNum, param);
    return result;
  },
  /**
   *根据数据域获取数据元素
   *
   * @param {string} domainCode 数据域名称
   * @returns
   */
  async GetDataElementList(domainCode: string) {
    const result = await httpClient.Post(baseApiConfig.GetDataElementList, {
      domainCode: domainCode,
    });
    const resultData: any = result.Data;
    let list: any = [];
    if (result.Data) {
      list = JSON.parse(resultData.Data);
    }
    return list;
  },

  /**
   * 获取公共配置数据（QueryDataTable对象）
   * @param param   查询传参的QueryDataTable对象
   */
  GetDataTable: async function (param: any) {
    const result = await httpClient.Post(baseApiConfig.GetDataTable, {
      queryParam: param,
    });
    const resultData: any = result.Data;
    let list: any = [];
    if (result.Data) {
      list = resultData.Data;
    }
    return list;
  },

  /**
   * 分页获取数据
   * @param pageModel   查询传参的PaginationModel对象
   */
  GetPageList: async function (pageModel: any) {
    const result = await httpClient.Post(baseApiConfig.GetPageList, {
      Model: pageModel,
    });
    return result;
  },

  /**
   * 获取菜单数据
   * @param ueid   登录人工号
   * @param shopCode   门店编号
   * @param platformType   平台类型  pc/mobile/pad
   */
  GetRtsMenu: async function (ueid: string, shopCode: string) {
    const result = await httpClient.Post(baseApiConfig.GetRtsMenu, {
      UEID: ueid,
      ShopCode: shopCode,
      PlatformType: 'pc',
    });
    return result;
  },
  /**
   * 获取编号
   * @param billCode   编号类型
   * @param num   生成个数
   */
  GetBillNumber: async function (billCode: string, num: number) {
    const result = await httpClient.Post(baseApiConfig.GetBillNumber, {
      BillCode: billCode,
      Num: num,
    });
    return result;
  },

  /**
   *获取所有省市区地址列表（树状）
   */
  GetProvinceCityAreaTreeData: async function () {
    const result = await httpClient.Post(baseApiConfig.GetProvinceCityAreaTreeData, {});
    return result;
  },

  /**
   * 通过中台调用crm接口
   * @param crmApiUrl CRM接口地址(eg:api/Default/GetDataElement)
   * @param dCode 字典名称。例子，具体参数查看各业务接口(eg:CEOUserList)
   */
  async GetCRMApiResult(ApiUrl: string, params: any) {
    const parameter = {
      ApiUrl,
      ...params,
    };
    const result = await httpClient.Post(baseApiConfig.GetCRMApiResult, parameter);
    return result;
  },
  /**
   *更新门店坐标
   *
   * @param {string} shopCode 门店编号
   * @param {string} address   详细地址
   * @param {*} lat  纬度
   * @param {*} lng  经度
   * @param {string} userID
   * @param {string} UserName
   * @returns
   */
  async UpdateShopLocation(
    shopCode: string,
    address: string,
    lat: any,
    lng: any,
    userID: string,
    UserName: string
  ) {
    const result = await httpClient.Post(baseApiConfig.UpdateShopLocation, {
      shopCode: shopCode,
      address: address,
      lat: lat,
      lng: lng,
      userID: userID,
      UserName: UserName,
    });
    return result;
  },

  /**
   *根据门店编号获取门店人员信息
   *
   * @param {string} shopCode 门店编号
   * @returns
   */
  async GetEmpByShopCode(shopCode: string) {
    const result = await httpClient.Post(baseApiConfig.GetEmpByShopCode, {
      shopCode: shopCode,
    });
    return result;
  },
  /**
   *获取省份信息
   *
   * @returns
   */
  async GetProvinces() {
    const result = await httpClient.Post(baseApiConfig.GetProvinces, {});
    return result;
  },
  /**
   *获取门店信息
   *
   * @param {string} provinceCode  省份编号
   * @param {string} cityCode  城市编号
   * @param {string[]} typeCodeList  门店类型列表 （可传入的值参考myBaseConfig中的ShopType）
   * @param {string} shopCode 门店编号
   * @returns
   */
  async GetProvinceShopList(
    provinceCode: string,
    cityCode: string,
    typeCodeList: string[],
    shopCode: string
  ) {
    let shopCodeList: any = [];
    if ((store as any).state.commonStore.isLoading) {
      return;
    }
    store.commit('setLoading', { text: '获取门店信息中...', isLoading: true });
    const result: any = await httpClient.Post(baseApiConfig.GetProvinceShopList, {
      req: {
        ProvinceCode: provinceCode,
        CityCode: cityCode,
        TypeCodeList: typeCodeList,
        ShopCode: shopCode,
      },
    });
    store.commit('setLoading', { text: '', isLoading: false });
    if (result.Success) {
      if (result.Data) {
        if (result.Data.Data) {
          shopCodeList = JSON.parse(result.Data.Data);
        }
      }
    } else {
      store.commit('setMessage', { type: 'error', message: result.Message });
    }
    return shopCodeList;
  },
  /**
   *  //获取接收门店
   *
   * @returns
   */
  async GetReceiverList() {
    if ((store as any).state.commonStore.isLoading) {
      return;
    }
    store.commit('setLoading', { text: '', isLoading: true });
    let shopCodeList: any = [];
    const result: any = await httpClient.Post(parcelApiUrl.GetReceiverList, {});
    if (result.Success) {
      if (result.Data) {
        if (result.Data.Data) {
          shopCodeList = JSON.parse(result.Data.Data);
        }
      }
    } else {
      store.commit('setMessage', { type: 'error', message: result.Message });
    }
    store.commit('setLoading', { text: '', isLoading: false });
    return shopCodeList;
  },

  /**
   *获取门店信息
   *
   * @param {string[]} typeCodeList  门店类型列表 （可传入的值参考myBaseConfig中的ShopType）
   * @param {string[]} shopStatusList 门店状态类型 （可传入的值参考myBaseConfig中的ShopStatus）
   * @param {string} shopCode 门店编号
   * @returns
   */
  async GetShopList(typeCodeList: string[], shopStatusList: number[], shopCode: string) {
    let shopCodeList: any = [];
    if ((store as any).state.commonStore.isLoading) {
      return;
    }
    store.commit('setLoading', { text: '获取门店信息中...', isLoading: true });
    const query = new QueryDataTable();
    query.TableName = 'BA_ShopInfo';
    query.Fields = 'ShopCode,ShopName,TypeCode,TypeName';
    query.Where = ' 1=1  ';
    if (!!typeCodeList && typeCodeList.length > 0) {
      query.Where += "  and charindex(TypeCode,'" + typeCodeList.toString() + "')>0 ";
    }
    if (!!shopStatusList && shopStatusList.length > 0) {
      query.Where += '  and  ShopStatus in(' + shopStatusList.toString() + ')';
    }
    query.OrderBy = 'ShopCode ';
    shopCodeList = await this.GetDataTable(query);
    store.commit('setLoading', { text: '', isLoading: false });
    return shopCodeList;
  },

  /**
   * 获取更新日志
   *
   */
  async GetUpdateInfo() {
    const userInfo = JSON.parse(localStorage.getItem(storageKey.userInfoKey) || '{}');
    const result = await httpClient.Post(baseApiConfig.GetUpdateInfo, {
      UserID: userInfo.UserID,
      SysID: 'APP05', //   RTS系统-APP01   维修系统-APP02   定制系统-APP03  播报系统-APP04  邮包系统-APP05  点数-APP06  加盟商管理平台-PC端-APP07   加盟商管理平台-移动端-APP08  邮包系统-移动端-APP09
    });
    return result;
  },
};
