<template>
  <div class="table-wrapper">
    <v-data-table
      :headers="headers"
      :items="transactions"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
    </v-data-table>

    <div class="my-10 pt-2 text-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="8"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardTransactionReport',
  components: {},
  data() {
    return {
      page: 1,
      pageCount: 6,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Amazon order id',
          align: 'start',
          sortable: false,
          value: 'amazon_order_id'
        },
        { text: 'city', value: 'city', align: 'center', sortable: false },
        { text: 'date', value: 'date', align: 'center', sortable: false },
        {
          text: 'description',
          value: 'description',
          align: 'center',
          sortable: false
        },
        {
          text: 'gift price',
          value: 'gift_price',
          align: 'center',
          sortable: false
        },
        {
          text: 'marketplace',
          value: 'marketplace',
          align: 'center',
          sortable: false
        },
        { text: 'other', value: 'other', align: 'center', sortable: false },
        {
          text: 'other fees',
          value: 'other_fees',
          align: 'center',
          sortable: false
        },
        {
          text: 'postal code',
          value: 'postal_code',
          align: 'center',
          sortable: false
        },
        { text: 'price', value: 'price', align: 'center', sortable: false },
        {
          text: 'promotion discount',
          value: 'promotion_discount',
          align: 'center',
          sortable: false
        },
        {
          text: 'quantity',
          value: 'quantity',
          align: 'center',
          sortable: false
        },
        {
          text: 'sales_tax',
          value: 'sales_tax',
          align: 'center',
          sortable: false
        },
        {
          text: 'shipping',
          value: 'shipping',
          align: 'center',
          sortable: false
        },
        {
          text: 'shipping price',
          value: 'shipping_price',
          align: 'center',
          sortable: false
        },
        {
          text: 'shipping through amazon',
          value: 'shipping_through_amazon',
          align: 'center',
          sortable: false
        },
        { text: 'sku', value: 'sku', align: 'center', sortable: false },
        { text: 'state', value: 'state', align: 'center', sortable: false },
        { text: 'total', value: 'total', align: 'center', sortable: false },
        {
          text: 'transaction type',
          value: 'transaction_type',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['transactions'])
  }
}
</script>

<style lang="scss" scoped></style>
