import { SET_PRELOADERS } from '@/store/mutation-types';

const state = function() {
  return {
    preloaders: [],
    action: '',
    context: {},
  };
};

const getters = {};

const actions = {
  async preloader({ commit }, payload) {
    const [action, context] = payload;
    commit(SET_PRELOADERS, {
      action,
      context,
    });
  },
};

const mutations = {
  [SET_PRELOADERS](state, payload) {
    const index = state.preloaders.findIndex(item => item.action === payload.action);
    const check = index >= 0;
    if (check) {
      state.preloaders.splice(index, 1);
    }
    state.preloaders = [...state.preloaders, payload];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
