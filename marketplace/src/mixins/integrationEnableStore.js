import { SET_AUTH_TOKEN } from '@/store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['auth_token']),
    authTokendVal: {
      get() {
        return this.auth_token
      },
      set(value) {
        this[SET_AUTH_TOKEN](value)
      }
    }
  },
  methods: {
    ...mapMutations([SET_AUTH_TOKEN]),
    ...mapActions(['setUser', 'enableIntegration'])
  }
}
