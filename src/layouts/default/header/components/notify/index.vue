<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="count" :numberStyle="numberStyle" >
        <img class=" mt-6" src="/src/assets/images/men/Message.png" alt="">
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in tabListData" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <NoticeList :list="item.list" />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { tabListData } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    components: { Popover, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');

      let count = 0;

      for (let i = 0; i < tabListData.length; i++) {
        count += tabListData[i].list.length;
      }

      return {
        prefixCls,
        tabListData,
        count,
        numberStyle: {
          top:"13px"
        },
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  ::v-deep(.ant-badge-count){
    top: 13px !important;
  }
  .@{prefix-cls} {
    padding-top: 2px;
    padding-right: 10px;
    padding-left: 10px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
