<template>
  <PageWrapper>
    <a-tabs
      class="a-tabs h-full"
      default-active-key="1"
      size="small"
      :tabBarStyle="tabStyle"
      tabBarGutter="28px"
      @change="clickshow"
    >
      <!-- 文件详情 -->
      <a-tab-pane key="1" tab="文件详情">
        <div class="mx-5">
          <!-- 图片 -->
          <div class="tab_right">
            <img src="/src/assets/images/BaiduHi_2021-4-30_17-2-41.png" alt="" />
          </div>
          <!-- 名称 -->
          <div class="mt-5">
            <a-input :value="value" placeholder="名称" />
          </div>
          <!-- 标签 -->
          <BasicForm
            @register="register"
            class="BasicForm"
            :showActionButtonGroup="false"
            @submit="handleSubmit"
          />

          <!-- 注释  -->
          <a-input :value="value" placeholder="添加注释" />
          <!-- 详情  -->
          <Description
            class="mt-4 Description"
            title="基本信息"
            :bordered="false"
            :collapseOptions="{ canExpand: true }"
            :column="1"
            size="12px"
            :data="mockData"
            :schema="schema"
          />
        </div>
        <!-- 分类 -->
        <div class="classify mt-4">
          <!-- 分类 -->
          <div class="mb-2 mx-5" style="font-weight: 500;color: rgba(0,0,0,0.45);" v-if="!isShow_auditList">分类</div>
          <!-- 文件夹名 -->

          <div class="classify-border">
            <div class="classify-file flex" v-if="!isShow_auditList">
              <div class="left">
                <Icon icon="ant-design:folder-outlined"  :size="16" />
                文件夹名
                <Icon icon="ant-design:close-outlined" :size="14"  class="cursor-pointer ml-3" />
              </div>

              <div class="pl-2" style="line-height: 31px">
                <!-- <Icon class="cursor-pointer" icon="ant-design:plus-circle-twotone" :size="14" /> -->
                <img class="inline-block" src="/src/assets/images/men/add.png" alt="" srcset="">
              </div>
            </div>
          </div>
          <div class="mx-5">
            <!-- 通过 不通过-->
            <div class="but" v-if="isShow_auditList">
              <a-button type="primary" shape="round" block>通过</a-button>
              <a-button shape="round" block @click="unthread">不通过</a-button>
              <ModalUnthread @register="unthreadText" />
            </div>
            <!-- 下载附件 -->
            <div class="classify-download cursor-pointer text-sm" v-if="!isShow_auditList">
              <Icon icon="ant-design:download-outlined" :size="14" />
              下载附件
            </div>
          </div>
        </div>
      </a-tab-pane>
      <!-- 产品故事 -->
      <a-tab-pane key="2" tab="产品故事" v-if="!isShow_auditList">
        <div class="p-5">
          <div class="tab_right">
            <img src="/src/assets/images/BaiduHi_2021-4-30_17-2-41.png" alt="" />
          </div>
          <!-- 名称 -->
          <div class="my-5">
            <a-input :value="value" placeholder="名称" />
          </div>
          <InputTextArea
            class="textarea"
            onpropertychange="this.style.height=this.scrollHeight + 'px'"
            oninput="this.style.height=this.scrollHeight + 'px'"
            :value="textarea"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { Tabs, Input } from 'ant-design-vue';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { CollapseContainer } from '/@/components/Container/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { Alert } from 'ant-design-vue';
import { Description, DescItem } from '/@/components/Description/index';
import { useModal } from '/@/components/Modal';
import ModalUnthread from '../modal/Modal.vue';
import { Icon } from '/@/components/Icon/index';
 import { setDOM } from '/@/utils/HeightScroll';

export default defineComponent({
  components: {
    PageWrapper,
    BasicForm,
    CollapseContainer,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
    [Input.name]: Input,
    InputTextArea: Input.TextArea,
    Description,
    Alert,
    Icon,
    useModal,
    ModalUnthread,
  },
  props: {
    isShow_auditList: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let show = ref('1');
    // 标签数据
    const schemas: FormSchema[] = [
      {
        field: 'label',
        component: 'Select',
        labelWidth: 0,
        defaultValue: ['1', '2', '3', '4', '5', '6'],
        show: (renderCallbackParams) => {
          return show.value == '1';
        },
        componentProps: {
          mode: 'multiple',
          options: [
            {
              label: '选项',
              value: '1',
              key: '1',
            },
            {
              label: '选大阿文发',
              value: '2',
              key: '2',
            },
            {
              label: '选小',
              value: '3',
              key: '3',
            },
            {
              label: '选项4',
              value: '4',
              key: '4',
            },
            {
              label: '选项5',
              value: '5',
              key: '5',
            },
          ],
          placeholder: '添加标签',
          onChange: (e: any) => {
            // console.log(e);
          },
        },
      },
      {
        field: 'text',
        component: 'InputTextArea',
        labelWidth: 0,
        defaultValue: '1111132',
        show: (renderCallbackParams) => {
          return show.value == '2';
        },
        componentProps: {
          mode: 'multiple',
          placeholder: '添加标签',
          onChange: (e: any) => {
            // console.log(e);
          },
        },
      },
    ];

    //详情数据
    const mockData: Recordable = {
      username: 'test',
      nickName: 'VB',
      age: 25,
      phone: '15695909xxx',
      email: '190848.com',
      addr: '厦门市思明区',
      sex: '男',
      certy: '3504256199xxxxxxxxx',
      tag: 'orange',
    };

    const schema: DescItem[] = [
      {
        field: 'username',
        label: '用户名',
      },
      {
        field: 'nickName',
        label: '昵称',
        render: (curVal, data) => {
          return `${data.username}-${curVal}`;
        },
      },
      {
        field: 'phone',
        label: '联系电话',
      },
      {
        field: 'email',
        label: '邮箱',
      },
      {
        field: 'addr',
        label: '地址',
      },
    ];

    // 名称逻辑
    let value = ref<String>('');

    // 标签逻辑

    const { createMessage } = useMessage();
    let [register, { setFieldsValue }] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    });

    function setFormValues() {
      setFieldsValue({
        // field4: ['1'],
      });
    }

    function clickshow(activeKey) {
      show.value = activeKey;
    }

    //审核特写
    const [unthreadText, { openModal: openModal }] = useModal();

    function unthread() {
      openModal();
    }

    // 产品故事文本域
    const textarea = ref<String>(
      '以美丽而富饶的生命力的大自然为灵感 打造属于您的秘密花园 将花卉的细腻美态与蓬勃的生命力 化为一件件珠宝杰作「蜜蜂」 象征勤奋、智慧、秩序、尊贵 传说拿破仑婴儿时期,有只蜜蜂亲吻他的嘴唇 后来他便成了皇帝,从此对其能带来权利深信不疑 还把它绣在自己的斗篷上,当作法国王朝的图腾'
    );

    onMounted(() => {
       setDOM('setRightPage','.vben-page-wrapper')
    });

    return {
      // 名称
      value,
      // 标签
      show,
      schemas,
      register,
      setFormValues,
      handleSubmit: (values: any) => {
        // createMessage.success('click search,values:' + JSON.stringify(values));
      },
      clickshow,
      // 详情
      mockData,
      schema,
      //审核特写
      unthread,
      unthreadText,
      openModal,
      // 产品故事文本域
      textarea,
    };
  },
});
</script>
<style scoped lang="less">
::v-deep(.ant-tabs-nav .ant-tabs-tab){
  font-weight: 500;
  color: rgba(0,0,0,0.25);
}

::v-deep(.ant-tabs-nav .ant-tabs-tab-active){
  font-weight: 500;
  color: rgba(0,0,0,0.65);
}

::v-deep(.vben-basic-arrow .anticon){
   color: #000;
  opacity: 0.2;
}

.but {
  button {
    height: 36px;
    margin-top: 20px;
    line-height: 36px;
  }
}

.textarea {
  min-height: 255px;
  overflow-x: hidden;
  overflow-y: hidden;
  color: rgba(0, 0, 0, 0.45);
  resize: none;
}
// 主体
.vben-page-wrapper {
  width: 280px;
  height: 100%;
  background-color: #fff;
  box-shadow: -1px 0 0 0 #ececee;

  ::v-deep(.vben-page-wrapper-content) {
    height: calc(100% - 20px);
    margin: 20px 0 0 0;
  }

  ::v-deep(.a-tabs .ant-tabs-nav) {
    padding-left: 20px;
  }
  //a-tabs
  ::v-deep(.a-tabs .ant-page-header) {
    padding: 15px;
  }

  ::v-deep(.a-tabs .ant-page-header-content) {
    padding-top: unset;
  }

  ::v-deep(.a-tabs .ant-tabs-bar) {
    margin-bottom: 16px;
    border-bottom: none;
  }

  ::v-deep(.a-tabs .ant-tabs-small-bar .ant-tabs-tab) {
    padding: 5px 5px;
  }

  ::v-deep(.ant-tabs .ant-tabs-small-bar .ant-tabs-nav-container) {
    font-size: 12px;
  }

  ::v-deep(.a-tabs .ant-tabs-ink-bar) {
    display: none !important;
  }

  //图片
  .tab_right {
    width: 244px;
    height: 180px;
    padding: 0 32px;
    border: 1px solid #eee;

    img {
      height: 100%;
    }
  }

  // BasicForm
  ::v-deep(.BasicForm .ant-form-item-control-wrapper) {
    width: 100% !important;
    margin-top: 15px;
  }

  ::v-deep(.ant-descriptions-row > td) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 7px;
  }

  ::v-deep(.ant-descriptions-row > td span:first-of-type) {
    color: rgba(0,0,0,0.45);
  }

  ::v-deep(.ant-descriptions-row > td span:last-of-type) {
    color: rgba(0,0,0,0.65);
  }


  ::v-deep(.ant-descriptions-item > span) {
    font-size: 12px;
    flex: none;
  }

  ::v-deep(.vben-basic-title-normal) {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0,0,0,0.45);
  }

  ::v-deep(.BasicForm .ant-select-selector) {
    max-height: auto;
    min-height: 130px;
    padding: 0;
    align-content: start;
  }

  ::v-deep(.ant-select-multiple .ant-select-selection-item) {
    margin: 10px 0 0 10px;
    color: rgba(0,0,0,0.65);
  }

  ::v-deep(.BasicForm .ant-select-multiple .ant-select-selection-placeholder) {
    top: 0;
    transform: translateY(0);
  }

  // Description
  ::v-deep(.Description .vben-collapse-container__header) {
    border-bottom: none;
  }

  ::v-deep(.Description .vben-collapse-container__header),
  ::v-deep(.Description .vben-basic-title),
  ::v-deep(.Description .p-2) {
    padding: 0;
    margin: 0;
  }

  //classify
  .classify {
    .classify-border {
      border-bottom: 1px solid #e2e5ed;
    }

    .classify-file {
      margin: 0 20px;
    }

    .classify-file .left {
      padding: 8px 10px 0 10px;
      color: rgba(0,0,0,0.65);
      border: 1px solid #e2e5ed;
      border-bottom: none;
    }

    .classify-download {
      padding: 20px 0;
      color: #828488;
      text-align: center;
    }
  }
}
</style>
