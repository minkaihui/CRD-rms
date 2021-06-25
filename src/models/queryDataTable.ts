//查询公共配置表数据
export class QueryDataTable {
  EnableCache: boolean = false; //是否允许缓存
  Fields: string = "*"; //返回列
  IsDistinct: boolean = false; //是否去重
  OrderBy: string = ""; //是否去重,去重时，分页字段必须在去重字段中
  TableName: string = ""; //表名
  Top: number = 0; //前多少条  0 取所有
  Where: string = ""; //条件
}
