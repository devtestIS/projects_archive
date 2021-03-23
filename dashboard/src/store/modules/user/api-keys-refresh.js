import http from '@/store/helpers/http';
import checkout from '@/store/helpers/errorCheckout';

import {
  SET_USER_API_KEY,
  SET_USER_SECRET_KEY,
  CHECKOUT_FAILURE,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR_STATUS,
} from '@/store/mutation-types';

const state = {
  apiKey: '',
  secretKey: '',
};
const getters = {};
const actions = {
  async refreshKeys({ commit }) {
    try {
      const response = await http.get('/user/api-keys-refresh/');
      const { api_key, secret_key, success } = response.data;
      commit(SET_USER_API_KEY, api_key);
      commit(SET_USER_SECRET_KEY, secret_key);
      commit(`checkoutErrors/${CHECKOUT_SUCCESS}`, success);
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
  [SET_USER_API_KEY](state, payload) {
    state.apiKey = payload;
  },
  [SET_USER_SECRET_KEY](state, payload) {
    state.secretKey = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
