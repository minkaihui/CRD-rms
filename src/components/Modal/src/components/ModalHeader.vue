<template>
  <BasicTitle :helpMessage="helpMessage" :style="HeaderStyle">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
  import type {PropType, CSSProperties} from 'vue';
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
      HeaderStyle: Object as PropType<CSSProperties>
    },
  });
</script>
