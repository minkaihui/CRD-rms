<template>
  <BasicModal
    @register="Modal"
    FooterGPS="justify-center"
    RButtonStyle="color: rgba(0,0,0,0.65);"
    title="新增文件夹"
    v-bind="$attrs"
    :TB_Border="true"
    :HeaderStyle="{
      'font-size': '20px',
      'font-weight': '500',
      color: '#000',
      padding: '5px 14px',
    }"
    @ok="AddFolderOK()"
    @visible-change="init"
  >
    <div class="mt-9">
      <BasicForm
        autoFocusFirstItem
        @register="register"
        @getFieldsValue="getFieldsValue"
        :baseRowStyle="baseRowStyle"
        :schemas="schemas"
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

  ::v-deep(.ant-select-multiple .ant-select-selector) {
    margin-top: 0;
    margin-bottom: 0;
  }

  ::v-deep(.BasicForm .ant-select-selector) {
    max-height: auto;
    padding: 0;
    padding-left: 4px;
    align-content: start;
  }
</style>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { AddFolder } from '/@/api/sys/folder';
  import { GetUserList } from '/@/api/sys/user';
  import { buildUUID } from '/@/utils/uuid';

  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const [Modal, { closeModal }] = useModalInner();
  let schemas: FormSchema[] = reactive([
    {
      field: 'FolderName',
      component: 'Input',
      label: '文件夹名称',
      defaultValue: '',
      colProps: {
        span: 14,
      },
      componentProps: () => {
        return {
          placeholder: '请填写文件夹名称',
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
    },
    {
      field: 'UserIdList',
      component: 'Select',
      label: '选择人员',
      colProps: {
        span: 14,
      },
      defaultValue: ['0'],
      componentProps: {
        mode: 'multiple',
        options: [],
      },
    },
    {
      field: 'FolderAuthority',
      component: 'CheckboxGroup',
      label: '选择权限',
      colProps: {
        span: 14,
      },
      defaultValue: '1',
      componentProps: {
        options: [
          {
            label: '查看',
            value: '2',
          },
          {
            label: '编辑',
            value: '1',
          },
        ],
      },
    },
    {
      field: 'NeedApproval',
      component: 'RadioGroup',
      label: '是否需要审核',
      colProps: {
        span: 14,
      },
      defaultValue: true,
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
    {
      field: 'IsShare',
      component: 'RadioGroup',
      label: '是否共享',
      colProps: {
        span: 14,
      },
      defaultValue: true,
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
  ]);

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      OpenValue: { type: Boolean, default: false },
    },
    setup() {
      const check = ref(null);
      let baseRowStyle = {
        'justify-content': 'center',
      };
      let FooterStyle = {
        padding: '60px',
      };

      const UserLi = reactive({ label: '', value: {}, key: '' });

      async function init() {
        let UserIdListOptions = [];

        let UserList = await GetUserList({
          UserName: userStore.getUserInfo.UserName,
        });

        UserList[0].value.map((item, index) => {
          UserLi.label = item.EName;
          UserLi.value = {
            /// 用户ID string
            UserId: item.ECode,
            /// 用户名称 string
            UserName: item.EName,
            /// 部门名称 string
            DepartmentName: item.DeptFullName,
          };
          UserLi.key = index;
          UserIdListOptions.push(UserLi);
        });

        schemas[1].componentProps.options = UserIdListOptions;
      }

      // 表单
      let [register, { getFieldsValue }] = useForm({
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        showActionButtonGroup: false,
      });

      //确定按钮  添加文件夹
      async function AddFolderOK(ParentFolderId, FolderLevel = 1) {
        let FieldsValue = getFieldsValue();
        if (!FieldsValue.FolderName) {
          createMessage.warn('请填写文件夹名称');
          return;
        }
        if (!FieldsValue.FolderName) {
          createMessage.warn('请填写文件夹名称');
          return;
        }
        let res = await AddFolder({
          dto: {
            /// 文件ID
            FolderId: buildUUID(),
            /// 父级ID
            ParentFolderId: ParentFolderId,
            /// 文件名称 string
            FolderName: FieldsValue.FolderName,
            /// 文件夹层级 int
            FolderLevel: FolderLevel,
            /// 是否私有 bool
            IsPrivate: false,
            /// 是否共享 bool
            IsShare: FieldsValue.IsShare,
            /// 是否需要审核 bool
            NeedApproval: FieldsValue.NeedApproval,
            /// 创建人 string
            CreatorID: userStore.getUserInfo.UserId,
            /// 创建人姓名 string
            CreatorName: userStore.getUserInfo.UserName,
            /// 文件夹权限
            FolderAuthority: FieldsValue.FolderAuthority,
            /// 用户列表
            UserIdList: FieldsValue.UserIdList,
          },
        });
        if (res) closeModal();
      }

      return {
        register,
        schemas,
        getFieldsValue,
        check,
        baseRowStyle,
        FooterStyle,

        //确定按钮  添加文件夹
        AddFolderOK,
        init,
        //弹框
        Modal,
        closeModal,
      };
    },
  });
</script>
