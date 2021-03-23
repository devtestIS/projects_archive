import { SET_SHOW, SET_THEME, SET_TEXT, SET_ERRORS } from '@/store/mutation-types';

const state = function() {
  return {
    show: false,
    theme: '',
    text: '',
    errors: {},
  };
};

const getters = {};

const actions = {
  async closeAlert({ commit }, timeout) {
    await new Promise(resolve => {
      setTimeout(() => {
        commit(SET_SHOW, false);
        resolve();
      }, timeout);
    });
  },
};

const mutations = {
  [SET_SHOW](state, payload) {
    state.show = payload;
  },
  [SET_THEME](state, payload) {
    state.theme = payload;
  },
  [SET_TEXT](state, payload) {
    state.text = payload;
  },
  [SET_ERRORS](state, payload) {
    state.errors = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
