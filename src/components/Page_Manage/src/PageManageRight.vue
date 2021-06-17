<template>
  <div class="scroll-wrap" :style="{ height: scrollHeight + 'px' }">
    <ScrollContainer ref="scrollRef" @handleScroll="handleScroll">
      <div class="pagecontent bg-white">
        <div class="az pt-6 flex flex-col">
          <div
            class="zimu cursor-pointer"
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
            <span class="tag mb-5" v-for="(item,k ) in 15" :key="k">戒指&nbsp;&nbsp;<span class="text-black-45">{{k}}</span></span>
          </div>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>
<style lang="less" scoped>
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
        margin-right: 1.875rem;
        color: rgba(0,0,0,0.65);
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
      width: 4.8125rem;
      height: 1.75rem;
      padding: 0.25rem;
      line-height: initial;
      text-align: center;
      background: rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 0.3125rem;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Tag } from 'ant-design-vue';
import { CollapseContainer } from '/@/components/Container/index';
import { ScrollContainer } from '/@/components/Container/index';
import { HeightScroll } from '/@/utils/HeightScroll';
export default defineComponent({
  name: 'PageManageRight',
  components: { Tag, CollapseContainer, ScrollContainer },
  setup() {
    //自动高度
    const { scrollTo, scrollRef, scrollBottom, scrollHeight } = HeightScroll('getLeftPage');

    // 点击滚动
    let zimuList;
    onMounted(() => {
      zimuList = document.querySelectorAll('.zimu-li');
    })

    const AZindex = ref(1);

    function handleScroll(e,height) {
      AZindex.value = Math.round(e / (height / 26));
    }

    function AZindexClick(index){
      AZindex.value=index;
      scrollTo(zimuList[index].offsetTop)
    }

    //a-z
    function generateBig_1() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      return str;
    }

    let generateSmall = generateBig_1();

    

    return {
      //a-z 当前下标
      AZindex,
      generateSmall,
      AZindexClick,

      //自动高度
      scrollRef,
      scrollHeight,
      scrollTo,
      scrollBottom,
      handleScroll
    };
  },
});
</script>