<template>
  <div>
    <d-modal-header :close="false">
      <d-modal-title> {{ uface ? 'Выставить счет' : 'Пополнить счет' }}</d-modal-title>
      <button aria-label="Close" class="close" @click.prevent="$emit('close-modal')">
        ×
      </button>
    </d-modal-header>
    <d-modal-body>
      <d-form>
        <div class="form-group mb-4">
          <d-row>
            <d-col sm="2"><label for="invoice">Сумма:</label></d-col>
            <d-col sm="6"
              ><d-input id="invoice" v-model="amount" type="number" :min="minAmount" :placeholder="minAmount.toString()"
            /></d-col>
          </d-row>
        </div>

        <d-button v-if="uface" type="button" @click.native="$preload('getInvoiceLink', amount)"
          >Выставить счет</d-button
        >
        <d-button v-else type="button" @click.native="$preload('getPaymentLink', amount)"
          >Пополнить через Яндекс.Кассу</d-button
        >
      </d-form>
    </d-modal-body>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ThePayment',
  props: {
    minAmount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      amount: this.minAmount,
    };
  },
  computed: {
    ...mapGetters('user', ['uface']),
  },
  methods: {
    ...mapActions('invoice', ['getPaymentLink', 'getInvoiceLink']),
  },
};
</script>
