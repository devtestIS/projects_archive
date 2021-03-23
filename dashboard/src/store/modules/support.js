import http from '@/store/helpers/http';
import checkoutErrors from '@/store/modules/checkoutErrors';
import checkout from '../helpers/errorCheckout';
import {
  SET_SHOW_MODAL,
  CHECKOUT_ERROR_STATUS,
  CHECKOUT_FAILURE,
  SET_SUPPORT_REQUEST_TEXT,
  SET_STATE_OF_SEND_BUTTON_WITHOUT_FILES,
  SET_STATE_OF_SENDING_REQUEST,
  SET_SUPPORT_REQUEST_PROGRESS,
} from '@/store/mutation-types';

const state = {
  showModal: false,
  supportRequestText: '',
  stateOfSendingRequestWithoutFile: {
    isTheSendButtonWithoutFilesClicked: false,
    isSendedRequest: null,
    myProgressWithoutFile: 0,
  },
};

const getters = {};
const actions = {
  handleClick({ commit }) {
    commit(SET_SHOW_MODAL, true);
  },
  handleClose({ commit, dispatch }) {
    commit(SET_SHOW_MODAL, false);
    dispatch('refreshStatesAfterCloseModal');
  },
  triggerSendButton({ commit }) {
    commit(SET_STATE_OF_SEND_BUTTON_WITHOUT_FILES, true);
  },
  async triggerSendWithoutFiles({ commit, state, dispatch }, payload) {
    try {
      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          commit(SET_SUPPORT_REQUEST_PROGRESS, percentCompleted);
        },
      };
      const formData = new FormData();
      formData.set('title', payload.title);
      formData.set('description', payload.description);
      const response = await http.post('/support/create/', formData, config);
      commit(SET_STATE_OF_SENDING_REQUEST, true);
      commit(SET_SUPPORT_REQUEST_TEXT, response.data.success);
    } catch (error) {
      commit(SET_STATE_OF_SENDING_REQUEST, false);
      commit(`checkoutErrors/${CHECKOUT_ERROR_STATUS}`, error.response.status);
      checkout(error.response.data, errors => {
        commit(`checkoutErrors/${CHECKOUT_FAILURE}`, errors);
      });
      dispatch('handleClose');
      console.error(error);
    }
  },
  refreshStatesAfterCloseModal({ commit }) {
    commit(SET_SUPPORT_REQUEST_TEXT, '');
    commit(SET_STATE_OF_SEND_BUTTON_WITHOUT_FILES, false);
    commit(SET_STATE_OF_SENDING_REQUEST, null);
    commit(SET_SUPPORT_REQUEST_PROGRESS, 0);
  },
};

const mutations = {
  [SET_SUPPORT_REQUEST_TEXT](state, payload) {
    state.supportRequestText = payload;
  },
  [SET_STATE_OF_SENDING_REQUEST](state, payload) {
    state.stateOfSendingRequestWithoutFile.isSendedRequest = payload;
  },
  [SET_SUPPORT_REQUEST_PROGRESS](state, payload) {
    state.stateOfSendingRequestWithoutFile.myProgressWithoutFile = payload;
  },
  [SET_STATE_OF_SEND_BUTTON_WITHOUT_FILES](state, payload) {
    state.stateOfSendingRequestWithoutFile.isTheSendButtonWithoutFilesClicked = payload;
  },
  [SET_SHOW_MODAL](state, payload) {
    state.showModal = payload;
  },
};
const modules = {
  checkoutErrors,
};

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations,
  modules,
};
