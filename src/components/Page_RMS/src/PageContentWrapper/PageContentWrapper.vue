<template>
  <div class="p-4">
    <a-list>
      <a-row :gutter="16">
        <!-- <template > -->
        <a-col :span="6" style="max-width: 100%" v-for="(item, index) in list" :key="index">
          <a-list-item>
            <a-card :hoverable="true" :class="`${prefixCls}__card`">
              <ImagePreview :imageList="[item]" />
              <div :class="`${prefixCls}__card-detail`"> 1.jpg </div>
            </a-card>
          </a-list-item>
        </a-col>
        <!-- </template> -->
      </a-row>
    </a-list>
    <!-- <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>
    </BasicTable> -->
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Row, Col, List } from 'ant-design-vue';
import { BasicTable, useTable } from '/@/components/Table';
import { getBasicColumns } from './tableData';
import { ImagePreview } from '/@/components/Preview/index';
import { demoListApi } from '/@/api/demo/table';
export default defineComponent({
  components: {
    BasicTable,
    [Card.name]: Card,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Row.name]: Row,
    [Col.name]: Col,
    ImagePreview,
  },
  setup() {
    console.log(demoListApi());
    const [registerTable, { reload }] = useTable({
      title: '全部', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumns(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      canResize: true, //自动高度
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'checkbox', //开启选中
      },
    });
    function handleReloadCurrent() {
      reload();
    }

    function handleReload() {
      reload({
        page: 1,
      });
    }
    return {
      prefixCls: 'list-card',
      registerTable,
      handleReloadCurrent,
      handleReload,
      list:[
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
        'https://picsum.photos/id/68/346/216',
        'https://picsum.photos/id/68/346/216',
        'https://picsum.photos/id/68/346/216',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
        'https://picsum.photos/id/68/346/216',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
         'https://picsum.photos/id/68/346/216',
      ]
    };
  },
});
</script>
<style lang="less" scoped>

::v-deep(.ant-card-body) {
    padding: 0;
  }

::v-deep(.ant-list-item) {
    min-width: 180px;
  }

.list-card {
  

  &__link {
    margin-top: 10px;
    font-size: 14px;

  }

  &__card {
    width: 100%;
    margin-bottom: -8px;
    background-color: rgba(0,0,0,0);
    border: 2px solid rgba(26,115,232,.8);
    border-radius: 4px;

    &-detail {
      padding-bottom: 5px;
      font-size: 14px;
      color: @text-color-secondary;
      text-align: center;
    }
  }
}
</style>
