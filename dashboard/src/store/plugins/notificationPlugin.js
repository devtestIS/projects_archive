import { CHECKOUT_FAILURE, CHECKOUT_SUCCESS, SET_SHOW, SET_THEME, SET_TEXT, SET_ERRORS } from '@/store/mutation-types';
export default store => {
  store.subscribe(mutation => {
    let payload;
    if (Array.isArray(mutation.payload)) {
      mutation.payload.forEach(element => {
        payload = Object.assign(
          {},
          {
            message: element.message,
          }
        );
      });
    } else {
      payload = mutation.payload;
    }
    const checkFail = payload && mutation.type.includes(CHECKOUT_FAILURE);
    const checkSuccess = mutation.type.includes(CHECKOUT_SUCCESS);
    if (checkFail) {
      store.commit(SET_SHOW, true);
      store.dispatch('closeAlert', 5000);
      store.commit(SET_THEME, 'danger');
      store.commit(SET_TEXT, '');
      store.commit(SET_ERRORS, payload);
    }

    if (checkSuccess) {
      store.commit(SET_SHOW, true);
      store.dispatch('closeAlert', 5000);
      store.commit(SET_THEME, 'success');
      store.commit(SET_TEXT, mutation.payload);
    }
  });
};
