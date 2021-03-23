import http from '@/store/helpers/http';
import router from '@/router';
import checkoutErrors from '@/store/modules/checkoutErrors';
import { CHECKOUT_ERROR_STATUS, SET_TOKEN, CHECKOUT_FAILURE, REMOVE_TOKEN } from '@/store/mutation-types';
import checkout from '../helpers/errorCheckout';

const state = {};

const getters = {};

const actions = {
  async getToken({ commit, rootState }, user) {
    const { email, password } = user;
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);
    try {
      const response = await http.post('/user/login/', formData);
      const token = response.data.auth_token;

      commit(SET_TOKEN, token, {
        root: true,
      });

      if (rootState.tokenHandling.token) {
        router.push('/user-profile');
      }
    } catch (error) {
      if (error.response) {
        commit(`checkoutErrors/${CHECKOUT_ERROR_STATUS}`, error.response.status);
        checkout(error.response.data, errors => {
          commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
          commit(REMOVE_TOKEN, '', {
            root: true,
          });
        });
      }
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
