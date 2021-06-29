import { storageKey, globalConfig } from '@/myBaseConfig';
import reportFormApi from '@/api/reportForm/reportFormApi';
import { QueryDataTable } from '@/models/queryDataTable';
import { PaginationModel, QueryConditionModel } from '@/models/pagination/paginationModel';
import store from '@/store/index';
import baseApi from '@/api/common/baseApi';
import systemConfigBll from '@/controller/systemConfigController';
import util from '@/js/util';
import { Result } from '@/models/result';
import commonConfig from '@/api/config';
import mutationType from '@/store/mutationType';
import baseApiConfig from '@/api/apiConfig/baseApiConfig';
const base64: any = require('js-base64').Base64;
const cryptoJS: any = require('crypto-js');
const axios = require('axios');
import italkSdk from '@/js/italkSdk';
import httpClient from '@/api/httpClient';
import config from '@/api/config';
import { SyncEach } from 'italk-jsframework/src/utils/index';
import commonQueryController from './commonQueryController';

export default {
  /**
   *根据登陆人id获取菜单、权限和系统配置
   *
   * @param {*} context
   * @param {string} userid
   * @param {string} shopCode
   * @returns
   */
  async getRtsMenuPermission(context: any, userid: string, shopCode: string) {
    const r = await baseApi.GetRtsMenu(userid, shopCode);
    if (!r.Success) {
      context.$store.commit('setMessage', {
        message: r.Message,
        type: 'warning',
      });
      return false;
    } else {
      console.log(JSON.parse((r.Data as any).Data));
      const res = JSON.parse((r.Data as any).Data);
      if (res.menuTree) {
        res.menuTree.unshift({
          name: '首页',
          url: 'pageIndex',
          imgUrl: 'iconshouye',
          code: 'MN99999',
          menuType: 'menu',
          children: [],
        });
      }
      context.$store.commit(mutationType.BASE_LSS_MENU_PERMISSION_CONFIG, res);
      return true;
    }
  },

  /*
    退出登录
     */
  loginOut: function (context: any) {
    this.clearStorageByKeyPrefx('LSS');
    context.$store.commit(mutationType.BASE_LSS_MENU_PERMISSION_CONFIG, null);
    localStorage.removeItem(storageKey.superAdministratorKey);
    //退出登录 通过刷新清空vuex状态值
    window.location.reload();
    context.$router.push({ name: 'login' });
  },
  /**
   *根据api类型获取api基础配置
   *
   * @param {string} apiType
   */
  getApiBaseUrlByType(apiType: string) {
    let baseApiUrl = '';
    switch (apiType) {
      case globalConfig.ApiType.RTS:
        baseApiUrl = config.RtsHost;
        break;
      case globalConfig.ApiType.OMS:
        baseApiUrl = config.OmsHost;
        break;
      case globalConfig.ApiType.WMS:
        baseApiUrl = config.WmsHost;
        break;
      case globalConfig.ApiType.MGS:
        baseApiUrl = config.MgsHost;
        break;
      default:
        break;
    }
    return baseApiUrl;
  },

  /**
   *
   * @param prefx
   * @param isClearLogin  是否清除登录信息缓存
   */
  clearStorageByKeyPrefx: function (prefx: string, isClearLogin = true) {
    const len = localStorage.length;
    for (let i = len - 1; i >= 0; i--) {
      const key = localStorage.key(i); //获取本地存储的Key
      if (!!key && key.substr(0, prefx.length) == prefx) {
        if (!isClearLogin && key == prefx + '_userInfoKey') {
          // 如果isClearLogin是false,就不清除登录信息
        } else {
          localStorage.removeItem(key);
        }
      }
    }
  },

  /**
   * 上传附件到百度云
   * @param context 调用的上下文
   * @param files 选择的本地文件列表
   * @param categoryCode   图片存储业务分类模块(存在需要作为子目录,参考myBaseConfig中的配置)
   */
  async uploadFileToBCS(
    context: any,
    files: Array<{ raw: { name: string; path: string } }>,
    categoryCode: any
  ) {
    // 获取登录设备信息
    const r = new Result();
    const deviceInformationStr = sessionStorage.getItem('DeviceInformation');
    if (!deviceInformationStr) {
      r.Success = false;
      r.Message = '获取设备信息失败，无法校验您的位置，请尝试重新登录!';
    }
    const deviceInformation = JSON.parse(deviceInformationStr || '{}');
    const that = this;
    const result = new Result();
    if (!categoryCode) {
      result.Success = false;
      result.Message = '未传入图片业务分类模块！';
      return result;
    }
    result.Data = [];
    //通过italk进入(手机端)
    if ((await italkSdk.isItalkSdkExist()) && deviceInformation.isMobile) {
      if (files.length > 0) {
        await SyncEach(files, async (fileInfo: any) => {
          //后台数据字典中系统配置的根目录
          const ext = fileInfo.substring(fileInfo.lastIndexOf('.') + 1); // 后缀
          const rBcebosRootPath: any = systemConfigBll.BcebosRootPath();
          if (!rBcebosRootPath.Success) {
            result.Success = false;
            result.Message = rBcebosRootPath.Message;
            return false;
          }
          let key = rBcebosRootPath.Data;
          let relatePath = rBcebosRootPath.Data;
          const fileName = Math.random().toFixed(20).substring(2, 20) + '.' + ext;
          key += '^@^' + categoryCode;
          relatePath += '^@^' + categoryCode;
          key += '/' + util.format.formatDate(new Date()) + '/' + fileName;
          relatePath += '/' + util.format.formatDate(new Date()) + '/' + fileName;
          //拼接域进入key值
          key = config.bcebosBucket + '^@^' + key;
          relatePath = config.bcebosBucket + '^@^' + key;
          // 此时可以自行将文件上传至服务器
          const uploadResult: any = await italkSdk.italkUploadfile(fileInfo, key);
          if (uploadResult.Code != 0) {
            result.Success = false;
            result.Message = uploadResult.ErrorMessage;
            return false;
          }
          result.Data.push({
            name: fileName,
            relatePath: relatePath,
            fullPath: uploadResult.Data,
          });
          return true;
        });
      }
    } else {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const ext = file.raw.name.substr(file.raw.name.lastIndexOf('.') + 1); // 后缀
          //后台数据字典中系统配置的根目录
          const rBcebosRootPath: any = systemConfigBll.BcebosRootPath();
          if (!rBcebosRootPath.Success) {
            return rBcebosRootPath;
          }
          let key = rBcebosRootPath.Data;
          const fileName = Math.random().toFixed(20).substring(2, 20) + '.' + ext;
          if (categoryCode) {
            key += '/' + categoryCode;
          }
          key += '/' + util.format.formatDate(new Date()) + '/' + fileName;
          const expiration = {
            expiration: util.format.formatTime2(new Date(), 'yyyy-MM-ddThh:mm:ssZ'),
            conditions: [{ bucket: commonConfig.bcebosBucket }, { key: key }],
          };
          const str = JSON.stringify(expiration);
          const basePolicy = base64.encode(str);
          const signature = cryptoJS.HmacSHA256(basePolicy, commonConfig.baiduSecretKey).toString();
          const formData = new FormData();
          formData.append('key', key);
          formData.append('accessKey', commonConfig.baiduAccessKey);
          formData.append('policy', basePolicy);
          formData.append('signature', signature);
          formData.append('file', file.raw as any);
          const res = await axios.post(commonConfig.bcebosEndPoint, formData, {
            headers: { 'content-type': 'multipart/form-data;' },
          });
          if (res.status == 200) {
            result.Data.push({
              name: fileName,
              relatePath: key,
              fullPath: commonConfig.bcebosEndPoint + '/' + key,
              extendsName: ext,
            });
          } else {
            result.Success = false;
            result.Message = res.ErrorMessage;
            return result;
          }
        }
      }
    }
    return result;
  },

  /**
   *获取模板
   *
   * @param {*} context 调用的上下文
   * @param {string} templateID  模板id
   */
  async getExcelTemplate(context: any, templateID: string) {
    const that: any = this;
    const r: any = await httpClient.Post(baseApiConfig.GetExcelTemplate, {
      templateID: templateID,
    });
    if (!r.Success) {
      context.$store.commit('setMessage', {
        message: '获取失败：' + r.Message,
        type: 'warning',
      });
      return;
    }
    const templateObj = JSON.parse(r.Data.Data);
    const templateRelatePath = templateObj.FilePath;
    if (!templateRelatePath) {
      context.$store.commit('setMessage', {
        message: '未配置模板文件所在路径！',
        type: 'warning',
      });
      return;
    }
    const templatePath = config.RtsHost + templateRelatePath + '?v=' + util.getGuid();
    const tempLink = document.createElement('a'); // 创建一个a标签
    tempLink.style.display = 'none';
    tempLink.href = templatePath;
    tempLink.setAttribute('download', templateObj.TemplateName || '数据模板'); // 给a标签添加下载属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink); // 将a标签添加到body当中
    tempLink.click(); // 启动下载
    document.body.removeChild(tempLink); // 下载完毕删除a标签
  },

  /**
   *上传excel并根据模板获取数据
   *
   * @param {*} context  调用上下文
   * @param {*} file  上传的文件
   * @param {string} templateID  模板id
   */
  async importExcel(context: any, file: any, templateID: string) {
    const formData = new FormData();
    formData.append('Files', file);
    formData.append('templateID', templateID);
    const ajaxResult = await axios.post(baseApiConfig.ImportExcel, formData);

    const r = ajaxResult.data;
    if (!r.Success) {
      context.$store.commit('setMessage', {
        message: '上传失败：' + r.Message,
        type: 'warning',
      });
      return null;
    }
    const tableData = JSON.parse(r.Value);
    return tableData;
  },

  /**
   *导出excel数据
   *
   * @param {*} context
   * @param {string} apiType
   * @param {string} relateApiUrl
   * @param {*} columns
   * @param {*} param  //参数  分页参数或则未分页的参数
   * @param {string} fileName
   */
  async exportExcel(
    context: any,
    apiType: string,
    relateApiUrl: string,
    columns: any,
    param: any,
    fileName: string
  ) {
    this.exportData(context, apiType, relateApiUrl, columns, param, fileName, 'xls', '', '');
  },

  /**
   *导出pdf数据
   *
   * @param {*} context
   * @param {string} apiType
   * @param {string} relateApiUrl
   * @param {*} columns
   * @param {*} param  //参数  分页参数或则未分页的参数
   * @param {string} fileName
   * @param {string} userID  //导出人工号  导出pdf打水印使用
   * @param {string} userName //导出人名称 导出pdf打水印使用
   */
  async exportPdf(
    context: any,
    apiType: string,
    relateApiUrl: string,
    columns: any,
    param: any,
    fileName: string,
    userID: string,
    userName: string
  ) {
    this.exportData(
      context,
      apiType,
      relateApiUrl,
      columns,
      param,
      fileName,
      'pdf',
      userID,
      userName
    );
  },

  /**
   *导出数据公共方法
   *
   * @param {*} context
   * @param {string} apiType
   * @param {string} relateApiUrl
   * @param {*} columns
   * @param {*} param  //参数  分页参数或则未分页的参数
   * @param {string} fileName
   * @param {string} exportType //导出类型  xls/pdf
   * @param {string} userID  //导出人工号  导出pdf打水印使用
   * @param {string} userName //导出人名称 导出pdf打水印使用
   */
  async exportData(
    context: any,
    apiType: string,
    relateApiUrl: string,
    columns: any,
    param: any,
    fileName: string,
    exportType: string,
    userID: string,
    userName: string
  ) {
    const that: any = this;
    fileName =
      (fileName || '导出的数据列表') +
      context.$MOMENT(new Date()).format('YYYYMMDDhhmmss') +
      '.' +
      exportType;
    fileName = fileName.replace(/(^\s*)|(\s*$)/g, ``); //去除空格
    if (param.page) {
      param.page.rows = 100000;
      param.page.page = 1;
    } else if (param.req) {
      if (param.req.rows) {
        param.req.rows = 100000;
        param.req.page = 1;
      } else if (param.req.Rows) {
        param.req.Rows = 100000;
        param.req.Page = 1;
      }
    }
    //公共列表的写法
    else if (param.Model) {
      param.Model.rows = 100000;
      param.Model.page = 1;
    }

    context
      .$confirm('确定导出数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      })
      .then(() => {
        let lstExportCol: any = [];
        // columns.forEach((item: any) => {
        //   lstExportCol.push({
        //     ConfigID: util.getGuid(),
        //     FieldName: item.prop,
        //     HeaderText: item.label,
        //     IsShow: true,
        //     IsLeaf: !item.hasSub
        //   });
        // });
        lstExportCol = that.getListCloumn(columns, null);

        let paraInfo = '{}';
        //通用分页查询的写法
        if (param.page) {
          paraInfo = JSON.stringify({ page: JSON.stringify(param.page) });
        }
        //维修的分页写法
        else if (param.req) {
          paraInfo = JSON.stringify({ req: JSON.stringify(param.req) });
        }
        //不分页
        else if (param.dto) {
          paraInfo = JSON.stringify({ dto: JSON.stringify(param.dto) });
        }
        //公共列表查询的分页写法
        else if (param.Model) {
          paraInfo = JSON.stringify({ Model: JSON.stringify(param.Model) });
        }
        //未分页的方式
        else {
          paraInfo = JSON.stringify(param);
        }

        const exportPara = {
          ApiUrl: relateApiUrl,
          ApiType: apiType,
          FileName: fileName,
          ListExportCol: lstExportCol,
          ParaInfo: paraInfo,
          ExportType: exportType,
          UserID: userID,
          UserName: userName,
        };
        axios
          .post(baseApiConfig.ExportExcelData, exportPara, {
            responseType: 'blob',
          })
          .then((r: any) => {
            that.fileConversion(exportPara.FileName, r.data);
          });
      })
      .catch(() => {});
  },

  getListCloumn(columns: any, parentid: any) {
    const context: any = this;
    const lastList: any = [];
    columns.forEach((item: any) => {
      const lastItem: any = {
        ConfigID: util.getGuid(),
        FieldName: item.prop,
        HeaderText: item.label,
        IsShow: true,
        IsLeaf: !item.hasSub,
      };
      lastItem.ParentID = parentid;
      if (!!item.childrenList && item.childrenList.length > 0) {
        const childList: any = context.getListCloumn(item.childrenList, lastItem.ConfigID);
        lastList.push(...childList);
      }
      lastList.push(lastItem);
    });
    return lastList;
  },
  /**
   * 字节流转换成文件下载
   * @param inputFileName  文件名
   * @param data   后台取得数据
   */
  fileConversion(inputFileName: any, data: any) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    const filename = inputFileName || 'filename.xlsx'; // 判断是否使用默认文件名
    downloadElement.href = href;
    downloadElement.download = filename; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  },

  /**
   * 获取是否选择下拉框
   */
  getTrueFalseList: function () {
    return [
      {
        value: '',
        label: '--请选择--',
      },
      {
        value: '1',
        label: '是',
      },
      {
        value: '0',
        label: '否',
      },
    ];
  },

  //获取省市联动分组信息
  async getProvinceCityInfo() {
    const query = new QueryDataTable();
    query.TableName = 'VW_BA_ProviceCity';
    query.Fields = 'ProvinceCode ,ProvinceName ,AreaCode ,AreaName ,CityCode ,CityName';
    query.OrderBy = 'SortProvince,SortCity';
    return await baseApi.GetDataTable(query);
  },
  /**
   *
   * @param refTable   关联的表
   * @param refFields  关联字段（多个以逗号分隔）
   * @param refWhere   关联条件（包含了排序条件）
   */
  async getRefTableList(refTable: string, refFields: string, refWhere: string) {
    const queryTable = new QueryDataTable();
    const userInfo = JSON.parse(localStorage.getItem(storageKey.userInfoKey) || '{}');
    queryTable.TableName = refTable;
    queryTable.Fields = refFields;
    if (!!refWhere && util.trim(refWhere).length > 0) {
      //针对需要前端传的条件做特殊处理
      refWhere = refWhere.replace('@ShopCode', "'" + userInfo.ShopCode + "'");
      refWhere = refWhere.replace('@UserID', "'" + userInfo.UserID + "'");
    }
    queryTable.Where = refWhere;
    return await baseApi.GetDataTable(queryTable);
  },

  /**
   * 获取公共列表数据
   * @param rtsReportMain 公共列表配置主信息
   * @param conditions    通过配置查询表单生成的查询条件列表(参考分页中值得传递方式)
   * @param pageIndex    页码
   * @param pageSize    每页条数
   * @param userInfo    用户信息
   * @param isSelectAllColumn    是否查询所有列（默认根据配置的显示列查询  不查视图所有列）
   * @param isNeedShopCodeCondition    是否需要门店查询条件
   * @param shopConditionName    门店查询条件字段名
   */
  async getCommonList(
    rtsReportMain: any,
    conditions: any,
    pageIndex: number,
    pageSize: number,
    userInfo: any,
    isSelectAllColumn = false,
    isNeedShopCodeCondition = true,
    shopConditionName = 'ShopCode'
  ) {
    const result = {
      Success: true,
      Message: '',
      Total: 0,
      Data: [],
      Param: {},
    };
    const arrFields = rtsReportMain.RtsReportFieldList.map(function (item: any) {
      return item.prop;
    });
    const fields = '';
    if (!arrFields || arrFields.length == 0) {
      result.Success = false;
      result.Message = '报表未配置字段';
      return result;
    }
    //通过表/视图查询数据
    if (rtsReportMain.QueryType == 'QT01') {
      //分页
      if (rtsReportMain.IsPager) {
        const pager = new PaginationModel();
        pager.page = pageIndex;
        pager.rows = pageSize;
        if (!rtsReportMain.OrderBy || rtsReportMain.OrderBy.trim().length == 0) {
          pager.OrderBy = 'CreatedTime desc';
        }

        if (!conditions || conditions.length == 0) {
          if (isNeedShopCodeCondition) {
            pager.QueryConditions = [
              {
                FieldName: shopConditionName,
                Mode: QueryConditionModel.EQUAL,
                Values: [userInfo.ShopCode],
              },
            ];
          }
        } else {
          pager.QueryConditions = conditions;
          if (
            isNeedShopCodeCondition &&
            util.getObjectArrayIndex(conditions, 'FieldName', shopConditionName) < 0
          ) {
            (pager.QueryConditions as any).push({
              FieldName: shopConditionName,
              Mode: QueryConditionModel.EQUAL,
              Values: [userInfo.ShopCode],
            });
          }
        }
        pager.TableName = rtsReportMain.TableName;
        if (isSelectAllColumn) {
          pager.TableFields = [];
        } else {
          pager.TableFields = arrFields;
        }
        const r: any = await baseApi.GetPageList(pager);

        if (r.Success) {
          result.Total = r.Data.Total;
          result.Data = JSON.parse(r.Data.PageList);
          result.Param = { Model: pager }; //为了导出返回参数
        } else {
          result.Success = false;
          result.Message = r.Message;
        }
      } else {
        //待实现
      }
    } else if (rtsReportMain.QueryType == 'QT02') {
      //待实现
    } else {
      result.Success = false;
      result.Message = '未配置该查询类型';
    }
    return result;
  },

  /**
   * 根据标识获取报表头部列和查询条件
   * @param reportCode  //标识
   */
  async getRtsReportBaseInfo(reportCode: string) {
    const param = {
      reportCode: reportCode,
    };
    const result: any = await reportFormApi.GetRtsReportBaseInfo(param);
    if (result.Success) {
      if (result.Data.Data) {
        return JSON.parse(result.Data.Data);
      }
    } else {
      store.commit('setMessage', {
        message: '获取【' + reportCode + '】公共列表配置失败：' + result.Message,
        type: 'error',
      });
      return null;
    }
  },
  /**
   * 条件筛选查询
   * @param context
   * @param param
   * @param isQuickQuery  是否快捷查询
   */
  queryTableDataList(context: any, param: any, isQuickQuery = false) {
    context.listTableInfo.currentPageIndex = 1;
    if (!!param.QueryConditions && param.QueryConditions.length > 0) {
      context.conditions = param.QueryConditions;
    } else {
      context.conditions = [];
    }
    let obj = {
      FieldName: '',
      Mode: '',
      Values: [],
    };
    // 添加默认条件到查询条件里
    context.RtsReportSearchFieldList.forEach((item: any) => {
      obj = JSON.parse(JSON.stringify(obj));
      if (item.DefaultValues == null) item.DefaultValues = [];
      if (item.DefaultValues.length > 0) {
        if (context.conditions && context.conditions.length > 0) {
          // 判断去除重复条件
          const list = util.grep(context.conditions, function (ele: any) {
            return ele.FieldName == item.FieldName;
          });
          if (!list || list.length == 0) {
            obj.FieldName = item.FieldName;
            obj.Mode = item.ConditionModel;
            obj.Values = item.DefaultValues;
            context.conditions.push(obj);
          }
        } else {
          // 如果条件列表是空，直接插入
          obj.FieldName = item.FieldName;
          obj.Mode = item.ConditionModel;
          obj.Values = item.DefaultValues;
          context.conditions.push(obj);
        }
      }
    });

    if (!isQuickQuery) {
      context.getDataList();
      context.isShowQueryCondition = false;
    } else {
      context.getDataList();
    }
  },

  /**
   * 获得筛选查询条件
   * @param context
   * @param typeCode 当前列表的唯一编码
   */
  async getReportSearchFieldList(context: any, typeCode: string) {
    const data: any = await this.getRtsReportBaseInfo(typeCode);
    if (data) {
      context.orderBy = data.OrderStr;
      let rtsReportSearchFieldList = data.RtsReportSearchFieldList;
      //默认值做特殊处理
      rtsReportSearchFieldList =
        commonQueryController.setRtsReportSearchDefaultValue(rtsReportSearchFieldList);
      context.RtsReportSearchFieldList = rtsReportSearchFieldList;
      //获取默认查询条件
      context.conditions = commonQueryController.getQueryConditions(
        context.RtsReportSearchFieldList,
        false,
        ''
      );
    }
    // 获取设置IsCommonUse快捷查询的列表
    const quickSearchList = util.grep(data.RtsReportSearchFieldList, function (item: any) {
      return item.IsCommonUse == true;
    });
    if (quickSearchList && quickSearchList.length > 0) {
      // 快捷查询取前2个
      if (quickSearchList.length > 2) {
        context.quickSearchList.push(quickSearchList[0]);
        context.quickSearchList.push(quickSearchList[1]);
      } else {
        context.quickSearchList = quickSearchList;
      }
    } else {
      context.quickSearchList = [];
    }
    console.log(data.RtsReportFieldList);
    context.listTableInfo.columns = data.RtsReportFieldList;
    context.listTableInfo.tablePromptText = data.Remark;
    if (context.$route.params && !!context.$route.params.isUpDate) {
      context.getDataList(true);
    } else {
      context.getDataList();
    }
  },
  /**
   *获取省份信息
   *
   * @returns
   */
  async getProvinces() {
    const result: any = await baseApi.GetProvinces();
    if (result.Success) {
      if (result.Data) {
        if (result.Data.Data) {
          // 获取扫码查询的条件，进行本地缓存
          const provincesInfo: any = result.Data.Data;
          localStorage.setItem(storageKey.provincesInfoKey, provincesInfo);
        }
      }
    } else {
      store.commit('setMessage', {
        message: result.Message,
        type: 'error',
      });
    }
  },
  /**
   *
   * @param shopCode 获取门店信息
   */
  async getShopInfoByCode(shopCode: string) {
    const query = new QueryDataTable();
    query.TableName = 'BA_ShopInfo';
    query.Where = "ShopCode='" + shopCode + "'";
    const lst: any = await baseApi.GetDataTable(query);
    if (!!lst && lst.length > 0) {
      return lst[0];
    }
    return null;
  },

  //打印指定区域
  async print(content: any, w: number, h: number, showWaterMark: boolean) {
    //通过italk进入
    if (await italkSdk.isItalkSdkExist()) {
      italkSdk.italkPrintHtmle(content, w, h, showWaterMark);
    } else {
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : (screen as any).left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : (screen as any).top;
      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;
      w = +w === 0 ? width : w;
      h = +h === 0 ? height : h;
      const left = width / 2 - w / 2 + dualScreenLeft;
      const top = height / 2 - h / 2 + dualScreenTop;
      const myWindow: any = window.open(
        '',
        '打印',
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
          w +
          ', height=' +
          h +
          ', top=' +
          top +
          ', left=' +
          left
      );
      const style =
        "<style type='text/css'>table.gridtable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;}table.gridtable th {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #dedede;}table.gridtable td {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff;}</style>";
      myWindow.document.write(content + style);
      myWindow.focus();
      myWindow.document.close(); //关闭document的输出流, 显示选定的数据
      myWindow.print(); //打印当前窗口
      return myWindow;
    }
  },

  /**
   * 关闭应用
   */
  async closeApp() {
    const b = await italkSdk.isItalkSdkExist();
    if (b) {
      await italkSdk.italkCloseApp();
    } else {
      window.close();
    }
    return true;
  },

  /**
   * 转换颜色转义符为原值
   */
  getColorSpecialCode(value: any) {
    if (!value) {
      return '';
    } else {
      return value.replace(RegExp('&lt;', 'g'), '<');
    }
  },

  /**
   *计算两点之间的距离（返回米）
   *
   * @param {number} lat1   位置1纬度
   * @param {number} lng1   位置1经度
   * @param {number} lat2   位置2纬度
   * @param {number} lng2   位置2经度
   * @returns
   * @memberof HttpClient
   */
  getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const EARTH_RADIUS = 6370.996; // 地球半径系
    const radLat1 = (lat1 * Math.PI) / 180.0;
    const radLat2 = (lat2 * Math.PI) / 180.0;
    const radLng1 = (lng1 * Math.PI) / 180.0;
    const radLng2 = (lng2 * Math.PI) / 180.0;

    const a = radLat1 - radLat2;
    const b = radLng1 - radLng2;
    let distance =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    distance = distance * EARTH_RADIUS * 1000;
    return distance;
  },

  /**
   *转换日期范围格式
   *
   * @param {*} that 传入当前上下文
   * @param {*} dateRange  日期范围
   */
  getLastDateRangeArr(that: any, dateRange: any) {
    const dateArr = [];
    if (!!dateRange && dateRange.length == 2) {
      dateArr.push(that.$MOMENT(dateRange[0]).format('YYYY-MM-DD 00:00:00'));
      dateArr.push(that.$MOMENT(dateRange[1]).format('YYYY-MM-DD 23:59:59'));
    } else {
      dateArr.push(that.$MOMENT(new Date()).format('YYYY-MM-DD 00:00:00'));
      dateArr.push(that.$MOMENT(new Date()).format('YYYY-MM-DD 23:59:59'));
    }
    return dateArr;
  },
};
