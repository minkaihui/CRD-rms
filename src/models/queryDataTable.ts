//查询公共配置表数据
export class QueryDataTable {
  EnableCache = false; //是否允许缓存
  Fields = '*'; //返回列
  IsDistinct = false; //是否去重
  OrderBy = ''; //是否去重,去重时，分页字段必须在去重字段中
  TableName = ''; //表名
  Top = 0; //前多少条  0 取所有
  Where = ''; //条件
}
