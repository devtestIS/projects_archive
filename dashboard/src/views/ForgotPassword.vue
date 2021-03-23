<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">
              Сбросить пароль
            </h5>

            <!-- Form Fields -->
            <d-form>
              <div class="form-group mb-4">
                <label for="email">Ваш email</label>
                <d-input
                  id="email"
                  v-model="email"
                  :state="isValidEmail"
                  type="email"
                  placeholder="Введите email"
                  @blur.native="check('email')"
                />
                <div v-if="$v.email.$error">
                  <d-form-invalid-feedback v-show="!$v.email.email" class="fields"
                    >Некорректный email</d-form-invalid-feedback
                  >
                </div>
                <d-form-text class="text-muted text-center">
                  Вы получите письмо с уникальным токеном
                </d-form-text>
              </div>
              <button
                type="submit"
                class="btn btn-pill btn-accent d-table mx-auto"
                :disabled="$v.email.$error"
                @click.prevent="passwordResetLink(email)"
              >
                Сбросить пароль
              </button>
            </d-form>
          </d-card-body>
        </d-card>

        <!-- Meta -->
        <div class="auth-form__meta d-flex mt-4">
          <d-link tag="a" to="login" class="mx-auto">
            Вернуться к форме авторизации
          </d-link>
        </div>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
    };
  },
  computed: {
    isValidEmail() {
      const checkEmailEmpty = this.email;
      const checkEmailError = this.$v.email.$error;
      const checkFormError = this.$v.$error;
      const checkErrors = checkEmailError && (checkEmailEmpty || checkFormError);

      return checkErrors || this.isValidBackend ? 'invalid' : checkEmailEmpty ? 'valid' : null;
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    ...mapActions('user', ['passwordResetLink']),
    ...mapMutations('auth/checkoutErrors', ['CHECKOUT_FAILURE']),
    check(val) {
      this.$v[val].$touch();
      this.CHECKOUT_FAILURE([]);
    },
  },
};
</script>

<style lang="scss" scoped>
.fields {
  display: block;
}
</style>
