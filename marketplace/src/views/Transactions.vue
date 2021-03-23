<template>
  <v-row align="center" justify="center">
    <v-col cols="12"> <DashboardTabs /> </v-col>
  </v-row>
</template>

<script>
import DashboardTabs from '@/components/DashboardTabs'

export default {
  name: 'Dashboard',
  components: {
    DashboardTabs
  }
}
</script>

<style lang="scss" scoped></style>
