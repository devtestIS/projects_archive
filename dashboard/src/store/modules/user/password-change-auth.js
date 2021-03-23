import http from '@/store/helpers/http';
import checkout from '@/store/helpers/errorCheckout';

import { SET_TOKEN, CHECKOUT_FAILURE, CHECKOUT_SUCCESS, CHECKOUT_ERROR_STATUS } from '@/store/mutation-types';

const state = {};
const getters = {};
const actions = {
  async changePassword({ commit }, passwords) {
    const formData = new FormData();
    const [old_password, new_password] = passwords;
    formData.set('old_password', old_password);
    formData.set('new_password', new_password);
    try {
      const response = await http.post('/user/password-change-auth/', formData);
      const token = response.data.auth_token;
      const { success } = response.data;

      commit(SET_TOKEN, token, {
        root: true,
      });
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
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
