<template>
  <div class="ManageLeft">
    <div class="p-5">
      123
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent,onMounted} from 'vue';
  import { setDOM } from '/@/utils/HeightScroll';

  export default defineComponent({
    name: 'PageManageLeft',
    setup() {
      onMounted(() => {
        setDOM('setLeftPage','.ManageLeft')
      });
      return {

      };
    },
  });
</script>
<style lang="less" scoped>
  .ManageLeft{
    width: 305px;
    height: calc(100% - 20px);
    margin: 20px 0 0 20px;
    background: #fff;
    border-top: 1px solid rgba(0,0,0,0.06);
    border-right: 1px solid rgba(0,0,0,0.06);
    border-left: 1px solid rgba(0,0,0,0.06);
    
  }
</style>
