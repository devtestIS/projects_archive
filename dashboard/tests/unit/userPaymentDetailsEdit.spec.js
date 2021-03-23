import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheUserPaymentCard from '@/components/TheUserPaymentCard.vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import userPaymentDetails from '@/store/modules/userPaymentDetails';
import preloader from '@/store/modules/preloader';
import checkoutErrors from '@/store/modules/checkoutErrors';

import CHECKOUT_ERROR_STATUS from '@/store/mutation-types';

const localVue = createLocalVue();

localVue.use(Vuelidate);
localVue.use(Vuex);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);

import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/features/forms/edit.feature');

const validForm = {
  name: 'тестовые данные',
  inn: '1231231231',
  kpp: '123123123',
  contact_name: 'максим вадимович',
  phone: '79859575323',
  delivery_address: 'г. москва, алтуфьевское шоссе',
};

const disabledSaveButtonSelector = '#disabledSaveButton';
const activatedSaveButtonSelector = '#activatedSaveButton';

const fields = ['name', 'inn', 'kpp', 'contact_name', 'phone', 'delivery_address'];

defineFeature(feature, test => {
  let state = {};
  let getters = {};
  let actions = {
    getRequisites: jest.fn(),
    changePaymentDetails: jest.fn(),
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

  test('показываются кнопки действий', ({ when, then, and }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    wrapper.setData({
      form: validForm,
    });
    const activatedSaveButton = wrapper.find(activatedSaveButtonSelector);
    const disabledSaveButton = wrapper.find(disabledSaveButtonSelector);

    when('компонент заполнен реквизитами', () => {
      for (let element in wrapper.vm.form) {
        expect(wrapper.vm.form[element].length > 0).toBe(true);
      }
    });

    then(/^пользователь видит активную кнопку (.*)$/, arg0 => {
      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }
      const isActiveButton =
        wrapper.vm.validateField('name') &&
        wrapper.vm.validateField('inn') &&
        wrapper.vm.validateField('kpp') &&
        wrapper.vm.validateField('contact_name') &&
        wrapper.vm.validateField('phone') &&
        wrapper.vm.validateField('delivery_address');

      expect(isActiveButton).toBe(true);
    });
  });

  test('пользователь сохраняет изменения', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    wrapper.setData({
      form: validForm,
    });
    when('пользователь внес изменения в данные формы', () => {
      wrapper.vm.form.name = 'другие тестовые данные';
    });

    and(/^пользователь нажал кнопку (.*)$/, async arg0 => {
      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }
      const isActiveButton =
        wrapper.vm.validateField('name') &&
        wrapper.vm.validateField('inn') &&
        wrapper.vm.validateField('kpp') &&
        wrapper.vm.validateField('contact_name') &&
        wrapper.vm.validateField('phone') &&
        wrapper.vm.validateField('delivery_address');

      expect(isActiveButton).toBe(true);
      const activatedSaveButton = wrapper.find(activatedSaveButtonSelector);
      expect(activatedSaveButton.exists()).toBe(true);
      await actions.changePaymentDetails();
    });

    then('отправляется запрос на обновление данных', () => {
      expect(actions.changePaymentDetails).toHaveBeenCalled();
    });

    and(/^сервер возвращает ответ с кодом (.*) и данными обновленных реквизитов$/, async arg0 => {
      expect(actions.getRequisites).toHaveBeenCalled();
      store.commit(`userPaymentDetails/checkoutErrors/CHECKOUT_ERROR_STATUS`, 200);
      const status = store.state.userPaymentDetails.checkoutErrors.errorStatus;
      expect(status).toBe(+arg0.split('"')[1]);
    });
  });

  test('ошибка сохранения данных', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    wrapper.setData({
      form: validForm,
    });
    when('пользователь внес изменения в данные формы', () => {
      wrapper.vm.form.name = 'другие тестовые данные';
    });

    and(/^пользователь нажал кнопку (.*)$/, async arg0 => {
      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }
      const isActiveButton =
        wrapper.vm.validateField('name') &&
        wrapper.vm.validateField('inn') &&
        wrapper.vm.validateField('kpp') &&
        wrapper.vm.validateField('contact_name') &&
        wrapper.vm.validateField('phone') &&
        wrapper.vm.validateField('delivery_address');

      expect(isActiveButton).toBe(true);
      const activatedSaveButton = wrapper.find(activatedSaveButtonSelector);
      expect(activatedSaveButton.exists()).toBe(true);
      await actions.changePaymentDetails();
    });

    then('отправляется запрос на обновление данных', () => {
      expect(actions.changePaymentDetails).toHaveBeenCalled();
    });

    and(/^сервер возвращает ответ с кодом (.*) и сообщением об ошибке$/, arg0 => {
      store.commit(`userPaymentDetails/checkoutErrors/CHECKOUT_ERROR_STATUS`, 500);
      const status = store.state.userPaymentDetails.checkoutErrors.errorStatus;
      expect(status).toBe(+arg0.split('"')[1]);
    });
  });

  test('обязательные для заполнения реквизиты', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when(/^поле с меткой (.*) представлено в компоненте$/, selectorId => {
      const input = wrapper.find(`#${selectorId}`);
      expect(input.exists()).toBe(true);
    });

    and(/^(.*) отмечено как обязательное со значением (.*)$/, (arg0, arg1) => {
      let isTrue = !(arg1 == 'true');
      expect(vm.$v.form[arg0].required).toBe(isTrue);
    });

    and('поля не заполнены', () => {
      for (let element in wrapper.vm.form) {
        expect(wrapper.vm.form[element].length > 0).toBe(false);
      }
      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }
    });

    then(/^метка поля получает сноску в виде астериска *(.*) красного цвета$/, arg0 => {
      let tag = wrapper.find('.validate-p-red').html();
      let tagText = `"${tag.replace(/<\/?[^>]+(>|$)/g, '').trim()}"`;
      expect(arg0 === tagText).toBe(true);
    });
  });

  test('данные формы валидны', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when(/^пользователь редактирует поле с меткой (.*)$/, selectorId => {
      const input = wrapper.find(`#${selectorId}`);
      expect(input.exists()).toBe(true);
    });

    and(/^(.*) поле имеет значение (.*)$/, (arg0, arg1) => {
      vm.setField(arg0, arg1);
      vm.onFocusField(arg0);
      vm.onBlurField(arg0);
    });

    then(/^(.*) поле валидно$/, arg0 => {
      expect(vm.validateField(arg0)).toBe(true);
    });
  });

  test('данные формы невалидны', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    const vm = wrapper.vm;
    when(/^пользователь редактирует поле с меткой (.*)$/, selectorId => {
      const input = wrapper.find(`#${selectorId}`);
      expect(input.exists()).toBe(true);
    });

    and(/^(.*) поле имеет значение (.*)$/, (arg0, arg1) => {
      vm.setField(arg0, arg1);
      vm.onFocusField(arg0);
      vm.onBlurField(arg0);
    });

    then(/^(.*) поле невалидно$/, arg0 => {
      expect(vm.validateField(arg0)).toBe(false);
    });
  });

  test('ошибка валдиации данных', ({ when, and, then }) => {
    const wrapper = shallowMount(TheUserPaymentCard, { localVue, store });
    wrapper.setData({
      form: validForm,
    });
    const vm = wrapper.vm;
    when(/^пользователь внес изменения (.*) в сущность (.*)$/, (arg0, arg1) => {
      vm.form[arg1] = arg0;
    });

    and(/^поле объекта vm.\$v.form (.*) имеет значение (.*)$/, (arg0, arg1) => {
      let isTrue = arg1 == 'true';
      expect(vm.$v.form[arg0].$invalid).toBe(isTrue);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      for (let element in fields) {
        wrapper.vm.onFocusField(fields[element]);
        wrapper.vm.onBlurField(fields[element]);
      }

      const disabledSaveButton = wrapper.find(disabledSaveButtonSelector);
      expect(disabledSaveButton.exists()).toBe(true);
    });
  });
});
