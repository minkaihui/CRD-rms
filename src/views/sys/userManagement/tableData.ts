import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      align: 'left',
    },
    {
      title: '部门',
      dataIndex: 'id',
      width: 150,
      align: 'left',
    },
    {
      title: '角色',
      width: 165,
      align: 'left',
      dataIndex: 'address',
    },
    {
      title: '最后操作',
      align: 'left',
      dataIndex: 'beginTime',
    },
  ];
}

export function getBasicColumnsSm(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      align: 'left',
    },
    {
      title: '部门',
      dataIndex: 'id',
      width: 150,
      align: 'left',
    },
  ];
}
