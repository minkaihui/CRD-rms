<template>
<!-- :class="Border.B" -->
    <div class="p-4 h-full w-full" :class="TB_Border?'border-B':''">
      <BasicTitle :helpMessage="helpMessage" :style="HeaderStyle">
        {{ title }}
      </BasicTitle>
    </div>
</template>

<script lang="ts">
import type { PropType, CSSProperties } from 'vue';
import { defineComponent } from 'vue';
import { BasicTitle } from '/@/components/Basic';

import { propTypes } from '/@/utils/propTypes';
export default defineComponent({
  name: 'BasicModalHeader',
  components: { BasicTitle },
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
    title: propTypes.string,
    HeaderStyle: Object as PropType<CSSProperties>,
    TB_Border:propTypes.boolean
  },
});
</script>
