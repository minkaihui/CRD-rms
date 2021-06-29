/*配置基础接口方法 */
import config from '../config';
export default {
  //用户登陆
  LoginAsync: config.RtsHost + 'api/User/Login',
  //纯用户登录用户登陆(解锁调用)
  BaseLoginAsync: config.RtsHost + 'api/Member/BaseUserLogin',
  //导出excel
  ExportExcelData: config.RtsHost + 'api/ExcelTemplate/ExportExcelData',
  //获取excel模板配置信息
  GetExcelTemplate: config.RtsHost + 'api/ExcelTemplate/GetExcelTemplate',

  //导入excel数据并返回数据
  ImportExcel: config.RtsHost + 'api/ExcelTemplate/ImportExcel',
  // 获取省份信息
  GetProvinces: config.WmsHost + 'api/StockQuery/GetProvinces',
  // 获取门店信息
  GetProvinceShopList: config.WmsHost + 'api/StockQuery/GetProvinceShopList',

  //根据用户名获取跟登录一样的信息
  GetRtsUserInfoByName: config.RtsHost + 'api/Member/GetRtsUserInfoByName',
  //根据银行卡号获取银行信息
  GetBankInfoByCardNum: config.RtsHost + 'api/RefundInfo/GetBankInfoByCardNum',
  //根据数据域获取数据域元素（domainCode）
  GetDataElementList: config.RtsHost + 'api/Common/GetDataElementList',
  //获取数据公共配置数据
  GetDataTable: config.RtsHost + 'api/Common/GetDataTable',
  //分页获取数据
  GetPageList: config.RtsHost + 'api/Common/GetPageList',
  //获取菜单数据
  GetRtsMenu: config.RtsHost + 'api/System/GetMsMenuAndPermission',
  //获取编号
  GetBillNumber: config.MgsHost + 'api/Common/GetBillNumber',

  //获取省市区地址列表（树状返回）
  GetProvinceCityAreaTreeData: config.RtsHost + 'api/Member/GetProvinceCityAreaTreeData',
  //通过中台调用crm接口
  GetCRMApiResult: config.RtsHost + 'api/Member/GetCRMApiResult',
  //通过中台调用crm接口
  UpdateShopLocation: config.RtsHost + 'api/System/UpdateShopLocation',
  //根据门店编号获取人员信息
  GetEmpByShopCode: config.RtsHost + 'api/System/GetEmpByShopCode',
  //写入超级管理员操作日志
  AddSuperMangerLogList: config.RtsHost + 'api/System/AddSuperMangerLogList',
  //获取更新日志
  GetUpdateInfo: config.RtsHost + 'api/System/GetUpdateInfo',
};
