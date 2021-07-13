<template>
  <div class="flex justify-between h-full page">
    <!-- 左侧模块1 -->
    <div class="ManageLeft">
      <div id="manage_left">
        <!-- 上 -->
        <div
          class="flex items-center justify-between tab-up"
          v-for="(item, index) in TagNameList"
          :key="index"
          :class="checkedBg == index ? 'checked-bg' : ''"
          @click="ClickTagGroup(index)"
        >
          <div class="h-6 w-7">
            <img :src="item.tagImg" alt="" />
          </div>
          <div class="flex-1 tab">{{ item.name }}</div>
          <div class="text-right">{{ item.num }}</div>
        </div>
        <!-- 中 -->
        <div class="flex items-center justify-between tab-centre">
          <div class="tab">标签群组</div>
          <div class="cursor-pointer">
            <Icon
              icon="ant-design:plus-outlined"
              color="#9ea0a5"
              :size="13"
              @click="AddOpen('添加标签群组')"
            />
          </div>
        </div>
        <!-- 下 -->

        <!-- CreatedTime: "2021-07-02 17:59:27"
CreatorID: "U000116652"
CreatorName: "闵凯辉"
GroupId: "1e79699e-5d2a-40b5-92ae-75f88c902f64"
GroupName: "群组1"
TagQuantity: 0 -->
        <div :style="{ height: scrollHeight - 194 + 'px' }">
          <ScrollContainer ref="scrollRef">
            <div
              class="flex items-center justify-between tab-up"
              v-for="(item, index) in AllFileTagGroup.arr"
              :key="item.GroupId"
              :class="checkedBg == index + TagNameList.length ? 'checked-bg' : ''"
              entrust="rightButton_left"
              :index="index"
              @click="ClickTagGroup(index + TagNameList.length)"
            >
              <div class="w-4 h-6 pointer-events-none">
                <div class="roundDot"></div>
              </div>
              <div
                v-if="
                  (AddKey == '添加标签群组' && index + TagNameList.length == TagNameList.length) ||
                  (AddKey == '修改标签群组' && index + TagNameList.length == checkedBg)
                "
                class="flex-1 tab"
              >
                <a-input
                  v-model:value="AddValue"
                  class="h-full"
                  @pressEnter="pressEnter"
                  @blur="pressEnter"
                  v-focus
                />
              </div>
              <div v-else class="flex-1 pointer-events-none tab">
                {{ item.GroupName }}
              </div>
              <div class="text-right pointer-events-none">{{ item.TagQuantity }}</div>
            </div>
          </ScrollContainer>
        </div>
      </div>
    </div>
    <!-- 右侧模块1-->

    <div class="scroll-wrap">
      <div class="flex items-start justify-between TabName">
        <div class="flex">
          <span class="text-xl font-semibold" style="margin-right: 24px">群组</span>
          <a-input
            style="width: 115px; height: 30px"
            v-if="AddKey == '标签'"
            v-model:value="AddValue"
            @pressEnter="pressEnter"
            @blur="pressEnter"
            v-focus
          />
          <span v-else style="line-height: 28px">
            <Icon
              @click="AddOpen('标签')"
              icon="ant-design:plus-outlined"
              size="14"
              color="#474a57"
            ></Icon>
          </span>
        </div>
        <div>
          <span>排列方式</span>
          <a-button type="link" :size="size">
            名称排列 <Icon icon="ant-design:caret-down-filled" size="10" color="#474a57"></Icon>
          </a-button>
        </div>
      </div>

      <div :style="{ height: scrollHeight - 75 + 'px' }">
        <ScrollContainer ref="scrollRef" @handleScroll="handleScroll">
          <div class="bg-white pagecontent" id="manage_right">
            <!-- a-z导航 -->
            <div class="flex flex-col pt-6 az">
              <div
                class="cursor-pointer zimu"
                v-for="(item, index) in generateSmall"
                :key="index"
                @click="AZindexClick(index)"
                :class="AZindex == index ? 'zimuClick' : ''"
                >{{ item }}</div
              >
            </div>
            <div class="li" v-for="(items, j) in TileTagList.arr" :key="j">
              <!-- //a-z导航标题 -->
              <div class="mb-5">
                <div class="zimu-li" :class="items.initial == '*' ? 'F35' : ''">{{
                  items.initial
                }}</div>
              </div>
              <div class="flex flex-wrap">
                <!-- CreatedTime: "2021-07-12 10:22:23"
                CreatorID: "U000116652"
                CreatorName: "闵凯辉"
                GroupId: null
                IsOften: false
                TagId: "2793a432-1642-400d-8e3c-434b6a46a166"
                TagName: "B戒指B"
                UsedQuantity: 0 -->
                <div
                  class="mb-5 tag"
                  v-for="(item, k) in items.data"
                  :key="item.GroupId"
                  :index1="k" :index2="j"
                  :groupid="item.TagId"
                  entrust="rightButton_right"
                >
                  {{ item.TagName }}&nbsp;&nbsp;
                  <span class="pointer-events-none text-black-45">{{ item.UsedQuantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .page {
    background-color: #fbfbfd;

    // 左
    .ManageLeft {
      width: 305px;
      height: calc(100% - 20px);
      margin: 20px 0 0 20px;
      background: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      border-right: 1px solid rgba(0, 0, 0, 0.06);
      border-left: 1px solid rgba(0, 0, 0, 0.06);

      #manage_left {
        padding: 20px 20px 0;
      }

      .checked-bg {
        background-color: #f4f5f7;
      }

      .tab-up {
        height: 40px;
        padding: 8px 16px 8px 12px;
        cursor: pointer;

        .tab {
          font-size: 16px;
          color: #3e3f42;
        }

        .h-6 {
          line-height: 23px;

          img {
            display: inline-block;
          }
        }

        .roundDot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #d8d8d8;
          border-radius: 50%;
        }

        .text-right {
          line-height: 24px;
          color: #969bab;
        }
      }

      .tab-centre {
        height: 40px;
        padding: 38px 16px 16px 12px;

        .tab {
          font-size: 12px;
          line-height: 24px;
          color: #969bab;
        }
      }
    }

    // 右

    .TabName {
      height: 55px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    ::v-deep(.scrollbar__thumb) {
      background-color: rgba(144, 147, 153, 0);
    }

    ::v-deep(.scroll-container .scrollbar__wrap) {
      border-right: none;
    }

    .scroll-wrap {
      width: calc(100% - 20px);
      padding: 20px 128px 0 60px;
      margin: 20px 20px 0 0;
      background: #fff;

      .pagecontent {
        .az {
          position: fixed;
          top: calc((100% + 90px) / 2);
          right: 54px;
          transform: translateY(-50%);
        }

        .li {
          padding: 30px 0 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);

          .tag {
            margin-right: 24px;
            color: rgba(0, 0, 0, 0.65);
            background: #f4f5f7;
            border: 1px solid #f4f5f7;
            border-radius: 5px;
          }
        }

        .zimu {
          height: 20.3px;
          color: rgba(0, 0, 0, 0.65);
          transition: all 0.5s;
        }

        .zimuClick {
          color: #000;
        }

        .zimu-li {
          font-size: 20px;
          font-weight: 600;
          color: #1665d8;
        }

        .F35 {
          font-size: 35px;
        }

        .tag {
          height: 30px;
          padding: 5px 11px;
          text-align: center;
          background: rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 0.3125rem;
        }
      }
    }
  }
</style>
<script lang="ts">
  import { defineComponent, onMounted, ref, reactive, watch } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Icon } from '/@/components/Icon';
  import { HeightScroll, setDOM } from '/@/utils/HeightScroll';
  import { AZarr } from '/@/utils/sortAZ';

  // 文件夹接口
  import {
    GetTileTagList,
    GetFileTagAndGroupList,
    GetAllFileTagGroup,
    AddTagGroup,
    AddFileTag,
    UpdateTagGroupName,
    DeleteTagGroup,
    SetFileTagOften,
    UpdateFileTagName,
  } from '/@/api/sys/FileTag';

  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  import { useContextMenu } from '/@/hooks/web/useContextMenu';
  const [createContextMenu] = useContextMenu();

  export default defineComponent({
    name: 'LabelManagement',
    components: { Tag, CollapseContainer, ScrollContainer, Icon },
    setup() {
      // 左
      onMounted(() => {
        setDOM('setLeftPage', '.ManageLeft');
      });

      // 右
      //自动高度
      const { scrollTo, scrollRef, scrollBottom, scrollHeight } = HeightScroll('getLeftPage');

      // 事件委托 右键初始化
      let zimuList, manageLeft, manageRight;
      const checkedTag = reactive({ id: null, index1: -1 ,index2: -1 });
      onMounted(() => {
        zimuList = document.querySelectorAll('.zimu-li');
        manageLeft = document.querySelector('#manage_left');
        manageRight = document.querySelector('#manage_right');

        manageLeft.oncontextmenu = function (e) {
          let { entrust, index } = e.target.attributes;
          if (entrust && entrust.value == 'rightButton_left') {
            checkedBg.value = TagNameList.length + Number(index.value);
            rightButton_left(e);
          }
        };
        manageRight.oncontextmenu = function (e) {
          let { entrust, index1,index2, groupid } = e.target.attributes;
          if (entrust && entrust.value == 'rightButton_right') {
            checkedTag.index1 = index1.value;
            checkedTag.index2 = index2.value;
            checkedTag.id = groupid.value;
            rightButton_right(e);
          }
        };
      });

      // a-z跟随滑动
      const AZindex = ref(1);
      function handleScroll(e, height) {
        AZindex.value = Math.round(e / (height / 26));
      }
      // 点击a-z
      function AZindexClick(index) {
        AZindex.value = index;
        scrollTo(zimuList[index].offsetTop);
      }

      //a-z 模拟
      function generateBig_1() {
        var str: string[] = [];
        for (var i = 65; i < 91; i++) {
          str.push(String.fromCharCode(i));
        }
        return str;
      }
      let generateSmall = generateBig_1();

      //点击标签群组
      const checkedBg = ref(0);
      const TagNameList = [
        {
          name: '全部标签',
          tagImg: '/src/assets/images/men/Tag.png',
          num: 142,
        },
        {
          name: '未分类',
          tagImg: '/src/assets/images/men/TagSimpleLight.png',
          num: 7,
        },
        {
          name: '常用标签',
          tagImg: '/src/assets/images/men/five-pointed-star.png',
          num: 2,
        },
      ];
      function ClickTagGroup(i) {
        if (AddKey.value == '标签群组' && i == TagNameList.length) {
          checkedBg.value = i + TagNameList.length;
        } else {
          checkedBg.value = i;
        }
      }

      // 枚举监听点击的状态值
      const ClickTag = {
        IsOften: false,
        SearchNoGroup: false,
        GroupId: null,
        FileTagName: '',
      };
      watch(checkedBg, (count) => {
        if (count >= TagNameList.length) {
          ClickTag.IsOften = false;
          ClickTag.SearchNoGroup = false;
          ClickTag.GroupId = AllFileTagGroup.arr[count - TagNameList.length].GroupId;
          // ClickTag.FileTagName = AllFileTagGroup.arr[count - TagNameList.length].GroupName;
        } else {
          // 012 根据固定的TagNameList排序来的
          ClickTag.IsOften = count == 0 || count == 1 ? false : true;
          ClickTag.SearchNoGroup = count == 0 || count == 2 ? false : true;
          ClickTag.GroupId = null;
          // ClickTag.FileTagName = count > 0 ? (count == 1 ? '未分类' : '常用标签') : '';
        }
        TagList();
      });

      // 获得所有标签组
      let arrValue: object[] = [];
      const AllFileTagGroup = reactive({ arr: arrValue });
      async function AllTagGroup() {
        AllFileTagGroup.arr = await GetAllFileTagGroup({});
      }

      // 获得文件标签列表
      const TileTagList = reactive({ arr: arrValue });
      async function TagList() {
        let res = await GetTileTagList({
          req: {
            /// 查询常用文件标签 bool?
            IsOften: ClickTag.IsOften,
            /// 查询未分类文件标签 bool?
            SearchNoGroup: ClickTag.SearchNoGroup,
            /// 根据分组ID查询文件夹标签 Guid?
            GroupId: ClickTag.GroupId,
            /// 文件标签名称 string
            FileTagName: ClickTag.FileTagName,
          },
        });
        TileTagList.arr = AZarr(res, 'TagName');
        console.log(TileTagList.arr);
      }

      // 获得文件标签标签组列表
      const FileTagAndGroupList = reactive({ arr: arrValue });
      async function TagAndGroupList() {
        FileTagAndGroupList.arr = await GetFileTagAndGroupList({
          req: {
            /// 查询常用文件标签 bool?
            IsOften: ClickTag.IsOften,
            /// 查询未分类文件标签 bool?
            SearchNoGroup: ClickTag.SearchNoGroup,
            /// 根据分组ID查询文件夹标签 Guid?
            GroupId: ClickTag.GroupId,
            /// 文件标签名称 string
            FileTagName: ClickTag.FileTagName,
          },
        });
      }

      async function init() {
        // 获得文件标签列表
        TagList();
        // 获得文件标签标签组列表
        TagAndGroupList();
        // 获得所有标签组
        AllTagGroup();
      }
      init();

      // 按下确定  确定添加 确定修改
      const AddKey = ref('');
      const AddValue = ref('');
      async function pressEnter() {
        if (!AddValue.value) return (AddKey.value = '');
        if (AddKey.value == '标签') {
          let GroupTag = await AddFileTag({
            dto: {
              /// 标签名称 string
              TagName: AddValue.value,
              // 标签分组ID Guid
              GroupId: ClickTag.GroupId,
              /// 创建人  string
              CreatorID: userStore.getUserInfo.UserId,
              /// 创建人姓名  string
              CreatorName: userStore.getUserInfo.UserName,
            },
          });
          TagList();
          if (GroupTag) createMessage.success('添加标签成功');
        } else if (AddKey.value == '添加标签群组') {
          let GroupTag = await AddTagGroup({
            dto: {
              /// 标签分组名称 string
              GroupName: AddValue.value,
              /// 创建人  string
              CreatorID: userStore.getUserInfo.UserId,
              /// 创建人姓名  string
              CreatorName: userStore.getUserInfo.UserName,
            },
          });
          AllTagGroup();
          if (GroupTag) createMessage.success('添加标签群组成功');
        } else if (AddKey.value == '修改标签群组') {
          let UpdateGroupName = await UpdateTagGroupName({
            dto: {
              /// 标签分组ID Guid string
              GroupId: ClickTag.GroupId,
              /// 标签分组名称 string
              GroupName: AddValue.value,
              /// 修改人ID string
              UpdatorID: userStore.getUserInfo.UserId,
              /// 修改人名称 string
              UpdatorName: userStore.getUserInfo.UserName,
            },
          });
          AllTagGroup();
          if (UpdateGroupName) createMessage.success('重命名成功');
        }
        AddKey.value = '';
        AddValue.value = '';
      }

      // 点击+号
      function AddOpen(value) {
        AddKey.value = value;
        if (AddKey.value == '添加标签群组') {
          AllFileTagGroup.arr.unshift({});
        }
      }

      async function TagOftenFn(IsOften) {
        let TagOften = await SetFileTagOften({
          /// 标签ID Guid
          TagId: checkedTag.id,
          /// 是否常用 bool
          IsOften: IsOften,
          /// 修改人ID string
          UpdatorID: userStore.getUserInfo.UserId,
          /// 修改人名称 string
          UpdatorName: userStore.getUserInfo.UserName,
        });
        if (TagOften && IsOften) createMessage.success('设为常用标签成功');
        if (TagOften && !IsOften) createMessage.success('取消常用标签成功');
      }

      // 左边的右键
      function rightButton_left(e: MouseEvent) {
        createContextMenu({
          event: e,
          items: [
            {
              label: '搜索包含标签的项目',
              textStyle: {
                'border-bottom': '1px solid rgba(0,0,0,0.06)',
              },
              handler: () => {
                createMessage.success('搜索包含标签的项目');
              },
            },
            {
              label: '重命名',
              handler: async () => {
                AddKey.value = '修改标签群组';
              },
            },
            {
              label: '删除',
              textStyle: {
                color: '#f95a2c',
              },
              handler: async () => {
                let DeleteGroup = await DeleteTagGroup({
                  dto: {
                    /// 标签分组ID GroupId
                    GroupId: ClickTag.GroupId,
                    /// 修改人ID string
                    UpdatorID: userStore.getUserInfo.UserId,
                    /// 修改人名称 string
                    UpdatorName: userStore.getUserInfo.UserName,
                  },
                });
                AllTagGroup();
                if (DeleteGroup) createMessage.success('删除成功');
              },
            },
          ],
        });
      }
      // 右边的右键
      function rightButton_right(e: MouseEvent) {
        createContextMenu({
          event: e,
          items: [
            {
              label: '搜索包含标签的项目',
              textStyle: {
                'border-bottom': '1px solid rgba(0,0,0,0.06)',
              },
              handler: () => {
                createMessage.success('搜索包含标签的项目');
              },
            },
            {
              label: '设为常用标签',
              handler: async () => {
                TagOftenFn(true);
              },
            },
            {
              label: '取消常用标签',
              textStyle: {
                color: '#d9dbe1',
              },
              handler: () => {
                TagOftenFn(false);
              },
            },
            {
              label: '重命名',
              textStyle: {
                'border-bottom': '1px solid rgba(0,0,0,0.06)',
              },
              handler: () => {
                UpdateFileTagName({
                  /// 标签ID Guid
                  TagId: checkedTag.id,
                  /// 标签名称 string
                  TagName: '',
                  /// 修改人ID string
                  UpdatorID: userStore.getUserInfo.UserId,
                  /// 修改人名称 string
                  UpdatorName: userStore.getUserInfo.UserName,
                });
                createMessage.success('重命名');
              },
            },
            {
              label: '添加至群组...',
              righticon: 'ant-design:right-outlined',
              handler: () => {
                createMessage.success('添加至群组...');
              },
            },
            {
              label: '从标签群组移除',
              textStyle: {
                'border-bottom': '1px solid rgba(0,0,0,0.06)',
              },
              handler: () => {
                createMessage.success('从标签群组移除');
              },
            },
            {
              label: '删除标签',
              handler: () => {
                createMessage.success('删除标签');
              },
            },
          ],
        });
      }

      return {
        checkedTag,

        AddOpen,
        AddKey,
        AddValue,
        pressEnter,
        // LoseFocus,
        // 左
        ClickTagGroup,
        checkedBg,
        AllFileTagGroup,
        TagNameList,
        // 右
        TileTagList,
        //a-z 当前下标
        AZindex,
        generateSmall,
        AZindexClick,

        //自动高度
        scrollRef,
        scrollHeight,
        scrollTo,
        scrollBottom,
        handleScroll,
        //右键逻辑
        rightButton_left,
        rightButton_right,
      };
    },
  });
</script>
