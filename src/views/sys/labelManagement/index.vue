<template>
  <div class="flex justify-start h-full">
    <!-- 中心模块1 -->
    <PageManageLeft></PageManageLeft>
    <div class="w-full">
     
      <!-- 右侧模块1 -->
      <PageManageRight></PageManageRight>
    </div>
    
  </div>
</template>
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
