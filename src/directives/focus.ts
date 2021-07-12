
import type { Directive, App } from 'vue';

const focusDirective: Directive = {
  mounted(el, binding) {
    el.focus();
  }
};

export function setupFocusDirective(app: App) {
  app.directive('focus', focusDirective);
}

export default focusDirective;
