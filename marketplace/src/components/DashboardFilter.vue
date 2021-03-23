<template>
  <v-form v-model="valid" @submit.prevent="getTransactions">
    <v-row>
      <v-col lg="6">
        <DashboardFilterMarketplace :rules="marketplaceRules" />
      </v-col>
      <v-col lg="6">
        <DashboardFilterDateRange :rules="dataRangeRules" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <BaseButton :valid="valid" type="submit">Weiter</BaseButton>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import DashboardFilterMarketplace from '@/components/DashboardFilterMarketplace'
import DashboardFilterDateRange from '@/components/DashboardFilterDateRange'
import validationButton from '@/mixins/validationButton'
import { mapActions } from 'vuex'

export default {
  name: 'DashboardFilter',
  components: {
    DashboardFilterMarketplace,
    DashboardFilterDateRange
  },
  mixins: [validationButton],
  data() {
    return {
      marketplaceRules: [],
      dataRangeRules: [v => !!v || 'Is required']
    }
  },
  methods: {
    ...mapActions(['getTransactions'])
  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 80%;
}
</style>
