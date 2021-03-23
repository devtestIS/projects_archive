import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER_EMAIL,
  SET_USER_IMAGE,
  SET_USER_CREATED_AT,
  SET_PASSWORD,
  SET_PASSWORD_CONFIRM,
  SET_SELLER_ID,
  SET_AUTH_TOKEN,
  SET_RESPONSE_MESSAGE,
  SET_ERROR,
  SET_INTEGRATION,
  SET_DATES,
  SET_MARKETPLACE_DATA,
  SET_MARKETPLACE,
  SET_TRANSACTIONS,
  SET_MARKETPLACE_ITEM_DATA,
  SET_MARKETPLACE_TABLE_DATA,
  SET_LAST_UPDATED_AT
} from '@/store/mutation-types'
import http from '@/store/helpers/http'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    seller_id: '',
    auth_token: '',
    email: '',
    password: '',
    password_confirm: '',
    image: '',
    createdAt: '',
    lastUpdatedAt: '',
    responseMessage: '',
    error: false,
    integrationKey: '',
    dates: [],
    marketplaceData: [
      { value: '', text: 'Alle' },
      { value: 'amazon.de', text: 'Germany' },
      { value: 'amazon.fr', text: 'France' },
      { value: 'amazon.it', text: 'Italy' }
    ],
    marketplace: '',
    transactions: [],
    marketplaceIemData: [],
    marketplaceTableData: []
  },
  getters: {
    login: state => {
      return {
        email: state.email,
        password: state.password
      }
    },
    register: state => {
      return {
        email: state.email,
        password: state.password,
        password_confirm: state.password_confirm
      }
    },
    seller: state => {
      return {
        seller_id: state.seller_id,
        auth_token: state.auth_token
      }
    },
    loggedIn: state => !!state.email,
    email: state => ({
      email: state.email
    }),
    integration: state => !!state.integrationKey,
    sortedDates: state => [...state.dates].sort(),
    dateRangeText: (state, getters) =>
      getters.sortedDates
        .map(item => moment(item).format('MMMM YYYY'))
        .join(' - '),
    filterData: (state, getters) => ({
      from: moment(getters.sortedDates[0]).format('YYYY-MM-DD'),
      to: moment(getters.sortedDates[1]).format('YYYY-MM-DD'),
      marketplace: state.marketplace
    }),
    transactions: state => state.transactions.flat(),
    marketplaceIemData: state => state.marketplaceIemData.flat(),
    marketplaceIemTop: getters => getters.marketplaceIemData.slice(1, 6),
    marketplaceIemFlop: getters =>
      getters.marketplaceIemData.slice(-5).reverse(),
    marketplaceHeaders: state => {
      const codes = state.marketplaceTableData.flatMap(item =>
        item.data.map(val => val.code)
      )

      return [...new Set(codes)]
    },
    showTables: state =>
      state.transactions.length ||
      state.marketplaceIemData.length ||
      state.marketplaceTableData.length,
    lastUpdatedAt: state => moment(state.lastUpdatedAt).format('MMM Do YYYY'),
    series: state => {
      return state.marketplaceTableData.map(item => {
        const name = item.marketplace
        const data = item.data.map(val => ({
          x: moment(val.code).format('MMM YYYY'),
          y: val.total
        }))

        return {
          name,
          data
        }
      })
    }
  },
  mutations: {
    [SET_TOKEN](state, payload) {
      const token = payload
      localStorage.setItem('user-token', token)
      http.defaults.headers['Authorization'] = token
      state.token = payload ? token : ''
    },
    [REMOVE_TOKEN](state, payload) {
      localStorage.removeItem('user-token')
      delete http.defaults.headers['Authorization']
      state.token = payload
    },
    [SET_USER_EMAIL](state, payload) {
      state.email = payload
    },
    [SET_USER_IMAGE](state, payload) {
      state.image = payload
    },
    [SET_USER_CREATED_AT](state, payload) {
      state.createdAt = payload
    },
    [SET_PASSWORD](state, payload) {
      state.password = payload
    },
    [SET_PASSWORD_CONFIRM](state, payload) {
      state.password_confirm = payload
    },
    [SET_SELLER_ID](state, payload) {
      state.seller_id = payload
    },
    [SET_AUTH_TOKEN](state, payload) {
      state.auth_token = payload
    },
    [SET_RESPONSE_MESSAGE](state, payload) {
      state.responseMessage = payload
    },
    [SET_ERROR](state, payload) {
      state.error = payload
    },
    [SET_INTEGRATION](state, payload) {
      state.integrationKey = payload
    },
    [SET_DATES](state, payload) {
      state.dates = payload
    },
    [SET_MARKETPLACE_DATA](state, payload) {
      state.marketplaceData = payload
    },
    [SET_MARKETPLACE](state, payload) {
      state.marketplace = payload
    },
    [SET_TRANSACTIONS](state, payload) {
      state.transactions = payload
    },
    [SET_MARKETPLACE_ITEM_DATA](state, payload) {
      state.marketplaceIemData = payload
    },
    [SET_MARKETPLACE_TABLE_DATA](state, payload) {
      state.marketplaceTableData = payload
    },
    [SET_LAST_UPDATED_AT](state, payload) {
      state.lastUpdatedAt = payload
    }
  },
  actions: {
    async login({ commit, dispatch, getters }) {
      try {
        const { login } = getters
        const response = await http.post('/auth/login', login)
        const { token } = response.data
        if (token) {
          commit(SET_TOKEN, token)
          await dispatch('getUser')
          router.push('/')
        }
      } catch (error) {
        commit(REMOVE_TOKEN, '')
        console.error(error)
      }
    },
    async registration({ commit, dispatch, getters, state }) {
      try {
        const { register } = getters
        const response = await http.post('/auth/register', register)
        const { token } = response.data
        commit(SET_TOKEN, token)

        if (state.seller_id) {
          await dispatch('setUser')
        }
        router.push('/auth/register-end')
      } catch (error) {
        if (error.response) {
          commit(REMOVE_TOKEN, '')
          console.error(error)
        }
      }
    },
    async getUser({ commit, dispatch }) {
      try {
        const response = await http.get('/a/profile/')
        const {
          email,
          amzn_credentials,
          image_url,
          created_at,
          last_updated_at
        } = response.data
        const { auth_token, seller_id } = amzn_credentials
        commit(SET_USER_EMAIL, email)
        commit(SET_SELLER_ID, seller_id)
        commit(SET_AUTH_TOKEN, auth_token)
        commit(SET_USER_IMAGE, image_url)
        commit(SET_USER_CREATED_AT, created_at)
        commit(SET_INTEGRATION, auth_token)
        commit(SET_LAST_UPDATED_AT, last_updated_at)
      } catch (error) {
        dispatch('errorHandle', error)
        console.error(error)
      }
    },
    async setUser({ dispatch, getters }) {
      const { seller } = getters
      try {
        await http.post('/a/profile/', seller)
        await dispatch('getUser')
      } catch (error) {
        dispatch('errorHandle', error)
        console.error(error)
      }
    },
    async enableIntegration({ dispatch }) {
      try {
        await dispatch('setUser')
        router.go(-1)
      } catch (error) {
        console.error(error)
      }
    },
    async logout({ commit }) {
      commit(REMOVE_TOKEN, '')
      commit(SET_USER_EMAIL, '')
      commit(SET_SELLER_ID, '')
      commit(SET_AUTH_TOKEN, '')
      commit(SET_USER_IMAGE, '')
      commit(SET_USER_CREATED_AT, '')
      router.push('/auth/login')
    },
    errorHandle({ dispatch }, error) {
      const { response: { status } = {} } = error
      if (status === 401) {
        dispatch('logout')
      }
    },
    async restorePassword({ dispatch, getters }) {
      try {
        const { email } = getters
        const response = await http.post('/auth/forgot-password', email)
        const {
          data: { message: text }
        } = response
        dispatch('responseMessage', {
          text
        })
      } catch (error) {
        const { response: { data: { error: text } } = {} } = error
        dispatch('responseMessage', {
          text,
          error: true
        })
        console.error(error)
      }
    },
    async resetPassword({ dispatch, state }, hash) {
      try {
        const { password, password_confirm } = state
        const response = await http.post('/auth/reset-password', {
          password,
          password_confirm,
          hash
        })
        const {
          data: { message: text }
        } = response
        dispatch('responseMessage', {
          text
        })
      } catch (error) {
        const { response: { data: { error: text } } = {} } = error
        dispatch('responseMessage', {
          text,
          error: true
        })
        console.error(error)
      }
    },
    responseMessage({ commit }, message) {
      const { text, error = false } = message
      commit(SET_RESPONSE_MESSAGE, text)
      commit(SET_ERROR, error)
    },
    clearResponseMessage({ commit }) {
      commit(SET_RESPONSE_MESSAGE, '')
      router.push('/auth/login')
    },
    async getTransactions({ commit, getters }) {
      const { from, to, marketplace } = getters.filterData
      const response = await http.get(
        `/a/transactions/?from=${from}${to ? '&to=' + to : ''}${
          marketplace ? '&marketplace=' + marketplace : ''
        }`
      )
      const {
        data: {
          data: transactions,
          item_data: marketplaceIemData,
          marketplace_data: marketplaceTableData
        }
      } = response

      commit(SET_TRANSACTIONS, transactions)
      commit(SET_MARKETPLACE_ITEM_DATA, marketplaceIemData)
      commit(SET_MARKETPLACE_TABLE_DATA, marketplaceTableData)
    },
    async csvExport({ getters }) {
      const { from, to, marketplace } = getters.filterData
      await http.get(
        `/a/transactions/export?from=${from}${to ? '&to=' + to : ''}${
          marketplace ? '&marketplace=' + marketplace : ''
        }`
      )
    }
  },
  modules: {}
})
