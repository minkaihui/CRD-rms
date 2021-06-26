<template>
     <div class="p-4 h-full w-full" :class="TB_Border?'border-B':''">
      <BasicTitle :helpMessage="helpMessage" :style="HeaderStyle">
       {{ title }}
       </BasicTitle>
     </div>
</template>
<script lang="ts">
  import type { PropType,CSSProperties } from 'vue';
  import { defineComponent } from 'vue';
  import { BasicTitle } from '/@/components/Basic';

  export default defineComponent({
    name: 'BasicModalHeader',
    components: { BasicTitle },
    props: {
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
      title: { type: String },
       HeaderStyle: Object as PropType<CSSProperties>,
      TB_Border:{ type: String }
    },
  });
</script>
