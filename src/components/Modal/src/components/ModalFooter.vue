<template>
  <div class="flex justify-between items-center" :style="FooterStyle">
    <div class="FooterLeft flex-1" >
      <div v-if="showLeftBtn">
        <a-button v-bind="LeftButtonProps" :type="LeftType" shape="round" @click="handleLeft" >
        {{ LeftText }}
      </a-button>
      <span class="texts">{{ LeftExplainText }}</span>
      </div>
    </div>
    <div>
      <slot name="insertFooter"></slot>
      <a-button v-bind="cancelButtonProps" shape="round" @click="handleCancel" v-if="showCancelBtn">
        {{ cancelText }}
      </a-button>
      <slot name="centerFooter"></slot>
      <a-button
        :type="okType"
        @click="handleOk"
        :loading="confirmLoading"
        v-bind="okButtonProps"
        v-if="showOkBtn"
        shape="round"
      >
        {{ okText }}
      </a-button>
      <slot name="appendFooter"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.FooterLeft {
  height: 100%;
  text-align: left;

  .texts {
    width: 104px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    color: #b8bac0;
    text-align: center;
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';

import { basicProps } from '../props';
export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel','left'],
  setup(_, { emit }) {
    function handleOk() {
      emit('ok');
    }

    function handleCancel() {
      emit('cancel');
    }

     function handleLeft() {
      emit('left');
    }
    return { handleOk, handleCancel,handleLeft };
  },
});
</script>
