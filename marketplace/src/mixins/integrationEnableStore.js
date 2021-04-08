import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['auth_token']),
    authTokendVal: {
      get() {
        return this.auth_token
      },
      set(value) {
        this.setAuthToken(value)
      }
    }
  },
  methods: {
    ...mapActions(['setUser', 'enableIntegration', 'setAuthToken'])
  }
}
