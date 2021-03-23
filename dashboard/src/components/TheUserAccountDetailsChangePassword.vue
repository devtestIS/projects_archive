<template>
  <d-card class="mb-3">
    <d-card-body>
      <fieldset>
        <legend>Сменить пароль</legend>
        <d-form-input
          id="oldPass"
          v-model="pass.oldPassword"
          type="password"
          placeholder="Старый пароль"
          class="mb-3"
          :state="isValidOld"
          @blur.native="check('oldPassword')"
        />
        <div v-if="$v.pass.oldPassword.$error">
          <d-form-invalid-feedback v-show="!$v.pass.oldPassword.minLength" class="fields mb-3"
            >Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.</d-form-invalid-feedback
          >
          <d-form-invalid-feedback v-show="!$v.pass.oldPassword.required" class="fields mb-3"
            >Обязательное поле</d-form-invalid-feedback
          >
        </div>
        <div v-if="validationOld">
          <d-form-invalid-feedback
            v-for="(item, index) in validationOld"
            v-show="validationOld"
            :key="index"
            class="fields mb-3"
            >{{ item }}</d-form-invalid-feedback
          >
        </div>
        <d-form-input
          id="newPass"
          v-model="pass.newPassword"
          type="password"
          placeholder="Новый пароль"
          class="mb-3"
          :state="isValidNew"
          @blur.native="check('newPassword')"
        />
        <div v-if="$v.pass.newPassword.$error">
          <d-form-invalid-feedback v-show="!$v.pass.newPassword.minLength" class="fields mb-3"
            >Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.</d-form-invalid-feedback
          >
          <d-form-invalid-feedback v-show="!$v.pass.newPassword.required" class="fields mb-3"
            >Обязательное поле</d-form-invalid-feedback
          >
        </div>
        <div v-if="validationNew">
          <d-form-invalid-feedback
            v-for="(item, index) in validationNew"
            v-show="validationNew"
            :key="index"
            class="fields mb-3"
            >{{ item }}</d-form-invalid-feedback
          >
        </div>
      </fieldset>

      <d-button size="sm" theme="primary" class="mb-2 mr-1" @click.prevent="setPassword">
        Сохранить изменения
      </d-button>
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'TheChangePassword',
  data() {
    return {
      pass: {
        oldPassword: '',
        newPassword: '',
      },
    };
  },
  validations: {
    pass: {
      oldPassword: {
        required,
        minLength: minLength(8),
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
    },
  },
  computed: {
    ...mapState('user/checkoutErrors', ['error']),
    ...mapGetters('user/checkoutErrors', ['errorState', 'validationOld', 'validationNew', 'isValidBackend']),
    isValidOld() {
      return this.$v.pass.oldPassword.$error || this.validationOld ? 'invalid' : this.pass.oldPassword ? 'valid' : null;
    },
    isValidNew() {
      return this.$v.pass.newPassword.$error || this.validationNew ? 'invalid' : this.pass.newPassword ? 'valid' : null;
    },
  },
  methods: {
    ...mapMutations('user/checkoutErrors', ['CHECKOUT_FAILURE']),
    ...mapActions('user', ['changePassword']),
    setPassword() {
      this.$v.pass.$reset();
      this.$preload('changePassword', [this.pass.oldPassword, this.pass.newPassword]);
    },
    check(val) {
      this.$v.pass[val].$touch();
      this.CHECKOUT_FAILURE([]);
    },
  },
};
</script>

<style lang="css" scoped></style>
