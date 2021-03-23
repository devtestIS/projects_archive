import axios from 'axios';

export default {
  async changePaymentDetails({ commit, state }, payload) {
    try {
      const formData = new FormData();

      formData.set('name', payload.name.replace(/\s+/g, ' '));
      formData.set('inn', payload.inn);
      formData.set('kpp', payload.kpp);
      formData.set('contact_name', payload.face.replace(/\s+/g, ' '));
      formData.set('phone', payload.phoneNumber);
      formData.set('delivery_address', payload.address);

      console.log(payload);

      axios
        .post('/requisites/save/', formData, {
          headers: {
            'content-type': 'application/json',
            Authorization: `${localStorage.getItem('user-token')}`,
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      throw Error('API Error occurred.');
    }
  },
};
