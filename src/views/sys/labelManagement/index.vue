<template>
  <div class="flex justify-between h-full page">
    <!-- 中心模块1 -->
    <PageManageLeft></PageManageLeft>
    <!-- 右侧模块1 -->
    <PageManageRight></PageManageRight>
  </div>
</template>
<style lang="less" scoped>
.page{
  background-color: #fbfbfd;
}
</style>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageManageLeft,PageManageRight} from '/@/components/Page_Manage';
  export default defineComponent({
    name: 'labelManagement',
    components: {PageManageLeft ,PageManageRight},
    setup() {

    },
  });
</script>
