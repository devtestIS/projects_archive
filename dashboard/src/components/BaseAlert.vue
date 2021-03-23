<template>
  <transition name="fade">
    <div v-if="show" class="alert-wrapper">
      <d-alert :theme="theme" :show="show" dismissible @alert-dismissed="close">
        <template v-if="!text">
          <template v-if="typeof errors === 'object' || Array.isArray(errors)">
            <div v-for="(value, index) in errors" :key="index">
              {{ value }}
            </div>
          </template>
          <template v-else>
            {{ errors }}
          </template>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </d-alert>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_SHOW } from '@/store/mutation-types';
import dAlert from 'shards-vue/src/components/alert/Alert';
export default {
  name: 'BaseAlert',
  components: {
    dAlert,
  },
  computed: {
    ...mapState({
      show: state => state.notification.show,
      theme: state => state.notification.theme,
      text: state => state.notification.text,
      errors: state => state.notification.errors,
    }),
  },
  methods: {
    ...mapMutations([SET_SHOW]),
    close() {
      this[SET_SHOW](false);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9000;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
