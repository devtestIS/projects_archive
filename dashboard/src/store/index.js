import Vue from 'vue';
import Vuex from 'vuex';
import tokenHandling from '@/store/modules/tokenHandling';
import auth from '@/store/modules/auth';
import register from '@/store/modules/register';
import activateAccount from '@/store/modules/activateAccount';
import user from '@/store/modules/user/index';
import rates from '@/store/modules/rates';
import subscription from '@/store/modules/subscription';
import logout from '@/store/modules/logout';
import userPaymentDetails from '@/store/modules/userPaymentDetails';
import invoice from '@/store/modules/invoice';
import notification from '@/store/modules/notification';
import preloader from '@/store/modules/preloader';
import support from '@/store/modules/support';
import checkoutErrors from '@/store/modules/checkoutErrors';
import notificationPlugin from '@/store/plugins/notificationPlugin';
import preloaderPlugin from '@/store/plugins/preloaderPlugin';
import catchErrorPlugin from '@/store/plugins/catchErrorPlugin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    tokenHandling,
    auth,
    register,
    activateAccount,
    user,
    rates,
    subscription,
    logout,
    userPaymentDetails,
    invoice,
    notification,
    support,
    preloader,
    checkoutErrors,
  },
  plugins: [notificationPlugin, preloaderPlugin, catchErrorPlugin],
});
