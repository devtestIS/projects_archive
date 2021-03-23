import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import preloader from '@/store/modules/preloader';
import checkoutErrors from '@/store/modules/checkoutErrors';
const localVue = createLocalVue();

ShardsVue.install(localVue);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
localVue.use(Vuex);

import Login from '@/views/Login.vue';

import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/features/auth/login.feature');

const loginButtonSelector = '[type="submit"]';

const validLogin = 'somedata@mail.ru';

defineFeature(feature, test => {
  let state = {};
  let getters = {};
  let actions = {
    getToken: jest.fn(),
  };
  let mutations = {};
  let modules = {};
  let store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        state: auth.state,
        actions,
        mutations: auth.mutations,
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
  test('не заполнено поле логина', ({ when, then }) => {
    const wrapper = shallowMount(Login, { localVue, store });
    when('поле логина пустое', () => {
      expect(wrapper.vm.isValidEmail).toBe(null);
    });
    then('кнопка входа остается неактивной', function() {
      const disabledLoginButton = wrapper.find(loginButtonSelector);
      expect(disabledLoginButton.attributes('disabled')).toBeDefined();
    });
  });

  test('не заполнено поле пароля', ({ when, and, then }) => {
    const wrapper = shallowMount(Login, { localVue, store });
    when('пользователь ввел валидный логин', function() {
      wrapper.vm.form.email = validLogin;
      wrapper.vm.check('email');
      expect(wrapper.vm.isValidEmail).toBe('valid');
    });
    and('поле пароля пустое', function() {
      expect(wrapper.vm.isValidPassword).toBe(null);
    });
    then('кнопка входа остается неактивной', function() {
      const disabledLoginButton = wrapper.find(loginButtonSelector);
      expect(disabledLoginButton.attributes('disabled')).toBeDefined();
    });
  });

  test('невалидный логин', ({ when, then }) => {
    const wrapper = shallowMount(Login, { localVue, store });
    when(/^пользователь ввел (.*)$/, login => {
      wrapper.vm.form.email = login;
      wrapper.vm.check('email');
      expect(wrapper.vm.isValidEmail).toBe('invalid');
    });
    when(/^пользователь ввел (.*)$/, password => {
      wrapper.vm.form.password = password;
      wrapper.vm.check('password');
      expect(wrapper.vm.isValidPassword).toBe('valid');
    });
    then('кнопка входа остается неактивной', () => {
      const disabledLoginButton = wrapper.find(loginButtonSelector);
      expect(disabledLoginButton.attributes('disabled')).toBeDefined();
    });
  });

  test('ошибка входа', ({ when, and, but, then }) => {
    when('пользователь ввел валидный логин', () => {});
    and('пользователь ввел валидный пароль', () => {});
    and('нажал кнопку входа', () => {});
    and('отправляется запрос к сервису аутентификации', () => {});
    but(/^сервис возвращает ответ с http-кодом (.*)$/, arg0 => {});
    then(/^пользователь видит сообщение (.*)$/, arg0 => {});
  });

  test('невалидный пароль', ({ when, and, then }) => {
    const wrapper = shallowMount(Login, { localVue, store });
    when(/^пользователь ввел (.*)$/, login => {
      wrapper.vm.form.email = login;
      wrapper.vm.check('email');
      expect(wrapper.vm.isValidEmail).toBe('valid');
    });
    and(/^пользователь ввел (.*)$/, password => {
      // wrapper.vm.form.password = password;
      // wrapper.vm.check('password');
      // expect(wrapper.vm.isValidPassword).toBe('invalid');
    });
    then('кнопка входа остается неактивной', () => {
      const disabledLoginButton = wrapper.find(loginButtonSelector);
      expect(disabledLoginButton.attributes('disabled')).toBeDefined();
    });
  });

  test('валидные данные для входа', ({ when, and, then }) => {
    const wrapper = shallowMount(Login, { localVue, store });
    when(/^пользователь ввел (.*)$/, login => {
      wrapper.vm.form.email = login;
      wrapper.vm.check('email');
      expect(wrapper.vm.isValidEmail).toBe('valid');
    });
    and(/^пользователь ввел (.*)$/, password => {
      wrapper.vm.form.password = password;
      wrapper.vm.check('password');
      expect(wrapper.vm.isValidPassword).toBe('valid');
    });
    then('кнопка входа становится активной', () => {
      const loginButton = wrapper.find(loginButtonSelector);
      expect(loginButton.attributes()).toBeDefined();
    });
  });

  test('успешный вход в систему', ({ given, when, and, then }) => {
    when(/^пользователь ввел (.*)$/, arg0 => {});
    and(/^ввел валидный (.*)$/, arg0 => {});
    and('нажал кнопку входа', () => {});
    and('отправляется запрос к сервису аутентификации', () => {});
    and(/^сервис возвращает ответ с http-кодом (.*)$/, arg0 => {});
    then('перенаправляется в личный кабинет', () => {});
    given('в системе зарегистрированы пользователи:', table => {});
  });

  test('отказ входа в систему', ({ when, and, but, then }) => {
    when(/^пользователь ввел (.*)$/, arg0 => {});
    and(/^пользователь ввел (.*)$/, arg0 => {});
    and('нажал кнопку входа', () => {});
    and('отправляется запрос к сервису аутентификации', () => {});
    but(/^сервис возвращает ответ с http-кодом (.*)$/, arg0 => {});
    then(/^пользователь видит сообщение (.*)$/, arg0 => {});
  });
});
