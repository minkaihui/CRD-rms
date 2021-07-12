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

    <!-- //上传素材 -->
    <div
      @click="open('上传素材')"
      class="flex items-center justify-center cursor-pointer"
      :class="!collapse ? 'uploadMaterial' : 'moren'"
    >
      <Icon color="#1665D8" icon="ant-design:upload-outlined" :size="16" />
      <span v-if="!collapse" style="color: #1665d8">上传素材</span>
    </div>

    <!-- 共享文件夹 -->
    <div class="flex items-center justify-between text-center sharedFolders" v-show="!collapse">
      <span v-if="!collapse">共享文件夹</span>
      <span class="mr-5" @click="open('共享文件夹')"
        ><Icon class="cursor-pointer" color="#666" icon="ant-design:plus-outlined" :size="16"
      /></span>
    </div>
    <a-menu
      style="width: 202px"
      mode="inline"
      :openKeys="openKeysPublic"
      v-model:selectedKeys="selectedKeysPublic"
      @openChange="onOpenChangePublic"
      v-if="userPublicFolder.arr && userPublicFolder.arr.length > 0"
      v-show="!collapse"
      @click="Uncheck"
    >
      <template v-for="(item, index) in userPublicFolder.arr">
        <!-- 第一层 -->
        <a-sub-menu v-if="item.ChildFolderList" :key="item.FolderId + item.FolderLevel">
          <template #expandIcon>
            <span class="opacity-0"></span>
          </template>
          <template #title>
            <span
              style="margin-right: 5px"
              @contextmenu="
                RightClick(
                  $event,
                  item.FolderId + item.FolderLevel,
                  open,
                  '共享文件夹',
                  FolderDeletion
                )
              "
            >
              <Icon
                icon="ant-design:caret-right-filled"
                size="10"
                class="Transition"
                :class="openKeys[index] == item.FolderId + item.FolderLevel ? 'Rotation' : ''"
              ></Icon>
              <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
              <span>{{ item.FolderName }}</span>
            </span>
          </template>
          <template v-for="it in item.ChildFolderList" :key="it.FolderId + it.FolderLevel">
            <!-- 第二层 -->

            <a-sub-menu v-if="t.ChildFolderList" :key="t.FolderId + t.FolderLevel">
              <template #expandIcon>
                <span class="opacity-0"></span>
              </template>
              <template #title>
                <span
                  style="margin-right: 5px"
                  @contextmenu="
                    RightClick(
                      $event,
                      it.FolderId + it.FolderLevel,
                      open,
                      '共享文件夹',
                      FolderDeletion
                    )
                  "
                >
                  <Icon
                    icon="ant-design:caret-right-filled"
                    size="10"
                    class="Transition"
                    :class="openKeys[index] == it.FolderId + it.FolderLevel ? 'Rotation' : ''"
                  ></Icon>
                  <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
                  <span>{{ it.FolderName }}</span>
                </span>
              </template>
              <!-- 第三层 -->
              <a-menu-item
                v-for="t in item.ChildFolderList"
                @contextmenu="
                  RightClick($event, t.FolderId + t.FolderLevel, open, '共享文件夹', FolderDeletion)
                "
                :key="t.FolderId + t.FolderLevel"
              >
                <Icon
                  icon="ant-design:folder-outlined"
                  class="icon-top"
                  style="margin-left: 19px"
                ></Icon>
                {{ t.FolderName }}
              </a-menu-item>
            </a-sub-menu>
            <!-- 第二层 -->
            <a-menu-item
              v-else
              @contextmenu="
                RightClick($event, it.FolderId + it.FolderLevel, open, '共享文件夹', FolderDeletion)
              "
              :key="it.FolderId + it.FolderLevel"
              >{{ it.FolderName }}</a-menu-item
            >
          </template>
        </a-sub-menu>
        <!-- 第一层 -->
        <a-menu-item
          v-else
          @contextmenu="
            RightClick($event, item.FolderId + item.FolderLevel, open, '共享文件夹', FolderDeletion)
          "
          :key="item.FolderId + item.FolderLevel"
        >
          <Icon icon="ant-design:folder-outlined" class="icon-top" style="margin-left: 19px"></Icon>
          {{ item.FolderName }}
        </a-menu-item>
      </template>
    </a-menu>

    <!-- 私人文件夹 -->
    <div
      class="flex items-center text-center"
      :class="!collapse ? 'sharedFolders justify-between' : 'moren justify-center'"
    >
      <span v-if="!collapse">私人文件夹</span>
      <span :class="!collapse ? 'mr-5' : ''" @click="open('私人文件夹')"
        ><Icon
          @click="open('私人文件夹')"
          class="cursor-pointer"
          color="#666"
          icon="ant-design:plus-outlined"
          :size="16"
      /></span>
    </div>
    <!-- let userPrivateFolder=[];
      let userPublicFolder=[];
      ChildFolderList: null
FolderAuthority: 0
FolderId: "fde7efbf-18a3-4125-a896-d337e3d650ba"
FolderLevel: 1
FolderName: "名称"
UpdateTime: "2021-06-28 17:14:59" -->
    <!-- {{userPrivateFolder[0]}} -->
    <a-menu
      style="width: 202px"
      mode="inline"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      v-if="userPrivateFolder.arr && userPrivateFolder.arr.length > 0"
      v-show="!collapse"
      @click="Uncheck"
    >
      <template v-for="(item, index) in userPrivateFolder.arr">
        <!-- 第一层 -->
        <a-sub-menu v-if="item.ChildFolderList" :key="item.FolderId + item.FolderLevel">
          <template #expandIcon>
            <span class="opacity-0"></span>
          </template>
          <template #title>
            <span
              style="margin-right: 5px"
              @contextmenu="
                RightClick(
                  $event,
                  item.FolderId + item.FolderLevel,
                  open,
                  '私人文件夹',
                  FolderDeletion
                )
              "
            >
              <Icon
                icon="ant-design:caret-right-filled"
                size="10"
                class="Transition"
                :class="openKeys[index] == item.FolderId + item.FolderLevel ? 'Rotation' : ''"
              ></Icon>
              <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
              <span>{{ item.FolderName }}</span>
            </span>
          </template>
          <template v-for="it in item.ChildFolderList" :key="it.FolderId + it.FolderLevel">
            <!-- 第二层 -->
            <a-sub-menu v-if="t.ChildFolderList" :key="t.FolderId + t.FolderLevel">
              <template #expandIcon>
                <span class="opacity-0"></span>
              </template>
              <template #title>
                <span
                  style="margin-right: 5px"
                  @contextmenu="
                    RightClick(
                      $event,
                      it.FolderId + it.FolderLevel,
                      open,
                      '私人文件夹',
                      FolderDeletion
                    )
                  "
                >
                  <Icon
                    icon="ant-design:caret-right-filled"
                    size="10"
                    class="Transition"
                    :class="openKeys[index] == it.FolderId + it.FolderLevel ? 'Rotation' : ''"
                  ></Icon>
                  <Icon icon="ant-design:folder-outlined" class="icon-top"></Icon>
                  <span>{{ it.FolderName }}</span>
                </span>
              </template>
              <!-- 第三层 -->
              <a-menu-item
                @contextmenu="
                  RightClick($event, t.FolderId + t.FolderLevel, open, '私人文件夹', FolderDeletion)
                "
                v-for="t in item.ChildFolderList"
                :key="t.FolderId + t.FolderLevel"
              >
                <Icon
                  icon="ant-design:folder-outlined"
                  class="icon-top"
                  style="margin-left: 19px"
                ></Icon>
                {{ t.FolderName }}
              </a-menu-item>
            </a-sub-menu>
            <!-- 第二层 -->
            <a-menu-item
              v-else
              @contextmenu="
                RightClick($event, it.FolderId + it.FolderLevel, open, '私人文件夹', FolderDeletion)
              "
              :key="it.FolderId + it.FolderLevel"
              >{{ it.FolderName }}</a-menu-item
            >
          </template>
        </a-sub-menu>
        <!-- 第一层 -->
        <!--  -->
        <a-menu-item
          v-else
          @contextmenu="
            RightClick($event, item.FolderId + item.FolderLevel, open, '私人文件夹', FolderDeletion)
          "
          :key="item.FolderId + item.FolderLevel"
        >
          <Icon icon="ant-design:folder-outlined" class="icon-top" style="margin-left: 19px"></Icon>
          {{ item.FolderName }}
        </a-menu-item>
      </template>
    </a-menu>

    <fileModal width="1019px" @register="fileRegister" />
    <addModal width="630px" @register="addRegister" @Folder="onFolder" />
    <!-- <addPrivateModal width="630px" @register="addPrivate" /> -->

    <UploadModal />
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

  // 文件夹接口
  import { GetUserPublicFolder, GetUserPrivateFolder, DeleteFolder } from '/@/api/sys/folder';

  //文件夹状态
  import { useUserFolder } from '/@/store/modules/folder';
  const userFolder = useUserFolder();
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  // 右键菜单
  import { CollapseContainer } from '/@/components/Container/index';
  import { rightButtonEvent } from './rightButton';

  // 弹框
  import { useModal } from '/@/components/Modal';
  import fileModal from './modal/fileModal.vue';
  import addModal from './modal/addModal.vue';
  // import addPrivateModal from './modal/addPrivateModal.vue';
  import UploadModal from './modal/UploadModal_RMS.vue';
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      Menus,
      SimpleSubMenu,
      Icon,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ASubMenu: Menu.SubMenu,
      fileModal,
      addModal,
      UploadModal,
      CollapseContainer,
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

      //文件夹列表
      const userPrivateFolder = reactive({ arr: [] });
      const userPublicFolder = reactive({ arr: [] });
      let rootSubmenuPublic = [];
      let rootSubmenuPrivat = [];
      async function init() {
        let PublicFolder = await GetUserPublicFolder({
          userId: userStore.getUserInfo.UserId,
        });

        let PrivateFolder = await GetUserPrivateFolder({
          userId: userStore.getUserInfo.UserId,
        });

        userPublicFolder.arr = PublicFolder;
        userPrivateFolder.arr = PrivateFolder;

        userPrivateFolder.arr.map((item) => {
          rootSubmenuPrivat.push(item.FolderId + item.FolderLevel);
        });

        userPublicFolder.arr.map((item) => {
          rootSubmenuPublic.push(item.FolderId + item.FolderLevel);
        });
      };
      init();
      //公共文件夹管理
      const statePublic = reactive({
        rootSubmenuKeysPublic: rootSubmenuPublic,
        openKeysPublic: [''],
        selectedKeysPublic: [''],
      });
      const onOpenChangePublic = (openKeys: string[]) => {
        const latestOpenKey = openKeys.find(
          (key) => statePublic.openKeysPublic.indexOf(key) === -1
        );
        if (statePublic.rootSubmenuKeysPublic.indexOf(latestOpenKey!) === -1) {
          statePublic.openKeysPublic = openKeys;
        } else {
          statePublic.openKeysPublic = latestOpenKey ? [latestOpenKey] : [];
        }
      };

      //私有文件夹管理
      const state = reactive({
        rootSubmenuKeys: rootSubmenuPrivat,
        openKeys: [''],
        selectedKeys: [''],
      });
      const onOpenChange = (openKeys: string[]) => {
        const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
        if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          state.openKeys = openKeys;
        } else {
          state.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      };

      //打开弹框
      const [fileRegister, { openModal: fileOpenModal }] = useModal();
      const [addRegister, { openModal: addOpenModal }] = useModal();
      // const [addPrivate, { openModal: addPrivateModal }] = useModal();

      async function open(value,Edit,id) {
        
        if(Edit=='编辑文件夹名称'){
          console.log(id.substr(0,id.length-1)+'1')
          await userFolder.setOpenEdit(id.substr(0,id.length-1)+'1');
        }else if(Edit=='编辑文件夹'){
          await userFolder.setOpenEdit(id.substr(0,id.length-1)+'0');
        }else{
          await userFolder.setOpenEdit('');
        }

        if (value == '上传素材') {
          fileOpenModal();
        } else if (value == '共享文件夹') {
          let ml = statePublic.selectedKeysPublic[0];
          await userFolder.setOpenModal(false);
          await userFolder.setOpenKey(ml ? ml.substr(ml.length - 1, 1) : '0');
          addOpenModal();
        } else if (value == '私人文件夹') {
          let ml = state.selectedKeys[0];
          await userFolder.setOpenModal(true);
          await userFolder.setOpenKey(ml ? ml.substr(ml.length - 1, 1) : '0');
          addOpenModal();
        }
      }

      //文件夹取消选中
      function Uncheck(e) {
        if (e.key == state.selectedKeys[0]) {
          e.key = '';
          state.selectedKeys.shift();
        } else if (e.key == statePublic.selectedKeysPublic[0]) {
          e.key = '';
          statePublic.selectedKeysPublic.shift();
        }
      }

      // 右键菜单
      function RightClick(event, value, open, showName, FolderDeletion) {
        state.selectedKeys[0] = value;
        rightButtonEvent(event, value, open, showName, FolderDeletion);
      }

      //文件夹删除
      function FolderDeletion(FolderId) {
        DeleteFolder({
          dto: {
            /// 文件ID
            FolderId: FolderId.substr(0,FolderId.length-1),
            /// 修改人
            UpdatetorID: userStore.getUserInfo.UserId,
            /// 修改人姓名
            UpdatetorName: userStore.getUserInfo.UserName,
          },
        });
      }

      //监听更新文件夹
      function onFolder(flag){
        if(flag){
          init();
          statePublic.rootSubmenuKeysPublic=rootSubmenuPublic;
          state.rootSubmenuKeys=rootSubmenuPrivat;
        }
      }

      return {
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState),
        //私有文件夹管理
        userPrivateFolder,
        ...toRefs(state),
        onOpenChange,
        // 公共文件夹管理
        userPublicFolder,
        ...toRefs(statePublic),
        onOpenChangePublic,
        //打开弹框
        fileRegister,
        addRegister,
        open,
        //文件夹取消选中
        Uncheck,
        //右键菜单
        RightClick,
        rightButtonEvent,
        FolderDeletion,
        //监听更新文件夹
        onFolder
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>

<style lang="less" scoped>
  .uploadMaterial {
    width: 160px;
    height: 40px;
    border: 1px solid #1665d8;
    margin: 20px 20px 10px 20px;
  }

  .sharedFolders {
    margin-left: 30px;
    height: 40px;
    line-height: 40px;
  }

  .moren {
    height: 46px;
    text-align: center;
  }

  ::v-deep(.ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title) {
    padding-left: 16px !important;
  }

  ::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    background-color: rgba(0, 0, 0, 0);
  }

  ::v-deep(.ant-menu-inline .ant-menu-item::after) {
    border-right: none;
  }

  .Transition {
    transition: all 0.5s;
  }

  .Rotation {
    transform: rotate(90deg) translateX(2px);
  }

  .icon-top {
    transform: translateY(1px);
  }
</style>
