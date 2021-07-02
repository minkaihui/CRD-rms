<template>
  <div class="flex justify-between h-full page">
    <!-- 左侧模块1 -->
    <div class="ManageLeft">
      <div class="p-4">
        <!-- 上 -->
        <div
          class="flex items-center justify-between tab-up"
          v-for="(item, index) in TagNameList"
          :key="index"
          :class="checkedBg == index ? 'checked-bg' : ''"
          @click="checkedBg = index"
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
            <Icon icon="ant-design:plus-outlined" color="#9ea0a5" :size="13" />
          </div>
        </div>
        <!-- 下 -->
        <div
          class="flex items-center justify-between tab-up"
          v-for="(item, index) in 3"
          :key="index + 3"
          :class="checkedBg == index + 3 ? 'checked-bg' : ''"
          @contextmenu="rightButton_left"
          @click="checkedBg = index + 3"
        >
          <div class="w-4 h-6">
            <div class="roundDot"></div>
          </div>
          <div class="flex-1 tab">群组{{ item }}</div>
          <div class="text-right">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 右侧模块1-->

    <div class="scroll-wrap" :style="{ height: scrollHeight + 'px' }">
      <div class="flex items-start justify-between TabName">
        <div>
          <span class="text-xl font-semibold" style="margin-right: 24px">群组</span>
          <Icon
            @click="addGroupTag"
            icon="ant-design:plus-outlined"
            size="14"
            color="#474a57"
          ></Icon>
        </div>
        <div>
          <span>排列方式</span>
          <a-button type="link" :size="size">
            名称排列 <Icon icon="ant-design:caret-down-filled" size="10" color="#474a57"></Icon>
          </a-button>
        </div>
      </div>
      <ScrollContainer ref="scrollRef" @handleScroll="handleScroll">
        <div class="bg-white pagecontent">
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
          <div class="li" v-for="(item, j) in generateSmall" :key="j">
            <div class="mb-5">
              <div class="zimu-li">{{ item }}</div>
            </div>
            <div class="flex flex-wrap">
              <div class="mb-5 tag" v-for="(item, k) in 15" :key="k"
                >戒指&nbsp;&nbsp;
                <span class="text-black-45">{{ k }}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollContainer>
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
  import { defineComponent, onMounted, ref } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Icon } from '/@/components/Icon';
  import { HeightScroll, setDOM } from '/@/utils/HeightScroll';

  // 文件夹接口
  import {
    GetTileTagList,
    GetFileTagAndGroupList,
    GetAllFileTagGroup,
    AddTagGroup,
    UpdateTagGroupName,
    DeleteTagGroup,
  } from '/@/api/sys/FileTag';

  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  // 右键逻辑
  import { rightButton_left, rightButton_right } from './rightButton';

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

      // 点击滚动
      let zimuList;
      onMounted(() => {
        zimuList = document.querySelectorAll('.zimu-li');
      });

      const AZindex = ref(1);

      function handleScroll(e, height) {
        AZindex.value = Math.round(e / (height / 26));
      }

      function AZindexClick(index) {
        AZindex.value = index;
        scrollTo(zimuList[index].offsetTop);
      }

      //a-z 模拟
      function generateBig_1() {
        var str = [];
        for (var i = 65; i < 91; i++) {
          str.push(String.fromCharCode(i));
        }
        return str;
      }
      let generateSmall = generateBig_1();

      async function AllTagGroup() {
        let AllFileTagGroup = await GetAllFileTagGroup({});
        console.log(AllFileTagGroup, 2);
      }

      async function init(
        IsOften = false,
        SearchNoGroup = false,
        GroupId = null,
        FileTagName = ''
      ) {
        // 获得文件标签列表
        let TileTagList = await GetTileTagList({
          req: {
            /// 查询常用文件标签 bool?
            IsOften: IsOften,
            /// 查询未分类文件标签 bool?
            SearchNoGroup: SearchNoGroup,
            /// 根据分组ID查询文件夹标签 Guid?
            GroupId: GroupId,
            /// 文件标签名称 string
            FileTagName: FileTagName,
          },
        });
        // 获得文件标签标签组列表
        let FileTagAndGroupList = await GetFileTagAndGroupList({
          req: {
            /// 查询常用文件标签 bool?
            IsOften: IsOften,
            /// 查询未分类文件标签 bool?
            SearchNoGroup: SearchNoGroup,
            /// 根据分组ID查询文件夹标签 Guid?
            GroupId: GroupId,
            /// 文件标签名称 string
            FileTagName: FileTagName,
          },
        });
        AllTagGroup();
        console.log(TileTagList, FileTagAndGroupList, 1);
      }
      init();

      async function addGroupTag() {
        let GroupTag = await AddTagGroup({
          dto: {
            /// 标签分组名称 string
            GroupName: '群组1',
            /// 创建人  string
            CreatorID: userStore.getUserInfo.UserId,
            /// 创建人姓名  string
            CreatorName: userStore.getUserInfo.UserName,
          },
        });
        console.log(GroupTag, 3);
        AllTagGroup();
      }

      return {
        // 左
        checkedBg: ref(0),
        rightButton_left,
        TagNameList: [
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
        ],

        // 右
        rightButton_right,
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

        //添加群组标签
        addGroupTag,
      };
    },
  });
</script>
