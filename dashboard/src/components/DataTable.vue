<template>
  <d-container fluid :class="{ load: load }" class="main-content-container px-4 pb-4">
    <Preloader v-if="load" />
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title">
          {{ title }}
        </h3>
      </d-col>

      <!-- Page Header - Datepicker -->
      <d-col lg="2" sm="2" class="offset-sm-6 d-flex align-items-right">
        <Calendar @change="setTime" />
      </d-col>
    </d-row>

    <!-- List File Manager -->
    <v-server-table
      ref="dataTable"
      class="dataTables_wrapper"
      :name="name"
      :columns="columns"
      :options="serverTableOptions"
    >
      <span slot="date" slot-scope="props">
        {{ props.row.date | dateFormat }}
      </span>
    </v-server-table>
  </d-container>
</template>

<script>
import { mapMutations } from 'vuex';
import Calendar from '@/components/Calendar';
import Preloader from '@/components/Preloader';
import moment from 'moment';
import '@/assets/scss/vue-tables.scss';

export default {
  components: {
    Calendar,
    Preloader,
  },
  filters: {
    dateFormat: function(value) {
      return moment(value).format('DD/MM/YYYY');
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    headings: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    adapter: {
      type: Function,
      required: true,
    },
    requestFunction: {
      type: Function,
      required: true,
    },
    load: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      serverTableOptions: {
        perPage: 10,
        perPageValues: [10, 25, 50],
        headings: this.headings,
        skin: 'transaction-history table dataTable',
        sortIcon: {
          base: 'fas float-right mt-1 text-muted',
          up: 'fa-chevron-down',
          down: 'fa-chevron-up',
        },
        texts: {
          count: `Показывать {from} от {to} из {count} записей|{count} Записей|Одна запись`,
          filterPlaceholder: '',
          limit: 'Показать',
        },
        pagination: {
          edge: false,
          nav: 'scroll',
        },
        dateColumns: ['date'],
        dateFormat: 'DD MM YYYY',
        customFilters: ['month_id'],
        requestFunction: this.requestFunction,
        responseAdapter: this.adapter,
      },
    };
  },
  methods: {
    setTime(val) {
      this.$store.commit(`${this.name}/SET_CUSTOM_FILTER`, {
        filter: 'month_id',
        value: moment(val).format('YYYYMM'),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  ::v-deep .VueTables .VuePagination nav {
    flex-direction: column;
  }

  ::v-deep .VueTables .VuePagination ul.pagination {
    width: 100% !important;
    justify-content: center;
    flex-wrap: wrap;
  }

  ::v-deep .VueTables .VuePagination__count {
    width: 100% !important;
    max-width: inherit !important;
    margin-top: 15px !important;
  }
}
.load {
  position: relative;
}
</style>
