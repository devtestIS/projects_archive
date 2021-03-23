<template>
  <d-card class="mb-3">
    <d-card-body title="Информация о подписке">
      <TheSubscriptionAndRatesClientTable
        :rates="rates"
        :payment="payment"
        :subscription="subscription"
        :apiece="apiece"
        :options="options"
        :active-subscription="activeSubscription"
      />
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TheSubscriptionAndRatesClientTable from '@/components/TheSubscriptionAndRatesClientTable.vue';

export default {
  name: 'TheSubscriptionAndRatesCard',
  components: {
    TheSubscriptionAndRatesClientTable,
  },
  computed: {
    ...mapState('rates', ['rates', 'payment', 'subscription', 'apiece', 'options', 'activeSubscription']),
  },
  created() {
    this.$preload('getRates');
  },
  methods: {
    ...mapActions('rates', ['getRates']),
  },
};
</script>

<style lang="css" scoped></style>
