<template>
  <Menus
    v-bind="getBindValues"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapsedShowTitle="collapsedShowTitle"
        :collapse="collapse"
      />
    </template>
     <!-- //文件夹管理 -->
    <a-menu
      style="width: 202px"
      mode="inline"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
    >
      <a-sub-menu key="sub1">
        <template #expandIcon>
          <span class="opacity-0" ></span>
        </template>
        <template #title>
          <span>
            <Icon icon="ant-design:caret-right-filled" size="10" class="Transition" :class="openKeys[0]=='sub1'?'Rotation':''"></Icon>
            <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
            <span>Navigation One</span>
          </span>
        </template>
        
        <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #expandIcon>
          <span class="opacity-0" ></span>
        </template>
        <template #title>
          <span>
            <Icon icon="ant-design:caret-right-filled" size="10" class="Transition" :class="openKeys[0]=='sub2'?'Rotation':''"></Icon>
            <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
            <span>Navigation Two</span>
          </span>
        </template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-menu-item key="11">
        <Icon icon="ant-design:folder-outlined" class="icon-top ml-19"></Icon>
        Option 11
      </a-menu-item>
    </a-menu>
  </Menus>
</template>
<script lang="ts">
  import type { MenuState } from './types';
  import type { Menu as MenuType } from '/@/router/types';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';

  import { defineComponent, computed, ref, unref, reactive, toRefs, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

import { Menu } from 'ant-design-vue';
  import Menus from './components/Menu.vue';
  import SimpleSubMenu from './SimpleSubMenu.vue';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { propTypes } from '/@/utils/propTypes';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { useRouter } from 'vue-router';
  import { isFunction, isUrl } from '/@/utils/is';
  import { openWindow } from '/@/utils';

  import { useOpenKeys } from './useOpenKeys';
  import { Icon } from '/@/components/Icon';
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      Menus,
      SimpleSubMenu,
      Icon,
     AMenu:Menu,
    AMenuItem:Menu.Item,
    ASubMenu:Menu.SubMenu,
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
      collapse: propTypes.bool,
      mixSider: propTypes.bool,
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapsedShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
      },
      isSplitMenu: propTypes.bool,
    },
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref('');
      const isClickGo = ref(false);

      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: [],
      });

      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('simple-menu');
      const { items, accordion, mixSider, collapse } = toRefs(props);

      const { setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider,
        collapse
      );

      const getBindValues = computed(() => ({ ...attrs, ...props }));

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = [];
          } else {
            setOpenKeys(currentRoute.value.path);
          }
        },
        { immediate: true }
      );

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            return;
          }
          setOpenKeys(currentRoute.value.path);
        },
        { flush: 'post' }
      );

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return;

        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        handleMenuChange(route);

        if (unref(currentActiveMenu)) {
          menuState.activeName = unref(currentActiveMenu);
          setOpenKeys(unref(currentActiveMenu));
        }
      });

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;
        menuState.activeName = path;

        setOpenKeys(path);
      }

      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.activeName = key;
      }


      //文件夹管理
       const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      selectedKeys: [],
    });
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

      return {
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState),
         //文件夹管理
        ...toRefs(state),
      onOpenChange,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>

<style lang="less" scoped>
::v-deep(.ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title){
    padding-left: 16px !important;
  }

::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected){
  background-color: rgba(0, 0, 0, 0);
}

::v-deep(.ant-menu-inline .ant-menu-item::after){
  border-right: none;
}

   .Transition{
     transition: all 0.5s;
     margin-right: 5px;
   }

  .Rotation{
    transform: rotate(90deg) translateX(2px);
  }

  .icon-top{
    transform: translateY(1px);
  }

  .ml-19{
    margin-left: 19px;
  }
</style>
