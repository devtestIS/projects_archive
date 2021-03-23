import { CHECKOUT_FAILURE, CHECKOUT_SUCCESS, CHECKOUT_ERROR_STATUS } from '@/store/mutation-types';

const check = pass => {
  let valid = '';
  if (pass) {
    valid = Array.isArray(pass) ? pass : [pass];
  }
  return valid;
};

const state = function() {
  return {
    error: [],
    success: '',
    errorStatus: '',
  };
};

const getters = {
  errorState: state => state.error,
  isValidBackend: state => state.error.length,
  validationOld: state => {
    return check(state.error.old_password);
  },
  validationNew: state => {
    return check(state.error.new_password);
  },
};

const actions = {};

const mutations = {
  [CHECKOUT_FAILURE](state, payload) {
    state.error = payload;
  },
  [CHECKOUT_SUCCESS](state, payload) {
    state.error = [];
    state.success = payload;
  },
  [CHECKOUT_ERROR_STATUS](state, payload) {
    state.errorStatus = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
