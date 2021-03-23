import { createLocalVue, mount } from '@vue/test-utils';
import TheUserAccountDetailsEmaildReset from '@/components/TheUserAccountDetailsEmaildReset.vue';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import edit from '@/store/modules/user/edit';
import preloader from '@/store/modules/preloader';
import checkoutErrors from '@/store/modules/checkoutErrors';
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);
describe('TheUserAccountDetailsEmaildReset', () => {
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
      editUser: jest.fn(),
    };
    mutations = {};
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: edit.state,
          getters: edit.getters,
          actions,
          mutations: edit.mutations,
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
  test('inputs disabled test', () => {
    const wrapper = mount(TheUserAccountDetailsEmaildReset, {
      localVue,
      store,
    });
    const inputs = wrapper.findAll('input');

    expect(inputs.at(0).attributes('disabled')).toBe('disabled');
    expect(inputs.at(1).attributes('disabled')).toBe('disabled');
  });

  test('edit ready test', () => {
    const wrapper = mount(TheUserAccountDetailsEmaildReset, {
      localVue,
      store,
    });
    const inputs = wrapper.findAll('input');
    const button = wrapper.find('button');
    button.trigger('click');

    expect(inputs.at(0).attributes('disabled')).toBe(undefined);
    expect(inputs.at(1).attributes('disabled')).toBe(undefined);
  });
});
