<template>
  <v-row align="center" justify="center" class="dashboard">
    <v-col cols="6">
      <h1 class="mb-10 text-center text-h1">Filter</h1>
      <DashboardFilter />
    </v-col>
  </v-row>
</template>

<script>
import DashboardFilter from '@/components/DashboardFilter'
import getUserData from '@/mixins/getUserData'

export default {
  name: 'Dashboard',
  components: {
    DashboardFilter
  },
  mixins: [getUserData]
}
</script>

<style lang="scss" scoped>
.dashboard {
  margin-top: 150px;
}
</style>
