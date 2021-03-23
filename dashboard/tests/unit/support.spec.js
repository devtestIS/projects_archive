import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheSupport from '@/components/TheSupport.vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import support from '@/store/modules/support';
import preloader from '@/store/modules/preloader';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuelidate);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);

import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/features/support.feature');

const activatedSendButtonWithoutFilesSelector = '#activatedSendButtonWithoutFiles';
const activatedSendButtonWithFilesSelector = '#activatedSendButtonWithFiles';
const disabledSendButtonSelector = '#disabledSendButton';

const isNotPermissibleFilesizeSelector = '#isNotPermissibleFilesize';
const unsupportedFileTypeErrorSelector = '#unsupportedFileTypeError';
const counterFilesErrorSelector = '#counterFilesError';

defineFeature(feature, test => {
  let state = {};
  let getters = {};
  let actions = {
    triggerSendButton: jest.fn(),
    triggerSendWithoutFiles: jest.fn(),
  };
  let mutations = {};
  let store = new Vuex.Store({
    modules: {
      state,
      getters,
      support: {
        namespaced: true,
        state: support.state,
        actions,
        mutations,
        modules: state.modules,
      },
      preloader: {
        namespaced: true,
        state: preloader.state,
        actions: preloader.actions,
        mutations: preloader.mutations,
      },
    },
  });
  test('пользователь не может нажать кнопку отправить без заполнения сущности "Заголовок" и "Описание" и чекбокс неактивен', ({
    when,
    and,
    then,
  }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      form: {
        title: '',
        description: '',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(false);
    });

    and(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(false);
    });

    and(/^чекбокс с ID (.*) не активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(false);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });
  });

  test('пользователь не может нажать кнопку отправить без заполнения сущности "Заголовок" и "Описание", активирован чекбокс, файлы не добавлены', ({
    when,
    and,
    then,
  }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: true,
      form: {
        title: '',
        description: '',
      },
    });
    const vm = wrapper.vm;
    vm.$forceUpdate();
    when(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(false);
    });

    and(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(false);
    });

    and(/^чекбокс с ID (.*) активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(true);
    });

    and(/^файлы не добавлены в форму (.*)$/, arg0 => {
      expect(vm.files.length).toBe(0);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });
  });

  test('пользователь не может нажать кнопку отправить без заполнения сущности "Заголовок"', ({ when, and, then }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: false,
      form: {
        title: 'заголовок',
        description: '',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(true);
    });

    and(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(false);
    });

    and(/^чекбокс с ID (.*) не активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(false);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });
  });

  test('пользователь не может нажать кнопку отправить без заполнения сущности "Описание"', ({ when, and, then }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: false,
      form: {
        title: '',
        description: 'описание',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте не заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(false);
    });

    and(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(true);
    });

    and(/^чекбокс с ID (.*) не активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(false);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });
  });

  test('пользователь может нажать кнопку отправить с заполнением сущности "Заголовок" и "Описание", чекбокс неактивен', ({
    when,
    and,
    then,
  }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: false,
      form: {
        title: 'заголовок',
        description: 'описание',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(true);
    });

    and(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(true);
    });

    and(/^чекбокс с ID (.*) не активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(false);
    });

    then(/^кнопка (.*) активна$/, arg0 => {
      const activatedSendButtonWithoutFiles = wrapper.find(activatedSendButtonWithoutFilesSelector);
      expect(activatedSendButtonWithoutFiles.attributes()).toBeDefined();
    });
  });

  test('пользователь может нажать кнопку отправить с заполнением сущности "Заголовок" и "Описание", активирован чекбокс, файлы добавлены, файлы подходят по размеру и формату', ({
    when,
    and,
    then,
  }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: true,
      stateOfLoadingFile: {
        isPermissibleFileSize: true,
        isSupportedTypeOfFile: true,
        numberOfFiles: 4,
      },
      form: {
        title: 'заголовок',
        description: 'описание',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(true);
    });

    and(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(true);
    });

    and(/^чекбокс с ID (.*) активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(true);
    });

    and(/^файлы добавлены в форму (.*)$/, arg0 => {
      const hasAddFiles = vm.stateOfLoadingFile.numberOfFiles > 0;
      expect(hasAddFiles).toBe(true);
    });

    and(/^количество файлов до (.*)-ех штук$/, arg0 => {
      const hasLimitFiles = vm.stateOfLoadingFile.numberOfFiles < 5;
      expect(hasLimitFiles).toBe(true);
    });

    and(/^файлы подходят по размеру \(меньше (.*)-ух мегабайт\)$/, arg0 => {
      expect(vm.stateOfLoadingFile.isPermissibleFileSize).toBe(true);
    });

    and(/^файлы подходят по формату \((.*) форматов\)$/, arg0 => {
      expect(vm.stateOfLoadingFile.isSupportedTypeOfFile).toBe(true);
    });

    then(/^кнопка (.*) активна$/, arg0 => {
      const activatedSendButtonWithFiles = wrapper.find(activatedSendButtonWithFilesSelector);
      expect(activatedSendButtonWithFiles.attributes()).toBeDefined();
    });
  });

  test('пользователь может нажать кнопку отправить с заполнением сущности "Заголовок" и "Описание", активирован чекбокс, файлы добавлены, файлы не подходят по размеру и формату', ({
    when,
    and,
    then,
  }) => {
    const wrapper = shallowMount(TheSupport, { localVue, store });
    wrapper.setData({
      enabledVueDropzone: true,
      stateOfLoadingFile: {
        isPermissibleFileSize: false,
        isSupportedTypeOfFile: false,
        numberOfFiles: 5,
      },
      form: {
        title: 'заголовок',
        description: 'описание',
      },
    });
    const vm = wrapper.vm;
    when(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const title = vm.form.title.length > 0;
      expect(title).toBe(true);
    });

    and(/^в компоненте заполнена сущность (.*)$/, arg0 => {
      const description = vm.form.description.length > 0;
      expect(description).toBe(true);
    });

    and(/^чекбокс с ID (.*) активирован$/, arg0 => {
      expect(vm.enabledVueDropzone).toBe(true);
    });

    and(/^файлы добавлены в форму (.*)$/, arg0 => {
      const hasAddFiles = vm.stateOfLoadingFile.numberOfFiles > 0;
      expect(hasAddFiles).toBe(true);
    });

    and(/^количество файлов (.*)$/, arg0 => {
      expect(vm.stateOfLoadingFile.numberOfFiles === 5).toBe(true);
    });

    and(/^(.*) файл не подходит по размеру$/, arg0 => {
      expect(vm.stateOfLoadingFile.isPermissibleFileSize).toBe(false);
    });

    and(/^(.*) файл по формату$/, arg0 => {
      expect(vm.stateOfLoadingFile.isSupportedTypeOfFile).toBe(false);
    });

    then(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });

    and(/^сообщения под формой (.*)$/, arg0 => {
      const isNotPermissibleFilesizeText = wrapper.find(isNotPermissibleFilesizeSelector);
      const unsupportedFileTypeErrorText = wrapper.find(unsupportedFileTypeErrorSelector);
      const counterFilesErrorText = wrapper.find(counterFilesErrorSelector);

      expect(isNotPermissibleFilesizeText.exists()).toBe(true);
      expect(unsupportedFileTypeErrorText.exists()).toBe(true);
      expect(counterFilesErrorText.exists()).toBe(true);
    });

    when('пользователь удаляет файл подходящий по размеру и по формату', () => {
      wrapper.setData({
        stateOfLoadingFile: {
          numberOfFiles: 4,
        },
      });
    });

    then(/^сообщения под формой (.*)$/, arg0 => {
      const isNotPermissibleFilesizeText = wrapper.find(isNotPermissibleFilesizeSelector);
      const unsupportedFileTypeErrorText = wrapper.find(unsupportedFileTypeErrorSelector);
      const counterFilesErrorText = wrapper.find(counterFilesErrorSelector);

      expect(isNotPermissibleFilesizeText.exists()).toBe(true);
      expect(unsupportedFileTypeErrorText.exists()).toBe(true);
      expect(counterFilesErrorText.exists()).toBe(false);
    });

    and(/^количество файлов становится (.*)$/, arg0 => {
      expect(vm.stateOfLoadingFile.numberOfFiles).toBe(+arg0);
    });

    and(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });

    when('пользователь удаляет файл не подходящий по размеру', () => {
      wrapper.setData({
        stateOfLoadingFile: {
          isPermissibleFileSize: true,
          numberOfFiles: 3,
        },
      });
      vm.$forceUpdate();
    });

    then(/^сообщения под формой (.*)$/, arg0 => {
      const isNotPermissibleFilesizeText = wrapper.find(isNotPermissibleFilesizeSelector);
      const unsupportedFileTypeErrorText = wrapper.find(unsupportedFileTypeErrorSelector);
      const counterFilesErrorText = wrapper.find(counterFilesErrorSelector);

      expect(isNotPermissibleFilesizeText.exists()).toBe(false);
      expect(unsupportedFileTypeErrorText.exists()).toBe(true);
      expect(counterFilesErrorText.exists()).toBe(false);
    });

    and(/^количество файлов становится (.*)$/, arg0 => {
      expect(vm.stateOfLoadingFile.numberOfFiles).toBe(+arg0);
    });

    and(/^кнопка (.*) неактивна$/, arg0 => {
      const disabledSendButton = wrapper.find(disabledSendButtonSelector);
      expect(disabledSendButton.attributes('disabled')).toBeDefined();
    });

    when('пользователь удаляет файл не подходящий по формату', () => {
      wrapper.setData({
        stateOfLoadingFile: {
          isSupportedTypeOfFile: true,
          numberOfFiles: 2,
        },
      });
      vm.$forceUpdate();
    });

    then('сообщений под формой - нет', () => {
      const isNotPermissibleFilesizeText = wrapper.find(isNotPermissibleFilesizeSelector);
      const unsupportedFileTypeErrorText = wrapper.find(unsupportedFileTypeErrorSelector);
      const counterFilesErrorText = wrapper.find(counterFilesErrorSelector);

      expect(isNotPermissibleFilesizeText.exists()).toBe(false);
      expect(unsupportedFileTypeErrorText.exists()).toBe(false);
      expect(counterFilesErrorText.exists()).toBe(false);
    });

    and(/^количество файлов становится (.*)$/, arg0 => {
      expect(vm.stateOfLoadingFile.numberOfFiles).toBe(+arg0);
    });

    and(/^кнопка (.*) активна$/, arg0 => {
      const activatedSendButtonWithFiles = wrapper.find(activatedSendButtonWithFilesSelector);
      expect(activatedSendButtonWithFiles.attributes()).toBeDefined();
    });
  });

  test('показывается прогресс загрузки файла и статус 200', ({ when, and, then }) => {
    when('в компоненте заполнены сущности', () => {
      expect(true).toBe(true);
    });

    and(/^пользователь видит активную кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    and(/^нажимает кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    then(/^запрос с статусом (.*)$/, arg0 => {
      expect(true).toBe(true);
    });
  });

  test('показывается процесс загрузки файла и статус 401', ({ when, and, then }) => {
    when('в компоненте заполнены сущности', () => {
      expect(true).toBe(true);
    });

    and(/^пользователь видит, нажимает активную кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    and(/^нажимает кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    then(/^запрос с статусом (.*)$/, arg0 => {
      expect(true).toBe(true);
    });
  });

  test('показывается процесс загрузки файла и статус 500', ({ when, and, then }) => {
    when('в компоненте заполнены сущности', () => {
      expect(true).toBe(true);
    });

    and(/^пользователь видит, нажимает активную кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    and(/^нажимает кнопку (.*)$/, arg0 => {
      expect(true).toBe(true);
    });

    then(/^запрос с статусом (.*)$/, arg0 => {
      expect(true).toBe(true);
    });
  });
});
