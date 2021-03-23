import Vue from 'vue';
import Preloader from '@/components/Preloader';
import { CLEAR_PRELOADER } from '@/store/mutation-types';

export default store => {
  store.subscribeAction({
    before: (action, state) => {
      const Loader = Vue.extend(Preloader);
      const instance = new Loader({
        propsData: {
          loading: true,
          size: '100px',
        },
      });
      instance.$mount();
      const loader = instance.$el;
      const preloaders = state.preloader.preloaders;
      const preloaderItem = preloaders.find(item => action.type.includes(item.action));
      let context;
      if (preloaderItem) {
        context = preloaderItem.context;
        context.$nextTick(function() {
          context.$el.style.position = 'relative';
          context.$el.appendChild(loader);
          instance.$destroy();
        });
      }
    },
    after: (action, state) => {
      const preloaders = state.preloader.preloaders;
      const preloaderItem = preloaders.find(item => action.type.includes(item.action));
      let context;
      if (preloaderItem) {
        context = preloaderItem.context;
        context.$el.style.position = null;
        const loader = context.$el.querySelector(`.${[...context.$el.classList].join('.')} > .spinner-wrapper`);
        if (loader.parentNode === context.$el) {
          context.$el.removeChild(loader);
        }
      }
    },
  });
};
