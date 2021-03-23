import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import checkout from '../helpers/errorCheckout';
import { CHECKOUT_FAILURE, CHECKOUT_SUCCESS, SET_USER_REQUISITES, CHECKOUT_ERROR_STATUS } from '@/store/mutation-types';

const state = {
  requisites: {
    name: '',
    inn: '',
    kpp: '',
    contact_name: '',
    phone: '',
    delivery_address: '',
  },
};

const getters = {};

const actions = {
  async getRequisites({ commit }) {
    try {
      const response = await http.get('http://193.164.149.188:8000/requisites/');
      const requisites = response.data;
      commit(SET_USER_REQUISITES, requisites);
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
  async changePaymentDetails({ commit }, payload) {
    const { name, inn, kpp, contact_name, phone, delivery_address } = payload;
    const formData = new FormData();
    formData.set('name', name.replace(/\s+/g, ' '));
    formData.set('inn', inn);
    formData.set('kpp', kpp);
    formData.set('contact_name', contact_name.replace(/\s+/g, ' '));
    formData.set('phone', phone);
    formData.set('delivery_address', delivery_address);
    try {
      const response = await http.post('/requisites/save/', formData);
      const { success } = response.data;
      commit(SET_USER_REQUISITES, payload);
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
  [SET_USER_REQUISITES](state, payload) {
    state.requisites = payload;
  },
};

const modules = {
  checkoutErrors,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules,
};
