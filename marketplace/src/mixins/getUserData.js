import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    ...mapActions(['getUser'])
  },
  beforeRouteEnter(to, from, next) {
    if (!to.matched.some(record => record.meta.isPublic)) {
      next(async vm => {
        if (!vm.loggedIn) {
          await vm.getUser()
        }
      })
    }
  }
}
