import { storageKey, globalConfig } from '@/myBaseConfig';
import { QueryDataTable } from '@/models/queryDataTable';
import { PaginationModel, QueryConditionModel } from '@/models/pagination/paginationModel';

import baseApi from '@/api/common/baseApi';
import util from '@/js/util';
import { Result } from '@/models/result';
import commonConfig from '@/api/config';
import mutationType from '@/store/mutationType';
const base64: any = require('js-base64').Base64;
const cryptoJS: any = require('crypto-js');
const axios = require('axios');

export default {
  /**
   *获取评估类
   *
   * @returns
   */
  async getAssessmentList() {
    const query = new QueryDataTable();
    query.TableName = 'BA_DicAssessment';
    query.Fields = 'Code,Name';
    query.Where = 'Status=1  ';
    query.OrderBy = 'Code ';
    return await baseApi.GetDataTable(query);
  },

  /**
   *获取物料组
   *
   * @returns
   */
  async getMaterialGroupList() {
    const query = new QueryDataTable();
    query.TableName = 'BA_DicMaterialGroup';
    query.Fields = 'Code,Name';
    query.Where = 'Status=1 and ';
    query.OrderBy = 'Code ';
    return await baseApi.GetDataTable(query);
  },

  /**
   *获取通用物料退货的物料组
   *
   * @returns
   */
  async getCommonReturnMaterialGroup() {
    const query = new QueryDataTable();
    query.TableName = 'BA_DicMaterialGroup';
    query.Fields = 'Code,Name';
    query.Where =
      "Status=1 and  charindex(name,'物料')<=0 and charindex(name,'原材料')<=0   and charindex(name,'证书')<=0";
    query.OrderBy = 'Code ';
    return await baseApi.GetDataTable(query);
  },

  /**
   *获取材质
   *
   * @returns
   */
  async getTexturesList() {
    const query = new QueryDataTable();
    query.TableName = 'BA_DicTextures';
    query.Fields = 'Code,Name';
    query.Where = 'Status=1 ';
    query.OrderBy = 'Code ';
    return await baseApi.GetDataTable(query);
  },

  /**
   * 模糊匹配获取接收方的信息（最少输入两个字符）
   * @param inputKey 输入的关键字
   */
  async getReceiptDeptList(inputKey: string) {
    if (!inputKey || inputKey.length < 2) {
      return [];
    }
    const query = new QueryDataTable();
    query.TableName = 'VW_MS_ReceiveDeptInfo';
    query.Fields =
      'DeptID,DeptName,DeptFullID,DeptFullName,ShopCode,ShopManagerUserID,ShopManagerUserName';
    query.Where =
      "Status=1 and  charindex('离职',DeptFullName) <=0 and  (DeptFullName like '%" +
      inputKey +
      "%' or DeptID='" +
      inputKey +
      "')  ";
    query.OrderBy = 'DeptName ';
    return await baseApi.GetDataTable(query);
  },
  /**
   *模糊匹配获取接收人信息（最少输入两个字符）
   *@param inputKey 输入的关键字
   * @returns
   */
  async getReceiptUserInfo(inputKey: string) {
    if (!inputKey || inputKey.length < 2) {
      return [];
    }
    const query = new QueryDataTable();
    query.TableName = 'SY_User';
    query.Fields = 'UserID,UserName,DeptID,DeptName,DeptFullID,DeptFullName,ShopCode';
    query.Where =
      "IsLock=0   and (UserName like  '%" + inputKey + "%'  or UserID='" + inputKey + "')";
    query.OrderBy = 'UserName ';
    return await baseApi.GetDataTable(query);
  },
};
