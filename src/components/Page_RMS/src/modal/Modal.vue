<template>
  <BasicModal :closable="false" v-bind="$attrs" title="不通过原因"
  :HeaderStyle="{'font-size': '14px','color': 'rgba(0,0,0,0.65)','padding':'14px 14px 0'}"
  FooterRound="round"
  >
  <div style="padding: 0 36px;">
     <InputTextArea class="textarea" :value="textarea" />
  </div>
   
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
// .ant-modal-wrap {
//   ::v-deep(.ant-modal-header){
//     padding-bottom: 0 !important;
//     border-bottom: none !important;
//   }

//   ::v-deep(.ant-modal-footer) {
//     padding-top: 0 !important;
//     border-top: none !important;
//   }

//   ::v-deep(.scroll-container .scrollbar__wrap) {
//     margin: 0 !important;
//   }
// }

.textarea {
  height: 7.5rem !important;
  resize: none;
}
</style>
