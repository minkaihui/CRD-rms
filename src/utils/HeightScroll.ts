import { ref, unref, watchEffect, computed } from 'vue';
import { ScrollActionType } from '/@/components/Container/index';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';

//任意组件中传值。主要给 ScrollContainer组件 赋值固定高度

// 用于vuex locale中 取值
function GETswitchVuex(VuexState) {
  const localeStore = useLocaleStoreWithOut();
  let item;
  for (item in localeStore) {
    if (item == VuexState && localeStore.hasOwnProperty(item)) {
      return localeStore[item];
    }
  }
}

// 用于vuex locale中 赋值
function SETswitchVuex(VuexState, value) {
  const localeStore = useLocaleStoreWithOut();
  let item;
  for (item in localeStore) {
    if (item == VuexState && localeStore.hasOwnProperty(item)) {
      const fn = localeStore[item];
      fn(value);
      return false;
    }
  }
}

// VuexState 代表 vuex---locale 里面操作的api （get类型配套下文）
// 暴露方法和dom高度   需配合ScrollContainer组件使用
export function HeightScroll(VuexState) {
  //自动高度
  const pageHeight = computed(() => GETswitchVuex(VuexState));
  const scrollHeight = ref(Number(pageHeight));

  watchEffect(() => {
    scrollHeight.value = pageHeight.value;
  });

  const scrollRef = ref<Nullable<ScrollActionType>>(null);
  const getScroll = () => {
    const scroll = unref(scrollRef);
    if (!scroll) {
      throw new Error('scroll is Null');
    }
    return scroll;
  };

  function scrollTo(top: number) {
    getScroll()?.scrollTo(top);
  }

  function scrollBottom() {
    getScroll()?.scrollBottom();
  }

  return {
    //自动高度
    scrollTo,
    scrollRef,
    scrollBottom,
    scrollHeight,
  };
}
//获取dom 高度
// VuexState 代表 vuex---locale 里面操作的api（set类型配套上文）  selector代表节点
export function setDOM(VuexState, selector) {
  setTimeout(() => {
    const LeftPage = document.querySelector(selector);
    SETswitchVuex(VuexState, LeftPage.scrollHeight);
  }, 0);
}
