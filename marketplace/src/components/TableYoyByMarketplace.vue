<template>
  <div class="table-wrapper">
    <v-data-table
      :headers="headerArray"
      :items="marketplaceTableData"
      hide-default-header
      hide-default-footer
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
              </span>
            </th>
            <th v-for="(date, index) in marketplaceHeaders" :key="index + date">
              <span class="heading"
                ><span class="heading__text heading__text_date">{{
                  date | dateFormat
                }}</span
                ><span class="heading__delimeter">YoY</span></span
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
          <template v-for="(row, index) in items">
            <tr v-if="index === 0 && row.total" :key="index">
              <td class="total">
                <span class="total__wrapper"
                  ><span>{{ row.marketplace }}</span> <span></span
                ></span>
              </td>
              <td class="total">
                <span class="total__wrapper"
                  ><span>{{ row.total | currency(row.currency) }}</span>
                  <span>{{
                    row.year_to_year ? `${row.year_to_year} %` : '-'
                  }}</span></span
                >
              </td>
              <td
                v-for="(date, keyIndex) in row.data"
                :key="keyIndex + 'date'"
                class="total"
              >
                <span class="total__wrapper"
                  ><span>{{ date.total | currency(row.currency) }}</span>
                  <span>{{
                    date.year_to_year ? `${date.year_to_year} %` : '-'
                  }}</span></span
                >
              </td>
            </tr>
            <tr v-else :key="index + 'regular'">
              <td>
                {{ row.marketplace }}
              </td>
              <td>
                {{ row.total | currency(row.currency) }}
              </td>
              <td v-for="(date, keyIndex) in row.data" :key="keyIndex + 'date'">
                <span class="regular-cell"
                  ><span class="regular-cell__text">{{
                    date.total | currency(date.currency)
                  }}</span>
                  <span class="regular-cell__yoy">{{
                    date.year_to_year ? `${date.year_to_year} %` : '-'
                  }}</span></span
                >
              </td>
            </tr>
          </template>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'TableYearOverYear',
  filters: {
    currency(val, currency) {
      const currencies = {
        EUR: '€'
      }
      return val ? `${val} ${currencies[currency]}` : ''
    },
    dateFormat(val) {
      return moment(val).format('MMM YYYY')
    }
  },
  data() {
    return {
      headerArray: [
        {
          text: 'Marktplatz',
          align: 'start',
          sortable: false,
          value: 'marketplace'
        },
        {
          text: 'seit Jahresbeginn',
          align: 'start',
          sortable: false,
          value: 'total'
        }
      ]
    }
  },
  computed: {
    ...mapState(['marketplaceTableData']),
    ...mapGetters(['marketplaceHeaders'])
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

    &_date {
      line-height: 16px;
      white-space: pre-wrap;
      text-align: center;
    }
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
</style>
