<template>
  <BasicModal
    FooterGPS="justify-center"
    RButtonStyle="color: rgba(0,0,0,0.65);"
    title="新增文件夹"
     :wrapperProps="{ viewClass: 'CRDaddfile-60' }"
    v-bind="$attrs"
    :HeaderStyle="{
      'font-size': '24px',
      'font-weight': '600',
      'color': '#000',
      'padding': '5px 14px'
    }"
  >
    <div style="height: 506px;">
      <BasicTable :maxHeight="506" @register="registerTable"></BasicTable>
    </div>
  </BasicModal>
</template>

<style lang="less" scoped>
::v-deep(.vben-basic-table .ant-table .ant-table-tbody > tr:hover){
  background-color: #f4f5f7 !important;
}

::v-deep(.vben-basic-table .ant-table .ant-table-tbody > tr.ant-table-row-selected td){
  background-color: #f4f5f7 !important;
}

::v-deep(.ant-table-thead > tr > th){
  background-color: #fff;
}

::v-deep(.ant-table-thead){
  height: 40px;
}

::v-deep(.ant-table-row .ant-table-row-cell-break-word),
::v-deep(.ant-table-row){
  height: 75px;
}

::v-deep(.ant-table-fixed-header .ant-table-body-inner) {
  margin-right: -7px;
}

::v-deep(.vben-basic-table .ant-table-wrapper) {
  padding: 0;
}

</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal } from '/@/components/Modal';
import { BasicTable, useTable } from '/@/components/Table';
import { getBasicColumnsSm } from './tableData';
import { demoListApi } from '/@/api/demo/table';

export default defineComponent({
  components: {BasicModal, BasicTable},
  setup() {
   const [registerTable, { reload }] = useTable({
      title: '', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumnsSm(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'checkbox', //开启选中
        columnWidth: 100,
      },
    });
    return {
      registerTable,
    };
  },
});
</script>