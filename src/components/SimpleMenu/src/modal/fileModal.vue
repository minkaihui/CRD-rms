<template>
  <BasicModal
    title="上传素材"
    centered
    v-bind="$attrs"
    okText="上传"
    okType="success"
    :cancelButtonProps="{ type: 'primary' }"
    cancelText="保存"
  >
    <div class="flex fl w-full">
      <div>
        文件 <span class="text-xs text-gray-200" v-show="material.length > 0">(必填)</span>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture"
          v-model:file-list="material"
        >
          <div v-show="material.length <= 0" class="flex justify-center items-center up1">
            <span class="text-blue-600">
              <Icon icon="ant-design:upload-outlined"></Icon>
              <a-button type="link" style="padding: 0px">上传素材</a-button>
            </span>
          </div>
        </Upload>

        <Upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="inline" />
          <div v-else>
            <LoadingOutlined v-if="loading"></LoadingOutlined>
            <div class="mb-2">
              <a-button color="primary" shape="round" ghost>上传封面图</a-button>
            </div>
            <span class="text-gray-400 text-xs"> 最小尺寸为212*212</span>
            <br />
            <span class="text-gray-400 text-xs">GIF文件将不进行动画处理</span>
          </div>
        </Upload>
      </div>
      <BasicForm
        class="BasicForm"
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
import { LoadingOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { BasicModal } from '/@/components/Modal';
import { BasicForm, FormSchema } from '/@/components/Form/index';
import { useMessage } from '/@/hooks/web/useMessage';
import Icon from '/@/components/Icon/index';

//上传
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

interface materialItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  thumbUrl?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
export default defineComponent({
  components: { BasicModal, BasicForm, Icon, LoadingOutlined, Upload },
  setup() {
    //表单
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
        label: '标签素材',
        defaultValue: ['1', '2', '3', '4'],
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
      {
        field: 'field8',
        component: 'Select',
        colProps: {
          span: 24,
        },
        defaultValue: ['1'],
        componentProps: {
          mode: 'multiple',
          options: [
            {
              label: '文件夹',
              value: '1',
              key: '1',
            },
          ],
          placeholder: '选择文件夹',
          onChange: (e: any) => {
            console.log(e);
          },
        },
      },
    ];

    //表单
    const { createMessage } = useMessage();
    let baseRowStyle = {
      'justify-content': 'center',
    };

    //上传

    const material = ref<materialItem[]>([]);

    const fileList = ref([]);
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>('');

    const handleChange = (info: FileInfo) => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
      }
      if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    };

    const beforeUpload = (file: FileItem) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };

    const visible = ref<boolean>(true);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      //上传
      schemas,
      handleSubmit: (values: any) => {
        createMessage.success('click search,values:' + JSON.stringify(values));
      },
      baseRowStyle,
      //上传
      material,
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>
<style>
/* .ant-modal-content .ant-modal-header {
  display: none;
} */
</style>

<style lang="less" scoped>


// BasicForm

::v-deep(.BasicForm .ant-select-selector) {
  max-height: auto;
  padding: 0;
  padding-left: 4px;
  align-content: start;
}

//表单
::v-deep(.ant-form-item) {
  flex-direction: column;
  align-content: center;
}

::v-deep(.ant-form-item-label) {
  line-height: 25px;
  text-align: left;
}

::v-deep(.ant-col-24:nth-of-type(5) .ant-form-item:not(.ant-form-item-with-help)),
::v-deep(.ant-col-24:nth-of-type(6) .ant-form-item:not(.ant-form-item-with-help)),
::v-deep(.ant-col-24:nth-of-type(7) .ant-form-item:not(.ant-form-item-with-help)) {
  margin-bottom: 0;
}

//标题-头部
::v-deep(.ant-modal-close-x) {
  height: 50px;
  line-height: 50px;
}

//上传
.up1 {
  width: 17.5rem;
  height: 4.375rem;
  margin-top: 0.625rem;
  border: 1px dashed #ccc;
}

.upload-list-inline ::v-deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}

.upload-list-inline ::v-deep(.ant-upload-animate-enter) {
  animation-name: uploadAnimateInlineIn;
}

.upload-list-inline ::v-deep(.ant-upload-animate-leave) {
  animation-name: uploadAnimateInlineOut;
}

::v-deep(.avatar-uploader > .ant-upload) {
  width: 17.5rem;
  height: 17.5rem;
  margin: 0;
  margin-top: 1.25rem;
  border: 1px dashed #ccc;
}

::v-deep(.ant-upload-select-picture-card i) {
  font-size: 32px;
  color: #999;
}
</style>
