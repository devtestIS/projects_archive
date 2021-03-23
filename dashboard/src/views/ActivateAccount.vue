<template lang="html">
  <div class="loader">
    Идет активация аккаунта
    <span class="loader__dot">.</span>
    <span class="loader__dot">.</span>
    <span class="loader__dot">.</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    const uid = this.$route.query.uid;
    const token = this.$route.query.token;
    this.activate({ uid: uid, token: token });
  },
  methods: {
    ...mapActions('activateAccount', ['activate']),
  },
};
</script>

<style lang="css" scoped>
.loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
@keyframes blink {
  50% {
    color: transparent;
  }
}
.loader__dot {
  animation: 1s blink infinite;
}
.loader__dot:nth-child(2) {
  animation-delay: 250ms;
}
.loader__dot:nth-child(3) {
  animation-delay: 500ms;
}
</style>
