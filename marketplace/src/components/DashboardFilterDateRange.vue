<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    flat
    range
  >
    <template #activator="{on, attrs}">
      <v-text-field
        v-model="dateRangeText"
        label="Zeitraum"
        append-icon="mdi-calendar-blank-outline"
        readonly
        outlined
        flat
        background-color="#081830"
        color="#00FFFC"
        v-bind="attrs"
        :rules="rules"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="datesVal"
      locale="de"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      width="318"
      light
      flat
      color="rgba(0, 255, 252, 0.23)"
      type="month"
      no-title
      scrollable
      range
      :events="rangeValues"
      @click:month="close"
    />
  </v-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardFilterDateRange',
  props: {
    rules: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      menu: false,
      modal: false,
      arrayEvents: []
    }
  },
  computed: {
    ...mapState(['dates']),
    ...mapGetters(['dateRangeText', 'sortedDates']),
    datesVal: {
      get() {
        return this.dates
      },
      set(value) {
        this.setDates(value)
      }
    }
  },
  methods: {
    rangeValues(date) {
      const classNames = ['first-item', 'last-item']
      const index = this.sortedDates.indexOf(date)
      return classNames[index]
    },
    close(val) {
      const check = this.dates.indexOf(val) === 1
      if (check) {
        this.menu = false
      }
    },
    ...mapActions(['setDates'])
  }
}
</script>

<style lang="scss" scoped></style>
