<template>
  <div class="bg-white" :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
        <span v-if="!hasRedirect(routes, route)" class="text-black">
          {{ t(route.name || route.meta.title) }}
          <span class="text-cool-gray-400 text-xs ml-1">(200)</span>
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ t(route.name || route.meta.title) }}
        </router-link>
      </template>
    </a-breadcrumb>
    <div v-if="flag">
      <a-dropdown :trigger="['click']">
        <div class="ant-dropdown-link inline-block cursor-pointer text-black-65 bg-white" @click.prevent>
          排序方式
          <img class="inline-block" src="/src/assets/images/men/sort-down.png" alt="" />
        </div>
        <template #overlay>
          <a-menu class="sort-down" style="padding-right: 15px">
            <a-menu-item key="0" @click="sortord">列表视图</a-menu-item>
            <a-menu-item key="1" @click="sortord">卡片视图</a-menu-item>
            <a-menu-item key="2">按时间排序</a-menu-item>
            <a-menu-item key="3">按名称排序</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      &nbsp;
      <a-dropdown :trigger="['click']">
        <div class="ant-dropdown-link text-black-65 inline-block cursor-pointer bg-white" @click.prevent>
          筛选
          <img class="inline-block" src="/src/assets/images/men/filter.png" alt="" />
        </div>
        <template #overlay>
          <a-menu class="sort-down" style="padding-right: 15px">
            <a-menu-item key="0">列表视图</a-menu-item>
            <a-menu-item key="1">卡片视图</a-menu-item>
            <a-menu-item key="2">按时间排序</a-menu-item>
            <a-menu-item key="3">按名称排序</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      &nbsp;&nbsp;

      <div class="inline-block" style="position: relative">
        <a-dropdown :trigger="['click']">
          <div class="ant-dropdown-link inline-block bg-white" @click.prevent>
            <div class="inline-block search-img">
              <span class="cursor-pointer" style="vertical-align: middle; display: inline-block"
                ><img src="/src/assets/images/men/search.png" alt=""
              /></span>
              <span class="cursor-pointer" style="vertical-align: middle; display: inline-block"
                ><img src="/src/assets/images/men/down-small.png" alt=""
              /></span>
            </div>
          </div>
          <template #overlay>
            <a-menu class="checkbox-classify">
              <div class="classify-head">搜索范围</div>
              <CheckboxGroup
                class="search-checkbox"
                v-model:value="value1"
                name="checkboxgroup"
                :options="searchList"
                @change="checkboxChange"
              />
            </a-menu>
          </template>
        </a-dropdown>
        <div class="pl-2 inline-block">
          <a-input style="padding-left: 40px" placeholder="搜索" v-model="searchValue">
            <template #prefix> </template>
          </a-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
 import type { RouteLocationMatched } from 'vue-router';
  import type { typeMenus } from '/@/router/types';

import { defineComponent, ref, watchEffect, toRefs, reactive } from 'vue';

import { Breadcrumb, Popover, Input, Checkbox, Dropdown, Menu } from 'ant-design-vue';
  import Icon from '/@/components/Icon';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRouter } from 'vue-router';

  import { propTypes } from '/@/utils/propTypes';
  import { isString } from '/@/utils/is';
  import { filter } from '/@/utils/helper/treeHelper';
  import { getMenus } from '/@/router/menus';

  import { REDIRECT_NAME } from '/@/router/constant';
  import { getAllParentPath } from '/@/router/helper/menuHelper';



export default defineComponent({
  name: 'LayoutBreadcrumb',
  components: {
    Icon,
    [Breadcrumb.name]: Breadcrumb,
    [Popover.name]: Popover,
    [Input.name]: Input,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.Divider.name]: Menu.Divider,
  },
  props: {
    theme: propTypes.oneOf(['dark', 'light']),
    flag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const routes = ref<RouteLocationMatched[]>([]);
    const { currentRoute } = useRouter();
    const { prefixCls } = useDesign('layout-breadcrumb');
    const { getShowBreadCrumbIcon } = useRootSetting();
    const go = useGo();

    const { t } = useI18n();
    watchEffect(async () => {
      if (currentRoute.value.name === REDIRECT_NAME) return;
      const menus = await getMenus();

      const routeMatched = currentRoute.value.matched;
      const cur = routeMatched?.[routeMatched.length - 1];
      let path = currentRoute.value.path;

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu as string;
      }

      const parent = getAllParentPath(menus, path);
      const filterMenus = menus.filter((item) => item.path === parent[0]);
      const matched = getMatched(filterMenus, parent) as any;

      if (!matched || matched.length === 0) return;

      const breadcrumbList = filterItem(matched);

      if (currentRoute.value.meta?.currentActiveMenu) {
        breadcrumbList.push(({
          ...currentRoute.value,
          name: currentRoute.value.meta?.title || currentRoute.value.name,
        } as unknown) as RouteLocationMatched);
      }
      routes.value = breadcrumbList;
    });

    function getMatched(menus: typeMenus[], parent: string[]) {
      const metched: typeMenus[] = [];
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name,
          });
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent));
        }
      });
      return metched;
    }

    function filterItem(list: RouteLocationMatched[]) {
      let resultList = filter(list, (item) => {
        const { meta, name } = item;
        if (!meta) {
          return !!name;
        }
        const { title, hideBreadcrumb, hideMenu } = meta;
        if (!title || hideBreadcrumb || hideMenu) {
          return false;
        }
        return true;
      }).filter((item) => !item.meta?.hideBreadcrumb || !item.meta?.hideMenu);

      return resultList;
    }

    function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
      e?.preventDefault();
      const { children, redirect, meta } = route;

      if (children?.length && !redirect) {
        e?.stopPropagation();
        return;
      }
      if (meta?.carryParam) {
        return;
      }

      if (redirect && isString(redirect)) {
        go(redirect);
      } else {
        let goPath = '';
        if (paths.length === 1) {
          goPath = paths[0];
        } else {
          const ps = paths.slice(1);
          const lastPath = ps.pop() || '';
          goPath = `${lastPath}`;
        }
        goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
        go(goPath);
      }
    }

    function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
      if (routes.indexOf(route) === routes.length - 1) {
        return false;
      }
      return true;
    }

    function getIcon(route) {
      return route.icon || route.meta?.icon;
    }

    //排序方式
    const filterVisible = ref<boolean>(false);

    let filterHide = () => {
      filterVisible.value = false;
    };

    //筛选方式
    const sortDownVisible = ref<boolean>(false);

    let sortDownHide = () => {
      sortDownVisible.value = false;
    };

    //搜索
    const searchValue = ref<string>('');

    const searchList = ['名称', '文件夹名', '标签', '注释', '上传人员'];

    const state = reactive({
      value1: [...searchList],
      value2: ['名称'],
      value3: ['文件夹名'],
      value4: ['标签'],
      value5: ['注释'],
      value6: ['上传人员'],
    });

    function checkboxChange(e) {
      context.emit('checkboxChange', e);
    }

    function sortord(e) {
      let emit = null;
      if (e.key == 0) {
        emit = 'ListView';
      } else if (e.key == 1) {
        emit = 'CardView';
      }
      context.emit('sortord', emit);
    }

    return {
      routes,
      t,
      prefixCls,
      getIcon,
      getShowBreadCrumbIcon,
      handleClick,
      hasRedirect,
      //排序
      filterVisible,
      filterHide,
      sortord,
      //筛选
      sortDownVisible,
      sortDownHide,
      //搜搜分类
      checkboxChange,
      searchValue,
      searchList,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-layout-breadcrumb';



.checkbox-classify {
  width: 132px;
  padding: 5px 10px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  box-shadow: 0 6 12px 0 rgba(0, 0, 0, 0.06);

  .classify-head {
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    text-shadow: 0 6px 12px 0 rgba(0,0,0,0.06);
  }

  .search-checkbox .ant-checkbox-group-item {
    width: 100%;
    height: 20px;
    margin-right: 0;
    margin-bottom: 11px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    text-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06);
  }

}

.search-img {
    position: absolute;
    top: 50%;
    left: 20px;
    z-index: 1;
    transform: translateY(-50%);
  }

.sort-down {
  width: 112px;
  height: 119px;
  padding: 8px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06);

  .ant-dropdown-menu-item {
    width: 100%;
    padding: 4px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.65);
    text-align: left;
    text-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06);
  }

}

.t-h {
  div {
    height: 25px;
    font-size: 0.875rem;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.65);
  }
}

.ant-popover-title {
  min-width: 112px;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.45);
}

.ant-popover-inner-content {
  padding: 8px 12px !important;
  border-radius: 8px;
}

.@{prefix-cls} {
  display: flex;
  padding: 10px 10px 10px 20px;
  align-items: center;
  justify-content: space-between;

  .ant-breadcrumb-link {
    .anticon {
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }

  &--light {
    .ant-breadcrumb-link {
      color: @text-color-base;

      a {
        color: rgba(0, 0, 0, 0.65);

        &:hover {
          color: @primary-color;
        }
      }
    }

    .ant-breadcrumb-separator {
      color: @text-color-base;
    }
  }

  &--dark {
    .ant-breadcrumb-link {
      color: rgba(255, 255, 255, 0.6);

      a {
        color: rgba(255, 255, 255, 0.8);

        &:hover {
          color: @white;
        }
      }
    }

    .ant-breadcrumb-separator,
    .anticon {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
