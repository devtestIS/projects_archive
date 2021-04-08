<template>
  <v-overlay :value="loading">
    <v-progress-circular
      indeterminate
      color="primary"
      size="30"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TheSpinner',
  data() {
    return {
      overlay: true
    }
  },
  computed: {
    ...mapState(['loadingState']),
    loading: {
      get() {
        return this.loadingState
      },
      set(value) {
        this.setLoadingState(value)
      }
    }
  },
  methods: {
    ...mapActions(['setLoadingState'])
  }
}
</script>

<style lang="scss" scoped></style>
