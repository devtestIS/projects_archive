import Vue from 'vue';
import Vuelidate from 'vuelidate';
import ShardsVue from 'shards-vue';

import store from '@/store';

ShardsVue.install(Vue);
Vue.use(Vuelidate);
