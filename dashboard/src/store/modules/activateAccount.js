import http from '@/store/helpers/http';
import router from '@/router';
import checkoutErrors from '@/store/modules/checkoutErrors';
import checkout from '@/store/helpers/errorCheckout';
import { SET_TOKEN, CHECKOUT_FAILURE, CHECKOUT_SUCCESS } from '@/store/mutation-types';

const state = {};

const getters = {};

const actions = {
  async activate({ commit, rootState }, payload) {
    const formData = new FormData();
    const { uid, token } = payload;
    formData.set('uid', uid);
    formData.set('token', token);
    try {
      const response = await http.post('/user/activate/', formData);
      const { auth_token } = response.data;

      commit(SET_TOKEN, auth_token, {
        root: true,
      });
      commit(`checkoutErrors/${CHECKOUT_SUCCESS}`, response.data.success);

      if (rootState.tokenHandling.token) {
        router.push('/user-profile');
      }
    } catch (error) {
      checkout(error.response.data, errors => {
        commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
      });
      console.error(error);
    }
  },
};

const mutations = {};

const modules = {
  checkoutErrors,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
