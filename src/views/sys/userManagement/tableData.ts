import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'id',
      // width: 300,
      align:'left'
    },
    {
      title: '部门',
      dataIndex: 'name',
      width: 90,
    },
    {
      title: '角色',
      width: 90,
      dataIndex: 'address',
    },
    {
      title: '最后操作',
      // width: 300,
      // sorter: true,
      dataIndex: 'beginTime',
    }
  ];
}