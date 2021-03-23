<template>
  <d-card>
    <d-card-body title="Ключи">
      <div class="mb-4">
        <h6>API-ключ</h6>
        <span>{{ apiKey }}</span>
      </div>
      <div class="mb-4">
        <h6>Секретный ключ для стандартизации</h6>
        <span>{{ secretKey }}</span>
      </div>
      <d-button size="sm" theme="primary" class="mb-2 mr-1" @click.prevent="refresh">
        Обновить
      </d-button>
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'TheApiKeys',
  computed: {
    ...mapState('user', ['apiKey', 'secretKey']),
  },
  methods: {
    ...mapActions('user', ['refreshKeys']),
    refresh() {
      this.$preload('refreshKeys');
    },
  },
};
</script>

<style lang="css" scoped></style>
