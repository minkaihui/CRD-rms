<template>
  <div class="p-5">
    <!-- @contextmenu="rightButtonEvent" -->
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="link" size="large">添加人员</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '权限管理',
              onClick: handleAuthority.bind(null, record),
              StopClick:true,
            }
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getBasicColumns } from './tableData';
import { demoListApi } from '/@/api/demo/table';
export default defineComponent({
  name: 'UserManagementPage',
  components: { BasicTable,TableAction },
  setup() {
    const [registerTable, { reload }] = useTable({
      title: '用户管理', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumns(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'checkbox', //开启选中
        columnWidth: 100,
      },
      actionColumn: {
        title: '',
        dataIndex: 'action',
        width: 150,
        align:'left',
        slots: { customRender: 'action'},
      },
    });
    function handleAuthority(record: Recordable) {
      console.log('点击了编辑', record);
    }
    return {
      registerTable,
      handleAuthority,
    };
  },
});
</script>

<style lang="less" scoped>
::v-deep(.ant-table-thead){
  height: 40px;
}

::v-deep(.ant-table-row .ant-table-row-cell-break-word),
::v-deep(.ant-table-row){
  height: 75px;
}

::v-deep(.vben-basic-table .ant-table-wrapper .ant-table-title) {
  padding: 26px 33px !important;
}

::v-deep(.ant-table-fixed-header .ant-table-body-inner) {
  margin-right: -7px;
}


::v-deep(.vben-basic-table .ant-table-wrapper) {
  padding: 0;
}
</style>
