<template>
  <BasicModal v-bind="$attrs" title="不通过原因">
    <InputTextArea class="textarea" :value="textarea" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';
import { BasicModal } from '/@/components/Modal';
export default defineComponent({
  components: { BasicModal, InputTextArea: Input.TextArea },
  setup(props) {
    let textarea = '';

    return textarea;
  },
});
</script>


<style lang="less" scoped>
.ant-modal-wrap {
  /deep/ .ant-modal-header {
    padding-bottom: 0 !important;
    border-bottom: none !important;
  }

  /deep/ .ant-modal-footer {
    padding-top: 0 !important;
    border-top: none !important;
  }

  /deep/ .scroll-container .scrollbar__wrap {
    margin: 0 !important;
  }
}

.textarea {
  height: 7.5rem !important;
  resize: none;
}
</style>
