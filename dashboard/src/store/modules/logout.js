import http from '@/store/helpers/http';
import router from '@/router';
import checkoutErrors from '@/store/modules/checkoutErrors';
import { REMOVE_TOKEN, CHECKOUT_FAILURE } from '@/store/mutation-types';
import checkout from '@/store/helpers/errorCheckout';

const state = {};

const getters = {};

const actions = {
  async logout({ commit, rootState }) {
    try {
      await http.get('/user/logout/');
      commit(REMOVE_TOKEN, '', {
        root: true,
      });

      if (!rootState.tokenHandling.token) {
        router.push('/login');
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
