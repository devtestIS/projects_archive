<template>
  <div class="mb-4">
    <div class="row page-header py-4 no-gutters">
      <div class="text-center text-sm-left mb-4 mb-sm-0 col-sm-4 col">
        <h3 class="page-title">Подписка и тарифы</h3>
      </div>
    </div>
    <!-- Card Header -->
    <d-row>
      <d-col lg="12">
        <TheSubscriptionAndRatesCard />
      </d-col>
    </d-row>
  </div>
</template>

<script>
import TheSubscriptionAndRatesCard from '@/components/TheSubscriptionAndRatesCard.vue';

export default {
  name: 'TheSubscriptionAndRates',
  components: {
    TheSubscriptionAndRatesCard,
  },
};
</script>

<style lang="scss" scoped>
.heading {
  padding: 0 1.875rem;
}
.link {
  display: block;
  margin: 15px 0;
  padding: 0 1.875rem;
}
.card-body {
  padding: 1.25rem;
}
</style>
