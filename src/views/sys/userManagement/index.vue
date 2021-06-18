<template>
  <div class="p-5">
     <!-- @contextmenu="rightButtonEvent" -->
    <BasicTable @register="registerTable">
          <template #toolbar>
            <!-- 待定 -->
          </template>
        </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { demoListApi } from '/@/api/demo/table';
  export default defineComponent({
    name: 'UserManagementPage',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
      title: '', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumns(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      canResize: true, //自动高度
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'checkbox', //开启选中
        // columnWidth: 0,
      },
    });
      return{
        registerTable
      }
    },
  });
</script>
