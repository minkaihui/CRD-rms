/*配置基础接口方法 */
import config from '../config';

export const parcelApiUrl: any = {
  /*邮包基础  */
  //	获取快递单号下包裹及货品明细
  GetEGDPageList: config.MsHost + 'api/MsExpressCommon/GetEGDPageList',
  //	批量发送快递
  BatchEditExpress: config.MsHost + 'api/MsExpressCommon/BatchEditExpress',
  //	接收快递
  ReceiptMdianExpress: config.MsHost + 'api/MsExpressCommon/ReceiptMdianExpress',
  //	退回快递
  MdianExpressReturn: config.MsHost + 'api/MsExpressCommon/MdianExpressReturn',
  //	录入快递费用批量编辑
  EditExpressFreight: config.MsHost + 'api/MsExpressCommon/EditExpressFreight',
  //	 收货快递列表追加备注
  EditReceivingRemove: config.MsHost + 'api/MsExpressCommon/EditReceivingRemove',
  //	快递费用报表
  GetExpressPremiumReport: config.MsHost + 'api/MsExpressCommon/GetExpressPremiumReport',
  //	包裹报表
  GetGroupReportList: config.MsHost + 'api/MsExpressCommon/GetGroupReportList',
  //货品流转报表
  GetGoodsFlowReportList: config.MsHost + 'api/MsExpressCommon/GetGoodsFlowReportList',
  //每日快递报表
  GetPageDayExpressReport: config.MsHost + 'api/MsExpressCommon/GetPageDayExpressReport',
  //	非邮寄退回报表数据
  GetNoMailReturnGoodsReportPageList:
    config.MsHost + 'api/MsExpressCommon/GetNoMailReturnGoodsReportPageList',
  //	物流发货统计报表
  GetLogisticsExpressStatisticsReport:
    config.MsHost + 'api/MsExpressCommon/GetLogisticsExpressStatisticsReport',
  //		物流接收包裹明细列表
  GetGroupGoodsDetailPageList: config.MsHost + 'api/MsExpressCommon/GetGroupGoodsDetailPageList',
  //门店物资收支明细
  GetShopPayMentPageList: config.MsHost + 'api/MsExpressCommon/GetShopPayMentPageList',
  //计算投保金额
  CaculateInsuredAmount: config.MsHost + 'api/MsExpressCommon/CaculateInsuredAmount',
  //货品流转时间报表
  GetPageGoodsTimeReport: config.MsHost + 'api/MsExpressCommon/GetPageGoodsTimeReport',
  //科室收拆包裹报表
  GetGroupUnpackReportPageList: config.MsHost + 'api/MsExpressCommon/GetGroupUnpackReportPageList',

  /** 非货品邮寄管理 */
  //获取非货品发出快递单列表
  GetNoGoodsSendPageList: config.MsHost + 'api/MsNoGoods/GetNoGoodsSendPageList',
  //获取非货品接收快递单列表
  GetNoGoodsReceivePageList: config.MsHost + 'api/MsNoGoods/GetNoGoodsReceivePageList',
  //非货品邮包汇总报表列表
  GetNoGoodsMailPageList: config.MsHost + 'api/MsNoGoods/GetNoGoodsMailPageList',
  //	品牌物资列表
  GetBrandMaterialPageList: config.MsHost + 'api/MsNoGoods/GetBrandMaterialPageList',
  //保存物品邮寄信息
  SaveNoGoodsExpress: config.MsHost + 'api/MsNoGoods/SaveNoGoodsExpress',
  //保存物品邮寄信息【批量保存】
  SaveNoGoodsExpressBatch: config.MsHost + 'api/MsNoGoods/SaveNoGoodsExpressBatch',
  //	删除快递
  DeleteNoGoods: config.MsHost + 'api/MsNoGoods/DeleteNoGoods',
  //发送快递
  SendNoGoods: config.MsHost + 'api/MsNoGoods/SendNoGoods',
  //获取接收门店
  GetReceiverList: config.MsHost + 'api/MsNoGoods/GetReceiverList',
  //	接收快递
  NoGoodsReceive: config.MsHost + 'api/MsNoGoods/NoGoodsReceive',
  //退回快递
  ReturnExpress: config.MsHost + 'api/MsNoGoods/ReturnExpress',
  //编辑邮寄信息
  EditMailItem: config.MsHost + 'api/MsNoGoods/EditMailItem',
  // 保存物品邮寄信息（新增）
  SaveMailItem: config.MsHost + 'api/MsNoGoods/SaveMailItem',
  //查看非货品物资附件
  GetNoGoodsExpressAttachmentList: config.MsHost + 'api/MsNoGoods/GetNoGoodsExpressAttachmentList',
  //上传附件
  UploadAttachment: config.MsHost + 'api/MsNoGoods/UploadAttachment',
  //	退回附件
  ReturnAttachment: config.MsHost + 'api/MsNoGoods/ReturnAttachment',
  //	非货品发出-校验导入的数据
  BatchGetNoGoodsExpressList: config.MsHost + 'api/MsNoGoods/BatchGetNoGoodsExpressList',
  //	非货品发出-提交
  BatchUpdateNoGoodsExpressFreight:
    config.MsHost + 'api/MsNoGoods/BatchUpdateNoGoodsExpressFreight',
  //	非货品发出-调用excel公共方法导入数据获得数据够，马上调用下面接口获取导入的数据
  BatchGetNoGoodsExpressReceiveList:
    config.MsHost + 'api/MsNoGoods/BatchGetNoGoodsExpressReceiveList',
  //	接收-退回
  NoGoodsReturn: config.MsHost + 'api/MsNoGoods/NoGoodsReturn',

  /** 门店邮包管理 */
  // 修改是否邮寄
  SaveIsNeedPost: config.MsHost + 'api/MsShopGoods/SaveIsNeedPost',
  //	获取直营店退货管理界面获取货品信息
  GetMdianReturnGoodsPageList: config.MsHost + 'api/MsShopGoods/GetMdianReturnGoodsPageList',
  //	获取店内调拨列表
  GetStoreAllocationPageList: config.MsHost + 'api/MsShopGoods/GetStoreAllocationPageList',
  // 获取工装信息
  GetWorkClothesAllocationInfo: config.MsHost + 'api/MsShopGoods/GetWorkClothesAllocationInfo',
  //	获取包裹中的货品明细列表
  GetGroupDetailPageList: config.MsHost + 'api/MsShopGoods/GetGroupDetailPageList',
  //	邮包货品打包
  SaveMdianGroup: config.MsHost + 'api/MsShopGoods/SaveMdianGroup',
  //	门店根据条码或者凭证号获取退货信息
  GetGoodsList: config.MsHost + 'api/MsShopGoods/GetGoodsList',
  //	保存门店退货信息
  SaveMdianDetail: config.MsHost + 'api/MsShopGoods/SaveMdianDetail',
  //	邮寄货品提交至SPS
  SubmitSPS: config.MsHost + 'api/MsShopGoods/SubmitSPS',
  //	取消退货，冲销凭证
  CancelReturnGoods: config.MsHost + 'api/MsShopGoods/CancelReturnGoods',
  //删除货品
  DeleteGoodsByIDS: config.MsHost + 'api/MsShopGoods/DeleteGoodsByIDS',
  //	加盟店旧金退货，根据物料号获取货品信息
  JMGetGoodsList: config.MsHost + 'api/MsShopGoods/JMGetGoodsList',
  //	保存加盟门店退货信息
  JMSaveMdianDetail: config.MsHost + 'api/MsShopGoods/JMSaveMdianDetail',
  //	获取门店包裹管理列表数据
  GetMDIANGroupInfoPageList: config.MsHost + 'api/MsShopGoods/GetMDIANGroupInfoPageList',
  //	根据包裹号获取货品明细
  GetDetailByGourpID: config.MsHost + 'api/MsShopGoods/GetDetailByGourpID',
  //	删除门店包裹
  DeleteMdianGroup: config.MsHost + 'api/MsShopGoods/DeleteMdianGroup',
  //	门店添加快递
  SaveMdianExpress: config.MsHost + 'api/MsShopGoods/SaveMdianExpress',
  //	门店取消快递
  CancelShopExpress: config.MsHost + 'api/MsShopGoods/CancelShopExpress',
  //	保存门店包裹信息
  SaveMdianGroupInfo: config.MsHost + 'api/MsShopGoods/SaveMdianGroupInfo',
  //	直营掉直营
  ShopAllocationInStock: config.MsHost + 'api/MsShopGoods/ShopAllocationInStock',
  //	邮寄货品取消调拨，冲销凭证
  CancelAllocation: config.MsHost + 'api/MsShopGoods/CancelAllocation',
  //	工装退回
  SaveWorkClothesReturnDetail: config.MsHost + 'api/MsShopGoods/SaveWorkClothesReturnDetail',
  //	获取发送快递信息列表
  GetMdianSendExpressPageList: config.MsHost + 'api/MsShopGoods/GetMdianSendExpressPageList',
  //	获取接收快递信息列表
  GetMdianReceiveExpressPageList: config.MsHost + 'api/MsShopGoods/GetMdianReceiveExpressPageList',
  //	门店快递包裹配送单
  GetMdianGroupExpressPageList: config.MsHost + 'api/MsShopGoods/GetMdianGroupExpressPageList',
  //	录入快递费用
  GetMdianPremiumPageList: config.MsHost + 'api/MsShopGoods/GetMdianPremiumPageList',
  //	凭证入库查询（门店）
  GetShopReceiptCertPageList: config.MsHost + 'api/MsShopGoods/GetShopReceiptCertPageList',
  //	获取打印凭证记录（门店）
  GetCertPrintInfo: config.MsHost + 'api/MsShopGoods/GetCertPrintInfo',
  //	获取加盟掉加盟门店
  GetShopOfSameJMSBoss: config.MsHost + 'api/MsShopGoods/GetShopOfSameJMSBoss',

  /** 物流邮包管理 */
  //	根据包裹号获取货品信息
  GetLogisticsDetailByGourpID: config.MsHost + 'api/MsLogisticsGoods/GetLogisticsDetailByGourpID',
  //	根据凭证号获取其明细数据
  GetLogisticsGoodsInfo: config.MsHost + 'api/MsLogisticsGoods/GetLogisticsGoodsInfo',
  //货品保存打包
  SaveLogisticsGroup: config.MsHost + 'api/MsLogisticsGoods/SaveLogisticsGroup',
  //	分页获取物流包裹信息（打包列表）
  GetLogisticsGroupPageList: config.MsHost + 'api/MsLogisticsGoods/GetLogisticsGroupPageList',
  // 	包裹转交列表
  GetLogisticsGroupPageListByTransfer:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsGroupPageListByTransfer',
  // 	转交包裹
  ForwardGroup: config.MsHost + 'api/MsLogisticsGoods/ForwardGroup',
  //		删除包裹
  DeleteLogisticsGroup: config.MsHost + 'api/MsLogisticsGoods/DeleteLogisticsGroup',
  //		包裹管理列表
  GetLogisticsGroupPageListByManage:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsGroupPageListByManage',
  //	包裹退回
  LogisticsReturnGroup: config.MsHost + 'api/MsLogisticsGoods/LogisticsReturnGroup',
  //	包裹接收
  LogisticsReceiptGroup: config.MsHost + 'api/MsLogisticsGoods/LogisticsReceiptGroup',
  //发货快递列表
  GetLogisticsExpressPageListBySend:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsExpressPageListBySend',
  //		收货快递列表
  GetLogisticsExpressPageListByReceive:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsExpressPageListByReceive',
  //	物流取消快递
  CancelLogisticsExpress: config.MsHost + 'api/MsLogisticsGoods/CancelLogisticsExpress ',
  //	发货组拆快递
  LogisticsUnpackingExpress: config.MsHost + 'api/MsLogisticsGoods/LogisticsUnpackingExpress',
  //	收取包裹列表
  GetLogisticsGroupPageListByCollect:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsGroupPageListByCollect',
  //	收取包裹
  LogisticsReceiveGroup: config.MsHost + 'api/MsLogisticsGoods/LogisticsReceiveGroup',
  //	录入快递费用（物流）
  GetLogisticsPremiumPageList: config.MsHost + 'api/MsLogisticsGoods/GetLogisticsPremiumPageList',
  //	物流派发列表
  GetDistributePageList: config.MsHost + 'api/MsLogisticsGoods/GetDistributePageList',
  //	派发包裹
  DistributeGroup: config.MsHost + 'api/MsLogisticsGoods/DistributeGroup',
  //	派发包裹编辑备注
  DistributeEidtRemarks: config.MsHost + 'api/MsLogisticsGoods/DistributeEidtRemarks',
  //	凭证入库查询
  GetLogisticsReceiptCertPageList:
    config.MsHost + 'api/MsLogisticsGoods/GetLogisticsReceiptCertPageList',

  /*包裹*/
  //	拆包裹
  DepartmentUnpackingGroup: config.MsHost + 'api/MsGroupCommon/departmentUnpackingGroup',
  //	门店包裹批量编辑
  EditGroupManagement: config.MsHost + 'api/MsGroupCommon/EditGroupManagement',
  //	包裹转交单
  GetForwardBillList: config.MsHost + 'api/MsGroupCommon/GetForwardBillList',
  //	派发交接单
  GetDistributeBillList: config.MsHost + 'api/MsGroupCommon/GetDistributeBillList',
  //根据快递单号获取包裹号
  GetGroupByExpressId: config.MsHost + 'api/MsGroupCommon/GetGroupByExpressId',
  //物流根据包裹号获取包裹帖打印信息（导出包裹帖内容时使用）
  GetLogisticsGroupPrintInfo: config.MsHost + 'api/MsGroupCommon/GetLogisticsGroupPrintInfo',
  //根据快递编号获取明细信息
  GetExpGroupDetailByExpressID: config.MsHost + 'api/MsGroupCommon/GetExpGroupDetailByExpressID',

  /* 物流复核*/
  //	物流复核-	复核数据
  LoadLabelReview: config.MsHost + 'api/MsLabelReview/LoadLabelReview',
  //	物流复核-开始复核
  StartLabelReview: config.MsHost + 'api/MsLabelReview/StartLabelReview',
  //	物流复核-	添加盘点信息
  ReviewCheckRecord: config.MsHost + 'api/MsLabelReview/ReviewCheckRecord',
  //	物流复核-	提交复核结果
  SubmitReview: config.MsHost + 'api/MsLabelReview/SubmitReview',
  //	物流复核-	更新复核数量
  UpdateReviewNum: config.MsHost + 'api/MsLabelReview/UpdateReviewNum ',
  //	物流复核-	取消复核结果
  CancelReview: config.MsHost + 'api/MsLabelReview/CancelReview',
  //	物流复核-	删除复核明细
  DeleteReviewDetail: config.MsHost + 'api/MsLabelReview/DeleteReviewDetail',
  //	物流复核-	验证是否可以继续复核
  ValidateContinueReview: config.MsHost + 'api/MsLabelReview/ValidateContinueReview',
  //	物流复核-	获取复核历史记录
  GetReviewRecordPageList: config.MsHost + 'api/MsLabelReview/GetReviewRecordPageList',
  //	物流复核-	获取复核明细
  GetLabelReviewDetail: config.MsHost + 'api/MsLabelReview/GetLabelReviewDetail',
  //	物流复核-	获取未复核盘点列表(传入分页参数)
  GetNotReviewLabelCheck: config.MsHost + 'api/MsLabelReview/GetNotReviewLabelCheck',
  //	物流复核-	获取复核统计报表(传入分页参数)
  GetReviewReport: config.MsHost + 'api/MsLabelReview/GetReviewReport',

  /* 回仓*/
  //分页获取物流调拨命令列表
  GetLogisticsAllocationList: config.MsHost + 'api/MsBackAndAlloctaion/GetLogisticsAllocationList',
  //流调拨命令列表 -货品明细列表
  GetAllocationDetailByID: config.MsHost + 'api/MsBackAndAlloctaion/GetAllocationDetailByID',
  //分页获取物流调拨明细列表
  GetLogisticsAllocationDetailList:
    config.MsHost + 'api/MsBackAndAlloctaion/GetLogisticsAllocationDetailList',
  //获取门店调拨明细列表
  GetShopAllocationDetailList:
    config.MsHost + 'api/MsBackAndAlloctaion/GetShopAllocationDetailList',
  //物流导入数据后，根据导入的数据批量获取货品信息
  GetAllocationGoodsInfo: config.MsHost + 'api/MsBackAndAlloctaion/GetAllocationGoodsInfo',
  //保存或则保存同时提交
  SaveAllocationInfo: config.MsHost + 'api/MsBackAndAlloctaion/SaveAllocationInfo',
  //物流-回仓提交
  SubmitAllocationInfo: config.MsHost + 'api/MsBackAndAlloctaion/SubmitAllocationInfo',
  //门店操作延期调拨
  DelayAllocation: config.MsHost + 'api/MsBackAndAlloctaion/DelayAllocation',
  //门店拒绝调拨
  RefuseAllocation: config.MsHost + 'api/MsBackAndAlloctaion/RefuseAllocation',
};
export default {
  parcelApiUrl,
};
