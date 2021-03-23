<template>
  <div class="spinner-wrapper">
    <pulse-loader :loading="loading" :size="size" :color="color"></pulse-loader>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
  name: 'Preloader',
  components: {
    PulseLoader,
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '100px',
    },
  },
  data() {
    return {
      color: '#007bff',
    };
  },
};
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  z-index: 9000;
}

.v-spinner {
  margin: auto;
}
</style>
