<template>
  <ConfigProvider v-bind="lockEvent" :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import {ScreenFixedScale}  from '/@/settings/encryptionSetting';
import { AppProvider } from '/@/components/Application';
import { useTitle } from '/@/hooks/web/useTitle';
import { useLocale } from '/@/locales/useLocale';
import { useDebounceFn } from '@vueuse/core';

export default defineComponent({
  name: 'App',
  components: { ConfigProvider, AppProvider },
  setup() {
    // 屏幕监听
    -(function screenResize() {
      function getSystem() {
        let flag = false;
        let agent = navigator.userAgent.toLowerCase();
        //		var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        //		if(isMac) {
        //			return false;
        //		}
        //现只针对windows处理，其它系统暂无该情况，如有，继续在此添加
        if (agent.indexOf('windows') >= 0) {
          return true;
        }
      }
      // 修改
      function correct() {
        let body = document.getElementsByTagName('body')[0];
        body.style.zoom = ScreenFixedScale / window.devicePixelRatio;
      }
      onMounted(() => {
        //window下更新dom
        if (!getSystem) return;
        correct();
      });
      // 防抖
      const debouncedFn = useDebounceFn(() => {
        correct();
      }, 500);
      // 挂载
      onBeforeMount(() => {
        if (!getSystem) return;
        window.addEventListener('resize', debouncedFn);
      });
      // 销毁
      onBeforeUnmount(() => {
        if (!getSystem) return;
        window.removeEventListener('resize', () => {
          correct();
        });
      });
    })();

    useTitle();

      // support Multi-language
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
  },
});
</script>
