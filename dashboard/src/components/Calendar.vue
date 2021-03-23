<template>
  <vue-datepicker-local v-model="date" :local="local" format="YYYY-MM" clearable />
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local';
import { monthsHead, months } from '@/data/datepicker-locale';

export default {
  components: {
    VueDatepickerLocal,
  },
  data() {
    return {
      date: new Date(),
      local: {
        monthsHead: monthsHead('ru'),
        months: months('ru'),
        cancelTip: 'cancel',
        submitTip: 'confirm',
      },
    };
  },
  watch: {
    date(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="scss">
.datepicker {
  padding: 0;
  margin-top: -8px;
}

.datepicker:before {
  content: '\f073';
  margin-top: -10px;
  top: 50%;
  right: 20px;
  width: auto;
  height: auto;
  font-size: 20px;
  background: none;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.datepicker-close:before {
  left: auto;
  right: 20px;
}
</style>
