import checkoutErrors from '@/store/modules/checkoutErrors';

const state = {};
const getters = {};
const actions = {};
const mutations = {};

const modules = {
  checkoutErrors,
};

const files = require.context('.', false, /\.js$/);
files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
