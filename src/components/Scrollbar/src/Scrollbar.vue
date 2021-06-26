<template>
  <div class="scrollbar">
    <div
      ref="wrap"
      :class="[wrapClass, 'scrollbar__wrap', native ? '' : 'scrollbar__wrap--hidden-default']"
      :style="style"
      @scroll="handleScroll"
    >
      <component :is="tag" ref="resize" :class="['scrollbar__view', viewClass]" :style="viewStyle">
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar :move="moveX" :size="sizeWidth" />
      <bar vertical :move="moveY" :size="sizeHeight" />
    </template>
  </div>
</template>
<script lang="ts">
  import { addResizeListener, removeResizeListener } from '/@/utils/event';
  import componentSetting from '/@/settings/componentSetting';
  import { useThrottleFn } from '@vueuse/core';
  const { scrollbar } = componentSetting;
  import { toObject } from './util';
  import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
    provide,
    computed,
    unref,
  } from 'vue';
  import Bar from './bar';

  export default defineComponent({
    name: 'Scrollbar',
    // inheritAttrs: false,
    components: { Bar },
    props: {
      native: {
        type: Boolean,
        default: scrollbar?.native ?? false,
      },
      wrapStyle: {
        type: [String, Array],
        default: '',
      },
      wrapClass: {
        type: [String, Array],
        default: '',
      },
      viewClass: {
        type: [String, Array],
        default: '',
      },
      viewStyle: {
        type: [String, Array],
        default: '',
      },
      noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
      tag: {
        type: String,
        default: 'div',
      },
    },
    emits: ['handleScroll'],
    setup(props,{emit}) {
      const sizeWidth = ref('0');
      const sizeHeight = ref('0');
      const moveX = ref(0);
      const moveY = ref(0);
      const wrap = ref();
      const resize = ref();

      provide('scroll-bar-wrap', wrap);

      const style = computed(() => {
        if (Array.isArray(props.wrapStyle)) {
          return toObject(props.wrapStyle);
        }
        return props.wrapStyle;
      });

     

      const handleScroll = useThrottleFn(() => {
        
        if (!props.native) {
          moveY.value = (unref(wrap).scrollTop * 100) / unref(wrap).clientHeight;
          moveX.value = (unref(wrap).scrollLeft * 100) / unref(wrap).clientWidth;
          emit("handleScroll",unref(wrap).scrollTop,unref(wrap).scrollHeight)
        }
      }, 100)

      const update = () => {
        if (!unref(wrap)) return;

        const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight;
        const widthPercentage = (unref(wrap).clientWidth * 100) / unref(wrap).scrollWidth;

        sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : '';
        sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : '';
      };

      onMounted(() => {
        if (props.native) return;
        nextTick(update);
        if (!props.noresize) {
          addResizeListener(unref(resize), update);
          addResizeListener(unref(wrap), update);
          addEventListener('resize', update);
        }
      });

      onBeforeUnmount(() => {
        if (props.native) return;
        if (!props.noresize) {
          removeResizeListener(unref(resize), update);
          removeResizeListener(unref(wrap), update);
          removeEventListener('resize', update);
        }
      });

      return {
        moveX,
        moveY,
        sizeWidth,
        sizeHeight,
        style,
        wrap,
        resize,
        update,
        handleScroll,
      };
    },
  });
</script>
<style lang="less">
  .scrollbar {
    position: relative;
    height: 100%;
    overflow: hidden;

    &__wrap {
      height: 100%;
      overflow: auto;

      &--hidden-default {
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          opacity: 0;
        }
      }
    }

    &__thumb {
      position: relative;
      display: block;
      width: 0;
      height: 0;
      cursor: pointer;
      background-color: rgba(144, 147, 153, 0.3);
      border-radius: inherit;
      transition: 0.3s background-color;

      &:hover {
        background-color: rgba(144, 147, 153, 0.5);
      }
    }

    &__bar {
      position: absolute;
      right: 2px;
      bottom: 2px;
      z-index: 1;
      border-radius: 4px;
      opacity: 0;
      -webkit-transition: opacity 80ms ease;
      transition: opacity 80ms ease;

      &.is-vertical {
        top: 2px;
        width: 6px;

        & > div {
          width: 100%;
        }
      }

      &.is-horizontal {
        left: 2px;
        height: 6px;

        & > div {
          height: 100%;
        }
      }
    }
  }

  .scrollbar:active > .scrollbar__bar,
  .scrollbar:focus > .scrollbar__bar,
  .scrollbar:hover > .scrollbar__bar {
    opacity: 1;
    transition: opacity 340ms ease-out;
  }
</style>
