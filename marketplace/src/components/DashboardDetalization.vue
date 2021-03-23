<template>
  <v-row>
    <v-col cols="6">
      <h2 class="table-heading">TOP 5 ASINs</h2>
      <TableFlopTop :item-data="marketplaceIemTop" />
    </v-col>
    <v-col cols="6">
      <h2 class="table-heading">FLOP 5 ASINs</h2>
      <TableFlopTop :item-data="marketplaceIemFlop" />
    </v-col>
    <v-col cols="12" class="full-table">
      <span class="description"
        ><strong>YoY</strong> - Year over Year (Jahr über Jahr)</span
      >
      <TableYearOverYear :items-data="marketplaceIemData" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TableFlopTop from '@/components/TableFlopTop'
import TableYearOverYear from '@/components/TableYearOverYear'

export default {
  name: 'DashboardDetalization',
  components: {
    TableFlopTop,
    TableYearOverYear
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'marketplaceIemData',
      'marketplaceIemTop',
      'marketplaceIemFlop'
    ])
  }
}
</script>

<style lang="scss" scoped>
.full-table {
  margin-top: 70px;
}

.table-heading {
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;
  text-align: center;
}

.description {
  display: block;
  margin-bottom: 15px;
  font-size: 13px;
  line-height: 15px;
  color: #ffffff;
}
</style>
