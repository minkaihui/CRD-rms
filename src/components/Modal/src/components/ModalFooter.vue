<template>

   <div
      class="flex items-center p-5" 
      :class="[FooterGPS ? FooterGPS : 'justify-between',TB_Border?'border-T':'']"
      :style="FooterStyle"
    >
      <div class="FooterLeft">
        <div v-if="LeftText">
          <a-button v-bind="LeftButtonProps" :type="LeftType" @click="handleLeft">
            {{ LeftText }}
          </a-button>
          <span class="texts">{{ LeftExplainText }}</span>
        </div>
      </div>
      <div>
        <slot name="insertFooter"></slot>
        <a-button
          :type="okType"
          @click="handleOk"
          :loading="confirmLoading"
          v-bind="okButtonProps"
          v-if="showOkBtn"
          :shape="FooterRound"
        >
          {{ okText }}
        </a-button>
        <slot name="centerFooter"></slot>
        <a-button
          v-bind="cancelButtonProps"
          :shape="FooterRound"
          @click="handleCancel"
          v-if="showCancelBtn"
          :style="RButtonStyle"
        >
          {{ cancelText }}
        </a-button>

        <slot name="appendFooter"></slot>
      </div>
    </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { basicProps } from '../props';
  export default defineComponent({
    name: 'BasicModalFooter',
    props: basicProps,
    emits: ['ok', 'cancel','left'],
    setup(_, { emit }) {
      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

          function handleLeft() {
      emit('left',e);
    }

      return { handleOk, handleCancel,handleLeft };
    },
  });

</script>

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
