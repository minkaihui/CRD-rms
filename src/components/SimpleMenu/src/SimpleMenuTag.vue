<template>
  <div :class="!getShowTag ? 'mkh' : ''">
    <span :class="getTagClass" v-if="getShowTag">{{ getContent }}</span>

    <span
      :class="getTagClass"
      style="background-color: rgba(0, 0, 0, 0)"
      v-if="!getShowTag && items.icon == 'ant-design:plus-outlined'"
      @click="openModal"
      ><Icon :icon="items.icon"
    /></span>

    <Modal width="630px" @register="register" />
  </div>
</template>
<style lang="less" scoped>
  .mkh {
    ::v-deep(.vben-simple-menu-tag) {
      top: calc(50% - 14px);
      right: 10px;
      padding: 8px;
      color: #666;
      cursor: pointer;
    }
  }
</style>
<script lang="ts">
  import type { Menu } from '/@/router/types';

  import { defineComponent, computed } from 'vue';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import Modal from './modal/addModal.vue';

  export default defineComponent({
    name: 'SimpleMenuTag',
    components: { Icon, Modal },
    props: {
      item: {
        type: Object as PropType<Menu>,
        default: () => ({}),
      },
      dot: propTypes.bool,
      collapseParent: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('simple-menu');

      const getShowTag = computed(() => {
        const { item } = props;

        if (!item) return false;

        const { tag } = item;
        if (!tag) return false;

        const { dot, content } = tag;
        if (!dot && !content) return false;
        return true;
      });

      const getContent = computed(() => {
        if (!getShowTag.value) return '';
        const { item, collapseParent } = props;
        const { tag } = item;
        const { dot, content } = tag!;
        return dot || collapseParent ? '' : content;
      });

      const items = computed(() => {
        const { item } = props;
        console.log(item);
        return item;
      });

      const getTagClass = computed(() => {
        const { item, collapseParent } = props;
        const { tag = {} } = item || {};
        const { dot, type = 'error' } = tag;
        const tagCls = `${prefixCls}-tag`;
        return [
          tagCls,

          [`${tagCls}--${type}`],
          {
            [`${tagCls}--collapse`]: collapseParent,
            [`${tagCls}--dot`]: dot || props.dot,
          },
        ];
      });

      const [register, { openModal: openModal }] = useModal();
      return {
        getTagClass,
        getShowTag,
        getContent,

        //添加文件夹弹框
        register,
        openModal,
        items,
      };
    },
  });
  //   <div :class="getShowTag == -1 ? 'mkh' : ''">
  //     <span :class="getTagClass" v-if="getShowTag == 1">{{ getContent }}</span>

  //     <span :class="getTagClass" v-if="getShowTag == -1" @click="openModal"><Icon :icon="getContent"></Icon></span>

  //     <Modal width="630px"  @register="register" />
  //   </div>
  // </template>

  // <script lang="ts">
  // import type { Menu } from '/@/router/types';
  // import { defineComponent, computed } from 'vue';
  // import { useDesign } from '/@/hooks/web/useDesign';
  // import { propTypes } from '/@/utils/propTypes';
  // import { Icon } from '/@/components/Icon';
  // import { useModal } from '/@/components/Modal';
  // import Modal from './modal/addModal.vue'
  // export default defineComponent({
  //   name: 'SimpleMenuTag',
  //   components: { Icon,Modal},
  //   props: {
  //     item: {
  //       type: Object as PropType<Menu>,
  //       default: () => {},
  //     },
  //     dot: propTypes.bool,
  //     collapseParent: propTypes.bool,
  //   },
  //   setup(props) {
  //     const { prefixCls } = useDesign('simple-menu');

  //     const getShowTag = computed(() => {
  //       const { item } = props;

  //       if (!item) return 0;

  //       const { tag } = item;
  //       if (!tag) return 0;

  //       const { dot, content, icon } = tag;
  //       if (icon) return -1;
  //       if (!dot && !content) return 0;
  //       return 1;
  //     });

  //     const getContent = computed(() => {
  //       if (getShowTag.value == 0) return '';
  //       if (getShowTag.value == -1) return props.item.tag.icon;
  //       const { item, collapseParent } = props;
  //       const { tag } = item;
  //       const { dot, content, icon } = tag!;
  //       return dot || collapseParent ? '' : content;
  //     });

  //     const getTagClass = computed(() => {
  //       const { item, collapseParent } = props;
  //       const { tag = {} } = item || {};
  //       const { dot, type = '' } = tag;
  //       const tagCls = `${prefixCls}-tag`;
  //       return [
  //         tagCls,

  //         [`${tagCls}--${type}`],
  //         {
  //           [`${tagCls}--collapse`]: collapseParent,
  //           [`${tagCls}--dot`]: dot || props.dot,
  //         },
  //       ];
  //     });
  //     const [register, { openModal: openModal }] = useModal();
  //     return {
  //       getTagClass,
  //       getShowTag,
  //       getContent,
  //       register,
  //       openModal
  //     };
  //   },
  // });
</script>
