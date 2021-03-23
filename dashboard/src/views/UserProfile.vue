<template>
  <d-container fluid class="main-content-container px-4">
    <div class="mt-4">
      <TheUserAccountDetails />
    </div>
  </d-container>
</template>

<script>
import TheUserAccountDetails from '@/components/TheUserAccountDetails';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserProfile',
  components: {
    TheUserAccountDetails,
  },
  created() {
    this.$preload('getUser');
  },
  methods: {
    ...mapActions('user', ['getUser']),
  },
};
</script>
