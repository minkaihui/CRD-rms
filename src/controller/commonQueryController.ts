import { storageKey, globalConfig } from '@/myBaseConfig';
import { QueryDataTable } from '@/models/queryDataTable';
import reportFormApi from '@/api/reportForm/reportFormApi';
import { PaginationModel, QueryConditionModel } from '@/models/pagination/paginationModel';
import util from '@/js/util';

export default {
  /**
   *设置公共列表查询默认值
   *
   * @param {*} rtsReportSearchFieldList
   * @returns
   */
  setRtsReportSearchDefaultValue(rtsReportSearchFieldList: any) {
    const context: any = this;
    if (rtsReportSearchFieldList.length > 0) {
      rtsReportSearchFieldList.forEach((item: any) => {
        // 如果范围选择，需要处理日期范围和时间范围的默认值
        if (item.SearchType == 'ST05') {
          //时间范围
          if (item.RangeType == 'RT01') {
            if (!!item.DefaultValues && item.DefaultValues.length == 2) {
              item.DefaultValues = context.getTimeRange(
                item.DefaultValues[0],
                item.DefaultValues[1]
              );
            }
          }
          //日期范围
          else if (item.RangeType == 'RT02') {
            if (!!item.DefaultValues && item.DefaultValues.length == 2) {
              item.DefaultValues = context.getDateRange(
                item.DefaultValues[0],
                item.DefaultValues[1]
              );
            }
          }
        }
      });
    }
    return rtsReportSearchFieldList;
  },

  /**
   *获取默认查询条件
   *
   * @param {*} rtsReportSearchFieldList
   * @param {boolean} isNeedShopCondition
   * @param {string} shopConditionName
   * @returns
   */
  getQueryConditions(
    rtsReportSearchFieldList: any,
    isNeedShopCondition: boolean,
    shopConditionName: string
  ) {
    const context: any = this;
    let queryConditions: any = [];
    const arrShopCode = []; //门店编号
    const userInfo = JSON.parse(localStorage.getItem(storageKey.userInfoKey) || '{}');
    arrShopCode.push(userInfo.ShopCode);
    if (isNeedShopCondition) {
      if (shopConditionName) {
        queryConditions = [
          {
            FieldName: shopConditionName,
            Mode: QueryConditionModel.EQUAL,
            Values: arrShopCode,
          },
        ];
      } else {
        queryConditions = [
          {
            FieldName: 'ShopCode',
            Mode: QueryConditionModel.EQUAL,
            Values: arrShopCode,
          },
        ];
      }
    }
    const QueryConditionsObj = {
      FieldName: '',
      Mode: -1,
      Values: [],
    };

    rtsReportSearchFieldList.forEach((item: any) => {
      //  如果录入了查询条件，则插入请求数据的接口里
      const obj = JSON.parse(JSON.stringify(QueryConditionsObj));
      if (
        !(
          item.DefaultValues.length == 1 &&
          ((item.DefaultValues[0] + '' == '' && item.DefaultValues[0] != 0) ||
            item.DefaultValues[0] == null ||
            item.DefaultValues[0] == undefined)
        )
      ) {
        //如果比较模式是时间区间，查询值有两个，且没有时间部分，开始时间补时间00:00:00,结束时间补23:59:59
        if (
          item.ConditionModel == QueryConditionModel.BETWEENANDDATE &&
          item.DefaultValues.length == 2 &&
          item.DefaultValues[0].length == 10 &&
          item.DefaultValues[1].length == 10
        ) {
          item.DefaultValues[0] += ' 00:00:00';
          item.DefaultValues[1] += ' 23:59:59';
        }
        obj.FieldName = item.FieldName;
        obj.Mode = item.ConditionModel;
        obj.Values = item.DefaultValues;
        queryConditions.push(obj);
      }
    });
    return queryConditions;
  },

  /**获取时间范围
   * daysStartToNow  开始日期距当前天数
   * daysEndToNow   结束日期距当前天数
   */
  getTimeRange(daysStartToNow: number, daysEndToNow: number) {
    //默认查询最近7天数据
    const start = util.format.addDay(util.format.formatDate(new Date()), daysStartToNow);
    const end = util.format.addDay(util.format.formatDate(new Date()), daysEndToNow);
    return [start, end];
  },

  /**获取日期范围
   * daysStartToNow  开始日期距当前天数
   * daysEndToNow   结束日期距当前天数
   */
  getDateRange(daysStartToNow: number, daysEndToNow: number) {
    //默认查询最近7天数据
    const start = util.format.addDay(util.format.formatDate(new Date()), daysStartToNow);
    const end = util.format.addDay(util.format.formatDate(new Date()), daysEndToNow);
    return [start, end];
  },
};
