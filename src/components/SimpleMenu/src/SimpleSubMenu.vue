<template>
  <div
    :class="[
      getI18nName == '音频' ? 'mkh1-1' : '',
      getI18nName == '审核列表' ? 'mkh1' : '',
      getI18nName == '上传素材' ? 'mkh2' : '',
      getI18nName == '共享文件夹' ? 'mkh3' : '',
      getIsCollapseParent? 'men' : 'menleft'
    ]"
  >
    <MenuItem
      :name="item.path"
      v-if="!menuHasChildren(item) && getShowMenu"
      v-bind="$props"
      :class="[getLevelClass, `${prefixCls}__upload`]"
      @click="open"
    >
      <Icon v-if="getIcon &&  getI18nName != '共享文件夹' || getIsCollapseParent" :icon="getIcon" :size="16" />
      <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-1 collapse-title">
        {{ getI18nName }}
      </div>
      <template #title>
        <span :class="['ml-2', `${prefixCls}-sub-title`]">
          {{ getI18nName }}
        </span>
        <SimpleMenuTag :item="item" :collapseParent="getIsCollapseParent" />
      </template>
    </MenuItem>
    <SubMenu
      :name="item.path"
      v-if="menuHasChildren(item) && getShowMenu"
      :class="[getLevelClass, theme]"
      :collapsedShowTitle="collapsedShowTitle"
    >
      <template #title>
        <Icon v-if="getIcon" :icon="getIcon" :size="16" /> 

        <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-2 collapse-title">
          {{ getI18nName }}
        </div>

        <span v-show="getShowSubTitle" :class="['ml-2', `${prefixCls}-sub-title`]">
          {{ getI18nName }}
        </span>
        <SimpleMenuTag :item="item" :collapseParent="!!collapse && !!parent" />
      </template>
      <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
        <SimpleSubMenu v-bind="$props" :item="childrenItem" :parent="false" />
      </template>
    </SubMenu>

    <fileModal width="1019px" @register="fileRegister" />
    <addModal width="630px" @register="addRegister" />
  </div>
</template>
<style lang="less" scoped>

.menleft{
  ::v-deep(.vben-simple-menu__upload) {
    padding: 9px 30px;
     padding-left: 30px !important;
  }
}



.mkh1-1 {
  margin-bottom: 10px;
}

.mkh1 {
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.mkh2 {
  ::v-deep(.vben-menu-item-active:not(.vben-menu-submenu)::after) {
    background-color: rgba(255, 255, 255, 0) !important;
  }

  ::v-deep(.vben-simple-menu__upload) {
    display: block;
    height: 40px;
    padding: 0;
    padding-left: 0 !important;
    margin: 20px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #1665d8;
  }

  
}

::v-deep(.ant-modal) {
    width: 800px !important;
  }

.mkh3 {
  ::v-deep(.vben-menu-item-active:not(.vben-menu-submenu)::after) {
    background-color: rgba(255, 255, 255, 0) !important;
  }

  ::v-deep(.vben-menu-item-active:not(.vben-menu-submenu)) {
    background-color: rgba(255, 255, 255, 0);
  }

  ::v-deep(.vben-simple-menu__upload) {
    padding: 0 30px;
    cursor: auto;
  }
}

.men{
   ::v-deep(.vben-simple-menu__upload) {
    height: auto;
    padding: 0;
    margin: 0;
    line-height: inherit;
    cursor: pointer;
    border: none;
  }

  ::v-deep(.vben-menu-item-active:not(.vben-menu-submenu)::after) {
    background-color: #0960bd !important;
  }

  ::v-deep(.vben-menu-item-active:not(.vben-menu-submenu)) {
    background-color: rgba(9, 96, 189, 0.1);
  }
}
</style>
<script lang="ts">
import type { PropType } from 'vue';
import type { Menu } from '/@/router/types';

import { defineComponent, computed } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import Icon from '/@/components/Icon/index';

import MenuItem from './components/MenuItem.vue';
import SubMenu from './components/SubMenuItem.vue';
import { propTypes } from '/@/utils/propTypes';
import { useI18n } from '/@/hooks/web/useI18n';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

import { useModal } from '/@/components/Modal';
import fileModal from './modal/fileModal.vue';
import addModal from './modal/addModal.vue';

export default defineComponent({
  name: 'SimpleSubMenu',
  components: {
    SubMenu,
    MenuItem,
    SimpleMenuTag: createAsyncComponent(() => import('./SimpleMenuTag.vue')),
    Icon,
    fileModal,
    addModal
  },
  props: {
    item: {
      type: Object as PropType<Menu>,
      default: () => {},
    },
    parent: propTypes.bool,
    collapsedShowTitle: propTypes.bool,
    collapse: propTypes.bool,
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup(props) {
    const { t } = useI18n();
    const { prefixCls } = useDesign('simple-menu');

    const getShowMenu = computed(() => !props.item?.meta?.hideMenu);
    const getIcon = computed(() => props.item?.icon);
    let getI18nName = computed(() => t(props.item?.name));
    const getShowSubTitle = computed(() => !props.collapse || !props.parent);
    const getIsCollapseParent = computed(() => !!props.collapse && !!props.parent);
    const getLevelClass = computed(() => {
      return [
        {
          [`${prefixCls}__parent`]: props.parent,
          [`${prefixCls}__children`]: !props.parent,
        },
      ];
    });

    function menuHasChildren(menuTreeItem: Menu): boolean {
      return (
        !menuTreeItem.meta?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      );
    }

    //打开弹框
    const [fileRegister, { openModal: fileOpenModal }] = useModal();
    const [addRegister, { openModal: addOpenModal }] = useModal();

    function open() {
      if (getI18nName.value == '上传素材') {
        fileOpenModal();
      }else if (getI18nName.value == '共享文件夹' && getIsCollapseParent.value) {
         addOpenModal();
      }
    }

    return {
      prefixCls,
      menuHasChildren,
      getShowMenu,
      getIcon,
      getI18nName,
      getShowSubTitle,
      getLevelClass,
      getIsCollapseParent,
      //打开弹框
      fileRegister,
      addRegister,
      open,
    };
  },
});
</script>
