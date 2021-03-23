<template>
  <IntegrationEnable />
</template>

<script>
import IntegrationEnable from '@/components/IntegrationEnable'
import getUserData from '@/mixins/getUserData'

export default {
  name: 'Integration',
  components: {
    IntegrationEnable
  },
  mixins: [getUserData]
}
</script>

<style lang="scss" scoped></style>
