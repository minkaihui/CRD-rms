<template>
  <div class="flex">
    <div class="w-full">
      <PageWrapper title="全部">
      <!-- 中心模块1 -->
      <PageContentWrapper  title="全部1"></PageContentWrapper>
      </PageWrapper>
    </div>
    <div>
      <!-- 右侧模块1 -->
      <RightPageWrapper></RightPageWrapper>
    </div>
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
