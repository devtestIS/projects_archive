<template>
  <d-container fluid class="main-content-container px-4">
    <div class="mt-4">
      <TheSubscriptionAndRates />
    </div>
  </d-container>
</template>

<script>
import TheSubscriptionAndRates from '@/components/TheSubscriptionAndRates';

export default {
  name: 'UserProfile',
  components: {
    TheSubscriptionAndRates,
  },
};
</script>
