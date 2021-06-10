<template>
<div>
  <!-- @click="showModal" -->
<Modal class="to" v-model:visible="visible" width="480px" centered :footer="null" :closable="false">
      <div class="pos w-full flex justify-between items-center">
            <div class="Selection">从本地选择</div>
            <div class="Selection">从网盘中选择</div>
        </div>
</Modal>
</div>
</template>
<style lang="less" scoped>
.Selection{
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
}
</style>
<style lang="less">
.to .ant-modal-content{
  background-color: rgba(0,0,0,0);
    box-shadow: none;
}
</style>
<script lang="ts">
  import { defineComponent, ref} from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { Modal } from 'ant-design-vue';

  export default defineComponent({
    components:{Modal},
    name: 'Time',
    props: {
    //   step: propTypes.number.def(60),
    //   mode: propTypes.oneOf(['date', 'datetime', 'relative']).def('relative'),
    },
    setup(props) {
      const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
    };
    },
  });
</script>
