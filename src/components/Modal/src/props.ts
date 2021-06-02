import type { PropType, CSSProperties } from 'vue';
import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';

import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes, VueNode } from '/@/utils/propTypes';
import type { ModalWrapperProps } from './types';
const { t } = useI18n();

export const modalProps = {
  visible: propTypes.bool,
  scrollTop: propTypes.bool.def(true),
  height: propTypes.number,
  minHeight: propTypes.number,
  // open drag
  draggable: propTypes.bool.def(true),
  centered: propTypes.bool.def(true),
  cancelText: propTypes.string.def(t('common.cancelText')),
  okText: propTypes.string.def(t('common.okText')),
  LeftText: propTypes.string.def(t('common.LeftText')),
  LeftExplainText: propTypes.string.def(t('common.LeftExplainText')),
  closeFunc: Function as PropType<() => Promise<boolean>>,
};

export const basicProps = Object.assign({}, modalProps, {
  defaultFullscreen: propTypes.bool,
  // Can it be full screen
  canFullscreen: propTypes.bool.def(false),
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: propTypes.number.def(0),
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: propTypes.bool.def(true),
  loading: propTypes.bool,
  loadingTip: propTypes.string,
  /**
   * @description: Show close button
   */
  showCancelBtn: propTypes.bool.def(true),
  /**
   * @description: Show confirmation button
   */
  showOkBtn: propTypes.bool.def(true),

  showLeftBtn: propTypes.bool.def(false),

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  afterClose: Function as PropType<() => Promise<VueNode>>,

  bodyStyle: Object as PropType<CSSProperties>,

  FooterStyle: Object as PropType<CSSProperties>,

  HeaderStyle: Object as PropType<CSSProperties>,

  closable: propTypes.bool.def(true),

  closeIcon: Object as PropType<VueNode>,

  confirmLoading: propTypes.bool,

  destroyOnClose: propTypes.bool,

  footer: Object as PropType<VueNode>,

  getContainer: Function as PropType<() => any>,

  mask: propTypes.bool.def(true),

  maskClosable: propTypes.bool.def(true),
  keyboard: propTypes.bool.def(true),

  maskStyle: Object as PropType<CSSProperties>,

  okType: propTypes.string.def('primary'),

  okButtonProps: Object as PropType<ButtonProps>,

  cancelButtonProps: Object as PropType<ButtonProps>,

  LeftButtonProps: Object as PropType<ButtonProps>,

  LeftType: propTypes.string.def('link'),

  title: propTypes.string,

  visible: propTypes.bool,

  width: [String, Number] as PropType<string | number>,

  wrapClassName: propTypes.string,

  zIndex: propTypes.number,

  FooterGPS: propTypes.string,

  FooterRound: propTypes.string,

  
});
