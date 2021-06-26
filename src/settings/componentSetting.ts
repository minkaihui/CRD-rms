// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';

export default {
  //基本表设置 
  table: {
    //表单接口请求常规配置
    //支持xxx.xxx.xxx 
    fetchSetting: {
      // 当前页面的字段名称传递给后台
      pageField: 'page',
      //后台显示的每个页面的数字字段名称
      sizeField: 'pageSize',
      //接口返回的表单数据的字段名称
      listField: 'items',
      //接口字段名称返回的表总数 
      totalField: 'total',
    },
    //可以选择的页面数
    pageSizeOptions: ['10', '50', '80', '100'],
    //一页上的默认显示数量
    defaultPageSize: 10,
    //自定义常规排序功能 
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      return {
        //将排序字段传递给您的后端
        field,
        //将排序方法传递给背景asc /desc
        order,
      };
    },
    //自定义常规过滤功能 
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  //滚动条设置 
  scrollbar: {
    //是否使用本机滚动条
    //打开后，菜单，模式，抽屉会将弹出式滚动条更改为本机
    native: false,
  },
};
