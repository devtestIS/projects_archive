import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import { CHECKOUT_FAILURE, CHECKOUT_SUCCESS, CHECKOUT_ERROR_STATUS } from '@/store/mutation-types';
import checkout from '@/store/helpers/errorCheckout';

const state = {
  activate_text: null,
};

const getters = {};

const actions = {
  async registration({ commit }, user) {
    const { name, email, password, inn } = user;
    const formData = new FormData();
    formData.set('full_name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('inn', inn);
    try {
      const response = await http.post('/user/registration/', formData);
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
