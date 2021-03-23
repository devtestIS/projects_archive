import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheSubscriptionAndRatesCard from '@/components/TheSubscriptionAndRatesCard.vue';
import TheSubscriptionAndRatesClientTable from '@/components/TheSubscriptionAndRatesClientTable.vue';
import TheSubscriptionAndRatesModalPayment from '@/components/TheSubscriptionAndRatesModalPayment';
import Preloader from '@/components/Preloader';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';
import Vuex from 'vuex';
import preloaderPlugin from '@/plugins/preloaderPlugin';
import rates from '@/store/modules/rates';
import preloader from '@/store/modules/preloader';

const localVue = createLocalVue();

localVue.use(Vuelidate);
localVue.use(Vuex);
localVue.use(preloaderPlugin);
ShardsVue.install(localVue);

import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/features/rates.feature');

defineFeature(feature, test => {
  let state = {};
  let getters = {};
  let actions = {
    getRates: jest.fn(),
    changeSubscription: jest.fn(),
  };
  let mutations = {};
  let store = new Vuex.Store({
    modules: {
      state,
      getters,
      rates: {
        namespaced: true,
        state,
        actions,
        mutations,
        modules: rates.modules,
      },
      preloader: {
        namespaced: true,
        state: preloader.state,
        actions: preloader.actions,
        mutations: preloader.mutations,
      },
    },
  });

  test('пользователь может оплатить подписку', ({ when, and, then }) => {
    const wrapper = shallowMount(TheSubscriptionAndRatesCard, {
      localVue,
      store,
    });
    const vm = wrapper.vm;
    when('пользователь имеет право на выбор тарифа', async () => {
      expect(actions.getRates).toHaveBeenCalled();
    });
    and('нажимает выбрать тариф', async () => {
      await actions.changeSubscription({ id: 4 });
      expect(actions.changeSubscription).toHaveBeenCalled();
    });

    then('тариф меняется', () => {});
    and('показывается алерт', () => {
      const wrapper = shallowMount(Preloader, { localVue, store });
      expect(wrapper.exists()).toBe(true);
    });
    and(/^сообщение в алерте (.*)$/, arg0 => {});

    and('показывается модальное окно', () => {
      const wrapper = shallowMount(TheSubscriptionAndRatesModalPayment, { localVue });
      expect(wrapper.exists()).toBe(true);
    });
    and(/^сообщение в модальном окне (.*)$/, arg0 => {});
  });

  test('пользователь может оплатить подписку и недостаточно средств', ({ when, and, then }) => {
    when('пользователь имеет право на выбор тарифа', () => {});

    and('нажимает выбрать тариф', () => {});

    then('тариф не меняется', () => {});

    and('показывается алерт', () => {});

    and(/^сообщение в алерте (.*)$/, arg0 => {});

    and('показывается модальное окно', () => {});

    and(/^сообщение в модальном окне (.*)$/, arg0 => {});
  });

  test('пользователь может оплатить подписку и ошибка 401', ({ when, and, then }) => {
    when('пользователь имеет право на выбор тарифа', () => {});

    and('нажимает выбрать тариф', () => {});

    then('тариф не меняется', () => {});

    and('показывается алерт', () => {});

    and(/^сообщение в алерте (.*)$/, arg0 => {});

    and(/^производится переход на (.*)$/, arg0 => {});
  });

  test('пользователь может оплатить подписку и ошибка 500', ({ when, and, then }) => {
    when('пользователь имеет право на выбор тарифа', () => {});

    and('нажимает выбрать тариф', () => {});

    then('тариф не меняется', () => {});

    and('показывается алерт', () => {});

    and(/^сообщение в алерте (.*)$/, arg0 => {});

    and(/^производится переход на (.*)$/, arg0 => {});
  });
});
