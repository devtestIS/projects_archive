<template>
  <v-text-field
    :value="value"
    :rules="rules"
    :label="label"
    color="#00FFFC"
    background-color="rgba(255, 255, 255, 0.05)"
    outlined
    flat
    required
    class="input"
    autocomplete="off"
    :readonly="readonly"
    :type="type"
    @input="modelBind"
  >
    <template #append-outer>
      <slot />
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'BaseTextField',
  props: {
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default() {
        return []
      }
    },
    readonly: {
      type: Boolean
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      style: {}
    }
  },
  methods: {
    modelBind(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  &:focus {
    background-color: #081830;
  }
}
</style>
