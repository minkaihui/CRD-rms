<template>
  <PageWrapper contentFullHeight="true">
    <template #headerContent>
      <a-tabs default-active-key="1" size="small">
        <a-tab-pane key="1" tab="Tab 1">
          <div class="tab_right">
            <img src="../../../../assets/images/BaiduHi_2021-4-30_17-2-41.png" alt="">
          </div>
          <a-input :value="value" placeholder="Basic usage" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2"> Content of Tab 2 </a-tab-pane>
      </a-tabs>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { Tabs , Ainput } from 'ant-design-vue';

export default defineComponent({
  components: {
    PageWrapper,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
    Ainput,
  },
  setup() {
    let value=''
    return {value};
  },
});
</script>
<style scoped lang="less">
.vben-page-wrapper {
  @media (max-width: @screen-lg) {
    width: 0;
  }

  @media (min-width: @screen-lg) {
    width: 210px;
    height: 100%;
    background-color: #fff;
  }

   ::v-deep(.ant-page-header) {
    padding: 16px 15px;
  }

  ::v-deep(.ant-page-header-content) {
    padding-top: unset;
  }

  ::v-deep(.ant-tabs-bar){
    margin-bottom: 16px;
    border-bottom: none;
  }
  
  ::v-deep(.ant-tabs .ant-tabs-small-bar .ant-tabs-tab) {
    padding: 5px 5px;
  }

  ::v-deep(.ant-tabs-ink-bar){
    display: none !important;
  }
}

.tab_right{
  height: 130px;
  border: 1px solid #eee;

  img{
    width: 100%;
    height: 100%;
  }
}
</style>
