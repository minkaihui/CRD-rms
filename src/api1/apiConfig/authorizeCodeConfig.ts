/*配置基础接口方法 */
import config from '../config';
export default {
  // GetAuthorizeCodePageList: config.RtsHost + 'api/AuthorizeCode/GetAuthorizeCodePageList', //分页获取授权码信息
  // GetGoodsInfoByBarCode: config.WmsHost + 'api/GoodsInfo/GetGoodsInfoByBarCode', //根据条码获取货品信息
  // GetGoodsSalesInfo: config.WmsHost + 'api/GoodsInfo/GetGoodsSalesInfo', //根据条码获取已售卖货品信息
  // SaveAuthorizeCodeRequest: config.RtsHost + 'api/AuthorizeCode/SaveAuthorizeCodeRequest', //保存授权信息
  // DelAuthorizeCode: config.RtsHost + 'api/AuthorizeCode/DelAuthorizeCode', //删除授权信息
  // GetSalesDiscount: config.RtsHost + 'api/AuthorizeCode/GetSalesDiscount', //获取商品已经申请的销售折让信息
  // GetGoldPriceAdjust: config.RtsHost + 'api/AuthorizeCode/GetGoldPriceAdjust', //	 获取商品条码金价调整授权信息
  // GetOrderCommonInfo: config.OmsHost + 'api/OrderBill/GetOrderCommonInfo', //根据订单号获取订单信息（兼容返厂）
  // /*查看详情相关  begin */
  // GetSalesDiscountByID: config.RtsHost + 'api/AuthorizeCode/GetSalesDiscountByID', //查看销售折让授权码申请信息
  // GetLaborCostDiscountByID: config.RtsHost + 'api/AuthorizeCode/GetLaborCostDiscountByID', //	查看工费折让授权码申请信息
  // GetNonAgreementExchangeByID: config.RtsHost + 'api/AuthorizeCode/GetNonAgreementExchangeByID', //查看非协议转换授权码申请信息
  // GetRefundMoneyByID: config.RtsHost + 'api/AuthorizeCode/GetRefundMoneyByID', //查看退款授权码申请信息
  // GetCrossCompanyTransferByID: config.RtsHost + 'api/AuthorizeCode/GetCrossCompanyTransferByID', //查看直营调加盟授权码申请信息
  // GetCancelOrderByID: config.RtsHost + 'api/AuthorizeCode/GetCancelOrderByID', //查看取消订单授权码申请信息
  // GetGoldPriceAdjustByID: config.RtsHost + 'api/AuthorizeCode/GetGoldPriceAdjustByID', //查看金价调整授权码申请信息
  // GetAuthorizeCodeRequestByWorkFlowNum: config.RtsHost + 'api/AuthorizeCode/GetAuthorizeCodeRequestByWorkFlowNum', //根据工作流编号获取详情
  // /*查看详情相关  end */
  // /*根据货品或订单获取授权信息  begin*/
  // ValidateSalesDiscountPower: config.RtsHost + 'api/AuthorizeCode/ValidateSalesDiscountPower', //验证销售折让授权码权限
  // GetSalesDiscountPMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetSalesDiscountPMByBarCodes', //根据条码列表获取销售折让授权码申请信息（包括申请中，申请通过，已使用的授权码）
  // GetLaborCostDiscountPMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetLaborCostDiscountPMByBarCodes', //	根据条码列表获取工费折扣授权码申请信息（包括申请中，申请通过，已使用的授权码）
  // GetNonAgreementExchangePMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetNonAgreementExchangePMByBarCodes', //根据条码列表获取工费折扣授权码申请信息（包括申请中，申请通过，已使用的授权码）
  // GetCrossCompanyTransferPMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetCrossCompanyTransferPMByBarCodes', //根据条码列表获取直营调加盟授权码申请信息（包括申请中，申请通过，已使用的授权码）
  // GetRefundMoneyPMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetRefundMoneyPMByBarCodes', //根据条码列表获取退款申请信息（包括申请中，申请通过，已使用的授权码）
  // GetRefundMoneyPMByOrderID: config.RtsHost + 'api/AuthorizeCode/GetRefundMoneyPMByOrderID', //根据订单号获取退款申请信息（包括申请中，申请通过，已使用的授权码）
  // GetCancelOrderAdjustPMByOrderIDs: config.RtsHost + 'api/AuthorizeCode/GetCancelOrderAdjustPMByOrderIDs', //根据订单编号列表获取取消订单申请信息（包括申请中，申请通过，已使用的授权码）
  // GetGoldPriceAdjustPMByBarCodes: config.RtsHost + 'api/AuthorizeCode/GetGoldPriceAdjustPMByBarCodes' //根据条码列表获取金价调整申请信息（包括申请中，申请通过，已使用的授权码）
  /*根据货品或订单获取授权信息  end*/
};
