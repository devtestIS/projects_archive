import http from '@/store/helpers/http';
import { SET_TOKEN, SET_USER, REMOVE_TOKEN } from '@/store/mutation-types';

const state = {
  token: localStorage.getItem('user-token') || '',
  name: localStorage.getItem('user-name') || '',
};

const getters = {
  isAuth: state => !!state.token,
};

const actions = {};

const mutations = {
  [SET_TOKEN](state, payload) {
    const token = `Token ${payload}`;
    localStorage.setItem('user-token', token);
    http.defaults.headers['Authorization'] = token;
    state.token = payload ? token : '';
  },
  [REMOVE_TOKEN](state, payload) {
    localStorage.removeItem('user-token');
    delete http.defaults.headers['Authorization'];
    state.token = payload;
  },
  [SET_USER](state, payload) {
    localStorage.setItem('user-name', payload);
    state.name = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
