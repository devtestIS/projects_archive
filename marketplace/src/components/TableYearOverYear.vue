<template>
  <div class="table-wrapper">
    <v-data-table
      :headers="headerArray"
      :items="itemsData"
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
          <tr v-for="(item, index) in items" :key="index">
            <template v-if="index === 0"
              ><td colspan="2" class="total">Total</td>
              <template v-for="(val, name, keyIndex) in item">
                <td
                  v-if="
                    !['sku', 'description', 'year_to_year', 'currency'].some(
                      item => item === name
                    )
                  "
                  :key="val + keyIndex"
                  class="total"
                >
                  <span class="total__wrapper">
                    <span>
                      {{ itemsData[0][name] | currency(item.currency, name) }}
                    </span>
                    <span>
                      {{
                        itemsData[0]['year_to_year']['total']
                          ? `${itemsData[0]['year_to_year']['total']} %`
                          : '-'
                      }}</span
                    >
                  </span>
                </td>
              </template>
            </template>
            <template v-else>
              <template v-for="(val, name, keyIndex) in item">
                <td
                  v-if="
                    !['sku', 'description', 'year_to_year', 'currency'].some(
                      item => item === name
                    )
                  "
                  :key="val + keyIndex"
                >
                  <span class="regular-cell">
                    <span class="regular-cell__text">{{
                      val | currency(item.currency, name)
                    }}</span>
                    <span class="regular-cell__yoy">{{
                      item.year_to_year[name]
                        ? `${item.year_to_year[name]} %`
                        : '-'
                    }}</span>
                  </span>
                </td>
                <td
                  v-else-if="
                    !['total', 'year_to_year', 'currency'].some(
                      item => item === name
                    )
                  "
                  :key="val + keyIndex"
                  :class="{
                    description: name === 'description'
                  }"
                >
                  {{ val }}
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </template>
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
export default {
  name: 'TableYearOverYear',
  filters: {
    currency(val, currency, name) {
      let stringVal = val
      const quantity = name !== 'quantity'
      const refund_quantity = name !== 'refund_quantity'
      const return_rate = name !== 'return_rate'
      const check = quantity && refund_quantity && return_rate
      const currencies = {
        EUR: '€'
      }
      if (check) {
        stringVal = val ? `${val} ${currencies[currency]}` : ''
      }

      if (name === 'return_rate') {
        stringVal = `${val} %`
      }

      return stringVal
    }
  },
  props: {
    itemsData: {
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
      headerArray: [
        {
          text: 'SKU',
          align: 'start',
          sortable: false,
          value: 'sku'
        },
        {
          text: 'beschreibung',
          align: 'start',
          sortable: false,
          value: 'description'
        },
        {
          text: 'umsatz',
          align: 'start',
          sortable: false,
          value: 'total'
        },
        {
          text: 'menge',
          align: 'start',
          sortable: false,
          value: 'quantity'
        },
        {
          text: 'Ø Verkaufspreis',
          align: 'start',
          sortable: false,
          value: 'average_price'
        },
        {
          text: 'erstattungen',
          align: 'start',
          sortable: false,
          value: 'refund_quantity'
        },
        {
          text: 'Retourenquote',
          align: 'start',
          sortable: false,
          value: 'return_rate'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.total {
  background: #2f3858;

  &__wrapper {
    display: flex;

    & > span {
      &:first-child {
        width: 70%;
      }
      &:last-child {
        width: 30%;
      }

      text-align: center;
    }
  }
}

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
    text-transform: capitalize;
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

  &__text,
  &__yoy {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    width: 70%;
  }

  &__yoy {
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
