<template>
  <d-container fluid class="main-content-container px-4">
    <div class="mt-4">
      <TheDocumentation />
    </div>
  </d-container>
</template>

<script>
import TheDocumentation from '@/components/TheDocumentation';
import { mapActions } from 'vuex';

export default {
  name: 'UserDocumentation',
  components: {
    TheDocumentation,
  },
  created() {
    this.$preload('getDocumentation');
  },
  methods: {
    ...mapActions('subscription', ['getDocumentation']),
  },
};
</script>
