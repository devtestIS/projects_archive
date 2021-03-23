<template>
  <div v-if="showTables">
    <div class="align-center d-flex justify-space-between mb-15 mt-10">
      <DashboardIntegrationStatus />
      <div class="tabs">
        <v-tabs
          v-model="tabs"
          background-color="rgba(255, 255, 255, 0)"
          color="#00FFFC"
          centered
        >
          <v-tab>
            Marktplatz Ansicht
          </v-tab>
          <v-tab>
            Artikel Ansicht
          </v-tab>
          <v-tab>
            Transaktionsbericht
          </v-tab>
        </v-tabs>
      </div>
      <DashboardCsvLink />
    </div>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <DashboardGraph />
        <TableYoyByMarketplace />
      </v-tab-item>
      <v-tab-item>
        <DashboardDetalization />
      </v-tab-item>
      <v-tab-item>
        <DashboardTransactionReport />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import DashboardGraph from '@/components/DashboardGraph'
import TableYoyByMarketplace from '@/components/TableYoyByMarketplace'
import DashboardTransactionReport from '@/components/DashboardTransactionReport'
import DashboardDetalization from '@/components/DashboardDetalization'
import DashboardIntegrationStatus from '@/components/DashboardIntegrationStatus'
import DashboardCsvLink from '@/components/DashboardCsvLink'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardTabs',
  components: {
    DashboardGraph,
    TableYoyByMarketplace,
    DashboardTransactionReport,
    DashboardDetalization,
    DashboardIntegrationStatus,
    DashboardCsvLink
  },
  data() {
    return {
      tabs: null
    }
  },
  computed: {
    ...mapGetters(['showTables'])
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  margin: 0 auto;
}
</style>
