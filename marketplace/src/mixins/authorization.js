import {
  SET_PASSWORD,
  SET_PASSWORD_CONFIRM,
  SET_USER_EMAIL,
  SET_SELLER_ID
} from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required'],
      passwordRepeatRules: [v => !!v || 'Password repeat is required'],
      tokenRules: []
    }
  },
  computed: {
    ...mapState([
      'password',
      'password_confirm',
      'responseMessage',
      'seller_id',
      'email',
      'error'
    ]),
    passwordVal: {
      get() {
        return this.password
      },
      set(value) {
        this[SET_PASSWORD](value)
      }
    },
    passworConfirmdVal: {
      get() {
        return this.password_confirm
      },
      set(value) {
        this[SET_PASSWORD_CONFIRM](value)
      }
    },
    sellerIdVal: {
      get() {
        return this.seller_id
      },
      set(value) {
        this[SET_SELLER_ID](value)
      }
    },
    emailVal: {
      get() {
        return this.email
      },
      set(value) {
        this[SET_USER_EMAIL](value)
      }
    }
  },
  methods: {
    ...mapMutations([
      SET_PASSWORD,
      SET_PASSWORD_CONFIRM,
      SET_USER_EMAIL,
      SET_SELLER_ID
    ]),
    ...mapActions([
      'login',
      'registration',
      'restorePassword',
      'clearResponseMessage',
      'resetPassword'
    ])
  }
}
