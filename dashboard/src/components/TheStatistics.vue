<template>
  <DataTable
    title="Статистика"
    name="statistic"
    :columns="columns"
    :headings="headings"
    :adapter="adapter"
    :request-function="requestFunction"
    :load="load"
  />
</template>

<script>
import { mapMutations } from 'vuex';
import loader from '@/utils/loader';
import moment from 'moment';
import DataTable from '@/components/DataTable';
import transactionHistoryData from '@/data/transaction-history-data.json';
moment.locale('ru');

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      columns: ['path', 'http_method', 'name', 'requests_count', 'month_id'],
      headings: {
        path: 'Путь',
        http_method: 'Метод',
        name: 'Описание',
        requests_count: 'Всего запросов',
        month_id: 'Месяц',
      },
      adapter: response => {
        const { selected_month_id, years, statistics } = response.data;
        const { results, count } = statistics;
        results.forEach(element => {
          const month = Number(element.month_id.slice(4)) - 1;
          const year = Number(element.month_id.slice(0, 4));
          const date = new Date(year, month);
          element.month_id = moment(date.toISOString()).format('MMMM YYYY');
        });
        return {
          data: results || [],
          count: count || 0,
        };
      },
      load: false,
      requestFunction: data => {
        const reqFilters = val => {
          const id = Number.parseInt(val);
          return !Number.isNaN(id) ? id : '';
        };
        const { month_id, limit, page, query } = data;
        const params = {
          month_id,
          page,
          page_size: limit,
          api_method_id: reqFilters(query),
        };
        return loader(this, '/statistics/', params);
      },
    };
  },
  methods: {
    ...mapMutations('checkoutErrors', ['CHECKOUT_ERROR_STATUS']),
  },
};
</script>
