/**获取地址的同ts文件 */
import httpClient from '../httpClient';
import reportFormApiConfig from '../apiConfig/reportApiConfig';

export default {
  /**报表头部查询条件
   * @param {*} reportTypeCode
   * 报表类型
   * @returns
   */
  async GetRtsReportBaseInfo(reportTypeCode: any) {
    const result = await httpClient.Post(reportFormApiConfig.GetRtsReportBaseInfo, reportTypeCode);
    return result;
  },
};
