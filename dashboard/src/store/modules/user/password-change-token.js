import http from '@/store/helpers/http';
import router from '@/router';
import checkout from '@/store/helpers/errorCheckout';

import { CHECKOUT_FAILURE, CHECKOUT_SUCCESS, CHECKOUT_ERROR_STATUS } from '@/store/mutation-types';

const state = {};
const getters = {};
const actions = {
  async resetPasswordByEmail({ commit, state }) {
    const formData = new FormData();
    const { uid, token } = router.currentRoute.query;
    formData.set('new_password', state.newPassword);
    formData.set('uid', uid);
    formData.set('token', token);
    try {
      const response = await http.post('/user/password-change-token/', formData);
      const { success } = response.data;
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
