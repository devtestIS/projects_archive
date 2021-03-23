<template>
  <DataTable
    title="История операций"
    name="history"
    :columns="columns"
    :headings="headings"
    :adapter="adapter"
    :request-function="requestFunction"
    :load="load"
  />
</template>

<script>
import { mapMutations } from 'vuex';
import DataTable from '@/components/DataTable';
import loader from '@/utils/loader';

const operations = [
  {
    word: 'пополнение баланса',
    res: 'balance',
  },
  {
    word: 'покупка подписки',
    res: 'subscription',
  },
  {
    word: 'обращение к API',
    res: 'api',
  },
];

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      columns: ['date', 'coming', 'outgo', 'operation_type_name'],
      headings: {
        date: 'Дата',
        coming: 'Приход',
        outgo: 'Расход',
        operation_type_name: 'Операция',
      },
      adapter: response => {
        const { selected_month_id, years, history } = response.data;
        const { results, count } = history;
        return {
          data: results || [],
          count: count || 0,
        };
      },
      load: false,
      requestFunction: data => {
        const reqFilters = str => {
          const lowStr = str.toLowerCase();
          const found = operations.find(item => item.word.toLowerCase().includes(lowStr));
          return str && found ? found.res : '';
        };
        const { month_id, limit, page, query } = data;
        const params = {
          month_id,
          page,
          page_size: limit,
          operation_type: reqFilters(query),
        };
        return loader(this, '/operations/', params);
      },
    };
  },
  methods: {
    ...mapMutations('checkoutErrors', ['CHECKOUT_ERROR_STATUS']),
  },
};
</script>
