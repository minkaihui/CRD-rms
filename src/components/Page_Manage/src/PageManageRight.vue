<template>
  <div class="pagecontent bg-white">
    <div class="pb-6 tag-herder">
      常用标签
      <span class="tag ml-16">戒指&nbsp;&nbsp;(36)</span>
    </div>
    <div class="pt-6 flex flex-wrap">
      <span class="mr-1"> 按拼音首字母选择： </span>
      <div
        class="zimu cursor-pointer"
        :class="num == index ? 'zimuClick' : ''"
        v-for="(index, item) in 22"
        :key="index"
        @click="num = index"
        >A</div
      >
    </div>
    <div class="li" v-for="(j, item) in 22" :key="j">
      <div class="mb-5">
        <div class="zimu-li">A</div>
      </div>
      <div class="flex flex-wrap">
        <span class="tag mb-5" v-for="(k, item) in 15" :key="k">戒指&nbsp;&nbsp;(36)</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.pagecontent {
  min-height: 100%;
  padding: 2.5rem;
  margin: 1.25rem 5rem;

  .tag-herder {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .li {
    padding: .625rem 1.25rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    .tag {
      margin-right: 1.875rem;
    }
  }

  .zimu {
    width: 1.625rem;
    height: 1.625rem;
    margin: 0 0.125rem;
    line-height: 1.625rem;
    text-align: center;
    border-radius: 50%;
    box-shadow: 0px 0.125rem 0px 0px rgba(255, 255, 255, 0.06) inset;
  }

  .zimuClick {
    background: rgba(0, 0, 0, 0.05);
  }

  .zimu-li {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: linear-gradient(0deg, #1665d8 2%, #1665d8 98%);
    border-radius: 50%;
    box-shadow: 0px 0.125rem 0px 0px rgba(255, 255, 255, 0.06) inset;
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
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tag } from 'ant-design-vue';
export default defineComponent({
  name: 'PageManageRight',
  components: { Tag },
  setup() {
    let num = ref(1);

    return {
      num,
    };
  },
});
</script>