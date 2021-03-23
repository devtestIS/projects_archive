import { CHECKOUT_ERROR_STATUS, REMOVE_TOKEN, SET_USER } from '@/store/mutation-types';
import router from '@/router';
export default store => {
  store.subscribe(mutation => {
    const checkFail = mutation.type.includes(CHECKOUT_ERROR_STATUS);
    if (checkFail && mutation.payload === 401 && router.currentRoute.path !== '/login') {
      store.commit(REMOVE_TOKEN, '');
      store.commit(SET_USER, '');
      router.push('/login');
    }

    if (checkFail && mutation.payload === 500 && router.currentRoute.path !== '/errors') {
      router.push('/errors');
    }
  });
};
