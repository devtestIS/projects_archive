import { createLocalVue, mount } from '@vue/test-utils';
import TheUserAccountDetailsChangePassword from '@/components/TheUserAccountDetailsChangePassword.vue';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import preloader from '@/store/modules/preloader';
import checkoutErrors from '@/store/modules/checkoutErrors';
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);
describe('TheUserAccountDetailsChangePassword', () => {
  let store;
  let state;
  let getters;
  let actions;
  let mutations;
  let modules;
  beforeEach(() => {
    state = {};
    getters = {};
    actions = {
      changePassword: jest.fn(),
    };
    mutations = {};
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state,
          getters,
          actions,
          mutations,
          modules: {
            checkoutErrors,
          },
        },
        preloader: {
          namespaced: true,
          state: preloader.state,
          actions: preloader.actions,
          mutations: preloader.mutations,
        },
      },
    });
  });
  test('click test', () => {
    const wrapper = mount(TheUserAccountDetailsChangePassword, {
      localVue,
      store,
    });
    const button = wrapper.find('button');

    button.trigger('click');
    expect(actions.changePassword).toHaveBeenCalled();
  });
});
