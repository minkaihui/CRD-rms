<template>
  <BasicModal
    FooterGPS="justify-center"
    RButtonStyle="color: rgba(0,0,0,0.65);"
    title="新增文件夹"
    v-bind="$attrs"
    :TB_Border="true"
    :HeaderStyle="{
      'font-size': '20px',
      'font-weight': '500',
      'color': '#000',
      'padding': '5px 14px'
    }"
  >
    <div class="mt-9">
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

<style lang="less" scoped>
::v-deep(.ant-form-item-label > label) {
  color: rgba(0, 0, 0, 0.65);
}

::v-deep(.ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder) {
  color: #404040;
}


::v-deep(.ant-form-item-control .ant-checkbox-group) {
  display: flex;
  height: 39.9px;
  align-items: center;
}

::v-deep(.ant-radio-group .ant-radio-wrapper:nth-of-type(1)) {
  margin-right: 40px;
}

::v-deep(.ant-row .ant-col) {
  height: 40px;
  padding-right: 4px;
}

::v-deep(.ant-row .ant-col:last-of-type) {
  height: 88px;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, FormSchema } from '/@/components/Form/index';
import { useMessage } from '/@/hooks/web/useMessage';

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '文件夹名称',
    defaultValue: '',
    colProps: {
      span: 14,
    },
    componentProps: ({ schema, formModel }) => {
      console.log('form:', schema);
      console.log('formModel:', formModel);
      return {
        placeholder: '请填写文件夹名称',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
  },
  {
    field: 'field2',
    component: 'Select',
    label: '选择人员',
    colProps: {
      span: 14,
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
    field: 'field3',
    component: 'CheckboxGroup',
    label: '选择权限',
    colProps: {
      span: 14,
    },
    componentProps: {
      options: [
        {
          label: '查看',
          value: '1',
        },
        {
          label: '编辑',
          value: '2',
        }
      ],
    },
  },
  {
    field: 'field4',
    component: 'RadioGroup',
    label: '是否需要审核',
    colProps: {
      span: 14,
    },
    defaultValue: '2',
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'RadioGroup',
    label: '是否共享',
    colProps: {
      span: 14,
    },
    defaultValue: '2',
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
  },
];
export default defineComponent({
  components: { BasicModal, BasicForm },
  setup() {
    const check = ref(null);
    const { createMessage } = useMessage();
    let baseRowStyle = {
      'justify-content': 'center',
    };
    let FooterStyle = {
      padding: '60px',
    };
    return {
      schemas,
      handleSubmit: (values: any) => {
        createMessage.success('click search,values:' + JSON.stringify(values));
      },
      check,
      baseRowStyle,
      FooterStyle,
    };
  },
});
</script>