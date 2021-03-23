<template>
  <d-card>
    <d-card-body title="Ваш тариф">
      <div v-if="!rateNotSelect">
        <h5 v-for="(rate, index) in rates" :key="index">
          <span v-if="rate.is_selected && rate.pay_type === 'request'"> Тариф «{{ rateName }}» </span>
          <span v-else-if="rate.is_selected && rate.pay_type === 'subscription'">
            Тариф «{{ rateName }}», запросов осталось {{ rateLimit || 0 }}.
          </span>
        </h5>
      </div>
      <div v-else>
        <h5>Тариф не выбран</h5>
      </div>
      <d-link :to="{ path: '/subscription' }">
        <d-button size="sm" theme="primary" class="mb-2 mr-1">
          Сменить тариф
        </d-button>
      </d-link>
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheRates',
  computed: {
    ...mapState('user', ['rateName', 'rateLimit']),
    ...mapState('rates', ['rates']),
    ...mapGetters('rates', ['rateNotSelect']),
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
