export enum QueryConditionModel {
	//无
	NONE = 0,
	//等于
	EQUAL = 1,
	//在范围内
	IN = 2,
	//大于
	GREATER = 3,
	//小于
	LESS = 4,
	//大于等于
	GREATEREQUAL = 5,
	//小于等于
	LESSEQUAL = 6,
	//模糊匹配
	LIKE = 7,
	//区间
	BETWEEN = 8,
	//时间区间
	BETWEENANDDATE = 9,
	//不等于
	NOTEQUAL = 10,
	//以什么开头
	STARTWITH = 11,
	//以什么结尾
	ENDWITH = 12
}

export class PageQueryCondition {
	//字段名称
	FieldName: string = '';
	//匹配模式
	Mode?: QueryConditionModel;
	//传入的值
	Values?: string[];
}

export class PaginationModel {
	//页码
	page: number = 1;
	//每页行数
	rows: number = 50;
	OrderBy: string = ''; //排序方式
	IsQueryRealtimeStock: boolean = false; // 是否查询实时库 
	TableName: string = ''; //查询表名或试图
	TableFields?: string[]; //需要查询的字段
	IsDistinct: boolean = false; //是否去重,去重时，分页字段必须在去重字段中
	IsGetGroupByData: boolean = false; //是否获取分类汇总数据
	Where: string = ''; //自定义查询条件 eg:"OrderID='8008907789'"
	QueryConditions?: Array<PageQueryCondition>; //查询参数列表（有值得才会传递进来）
	ExcludeConditions?: Array<PageQueryCondition>; //排除查询参数列表（有值得才会传递进来）
}
