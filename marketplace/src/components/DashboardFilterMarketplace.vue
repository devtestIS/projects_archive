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
import { SET_MARKETPLACE_DATA, SET_MARKETPLACE } from '@/store/mutation-types'
import { mapState, mapMutations } from 'vuex'

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
        this[SET_MARKETPLACE_DATA](value)
      }
    },
    marketplaceVal: {
      get() {
        return this.marketplace
      },
      set(value) {
        this[SET_MARKETPLACE](value)
      }
    }
  },
  methods: {
    ...mapMutations([SET_MARKETPLACE_DATA, SET_MARKETPLACE])
  }
}
</script>

<style lang="scss" scoped></style>
