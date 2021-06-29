<template>
  <div class="flex justify-start h-full">
    <!-- 中心模块1 -->
    <PageContentWrapper />
    <!-- 右侧模块1 -->
    <RightPageWrapper />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { RightPageWrapper, PageContentWrapper } from '/@/components/Page_RMS';
  export default defineComponent({
    name: 'FilePage',
    components: { RightPageWrapper, PageContentWrapper },
    setup() {},
  });
</script>
