<template>
  <div>
    <!-- 头部 -->
    <LayoutBreadcrumb
      @checkboxChange="checkboxChange"
      @sortord="sortord"
      :flag="true"
      :theme="getHeaderTheme"
    />
    <!-- 分类 -->
    <div class="flex items-center bg-white down-tab">
      <a-dropdown
        :trigger="['click']"
        v-for="(item, index) in sortDowns"
        :key="index"
        @visibleChange="tabDownChange"
        @click="tabDownClick(index)"
        v-model:visible="item.visible"
      >
        <div class="tab" @click.prevent>
          <div
            class="flex items-center justify-center ant-dropdown-link inline-block cursor-pointer bg-white"
            :class="tabDownShow == index ? 'ant-dropdown-link-hover' : ''"
          >
            {{ item.tab }}
            <img class="inline-block" src="../../../../assets/images/men/down.png" alt="" />
          </div>
        </div>
        <template #overlay>
          <div class="flex justify-center tab-list">
            <div class="flex flex-col justify-between" style="width: 139px">
              <div>
                <div class="p-3">全部</div>
                <a-menu class="w-full" v-model:selectedKeys="selectedKeys">
                  <a-menu-item :key="index">
                    <a>1st menu item</a>
                  </a-menu-item>
                </a-menu>
              </div>
              <div class=" pt flex justify-between items-center" style="padding: 5px 8px 5px 10px;"
                >逻辑
                <a-dropdown :trigger="['click']">
                  <div class="tab">
                    <div
                      class="flex items-center justify-center ant-dropdown-link ant-dropdown-link-hover inline-block cursor-pointer"
                    >
                      任意符合
                      <img
                        class="inline-block"
                        src="../../../../assets/images/men/down.png"
                        alt=""
                      />
                    </div>
                  </div>
                   <template #overlay>
                     弹框多选
                  </template>
                </a-dropdown>
              </div>
            </div>
            <div class="tab-classify">
              <a-input placeholder="搜索" value="搜索" class="h-9">
                <template #prefix>
                  <img src="../../../../assets/images/men/search.png" alt="" />
                </template>
              </a-input>

              <CheckboxGroup v-model:value="tabCheckboxValue">
                <a-row>
                  <a-col :span="24" v-for="(item, index) in 7" :key="index">
                    <Checkbox :value="item">标签{{ item }}</Checkbox>
                  </a-col>
                </a-row>
              </CheckboxGroup>
            </div>
          </div>
        </template>
      </a-dropdown>
    </div>

    <!-- 视图 -->
    <div class="p-5" id="viewerjs">
      <BasicTable
        @contextmenu="handleContext"
        @register="registerTable"
        v-if="sortordValue == 'ListView'"
      >
        <template #toolbar>
          <!-- <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button> -->
        </template>
      </BasicTable>
      <a-list v-else-if="sortordValue == 'CardView'">
        <a-row :gutter="16">
          <a-col
            :span="6"
            class="p-0 mb-3 relative"
            style="max-width: 100%"
            v-for="(item, index) in bigImagesList"
            :key="index"
            @click="clickDecide(item, index)"
            @contextmenu="handleContext"
          >
            <a-list-item class="h-full">
              <a-card
                class="h-full"
                :hoverable="true"
                :class="[
                  `${prefixCls}__card`,
                  decideIndex == index ? (!isShow_auditList ? 'click_card' : 'click_card-add') : '',
                  item.decide ? (!isShow_auditList ? 'click_card' : 'click_card-add') : '',
                ]"
              >
                <div :class="`${prefixCls}__imgView`">
                  <img :src="item.src" @dblclick="dblclickDecide(index)" :key="item.src" />
                </div>
                <div :class="`${prefixCls}__card-pa`">
                  <div :class="`${prefixCls}__card-detail`"> 秘密花园 </div>
                  <div :class="`${prefixCls}__card-detail`"> 200*320 </div>
                </div>
              </a-card>
            </a-list-item>
          </a-col>
        </a-row>
      </a-list>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, computed, ref, reactive, toRefs } from 'vue';
import { Card, Row, Col, List, Dropdown, Menu, Input, Checkbox } from 'ant-design-vue';
import { useContextMenu } from '/@/hooks/web/useContextMenu';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable } from '/@/components/Table';
import { getBasicColumns } from './tableData';
import { LayoutBreadcrumb } from '../../../../layouts/default/header/components';
import { demoListApi } from '/@/api/demo/table';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

export default defineComponent({
  components: {
    Viewer,
    LayoutBreadcrumb,
    BasicTable,
    [Card.name]: Card,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.Divider.name]: Menu.Divider,
    [Input.name]: Input,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
  },
  props: {
    isShow_auditList: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const sortDown = reactive([
      { tab: '名称', isShow: true, visible: false },
      { tab: '标签', isShow: true, visible: false },
      { tab: '文件夹名', isShow: true, visible: false },
      { tab: '注释', isShow: true, visible: false },
      { tab: '上传人员', isShow: true, visible: false },
    ]);

    const sortDowns = computed(() => {
      return sortDown.filter(function (item) {
        return item.isShow == true;
      });
    });

    const tabDownShow = ref(-1);

    const tabDownChange = function (visible) {
      if (!visible) {
        tabDownShow.value = -1;
      }
    };

    const tabVisible = ref(false);

    const tabDownClick = function (index) {
      tabDownShow.value = index;
      sortDown[index].visible = !sortDown[index].visible;
    };

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];

    const state = reactive({
      value1: [],
      value2: ['Apple'],
      value3: ['Pear'],
      value4: ['Apple'],
    });

    function checkboxChange(e) {
      sortDown.forEach((item, index) => {
        if (!e.includes(item.tab)) {
          sortDown[index].isShow = false;
        } else {
          sortDown[index].isShow = true;
        }
      });
    }
    let sortordValue = ref<String>('CardView');
    function sortord(e) {
      sortordValue.value = e;
    }

    //右键
    const [createContextMenu] = useContextMenu();
    const { createMessage } = useMessage();
    function handleContext(e: MouseEvent) {
      createContextMenu({
        event: e,
        items: [
          {
            label: '查看详情',
            handler: () => {
              createMessage.success('查看详情');
            },
          },
          {
            label: '移动至文件夹..',
            handler: () => {
              createMessage.success('移动至文件夹..');
            },
          },
          {
            label: '复制',
            handler: () => {
              createMessage.success('复制');
            },
          },
          {
            label: '重命名',
            handler: () => {
              createMessage.success('重命名');
            },
          },
          {
            label: '下载',
            handler: () => {
              createMessage.success('下载');
            },
          },
          {
            label: '删除',
            handler: () => {
              createMessage.success('删除');
            },
          },
        ],
      });
    }
    // 列表
    const { getHeaderTheme } = useHeaderSetting();
    const [registerTable, { reload }] = useTable({
      title: '', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumns(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      canResize: true, //自动高度
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'radio', //开启选中
        columnWidth: 0,
      },
    });

    function handleReloadCurrent() {
      reload();
    }

    function handleReload() {
      reload({
        page: 1,
      });
    }

    //视图
    let bigImagesList = reactive([
      {
        decide: false,
        src:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
      },
      {
        decide: false,
        src:
          'https://th.bing.com/th/id/R688d6add3bd4d8519847b844a2bf967d?rik=%2fxKebRXyhfFGyQ&riu=http%3a%2f%2fbizhi.bcoderss.com%2fwp-content%2fuploads%2f2018%2f12%2f5b75201ba22b7.jpg&ehk=%2b9b3TwXYadBFani%2bgBs0mrTA30dblh3fp1TNanjvbZA%3d&risl=&pid=ImgRaw',
      },
      {
        decide: false,
        src:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
      },
      {
        decide: false,
        src:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
      },
      {
        decide: false,
        src:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
      },
      {
        decide: false,
        src:
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1522015854,2481348088&fm=26&gp=0.jpg',
      },
      {
        decide: false,
        src: 'https://picsum.photos/id/68/346/216',
      },
    ]);
    let viewer = null;
    onMounted(() => {
      //挂载
      let image = document.getElementById('viewerjs');
      image.addEventListener(
        'click',
        function () {
          viewer.isShown = true;
          viewer.played = true;
        },
        false
      );
      viewer = new Viewer(image as HTMLElement, {
        // inline: true,
        navbar: true,
        title: true,
        toolbar: {
          prev: true,
          next: true,
        },
      });
      viewer.isShown = true;
      viewer.played = true;
    });

    let decideIndex = ref(-1);
    let ctrlflag = null;
    function clickDecide(item, index) {
      //单击
      if (ctrlflag) {
        if (decideIndex.value > 0) {
          bigImagesList[decideIndex.value].decide = true;
        }
        bigImagesList[index].decide = !bigImagesList[index].decide;
      } else {
        if (decideIndex.value == index || bigImagesList[index].decide) {
          decideIndex.value = -1;
          bigImagesList[index].decide = false;
        } else {
          decideIndex.value = index;
        }
      }
    }

    function dblclickDecide(index) {
      //双击
      viewer.isShown = false;
      viewer.played = false;
      viewer.view(index);
    }

    // 按键监听
    (function watchKeyEvent() {
      const setKeyStatus = (keyCode, status) => {
        switch (keyCode) {
          case 32:
            //空格
            if (decideIndex.value <= 0) return;
            viewer.isShown = false;
            viewer.played = false;
            viewer.view(decideIndex.value < 0 ? 0 : decideIndex.value);
            break;
          case 17:
            //ctrl
            if (status) {
              console.log(666);
              ctrlflag = true;
            } else {
              ctrlflag = false;
            }
            break;
        }
      };
      window.onkeydown = (e) => {
        setKeyStatus(e.keyCode, true);
      };
      window.onkeyup = (e) => {
        setKeyStatus(e.keyCode, false);
      };
    })();

    return {
      //搜索分类
      checkboxChange,
      sortord,
      sortordValue,
      //分类
      sortDown,
      sortDowns,
      tabDownShow,
      tabDownClick,
      tabDownChange,
      tabVisible,
      tabCheckboxValue: ref([1]),
      selectedKeys: ref([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      options, //tab分类数据
      ...toRefs(state),
      //右键
      handleContext,
      //列表
      getHeaderTheme,
      prefixCls: 'list-card',
      registerTable,
      handleReloadCurrent,
      handleReload,
      //视图
      bigImagesList,
      clickDecide,
      dblclickDecide,
      decideIndex,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-list {
  width: 370px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06);

  div {
    color: rgba(0, 0, 0, 0.65);
  }
  

  ::v-deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    border-left: #1665d8 solid 3px;
  }
}

.tab-classify {
  width: 231px;
  padding: 12px 12px 54px;
  background: #fbfbfd;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06), 1px 0 0 0 rgba(0, 0, 0, 0.06);

  .ant-row .ant-col {
    height: 20px;
    margin-top: 18px;
    line-height: 20px;

    ::v-deep(.ant-checkbox-wrapper) {
      color: rgba(0, 0, 0, 0.65);
      text-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.06);
    }
  }
}

#viewerjs {
  background-color: #fbfbfd;
}
//列表选中处理
::v-deep(.vben-basic-table .ant-table .ant-table-tbody > tr) {
  height: 75px;
}

::v-deep(.vben-basic-table .ant-table .ant-table-tbody > tr.ant-table-row-selected td) {
  background: rgba(22, 101, 216, 0.04);
  border-top: 2px solid #1665d8;
  border-bottom: 2px solid #1665d8;
}

::v-deep(.vben-basic-table
    .ant-table
    .ant-table-tbody
    > tr.ant-table-row-selected
    td:nth-child(2)) {
  border-left: 2px solid #1665d8;
}

::v-deep(.vben-basic-table .ant-table .ant-table-tbody > tr.ant-table-row-selected td:last-child) {
  border-right: 2px solid #1665d8;
}

::v-deep(.ant-table-selection-column .ant-radio),
::v-deep(.ant-table-selection-column .ant-checkbox) {
  display: none;
}

::v-deep(.ant-table-thead > tr > th) {
  background-color: #fff;
}

::v-deep(.ant-list-item) {
  min-width: 212px;
  padding: 0;
}

.down-tab {
  height: 52px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);

  .tab {
    padding: 10px 0 10px 14px;
  }
}

.click-tab {
    border: 1px solid #e2e5ed;
    border-radius: 5px;
  }

  .ant-dropdown-link {
    padding: 5px 3px 5px 5px;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .ant-dropdown-link-hover {
    background: #fbfbfd;
    border: 1px solid #e2e5ed;
    border-radius: 5px;
  }

::v-deep(.ant-card-body) {
  height: 100%;
  padding: 0;
}

.click_card {
  border: 2px solid #1665d8;
}

.click_card-add {
  border: 2px solid #1665d8;

  ::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 22px;
    height: 22px;
    overflow: hidden;
    background: #1665d8;
    border-radius: 50%;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
  }

  ::before {
    content: '';
    position: absolute;
    top: 28px;
    right: 26px;
    width: 11px;
    height: 5px;
    border: 0.8px solid #fff;
    border-width: 0 0 2px 2px;
    transform: rotate(-45deg);
    z-index: 1;
    vertical-align: baseline;
  }
}

.list-card {
  &__link {
    margin-bottom: 10px;
    font-size: 14px;
  }

  &__imgView {
    position: relative;
    height: 212px;
    padding: 0;
    overflow: hidden;
    background-color: #fff;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      max-height: 100%;
      transform: translate(-50%, -50%);
    }
  }

  &__card {
    width: 100%;
    height: 265px;
    margin-bottom: -8px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 4px;

    &-pa {
      height: auto;
      padding: 5px;
      text-align: center;
    }

    &-detail {
      font-size: 14px;
      color: @text-color-secondary;
      text-align: center;
    }
  }
}
</style>
