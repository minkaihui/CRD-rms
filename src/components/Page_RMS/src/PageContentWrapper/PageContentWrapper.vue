<template>
  <div>
    <!-- 头部 -->
    <LayoutBreadcrumb :theme="getHeaderTheme" />
    <!-- 右键菜单 -->

    <!-- 视图 -->
    <div class="p-5" id="viewerjs">
      <a-list>
        <a-row :gutter="16">
          <a-col
            :span="6"
            class="p-0 mb-3"
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
                  decideIndex == index ? 'click_card' : '',
                  item.decide ? 'click_card' : '',
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

    <!-- <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>
    </BasicTable> -->
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { Card, Row, Col, List } from 'ant-design-vue';
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
  },
  setup() {
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
      title: '全部', //标题
      api: demoListApi, //表格数据
      columns: getBasicColumns(), //表头数据
      showIndexColumn: false, //序号
      pagination: false, //是否开启分页
      loading: true, //加载动画
      canResize: true, //自动高度
      rowKey: 'id', //绑定id
      rowSelection: {
        type: 'checkbox', //开启选中
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
          decideIndex.value = null;
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
::v-deep(.ant-list-item) {
  min-width: 212px;
  padding: 0;
}

::v-deep(.ant-card-body) {
  height: 100%;
  padding: 0;
}

.click_card {
  border: 2px solid #1665d8;
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
