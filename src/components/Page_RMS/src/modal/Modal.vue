<template>
  <BasicModal v-bind="$attrs" title="不通过原因">
    <!-- v-model:value="" -->
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

<style lang="less">

.scroll-container .scrollbar__wrap{
  margin: 0 !important;
}

.textarea {
  height: 100%;
  border: none;
  resize: none;
}
</style>
