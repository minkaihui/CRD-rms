/*配置维修相关接口方法 */
import config from '../config';
export default {
  /**获得委托协议打印数据 */
  GetRepairShopAgreementPrintDto: config.OmsHost + 'api/ClientPrint/GetRepairShopAgreementPrintDto',
  //获取销售单打印数据
  GetOrderPrintData: config.OmsHost + 'api/ClientPrint/GetOrderPrintData',
  //获取定制预定打印数据
  GetDZAndBookingOrderPrintData: config.OmsHost + 'api/ClientPrint/GetDZAndBookingOrderPrintData',
  //获得在店维修打印数据
  GetRepairShopPrintData: config.OmsHost + 'api/ClientPrint/GetRepairShopPrintData',
  //获得返厂维修打印数据
  GetRepairFactoryPrintData: config.OmsHost + 'api/ClientPrint/GetRepairFactoryPrintData',
};
