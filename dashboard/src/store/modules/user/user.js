import http from '@/store/helpers/http';
import checkout from '@/store/helpers/errorCheckout';

import {
  SET_USER,
  SET_USER_NAME,
  SET_USER_EMAIL,
  SET_USER_BALANCE,
  SET_USER_API_KEY,
  SET_USER_SECRET_KEY,
  SET_USER_RATE_NAME,
  SET_USER_RATE_LIMIT,
  CHECKOUT_FAILURE,
  SET_LEGAL,
  CHECKOUT_ERROR_STATUS,
} from '@/store/mutation-types';

const state = {
  fullName: '',
  email: '',
  balance: '',
  apiKey: '',
  secretKey: '',
  rateName: '',
  rateLimit: 0,
  legal: {},
};
const getters = {
  inn: state => (state.legal ? state.legal.inn : ''),
  founder_fio: state => (state.legal ? state.legal.founder_fio : ''),
  kpp: state => (state.legal ? state.legal.kpp : ''),
  ogrn: state => (state.legal ? state.legal.ogrn : ''),
  registration_date: state => (state.legal ? state.legal.registration_date : ''),
  registration_address: state => (state.legal ? state.legal.registration_address : ''),
  uface: state => state.legal,
};
const actions = {
  async getUser({ commit }) {
    try {
      const response = await http.get('/user/');
      const { full_name, email, balance, api_key, secret_key, rate, legal } = response.data;
      commit(SET_USER, full_name, {
        root: true,
      });
      commit(SET_USER_NAME, full_name);
      commit(SET_USER_EMAIL, email);
      commit(SET_USER_BALANCE, balance);
      commit(SET_USER_API_KEY, api_key);
      commit(SET_USER_SECRET_KEY, secret_key);
      commit(SET_LEGAL, legal);
      if (rate) {
        commit(SET_USER_RATE_NAME, rate.name);
        commit(SET_USER_RATE_LIMIT, rate.limit);
      }
    } catch (error) {
      if (error.response) {
        commit(`checkoutErrors/${CHECKOUT_ERROR_STATUS}`, error.response.status);
        checkout(error.response.data, errors => {
          commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
        });
      }
      console.error(error);
    }
  },
};
const mutations = {
  [SET_USER_NAME](state, payload) {
    state.fullName = payload;
  },
  [SET_USER_EMAIL](state, payload) {
    state.email = payload;
  },
  [SET_USER_BALANCE](state, payload) {
    state.balance = payload;
  },
  [SET_USER_API_KEY](state, payload) {
    state.apiKey = payload;
  },
  [SET_USER_SECRET_KEY](state, payload) {
    state.secretKey = payload;
  },
  [SET_LEGAL](state, payload) {
    state.legal = payload;
  },
  [SET_USER_RATE_NAME](state, payload) {
    state.rateName = payload;
  },
  [SET_USER_RATE_LIMIT](state, payload) {
    state.rateLimit = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
