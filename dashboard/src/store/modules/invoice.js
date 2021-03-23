import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import { SET_PAYMENT_LINK, SET_INVOICE_LINK, CHECKOUT_FAILURE, CHECKOUT_SUCCESS } from '@/store/mutation-types';

const state = {
  link: '',
  invoiceLink: '',
};

const getters = {};

const actions = {
  async getPaymentLink({ commit, state }, payload) {
    const formData = new FormData();
    formData.set('amount', payload);
    try {
      const response = await http.post('/payment-link-checkout/', formData);
      const { pay_link, success } = response.data;
      commit(SET_PAYMENT_LINK, pay_link);
      commit(`checkoutErrors/${CHECKOUT_SUCCESS}`, success);
      if (state.link) {
        window.open(state.link, '_blank');
      }
    } catch (error) {
      if (error.response) {
        checkout(error.response.data, errors => {
          commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
        });
      }
      console.error(error);
    }
  },
  async getInvoiceLink({ commit, state }, payload) {
    const formData = new FormData();
    formData.set('amount', payload);
    try {
      const response = await http.post('/payment-link-invoice/', formData);
      const { invoice_link, success } = response.data;
      commit(SET_INVOICE_LINK, invoice_link);
      commit(`checkoutErrors/${CHECKOUT_SUCCESS}`, success);
      if (state.invoiceLink) {
        window.open(state.invoiceLink, '_blank');
      }
    } catch (error) {
      if (error.response) {
        checkout(error.response.data, errors => {
          commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
        });
      }
      console.error(error);
    }
  },
};

const mutations = {
  [SET_PAYMENT_LINK](state, payload) {
    state.link = payload;
  },
  [SET_INVOICE_LINK](state, payload) {
    state.invoiceLink = payload;
  },
};

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
