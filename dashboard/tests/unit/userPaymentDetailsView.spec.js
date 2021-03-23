import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheUserPaymentCard from '@/components/TheUserPaymentCard.vue';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import userPaymentDetails from '@/store/modules/userPaymentDetails';
import preloader from '@/store/modules/preloader';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);

import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/features/forms/view.feature');

const disabledSaveButtonSelector = '#disabledSaveButton';
const activatedSaveButtonSelector = '#activatedSaveButton';

const fields = ['name', 'inn', 'kpp', 'contact_name', 'phone', 'delivery_address'];

const validForm = {
  name: 'тестовые данные',
  inn: '1231231231',
  kpp: '123123123',
  contact_name: 'тестовое имя',
  phone: '79851231212',
  delivery_address: 'г. москва, кремлевская улица',
};

const nullForm = {
  name: '',
  inn: '',
  kpp: '',
  contact_name: '',
  phone: '',
  delivery_address: '',
};

defineFeature(feature, test => {
  let state = {};
  let getters = {};
  let actions = {
    getRequisites: jest.fn(),
  };
  let mutations = {};
  let store = new Vuex.Store({
    modules: {
      state,
      getters,
      userPaymentDetails: {
        namespaced: true,
        state: userPaymentDetails.state,
        actions,
        mutations,
        modules: userPaymentDetails.modules,
      },
      preloader: {
        namespaced: true,
        state: preloader.state,
        actions: preloader.actions,
        mutations: preloader.mutations,
      },
    },
  });

  test('реквизиты в режиме просмотра', ({ when, then }) => {
    let fieldsForSearch = [];
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when(/^поле с меткой (.*) представлено в компоненте$/, selectorId => {
      wrapper.setData({
        form: validForm,
      });
      fieldsForSearch.push(selectorId);
      const input = wrapper.find(`#${selectorId}`);

      expect(input.exists()).toBe(true);
    });

    then(/^значение (.*) выглядит как простой текст$/, arg0 => {
      const input = wrapper.find(`#${fieldsForSearch.pop()}`);
      let tags = input.html();
      console.log(tags);
    });
  });

  test('показывается активная кнопка сохранения данных', ({ when, then, and }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when('пользователь обладет правами на сохранение данных', () => {
      expect(actions.getRequisites).toHaveBeenCalled();
    });

    then('пользователь видит кнопку сохранения активной', () => {
      wrapper.setData({
        form: validForm,
      });

      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }

      const activatedSaveButton = wrapper.find(activatedSaveButtonSelector);
      const disabledSaveButton = wrapper.find(disabledSaveButtonSelector);

      expect(activatedSaveButton.exists()).toBe(true);
      expect(disabledSaveButton.exists()).toBe(false);
    });
  });

  test('показывается неактивная кнопка сохранения данных', ({ when, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when('пользователь не обладет правами на сохранение данных', () => {
      expect(actions.getRequisites).toHaveBeenCalled();
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      wrapper.setData({
        form: nullForm,
      });

      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }

      const activatedSaveButton = wrapper.find(activatedSaveButtonSelector);
      const disabledSaveButton = wrapper.find(disabledSaveButtonSelector);

      expect(activatedSaveButton.exists()).toBe(false);
      expect(disabledSaveButton.exists()).toBe(true);
    });
  });
});
