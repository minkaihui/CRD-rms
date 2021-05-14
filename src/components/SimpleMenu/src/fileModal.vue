<template>
  <BasicModal width="800px" v-bind="$attrs">
    <div class="flex fl">
      <div style="width: 1000px">
        <!-- <BasicUpload
          :maxSize="20"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadApi"
          class="my-5"
        /> -->
        文件
        <div class="flex justify-center items-center up1 cursor-pointer">
          <span class="text-blue-600">
            <Icon icon="ant-design:upload-outlined"></Icon>
            <a-button  type="link" style="padding:0px">上传素材</a-button>
          </span>
        </div>
        <div class="flex flex-col justify-center content-center items-center up2 cursor-pointer">
          <div>
            <a-button color="primary" ghost>上传封面图</a-button>
          </div>
          <span class="text-gray-400 text-xs"> 最小尺寸为212*212</span>
          <span class="text-gray-400 text-xs">GIF文件将不进行动画处理</span>
        </div>
      </div>
      <BasicForm
        autoFocusFirstItem
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        :showActionButtonGroup="false"
        :baseRowStyle="baseRowStyle"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicUpload } from '/@/components/Upload';
import { Alert } from 'ant-design-vue';
import { uploadApi } from '/@/api/sys/upload';
import Icon from '/@/components/Icon/index';

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '素材标题',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    componentProps: ({ schema, formModel }) => {
      console.log('form:', schema);
      console.log('formModel:', formModel);
      return {
        placeholder: '为你的文件添加一个标题',
        onChange: (e: any) => {
          console.log(e);
          
        },
      };
    },
  },
  {
    field: 'field3',
    component: 'Select',
    label: '素材标签',
    colProps: {
      span: 34,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },

  {
    field: 'field4',
    component: 'CheckboxGroup',
    label: '文件夹权限',
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        {
          label: '无',
          value: '1',
        },
        {
          label: '增加',
          value: '2',
        },
        {
          label: '删除',
          value: '3',
        },
        {
          label: '修改',
          value: '4',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'Input',
    label: '款号',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    componentProps: ({ schema, formModel }) => {
      console.log('form:', schema);
      console.log('formModel:', formModel);
      return {
        placeholder: '为你的文件添加款号，没有请忽略',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
  },
  {
    field: 'field6',
    component: 'Input',
    label: '注释',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    componentProps: ({ schema, formModel }) => {
      console.log('form:', schema);
      console.log('formModel:', formModel);
      return {
        placeholder: '为你的文件添加注释',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '是否需要审核',
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        {
          label: '公共文件夹',
          value: '1',
        },
        {
          label: '私有文件夹',
          value: '2',
        },
      ],
    },
  },
];

const fileSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Upload',
    label: '字段1',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
    },
  },
];
export default defineComponent({
  components: { BasicModal, BasicUpload, BasicForm, [Alert.name]: Alert,Icon },
  setup() {
    const check = ref(null);
    const { createMessage } = useMessage();
    let baseRowStyle = {
      'justify-content': 'center',
    };
    const [register] = useForm({
      labelWidth: 120,
      fileSchemas,
      actionColOptions: {
        span: 16,
      },
    });
    return {
      schemas,
      handleSubmit: (values: any) => {
        createMessage.success('click search,values:' + JSON.stringify(values));
      },
      check,
      baseRowStyle,
      uploadApi,
      register,
    };
  },
});
</script>

<style lang="less" scoped>
.up1 {
  height: 20%;
  // line-height: 100px;
  border: 1px dashed #ccc;
}

.up2 {
  height: 80%;
  // line-height: 100px;
  border: 1px dashed #ccc;
}

::v-deep(.ant-modal) {
  width: 800px !important;
}

// ::v-deep(.ant-form-item-label){
//   width: 66.66% !important;
//   text-align: left;
// }

::v-deep(.ant-modal-close-x) {
  height: 50px;
  line-height: 50px;
}
</style>
