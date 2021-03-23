<template lang="html">
  <d-modal v-if="triggeredModal" :centered="true" @close="$emit('close')">
    <d-modal-header>
      <d-modal-title>Изменение тарифа</d-modal-title>
    </d-modal-header>
    <d-modal-body>
      <div v-if="payment.success" class="text">
        Тариф успешно изменен
      </div>
      <div v-else-if="!payment.success && payment.success !== null" class="text">
        {{ errorMessage }}
      </div>
      <div v-else-if="payment.success === null" class="text">
        Производится оплата
      </div>
    </d-modal-body>
  </d-modal>
</template>

<script>
export default {
  name: 'TheSubscriptionAndRatesModalPayment',
  props: {
    triggeredModal: Boolean,
    payment: {
      type: Object,
      default() {
        return {};
      },
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="css" scoped>
.text {
  text-align: center;
}
</style>
