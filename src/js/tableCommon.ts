import util from '/@/js/util';
import moment from 'moment';
//    * @param {*} row  行数据
//    * @param {*} column  列数据（头部）
//    * @param {*} cellValue  当前值
//    * @param {number} index  行索引
export default {
  // 	/**
  //    *格式化日期（年-月-日）
  //    */
  FmtDate(row: any, column: any, cellValue: any, index: number) {
    const context: any = this;
    if (!cellValue) {
      return '';
    } else {
      return moment(cellValue).format('YYYY-MM-DD');
    }
  },
  // 	/**
  //    *格式化时间（年-月-日 时：分：秒）
  //    */
  FmtTime(row: any, column: any, cellValue: any, index: number) {
    const context: any = this;
    if (!cellValue) {
      return '';
    } else {
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss');
    }
  },
  // 	/**
  //   *格式化是否
  //  */
  FmtYesOrNo(row: any, column: any, cellValue: any, index: number) {
    if (cellValue == '1' || cellValue == true) {
      return '是';
    } else if (cellValue == '0' || cellValue == false) {
      return '否';
    }
  },

  // 	/**
  //   *  发货快递列表-发货状态，0为待发货，1为已发货，2为已收货，3为退回状态，4为拆包状态，9为已删除，默认为0
  //  */
  FmtExpressStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待发货';
        break;
      case '1':
        text = '已发货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '退回';
        break;
      case '4':
        text = '拆包';
        break;
      case '9':
        text = '已删除';
        break;
      default:
        break;
    }
    return text;
  },

  //
  // 门店包裹管理状态格式化
  //
  FmtShopGroupManageStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待发货';
        break;
      case '1':
        text = '已发货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '退回';
        break;
      case '4':
        text = '已拆快递';
        break;
      case '7':
        text = '科室已收';
        break;
      case '8':
        text = '科室已拆';
        break;
      default:
        break;
    }
    return text;
  },
  //
  // 物流打包列表
  //
  FmtLogisticsGroupPackStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待转交';
        break;
      case '5':
        text = '已转交';
        break;
      case '6':
        text = '收发接收';
        break;
      case '1':
        text = '已发货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '退回';
        break;
      default:
        break;
    }
    return text;
  },
  //
  // 物流包裹转交状态格式
  //
  FmtLogisticsForwardStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待转交';
        break;
      case '5':
        text = '已转交';
        break;
      default:
        break;
    }
    return text;
  },
  //
  // 物流收发组包裹管理状态格式化
  //
  FmtLogisticsGroupManageStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '5':
        text = '待接收';
        break;
      case '6':
        text = '已接收';
        break;
      default:
        break;
    }
    return text;
  },
  //
  // 物流科室收取包裹状态格式化
  //
  FmtOfficeReceiveGroupStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '9':
        text = '待收取';
        break;
      case '7':
        text = '已收取';
        break;
      case '8':
        text = '已拆包';
        break;
      default:
        break;
    }
    return text;
  },

  /**格式化包裹派发状态 */
  FmtLogisticsDistributeStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '4':
        text = '待派发';
        break;
      case '9':
        text = '已派发';
        break;
      default:
        break;
    }
    return text;
  },

  /**格式化物流发货快递列表状态 */
  FmtLogisticsSendExpressStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待发货';
        break;
      case '1':
        text = '已发货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '已退回';
        break;
      default:
        break;
    }
    return text;
  },

  /**格式化物流收货快递列表状态 */
  FmtLogisticsReceiptExpressStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '1':
        text = '待收货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '已退回';
        break;
      case '4':
        text = '已拆包';
        break;
      default:
        break;
    }
    return text;
  },
  /**格式化门店发货快递列表状态 */
  FmtShopSendExpressStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '待发货';
        break;
      case '1':
        text = '已发货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '已退回';
        break;
      case '4':
        text = '已拆包';
        break;
      default:
        break;
    }
    return text;
  },
  /**格式化门店收货快递列表状态 */
  FmtShopReceiptExpressStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '1':
        text = '待收货';
        break;
      case '2':
        text = '已收货';
        break;
      case '3':
        text = '已退回';
        break;
      default:
        break;
    }
    return text;
  },

  /**
   *
   * @param row 格式化凭证状态
   * @param column
   * @param cellValue
   * @param index
   */
  FmtCertStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case -1:
        text = '已冲销';
        break;
      case 0:
        text = '待入库';
        break;
      case 1:
        text = '已入库';
        break;
      default:
        break;
    }
    return text;
  },

  //
  // 物流接收包裹明细状态格式化
  //
  FmtLogisticsGroupReceiveStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case '0':
        text = '门店待发货';
        break;
      case '1':
        text = '门店已发货';
        break;
      case '2':
        text = '物流已收货';
        break;
      case '3':
        text = '物流退回';
        break;
      case '4':
        text = '已拆快递';
        break;
      case '7':
        text = '科室已收';
        break;
      case '8':
        text = '科室已拆';
        break;
      default:
        break;
    }
    return text;
  },

  //
  // 非货品接收状态格式化
  //
  FmtNoGoodsExpressReceiveStatus(row: any, column: any, cellValue: any, index: number) {
    let text = '';
    switch (cellValue) {
      case 'P002':
        text = '待接收';
        break;
      case 'P003':
        text = '已接收';
        break;
      case 'P004':
        text = '已退回';
        break;
      default:
        break;
    }
    return text;
  },
};
