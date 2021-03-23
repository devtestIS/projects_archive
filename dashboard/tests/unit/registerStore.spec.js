import { createLocalVue, mount } from '@vue/test-utils';
import Register from '@/views/Register.vue';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import Vuex from 'vuex';
import register from '@/store/modules/register';
import preloader from '@/store/modules/preloader';
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);
describe('Register', () => {
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
      registration: jest.fn(),
    };
    mutations = {};
    store = new Vuex.Store({
      modules: {
        register: {
          namespaced: true,
          state: register.state,
          actions,
          mutations,
          modules: register.modules,
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
    const wrapper = mount(Register, {
      localVue,
      store,
    });
    const checkbox = wrapper.find('.form-group.mb-3.d-table > .custom-checkbox > input[type=checkbox]');
    const form = wrapper.find('form');
    checkbox.setChecked();
    wrapper.setData({
      form: {
        name: 'Test Test',
        inn: '7715641735',
        email: 'test@mail.ru',
        password: 'bla~bla#bla!',
      },
    });
    form.trigger('submit');
    expect(actions.registration).toHaveBeenCalled();
  });
});
