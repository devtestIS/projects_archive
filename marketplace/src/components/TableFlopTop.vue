<template>
  <v-data-table
    :headers="flop"
    :items="itemData"
    :page.sync="page"
    :items-per-page="itemsPerPage"
    hide-default-header
    hide-default-footer
    @page-count="pageCount = $event"
  >
    <template
      #header="{ 
          props: { 
            headers
             } 
          }"
    >
      <thead>
        <tr>
          <th v-for="(heading, index) in headers" :key="index">
            <span class="heading"
              ><span class="heading__text">{{ heading.text }}</span>
              <span
                v-if="
                  !['sku', 'description', 'year_to_year', 'currency'].some(
                    item => item === heading.value
                  )
                "
                class="heading__delimeter"
                >YoY</span
              ></span
            >
          </th>
        </tr>
      </thead>
    </template>
    <template
      #body="{ 
            items 
            }"
    >
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="total">
          <template v-for="(val, name, keyIndex) in item">
            <td
              v-if="
                ![
                  'sku',
                  'description',
                  'year_to_year',
                  'currency',
                  'average_price',
                  'quantity',
                  'refund_quantity',
                  'return_rate'
                ].some(item => item === name)
              "
              :key="val + keyIndex"
            >
              <span class="regular-cell">
                <span class="regular-cell__text">{{
                  val | currency(item.currency)
                }}</span>
                <span class="regular-cell__yoy">{{
                  item.year_to_year[name] ? `${item.year_to_year[name]} %` : '-'
                }}</span>
              </span>
            </td>
            <td
              v-else-if="
                ![
                  'total',
                  'year_to_year',
                  'year_to_year',
                  'currency',
                  'average_price',
                  'quantity',
                  'refund_quantity',
                  'return_rate'
                ].some(item => item === name)
              "
              :key="val + keyIndex"
              :class="{
                description: name === 'description'
              }"
            >
              {{ val }}
            </td>
          </template>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'TableFlopTop',
  filters: {
    currency(val, currency) {
      const currencies = {
        EUR: '€'
      }
      return val ? `${val} ${currencies[currency]}` : ''
    }
  },
  props: {
    itemData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      page: 1,
      pageCount: 6,
      itemsPerPage: 10,
      flop: [
        {
          text: 'SKU',
          align: 'center',
          sortable: false,
          value: 'sku'
        },
        {
          text: 'Beschreibung',
          align: 'center',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Umsatz (brutto)',
          align: 'center',
          sortable: false,
          value: 'total'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  justify-content: center;

  &__text,
  &__delimeter {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    width: 70%;
  }

  &__delimeter {
    position: relative;
    width: 30%;
    padding: 0 13px 0 29px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 29px / 2);
      width: 2px;
      height: 29px;
      background: #081830;
    }
  }
}

.regular-cell {
  display: flex;
  justify-content: center;

  &__yoy {
    display: inline-flex;
    align-items: center;
  }

  &__text {
    display: block;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__yoy {
    justify-content: center;
    width: 30%;
    padding: 0 13px 0 29px;
  }
}

.description {
  width: 200px;
  text-overflow: inherit;
  white-space: pre-wrap;
  line-height: 16px;
}
</style>
