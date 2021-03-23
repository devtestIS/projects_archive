<template>
  <v-btn
    class="mb-5 text-uppercase"
    color="#00FFFC"
    rounded
    outlined
    x-large
    :disabled="!valid"
    ><slot
  /></v-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    valid: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped></style>
