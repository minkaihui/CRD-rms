/* 本地存储key值配置*/
export const storageKey = {
  /*用户信息存储key值 */
  userInfoKey: 'LSS_userInfoKey',

  /*用户权限、菜单和后台系统配置信息 */
  userMenuPermissionKey: 'LSS_userMenuPermissionKey',
  /* 获取省份信息*/
  provincesInfoKey: 'LSS_provincesInfoKey',
  /*缓存的页面 */
  cachedPageName: 'LSS_cachedPageName',
  /*缓存的打开页面 */
  openedPageList: 'LSS_openedPageList',
  /*超级管理员缓存KEY值 特殊处理，不以RTS开头，人为控制清空还是不清空*/
  superAdministratorKey: 'SuperAdministratorKeyLSS',
  lockScreenStateKey: 'LSS_lockScreenStateKey',
  /*库位列表(登录人关联库位)*/
  relationLocationListKey: 'LSS_relationLocationList',
  /*快递单号校验配置信息*/
  expressCheckInfoKey: 'LSS_expressCheckInfoKey',
};

/*基础配置 */
export const globalConfig: any = {
  //模块编号配置
  moduleCode: {
    // 非货品
    MsNoGoodsSend: 'MsNoGoodsSend', //非货品发出
    MsNoGoodsReceive: 'MsNoGoodsReceive', //非货品接收
    MsBrandMaterialList: 'MsBrandMaterialList', //品牌物资列表
    MsNoGoodsExpressReport: 'MsNoGoodsExpressReport', //非货品邮寄汇总报表
    // 门店
    MsShopGoodsManage: 'MsShopGoodsManage', //门店退货管理
    MsStoreRoomAllocation: 'MsStoreRoomAllocation', //店间调拨
    MsWorkclothesAllocation: 'MsWorkclothesAllocation', //工装调拨管理
    MsWorkclothesReturn: 'MsWorkclothesReturn', //工装退回
    MsShopGroupManage: 'MsShopGroupManage', //门店包裹管理
    MsShopSendExpressList: 'MsShopSendExpressList', //门店发货快递列表
    MsShopReceiveExpressList: 'MsShopReceiveExpressList', //门店收货快递列表
    MsShopDistributionBill: 'MsShopDistributionBill', //门店快递包裹配送单
    MsShopPremiumList: 'MsShopPremiumList', //门店录入快递费用
    MsShopBackAndAllocationDetail: 'MsShopBackAndAllocationDetail', //门店回仓/店间调拨明细

    // 物流
    MsLogisticsGoodsPackList: 'MsLogisticsGoodsPackList', //物流货品打包列表
    MsLogisticsGoodsPack: 'MsLogisticsGoodsPack', //物流货品打包
    MsLogiticsForwardGroupList: 'MsLogiticsForwardGroupList', //物流包裹转交
    MsLogisticsGroupList: 'MsLogisticsGroupList', //物流包裹管理
    MsLogisticsSendExpressList: 'MsLogisticsSendExpressList', //物流发货快递列表
    MsLogisticsReceiveExpressList: 'MsLogisticsReceiveExpressList', //物流收货快递列表
    MsLogisticsOfficeGroupList: 'MsLogisticsOfficeGroupList', //科室收取包裹列表
    MsLogiticsDistributeGroupList: 'MsLogiticsDistributeGroupList', //派发包裹
    MsLogisticsHandoverBill: 'MsLogisticsHandoverBill', //物流包裹转交单
    MsLogisticsDistributeBill: 'MsLogisticsDistributeBill', //物流派发交接单
    MsLogisticsPremiumList: 'MsLogisticsPremiumList', //物流录入快递费用
    MsBackAndAlloctaionList: 'MsBackAndAlloctaionList', //物流回仓/店间调拨列表
    MsBackAndAllocationDetail: 'MsBackAndAllocationDetail', //物流回仓/店间调拨明细
    MsReviewLabel: 'MsReviewLabel', //回收标签复核
    MsReviewLabelHistory: 'MsReviewLabelHistory', //回收标签复核历史
    MsReviewLabelStatistics: 'MsReviewLabelStatistics', //回收标签复核统计
  },
  //方法编号
  functionCode: {
    Add: 'Add', //新增
    Edit: 'Edit', //编辑
    Delete: 'Delete', //删除
    Cancel: 'Cancel', //取消
    Print: 'Print', //打印
    Submit: 'Submit', //提交
    Forward: 'Forward', //转交
    View: 'View', //查看
    ViewDetail: 'ViewDetail', //查看明细
    Search: 'Search', //查询
    Sync: 'Sync', //同步
    Enable: 'Enable', //启用
    Disable: 'Disable', //停用
    Refuse: 'Refuse', //拒绝
    QuickEdit: 'QuickEdit', //快速编辑
    OpenShop: 'OpenShop', //开店
    StartBusiness: 'StartBusiness', //开业
    CloseShop: 'CloseShop', //撤店
    HalfClosedShop: 'HalfClosedShop', //半闭店
    StopBusiness: 'StopBusiness', //停业
    Import: 'Import', //导入
    Export: 'Export', //导出
    MenuPermission: 'MenuPermission', //菜单权限
    FunctionPermission: 'FunctionPermission', //功能权限
    Download: 'Download', //下载
    Upload: 'Upload', //上传
    Copy: 'Copy', //复制
    EditDetail: 'EditDetail', //编辑明细
    GenerateCoupon: 'GenerateCoupon', //生成券
    SearchTodayGoldPrice: 'SearchTodayGoldPrice', //查询当日金价
    BatchAdd: 'BatchAdd', //批量增加
    Send: 'Send', //发货
    Distribute: 'Distribute', //派发
    Receipt: 'Receipt', //收货
    Confirm: 'Confirm', //确认
    tempSave: 'tempSave', //暂存
    Delay: 'Delay', //延期
    Return: 'Return', //退回
    Pack: 'Pack', //打包
    Unpack: 'Unpack', //拆包
    OwnToOwn: 'OwnToOwn', //直营调直营
    OwnToOther: 'OwnToOther', //直营调加盟
    OtherToOther: 'OtherToOther', //加盟调加盟
    WorkclothesAllocation: 'WorkclothesAllocation', //工装调拨
    WorkclothesReturn: 'WorkclothesReturn', //工装退回
    CustomerGoodsReturn: 'CustomerGoodsReturn', //客货退货
    StoreGoodsReturn: 'StoreGoodsReturn', //柜货退货
    OldGoldReturn: 'OldGoldReturn', //旧金退货
    ITalkUsePC: 'ITalkUsePC', //ITalkPC端使用
    ITalkUseMobile: 'ITalkUseMobile', //ITalk移动端使用
    ITalkUsePad: 'ITalkUsePad', //ITalkPad端使用
    FullControl: 'FullControl', //完全控制
    ViewGuangZhou: 'ViewGuangZhou', //查看广州
    ViewShenZhen: 'ViewShenZhen', //查看深圳
  },

  //图片上传子目录
  bcebosSubModule: {
    /**品牌物资粘贴图片 */
    brandMaterialModule: 'ms/brandMaterial',
  },
  // 操作类型
  OperationType: {
    /**
     * 加盟店旧货退货
     */
    JMOldGoodsReturn: 'JR01',
    /**
     * 加盟柜货退货
     */
    JMCounterReturn: 'JR02',
    /**
     * 加盟旧金退货
     */
    JMOldGoldReturn: 'JR03',
    /**
     * 直营旧货退货
     */
    ZYOldGoodsReturn: 'MR01',
    /**
     * 直营柜货退货
     */
    ZYCounterReturn: 'MR02',
    /**
     * 直营旧金退货
     */
    ZYOldGoldReturn: 'MR03',
    /**
     * 工装退回
     */
    FrockReturn: 'MR04',
    /**
     * 直营掉直营
     */
    OwnShopToOwnShop: 'MA01',
    /**
     * 直营调加盟
     */
    OwnShopToOtherShop: 'MA02',
    /**
     * 加盟调加盟
     */
    OtherShopToOtherShop: 'MA03',
    /**
     * 工装调拨
     */
    FrockAllocation: 'MA04',
    /**
     * 物流操作
     */
    Logistics: 'M000',
  },
  //发货类型
  SendType: {
    //货品邮寄
    HPYJ: 'HPYJ',
    //礼品邮寄
    LPYJ: 'LPYJ',
    //品牌物质
    PPWZ: 'PPWZ',
    //文件邮寄
    WJYJ: 'WJYJ',
    //物资邮寄
    WZYJ: 'WZYJ',
    //证书邮寄
    ZSYJ: 'ZSYJ',
  },
  //门店类型
  ShopType: {
    //直营店
    OwnShop: 'CT01',
    //加盟店
    OtherShop: 'CT02',
    //电商门店
    NetShop: 'CT03',
  },
  //门店状态
  ShopStatus: {
    //待开店
    TempCreate: 0,
    //待开业
    WaitingToOpen: 1,
    //开业
    Open: 2,
    //停业
    Stop: 3,
    //闭店
    Closed: 4,
  },
  /** 货品所在地 */
  GoodsAddressType: {
    /**
     * 工装调拨
     */
    WorkclothesAllocation: 'A',
    /**
     * 工装退回
     */
    WorkclothesReturn: 'B',
    /**
     * 货品在门店
     */
    Shop: 'M',
    /**
     * 货品在物流
     */
    Logistics: 'W',
    /**
     * 店间调拨
     */
    StoreRoomAllocation: 'J',
    /**
     * 非邮寄店间调拨
     */
    NonPostStoreRoomAllocation: 'K',
    /**
     * 非邮寄退货的货品在门店
     */
    NonPostShop: 'S',
    /**
     * 非邮寄退货的货品在物流
     */
    NonPostLogistics: 'L',
  },
  /**库位类型 */
  LocationType: {
    /**
     * 金库
     */
    GoldStore: 'J',
    /**
     * 柜台库
     */
    SaleStore: 'A',
    /**
     * 退货库
     */
    ReturnStore: 'B',
    /**
     * 旧金库
     */
    oldGoldStore: 'H',
  },
  //非货品物流状态
  MsNoGoodsState: {
    /**
     * 待发送
     */
    WaitSend: 'P001',
    /**
     * 已发送
     */
    EndSend: 'P002',
    /**
     * 已接收
     */
    Receive: 'P003',
    /**
     * 已退回
     */
    Return: 'P003',
  },

  //系统来源
  SystemFrom: {
    PC: 'OS01',
    Mobile: 'OS02',
    IPad: 'OS03',
  },
  //api类型
  ApiType: {
    RTS: 'rts',
    OMS: 'oms',
    WMS: 'wms',
    MGS: 'mgs',
    REPORT: 'report',
    MS: 'ms',
  },

  //系统平台
  OperateSystem: {
    windows: 'windows',
    ipad: 'ipad',
    mac: 'mac',
    android: 'android',
    iphone: 'iphone',
    other: 'other',
  },

  //后台系统配置类型
  SystemConfigType: {
    stringType: 1,
    floatType: 2,
    intType: 3,
    boolType: 4,
  },
  //扫码业务类型
  ScanBusinessType: {
    Login: 'Login',
    LSSAuth: 'LSSAuth',
  },
};

export default {
  storageKey,
  globalConfig,
};
