<template>
  <BasicModal
    centered
    :closable="false"
    v-bind="$attrs"
    okText="上传"
    okType="success"
    :cancelButtonProps="{ type: 'primary' }"
    cancelText="保存"
    :wrapperProps="{ viewClass: 'CRDaddfile-30' }"
    showLeftBtn
    LeftText="选择其他文件"
    LeftExplainText="(视频、音频、文档)"
    :FooterStyle="{ padding: '30px' }"
    FooterRound="round"
  >
    <div class="flex w-full h-full fl">
      <div>
        <div class="mb-2.5"
          >文件 <span class="text-xs text-gray-200" v-show="material.length > 0">(必填)</span></div
        >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture"
          v-model:file-list="material"
        >
          <div
            v-show="material.length <= 0"
            class="flex items-center justify-center up1"
            :style="{ border: material.length > 0 ? 'none' : '1px dashed #ccc' }"
          >
            <span class="text-blue-600">
              <Icon icon="ant-design:upload-outlined" />
              <a-button type="link" style="padding: 0px">上传素材</a-button>
            </span>
          </div>
        </Upload>
        <div
          v-if="material.length > 0"
          class="mt-5"
          style="height: 1px; background-color: rgba(0, 0, 0, 0.06)"
        ></div>
        <Upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="mt-5 avatar-uploader"
          :class="material.length > 0 ? 'border-solid' : 'border-dashed'"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="inline" />
          <div v-else>
            <LoadingOutlined v-if="loading" />
            <div class="mb-2">
              <a-button color="primary" shape="round" ghost>上传封面图</a-button>
            </div>
            <span class="text-xs text-gray-400"> 最小尺寸为212*212</span>
            <br />
            <span class="text-xs text-gray-400">GIF文件将不进行动画处理</span>
          </div>
        </Upload>
        <a-button style="padding-left: 0" type="link">编辑封面图片</a-button>
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
          label: '',
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
          label: '',
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

      let commonConfig = {
        /*百度云配置 begin */
        bcebosEndPoint: 'https://hone-rts-new.gz.bcebos.com', //百度云url
        bcebosDownUrl: 'https://hone-rts-new.cdn.bcebos.com', //百度云下载查看url（cdn）
        baiduAccessKey: '8761034e71ca4b77be09c022394d43d1', //授权账号
        baiduSecretKey: 'b412a03e8e6942fdadc4cd87b605748d', //百度云授权密码
        bcebosBucket: 'hone-rts-new', //百度云RTS上传的域名
        /*百度云配置 end */
      };

      //  async function uploadFileToBCS(context: any, files: Array<{ raw: { name: string; path: string } }>, categoryCode: any) {

      //   if (files.length > 0) {
      //     for (var i = 0; i < files.length; i++) {
      //       var file = files[i];
      //       if (!file.raw) {
      //         continue;
      //       }
      //       var ext = file.raw.name.substr(file.raw.name.lastIndexOf(".") + 1); // 后缀
      //       //后台数据字典中系统配置的根目录
      //       // var rBcebosRootPath: any = systemConfigBll.BcebosRootPath();
      //       // if (!rBcebosRootPath.Success) {
      //       //   return rBcebosRootPath;
      //       // }
      //       // let key = rBcebosRootPath.Data;
      //       let key = 'Bqm' //未配置，暂时写固定值
      //       let fileName =
      //         Math.random()
      //           .toFixed(20)
      //           .substring(2, 20) +
      //         "." +
      //         ext;
      //       if (categoryCode) {
      //         key += "/" + categoryCode;
      //       }
      //       key += "/" + util.format.formatDate(new Date()) + "/" + fileName;
      //       let expiration = {
      //         expiration: util.format.formatTime2(new Date(), "yyyy-MM-ddThh:mm:ssZ"),
      //         conditions: [{ bucket: commonConfig.bcebosBucket }, { key: key }]
      //       };
      //       let str = JSON.stringify(expiration);
      //       var basePolicy = base64.encode(str);
      //       var signature = cryptoJS.HmacSHA256(basePolicy, commonConfig.baiduSecretKey).toString();
      //       let formData = new FormData();
      //       formData.append("key", key);
      //       formData.append("accessKey", commonConfig.baiduAccessKey);
      //       formData.append("policy", basePolicy);
      //       formData.append("signature", signature);
      //       formData.append("file", file.raw as any);
      //       debugger;
      //       var res = await axios.post(commonConfig.bcebosEndPoint, formData, {
      //         headers: { "content-type": "multipart/form-data;" }
      //       });
      //       debugger;
      //       if (res.status == 200) {

      //       } else {

      //       }
      //     }
      //   }
      // }

      const handleChange = (info: FileInfo) => {
        console.log(info);
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
        console.log(file);
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

<style lang="less" scoped>
  .border-dashed {
    border: 1px dashed rgba(0, 0, 0, 0.25);
  }

  .border-solid {
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 2px;
  }

  .fl {
    padding: 30px 30px 0;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
  // BasicForm

  ::v-deep(.BasicForm .ant-select-selector) {
    max-height: auto;
    padding: 0;
    padding-left: 4px;
    align-content: start;
  }

  ::v-deep(.ant-upload-list-picture .ant-upload-list-item) {
    height: 70px;
    padding: 0;
    margin: 0;
    border: none;
  }

  ::v-deep(.ant-upload.ant-upload-select) {
    display: block;
  }

  ::v-deep(.ant-upload-list-picture .ant-upload-list-item-thumbnail) {
    top: 0;
    left: 0;
    width: 70px;
    height: 70px;
    border: 1px solid #e2e5ed;
    border-radius: 5px;
    opacity: 1;
  }

  ::v-deep(.ant-upload.ant-upload-select-picture-card > .ant-upload) {
    padding: 0;
  }

  ::v-deep(.ant-upload-list-picture .ant-upload-list-item-thumbnail img) {
    display: inline-block;
    width: 13px;
    height: 13px;
  }

  ::v-deep(.ant-upload-list-picture .ant-upload-list-item-name) {
    padding-left: 74px;
  }

  ::v-deep(.ant-select-multiple .ant-select-selection-item) {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  //表单
  ::v-deep(.ant-form-item) {
    margin-bottom: 19px !important;
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
    display: table;
    width: 17.5rem;
    height: 17.5rem;
    margin: 0;
  }

  ::v-deep(.ant-upload-select-picture-card i) {
    font-size: 32px;
    color: #999;
  }
</style>
