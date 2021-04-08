<template>
  <v-row align="center" justify="center">
    <v-col cols="12"> <DashboardTabs /> </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import DashboardTabs from '@/components/DashboardTabs'

export default {
  name: 'Dashboard',
  components: {
    DashboardTabs
  },
  methods: {
    ...mapActions(['clearData'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.clearData())
  }
}
</script>

<style lang="scss" scoped></style>
