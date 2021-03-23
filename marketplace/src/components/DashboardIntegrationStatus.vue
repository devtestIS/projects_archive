<template>
  <span :class="statusClass"
    >{{ lastUpdatedAt ? 'Updated:' : 'Integration Disabled' }}
    <span v-if="lastUpdatedAt" class="status__date">{{
      lastUpdatedAt
    }}</span></span
  >
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardIntegrationStatus',
  computed: {
    ...mapGetters(['lastUpdatedAt']),
    statusClass() {
      return this.lastUpdatedAt ? 'status' : 'status status_disabled'
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  font-size: 20px;
  line-height: 23px;
  vertical-align: middle;

  &::before {
    content: '';
    display: inline-block;
    margin-right: 10px;
    width: 8px;
    height: 8px;
    background: #00fffc;
    border-radius: 50%;
  }

  &__date {
    color: rgba($color: #ffffff, $alpha: 0.5);
  }

  &_disabled {
    color: rgba($color: #ffffff, $alpha: 0.5);

    &::before {
      background: #cc9e26;
    }
  }
}
</style>
