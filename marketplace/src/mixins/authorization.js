import { mapState, mapActions } from 'vuex'

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
        this.setPassword(value)
      }
    },
    passworConfirmdVal: {
      get() {
        return this.password_confirm
      },
      set(value) {
        this.setPasswordConfirm(value)
      }
    },
    sellerIdVal: {
      get() {
        return this.seller_id
      },
      set(value) {
        this.setSellerId(value)
      }
    },
    emailVal: {
      get() {
        return this.email
      },
      set(value) {
        this.setUserEmail(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'registration',
      'restorePassword',
      'clearResponseMessage',
      'resetPassword',
      'setPassword',
      'setPasswordConfirm',
      'setUserEmail',
      'setSellerId'
    ])
  }
}
