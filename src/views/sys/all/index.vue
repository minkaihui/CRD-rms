<template>
  <div class="flex justify-start h-full">
    <div class="w-full">
     <!-- 中心模块1 -->
      <PageContentWrapper></PageContentWrapper>
    </div>
    <!-- 右侧模块1 -->
      <RightPageWrapper></RightPageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper,RightPageWrapper,PageContentWrapper} from '/@/components/Page_RMS';
  export default defineComponent({
    name: 'AllPage',
    components: { PageWrapper, RightPageWrapper ,PageContentWrapper},
    setup() {

    },
  });
</script>
