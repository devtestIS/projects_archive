import { createLocalVue, mount } from '@vue/test-utils';
import Register from '@/views/Register.vue';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
const localVue = createLocalVue();
localVue.use(Vuelidate);
ShardsVue.install(localVue);
describe('Register', () => {
  test('check registry button is disabled if inputs are empty', () => {
    const wrapper = mount(Register, {
      localVue,
    });
    wrapper.setData({
      form: {
        name: '',
        inn: '',
        email: '',
        password: '',
        publicOffer: false,
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  test('check registry button is disabled if inputs have invalid data', () => {
    const wrapper = mount(Register, {
      localVue,
    });
    const checkbox = wrapper.find('.form-group.mb-3.d-table > .custom-checkbox > input[type=checkbox]');
    checkbox.setChecked();
    wrapper.setData({
      form: {
        name: '',
        inn: '771',
        email: 'test',
        password: 'bla',
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  test('check registry button is disabled if inputs are valid and public offer false', () => {
    const wrapper = mount(Register, {
      localVue,
    });
    wrapper.setData({
      form: {
        name: 'Test Test',
        inn: '7715641735',
        email: 'test@mail.ru',
        password: 'bla~bla#bla!',
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  test('check registry button is disabled if inputs are valid and public offer checked', () => {
    const wrapper = mount(Register, {
      localVue,
    });
    const checkbox = wrapper.find('.form-group.mb-3.d-table > .custom-checkbox > input[type=checkbox]');
    checkbox.setChecked();
    wrapper.setData({
      form: {
        name: 'Test Test',
        inn: '7715641735',
        email: 'test@mail.ru',
        password: 'bla~bla#bla!',
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe(undefined);
  });
});
