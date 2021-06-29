import drag from './drag';
import Vue from 'vue';
const install: any = function (Vue: any) {
  Vue.directive('el-drag-dialog', drag);
};

if (Vue) {
  const _window: any = window;
  _window['el-drag-dialog'] = drag as any;
	Vue.use(install); // eslint-disable-line
}

drag.install = install;
export default drag;
