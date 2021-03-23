import http from '@/store/helpers/http';
import checkout from '@/store/helpers/errorCheckout';

import {
  SET_USER,
  SET_USER_NAME,
  SET_USER_EMAIL,
  CHECKOUT_FAILURE,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR_STATUS,
} from '@/store/mutation-types';

const state = {
  fullName: '',
  email: '',
};
const getters = {};
const actions = {
  async editUser({ commit }, user) {
    const formData = new FormData();
    const { name, email } = user;
    formData.set('full_name', name);
    formData.set('email', email);
    try {
      const response = await http.post('/user/edit/', formData);
      const { success } = response.data;
      commit(SET_USER, name, {
        root: true,
      });
      commit(SET_USER_NAME, name);
      commit(SET_USER_EMAIL, email);
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
  [SET_USER_NAME](state, payload) {
    state.fullName = payload;
  },
  [SET_USER_EMAIL](state, payload) {
    state.email = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
