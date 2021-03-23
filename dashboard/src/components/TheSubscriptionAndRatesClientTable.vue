<template lang="html">
  <div>
    <d-tabs ref="d_tabs" card pills>
      <d-tab title="Оплата по подписке" :active="activeSubscription === 'subscription'">
        <div v-cloak>
          <v-client-table :data="subscription.tableData" :columns="subscription.columns" :options="options">
            <tr slot="appendBody">
              <td>Цена в месяц</td>
              <td
                v-for="(rate, index) in rates"
                :key="index"
                :style="rate.pay_type == 'subscription' ? 'display: table-cell' : 'display: none'"
              >
                <span v-if="rate.pay_type == 'subscription'">{{ rate.price }}</span>
              </td>
            </tr>
            <tr slot="appendBody">
              <td>Подсистема "Реестр Юрлиц"</td>
              <td
                v-for="(rate, index) in rates"
                :key="index"
                :style="rate.pay_type == 'subscription' ? 'display: table-cell' : 'display: none'"
              >
                <span v-if="rate.pay_type == 'subscription'">✅</span>
              </td>
            </tr>
            <tfoot slot="afterBody">
              <tr>
                <td></td>
                <td
                  v-for="(rate, index) in rates"
                  :key="index"
                  :style="rate.pay_type == 'subscription' ? 'display: table-cell' : 'display: none'"
                >
                  <d-button
                    v-if="rate.pay_type == 'subscription'"
                    :disabled="rate.is_selected"
                    class="tfoot-button"
                    @click.native="triggerModal(rate.id)"
                  >
                    {{ rate.is_selected ? 'Активен' : 'Выбрать' }}
                  </d-button>
                </td>
              </tr>
            </tfoot>
          </v-client-table>
        </div>
      </d-tab>
      <d-tab title="Оплата поштучно" :active="activeSubscription === 'request'">
        <div v-cloak>
          <v-client-table :data="apiece.tableData" :columns="apiece.columns" :options="options">
            <tr slot="appendBody">
              <td class="td-content">Цена за запрос</td>
              <td
                v-for="(rate, index) in rates"
                :key="index"
                :style="rate.pay_type == 'request' ? 'display: table-cell' : 'display: none'"
              >
                <span v-if="rate.pay_type == 'request'">{{ rate.api[0].price_info }}</span>
              </td>
            </tr>
            <tr slot="appendBody">
              <td>Подсистема "Реестр Юрлиц"</td>
              <td
                v-for="(rate, index) in rates"
                :key="index"
                :style="rate.pay_type == 'request' ? 'display: table-cell' : 'display: none'"
              >
                <span v-if="rate.pay_type == 'request'">✅</span>
              </td>
            </tr>
            <tfoot slot="afterBody">
              <tr>
                <td></td>
                <td
                  v-for="(rate, index) in rates"
                  :key="index"
                  :style="rate.pay_type == 'request' ? 'display: table-cell' : 'display: none'"
                >
                  <d-button
                    v-if="rate.pay_type == 'request'"
                    :disabled="rate.is_selected"
                    class="tfoot-button"
                    @click.native="triggerModal(rate.id)"
                  >
                    {{ rate.is_selected ? 'Активен' : 'Выбрать' }}
                  </d-button>
                </td>
              </tr>
            </tfoot>
          </v-client-table>
        </div>
      </d-tab>
      <TheSubscriptionAndRatesModalPayment
        :triggered-modal="triggeredModal"
        :payment="payment"
        :error-message="error.length > 0 ? error[0].message : ''"
        @close="untriggerModal"
      />
    </d-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TheSubscriptionAndRatesModalPayment from '@/components/TheSubscriptionAndRatesModalPayment.vue';

export default {
  name: 'TheSubscriptionAndRatesClientTable',
  components: {
    TheSubscriptionAndRatesModalPayment,
  },
  props: {
    rates: {
      type: Array,
      default() {
        return [];
      },
    },
    payment: {
      type: Object,
      default() {
        return {};
      },
    },
    subscription: {
      type: Object,
      default() {
        return {};
      },
    },
    apiece: {
      type: Object,
      default() {
        return {};
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    activeSubscription: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      triggeredModal: false,
    };
  },
  computed: {
    ...mapState('rates/checkoutErrors', ['error']),
  },
  watch: {
    activeSubscription(newValue) {
      this.showActiveTab(newValue);
      this.$refs.d_tabs.$forceUpdate();
    },
  },
  methods: {
    ...mapActions('rates', ['changeSubscription']),
    triggerModal(selected_id) {
      this.triggeredModal = true;
      this.createPayment(selected_id);
    },
    untriggerModal() {
      this.triggeredModal = false;
      this.closeModalAfterPayment();
    },
    createPayment(selected_id) {
      // + 'Недостаточно средств для выбора данного тарифа.'
      // + 'Тариф успешно изменен.'
      // + 'Данный тариф уже выбран.'
      // + 'Тариф не найден.'
      this.$preload('changeSubscription', {
        id: selected_id,
      });
    },
    closeModalAfterPayment() {
      this.payment.success = null;
    },
    setActiveTab(activeTabNumber) {
      let currentTab = this.$refs.d_tabs.currentTab;
      let tabs = this.$refs.d_tabs.tabs;
      for (let element in tabs) {
        if (+element === activeTabNumber) {
          currentTab = element;
          tabs[element].show = true;
          tabs[element].localActiveState = true;
        } else {
          tabs[element].show = false;
          tabs[element].localActiveState = false;
        }
      }
    },
    showActiveTab(typeOfSubscription) {
      typeOfSubscription == 'subscription' ? this.setActiveTab(0) : this.setActiveTab(1);
    },
  },
};
</script>

<style lang="css">
.VueTables__no-results {
  display: none;
}
span.VueTables__heading {
  text-align: center;
}
*:focus {
  outline: none;
}
th#VueTables_th--column_name {
  width: 20%;
}

/* th#VueTables_th--base {
  background-color: grey;
} */
td {
  text-align: center;
}

table td {
  vertical-align: middle !important;
}
.tfoot-button {
  width: 100%;
}
</style>
