<template>
  <v-select
    v-model="marketplaceVal"
    light
    background-color="#081830"
    color="#00FFFC"
    item-color="#FFFFFF"
    :items="marketplaceDataVal"
    label="Marktplatz"
    outlined
    flat
    :menu-props="{
      offsetY: true
    }"
    :rules="rules"
  ></v-select>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DashboardFilterMarketplace',
  props: {
    rules: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState(['marketplaceData', 'marketplace']),
    marketplaceDataVal: {
      get() {
        return this.marketplaceData
      },
      set(value) {
        this.setMarketplaceData(value)
      }
    },
    marketplaceVal: {
      get() {
        return this.marketplace
      },
      set(value) {
        this.setMarketplace(value)
      }
    }
  },
  methods: {
    ...mapActions(['setMarketplaceData', 'setMarketplace'])
  }
}
</script>

<style lang="scss" scoped></style>
