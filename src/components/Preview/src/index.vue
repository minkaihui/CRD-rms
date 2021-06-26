<template>
  <div :class="prefixCls">
    <PreviewGroup>
      <slot v-if="!imageList || $slots.default"></slot>
      <template v-else>
        <template v-for="item in getImageList" :key="item.src">
          <!-- :class="item.flag == 1 ? 'rms' : ''" -->
          <Image  v-bind="item">
            <template #placeholder v-if="item.placeholder">
              <Image v-bind="item" :src="item.placeholder" />
            </template>
          </Image>
        </template>
      </template>
    </PreviewGroup>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

import { Image } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';
import { isString } from '/@/utils/is';

interface ImageProps {
  alt?: string;
  fallback?: string;
  src: string;
  width: string | number;
  height?: string | number;
  // flag: string | number;
  placeholder?: string | boolean;
  preview?:
    | boolean
    | {
        visible?: boolean;
        onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
        getContainer: string | HTMLElement | (() => HTMLElement);
      };
}

type ImageItem = string | ImageProps;

export default defineComponent({
  name: 'ImagePreview',
  components: {
    Image,
    PreviewGroup: Image.PreviewGroup,
  },
  props: {
    functional: propTypes.bool,
    imageList: {
      type: Array as PropType<ImageItem[]>,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('image-preview');

    const getImageList = computed(() => {
      const { imageList } = props;
      if (!imageList) {
        return [];
      }
      return imageList.map((item) => {
        if (isString(item)) {
          return {
            src: item,
            placeholder: false,
          };
        }
        return item;
      });
    });

    return {
      prefixCls,
      getImageList,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-image-preview';

// .rms {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   max-height: 225px;
//   transform: translate(-50%, -50%);
// }

.@{prefix-cls} {
  .ant-image-preview-operations {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
