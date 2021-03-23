<template>
  <div class="link">
    <v-icon class="link__icon" color="#00A1FE" size="14"
      >mdi-arrow-collapse-down</v-icon
    ><a href="" class="link__text" @click.prevent="csvExport">
      In CSV runterladen</a
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DashboardCsvLink',
  methods: {
    ...mapActions(['csvExport'])
  }
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__icon {
    margin-right: 10px;
  }

  &__text {
    font-size: 20px;
    line-height: 23px;
    color: #00a1fe;
  }
}
</style>
