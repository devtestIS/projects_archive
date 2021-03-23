import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import checkout from '../helpers/errorCheckout';
import {
  SET_CREATED,
  SET_CURRENT_RATE_METHODS,
  SET_CURRENT_RATE_NAME,
  SET_REQUESTS_LEFT,
  SET_DOCUMENTAION,
  SET_METHOD_DESCRIPTION,
  CHECKOUT_FAILURE,
  CHECKOUT_ERROR_STATUS,
} from '@/store/mutation-types';

const state = {
  created: '',
  currentRateMethods: [],
  currentRateName: '',
  requestsLeft: 0,
  documentation: [],
  description: [],
};
const getters = {};
const actions = {
  async getSubscription({ commit }) {
    try {
      const response = await http.get('/subscription/');
      const { created, current_rate, requests_left } = response.data;
      commit(SET_CREATED, created);
      commit(SET_REQUESTS_LEFT, requests_left);
      if (current_rate) {
        commit(SET_CURRENT_RATE_METHODS, current_rate.methods);
        commit(SET_CURRENT_RATE_NAME, current_rate.name);
      }
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
  async getDocumentation({ commit }) {
    try {
      const response = await http.get('/subscription/documentation/');
      const documentation = response.data;
      commit(SET_DOCUMENTAION, documentation);
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
  async getMethodDescription({ commit }, payload) {
    try {
      const response = await http.get(`/subscription/documentation/${payload}`);
      const documentation = response.data;
      commit(SET_METHOD_DESCRIPTION, documentation);
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
  [SET_CREATED](state, payload) {
    state.created = payload;
  },
  [SET_CURRENT_RATE_METHODS](state, payload) {
    state.currentRateMethods = payload;
  },
  [SET_CURRENT_RATE_NAME](state, payload) {
    state.currentRateName = payload;
  },
  [SET_REQUESTS_LEFT](state, payload) {
    state.requestsLeft = payload;
  },
  [SET_DOCUMENTAION](state, payload) {
    state.documentation = payload;
  },
  [SET_METHOD_DESCRIPTION](state, payload) {
    state.description = payload;
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
