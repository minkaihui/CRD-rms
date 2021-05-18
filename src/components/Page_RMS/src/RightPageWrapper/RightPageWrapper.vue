<template>
  <PageWrapper>
    <a-tabs class="a-tabs" default-active-key="1" size="small" :tabBarStyle="tabStyle" tabBarGutter="28px" @change="clickshow">
      <!-- 文件详情 -->
      <a-tab-pane key="1" tab="文件详情">
        <!-- 图片 -->
        <div class="tab_right">
          <img src="../../../../assets/images/BaiduHi_2021-4-30_17-2-41.png" alt="" />
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
        <!-- 注释 -->
        <a-input :value="value" placeholder="添加注释" />
        <!-- 详情 -->
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
        <!-- 分类 -->
        <div class="classify mt-4">
          <div class=" mb-2">分类</div>
          <div class="classify-file flex">
            <div class="left" style="width: -webkit-fill-available;">
              <Icon icon="ant-design:folder-outlined" :size="14" />
              文件夹名
              <Icon icon="ant-design:close-outlined" :size="14" class="cursor-pointer" />
            </div>

            <div class="pl-2 w-40"
              ><Icon class="cursor-pointer" icon="ant-design:plus-circle-twotone" :size="14"
            /></div>
          </div>
          <div class="classify-download cursor-pointer text-sm">
            <Icon icon="ant-design:download-outlined" :size="14" />
            下载附件
          </div>
        </div>
      </a-tab-pane>
      <!-- 产品故事 -->
      <a-tab-pane key="2" tab="产品故事">
        <div class="tab_right">
          <img src="../../../../assets/images/BaiduHi_2021-4-30_17-2-41.png" alt="" />
        </div>
        <!-- 名称 -->
        <div class=" mt-5">
          <a-input :value="value" placeholder="名称" />
        </div>
        <BasicForm
          class="BasicForm"
          @register="register"
          @submit="handleSubmit"
          :showActionButtonGroup="false"
        />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { Tabs, Input } from 'ant-design-vue';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { CollapseContainer } from '/@/components/Container/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { Alert } from 'ant-design-vue';
import { Description, DescItem, useDescription } from '/@/components/Description/index';
import { Icon } from '/@/components/Icon/index';

export default defineComponent({
  components: {
    PageWrapper,
    BasicForm,
    CollapseContainer,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
    [Input.name]: Input,
    Description,
    Alert,
    Icon,
  },
  setup() {
    let show = ref('1');
    // 标签数据
    const schemas: FormSchema[] = [
      {
        field: 'label',
        component: 'Select',
        labelWidth: 0,
        defaultValue: ['1', '2','3','4','5','6'],
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
      // email: '190848.com',
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
    let value = '';

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
    };
  },
});
</script>
<style scoped lang="less">
// 主体
 
.vben-page-wrapper {
  width: 280px;
  background-color: #fff;
  box-shadow: -1px 0 0 0 #ececee; 
  
  ::v-deep(.vben-page-wrapper-content) {
    margin: 20px;
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
    height: 180px;
    border: 1px solid #eee;

    img {
      width: 100%;
      height: 100%;
    }
  }

  // BasicForm
  ::v-deep(.BasicForm .ant-form-item-control-wrapper) {
    width: 100% !important;
    margin-top: 15px;
  }

  ::v-deep(.ant-descriptions-item > span) {
    font-size: 12px;
  }

  ::v-deep(.ant-descriptions-row > td) {
    padding-bottom: 7px;
  }

  ::v-deep(.vben-basic-title-normal) {
    font-size: 12px;
  }

  ::v-deep(.BasicForm .ant-select-selector) {
    max-height: auto;
    min-height: 130px;
    padding: 0;
    align-content: start;
  }

  ::v-deep(.ant-select-multiple .ant-select-selection-item) {
    margin: 10px 0 0 10px;
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
    .classify-file .left {
      border: 1px solid #aaa;
      border-bottom: none;
    }

    .classify-file {
      border-bottom: 1px solid #aaa;
    }

    .classify-download {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
