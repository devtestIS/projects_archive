import { createLocalVue, mount } from '@vue/test-utils';
import TheUserAccountDetailsApiKeys from '@/components/TheUserAccountDetailsApiKeys.vue';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import Vuex from 'vuex';
import apiKeysRefresh from '@/store/modules/user/api-keys-refresh';
import preloader from '@/store/modules/preloader';
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);
describe('TheUserAccountDetailsApiKeys', () => {
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
      refreshKeys: jest.fn(),
    };
    mutations = {};
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: apiKeysRefresh.state,
          getters: apiKeysRefresh.getters,
          actions,
          mutations: apiKeysRefresh.mutations,
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
    const wrapper = mount(TheUserAccountDetailsApiKeys, {
      localVue,
      store,
    });
    const button = wrapper.find('button');

    button.trigger('click');
    expect(actions.refreshKeys).toHaveBeenCalled();
  });
});
