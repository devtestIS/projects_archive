<template>
  <d-container fluid class="main-content-container px-4">
    <div class="mb-4">
      <div class="row page-header py-4 no-gutters">
        <div class="text-center text-sm-left mb-4 mb-sm-0 col-sm-4 col">
          <h3 class="page-title">Реквизиты для акта</h3>
        </div>
      </div>
      <d-row>
        <d-col lg="12">
          <TheUserPaymentCard />
        </d-col>
      </d-row>
    </div>
  </d-container>
</template>

<script>
import TheUserPaymentCard from '@/components/TheUserPaymentCard.vue';

export default {
  components: {
    TheUserPaymentCard,
  },
};
</script>
