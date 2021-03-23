<template>
  <Apexchart
    id="chart"
    type="line"
    height="500"
    :options="chartOptions"
    :series="series"
    class="chart"
  ></Apexchart>
</template>

<script>
import { mapGetters } from 'vuex'
import chartOptions from '@/helpers/chartOptions'

export default {
  name: 'DashboardSheet',
  components: {},
  data() {
    return {
      chartOptions: chartOptions
    }
  },
  computed: {
    ...mapGetters(['series'])
  }
}
</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 60px;
  padding: 0 51px;
  background: #1c2651;
}
</style>
