import componentSetting from '/@/settings/componentSetting';

const { table } = componentSetting;

const { pageSizeOptions, defaultPageSize, fetchSetting, defaultSortFn, defaultFilterFn } = table;

export const ROW_KEY = 'key';

//每页的可选显示编号；
export const PAGE_SIZE_OPTIONS = pageSizeOptions;

//每页显示的项目数
export const PAGE_SIZE = defaultPageSize;

//通用界面字段设置
export const FETCH_SETTING = fetchSetting;

//配置常规排序功能
export const DEFAULT_SORT_FN = defaultSortFn;

export const DEFAULT_FILTER_FN = defaultFilterFn;

//  Default layout of table cells
//表格单元格的默认布局
export const DEFAULT_ALIGN = 'center';
export const INDEX_COLUMN_FLAG = 'INDEX';
export const ACTION_COLUMN_FLAG = 'ACTION';
