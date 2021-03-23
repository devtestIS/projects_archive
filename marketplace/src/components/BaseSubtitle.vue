<template>
  <div class="align-center d-flex subtitle">
    <slot /> <v-divider light inset />
  </div>
</template>

<script>
export default {
  name: 'BaseSubtitle'
}
</script>

<style lang="scss" scoped>
.subtitle {
  width: 100%;
  margin-bottom: 30px;
  color: rgba($color: #ffffff, $alpha: 0.2);
}
</style>
