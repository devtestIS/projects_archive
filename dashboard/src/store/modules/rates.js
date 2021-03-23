import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import checkout from '../helpers/errorCheckout';
import {
  CHECKOUT_FAILURE,
  CHECKOUT_SUCCESS,
  SET_RATES,
  SET_PAYMENT_SUCCESS,
  SET_SUBSCRIPTION_COLUMNS,
  SET_APIECE_COLUMNS,
  SET_OPTIONS_HEADINGS,
  SET_ACTIVE_SUBSCRIPTION,
  CHECKOUT_ERROR_STATUS,
} from '@/store/mutation-types';

const state = {
  rates: [],
  payment: {
    success: null,
  },
  subscription: {
    columns: [],
    tableData: [],
  },
  apiece: {
    columns: [],
    tableData: [],
  },
  options: {
    headings: {},
    editableColumns: [],
    sortable: [],
    filterable: [],
  },
  activeSubscription: '',
};
const getters = {
  rateNotSelect: state => {
    return Object.keys(state.rates).every(element => !state.rates[element].is_selected);
  },
};
const actions = {
  async setColumns({ commit }, rates) {
    let subscription_columns = ['column_name'];
    let apiece_columns = ['column_name'];
    let headings = {
      column_name: '',
    };
    let active_rate = '';
    for (let element in rates) {
      let textWithoutBrackets = rates[element].name.replace(/ *\([^)]*\) */g, '');
      let heading = textWithoutBrackets.split(' ').join('');

      if (rates[element].is_selected === true) {
        active_rate = rates[element].pay_type;
      }

      if (rates[element].pay_type === 'subscription') {
        subscription_columns.push(heading);
      } else {
        apiece_columns.push(heading);
      }
      headings[heading] = textWithoutBrackets;
    }
    commit(SET_SUBSCRIPTION_COLUMNS, subscription_columns);
    commit(SET_APIECE_COLUMNS, apiece_columns);
    commit(SET_OPTIONS_HEADINGS, headings);
    commit(SET_ACTIVE_SUBSCRIPTION, active_rate);
  },
  async getRates({ commit, dispatch }) {
    try {
      const response = await http.get('/rates/');
      const rates = response.data;
      commit(SET_RATES, rates);
      dispatch('setColumns', rates);
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
  async changeSubscription({ commit, dispatch }, payload) {
    // перенести в subscription модуль
    try {
      const formData = new FormData();
      formData.set('new_rate_id', payload.id);
      const response = await http.post('/subscription/change/', formData);
      const { success } = response.data;
      commit(SET_PAYMENT_SUCCESS, true);
      dispatch('getRates');
      commit(`checkoutErrors/${CHECKOUT_SUCCESS}`, success);
    } catch (error) {
      if (error.response) {
        commit(`checkoutErrors/${CHECKOUT_ERROR_STATUS}`, error.response.status);
        checkout(error.response.data, errors => {
          commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
        });
      }
      commit(SET_PAYMENT_SUCCESS, false);
      console.error(error);
    }
  },
};
const mutations = {
  [SET_RATES](state, payload) {
    state.rates = payload;
  },
  [SET_PAYMENT_SUCCESS](state, payload) {
    state.payment.success = payload;
  },
  [SET_SUBSCRIPTION_COLUMNS](state, payload) {
    state.subscription.columns = payload;
  },
  [SET_APIECE_COLUMNS](state, payload) {
    state.apiece.columns = payload;
  },
  [SET_OPTIONS_HEADINGS](state, payload) {
    state.options.headings = payload;
  },
  [SET_ACTIVE_SUBSCRIPTION](state, payload) {
    state.activeSubscription = payload;
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
