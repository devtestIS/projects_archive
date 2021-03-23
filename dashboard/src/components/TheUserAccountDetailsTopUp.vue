<template>
  <d-card class="mb-3">
    <d-card-body title="У вас на счету">
      <span>{{ balance || 0 }} ₽</span>

      <div class="d-flex mt-3">
        <d-button size="sm" theme="primary" class="mb-2 mr-1" @click.native="handlePayment">
          Пополнить
        </d-button>
        <d-modal v-if="showPayment" @close="handleClose">
          <ThePayment :min-amount="0" @close-modal="handleClose" />
        </d-modal>
      </div>
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState } from 'vuex';
import ThePayment from '@/components/ThePayment';

export default {
  name: 'TheRefill',
  components: {
    ThePayment,
  },
  data() {
    return {
      showPayment: false,
    };
  },
  computed: {
    ...mapState('user', ['balance']),
  },
  methods: {
    handlePayment(e) {
      e.preventDefault();
      this.showPayment = true;
    },
    handleClose() {
      this.showPayment = false;
    },
  },
};
</script>

<style lang="css" scoped></style>
