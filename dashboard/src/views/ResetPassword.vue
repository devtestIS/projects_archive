<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">
              Смена пароля
            </h5>

            <!-- Form Fields -->
            <d-form>
              <div class="form-group mb-3">
                <label for="password">Пароль</label>
                <d-input
                  id="password"
                  v-model="password"
                  :state="isValidPassword"
                  type="password"
                  placeholder="Введите пароль"
                  @blur.native="check('password')"
                />
                <div v-if="errorState && password">
                  <d-form-invalid-feedback
                    v-for="(item, index) in error"
                    v-show="errorState"
                    :key="index"
                    class="fields"
                    >{{ item.message }}</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.$error">
                  <d-form-invalid-feedback v-show="!$v.password.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="repeatPassword">Повторите пароль</label>
                <d-input
                  id="repeatPassword"
                  v-model="repeatPassword"
                  :state="isValidPassword"
                  type="password"
                  placeholder="Введите пароль"
                  @blur.native="check('repeatPassword')"
                />
                <div v-if="errorState && repeatPassword">
                  <d-form-invalid-feedback
                    v-for="(item, index) in error"
                    v-show="errorState"
                    :key="index"
                    class="fields"
                    >{{ item.message }}</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.$error">
                  <d-form-invalid-feedback v-show="!$v.repeatPassword.sameAsPassword" class="fields"
                    >Пароли не совпадают</d-form-invalid-feedback
                  >
                </div>
              </div>
              <d-button
                pill
                type="submit"
                class="btn-accent d-table mx-auto"
                :disabled="isValidPassword === 'invalid' || password.length === 0"
                @click.prevent="resetPassword"
              >
                Сменить пароль
              </d-button>
            </d-form>
          </d-card-body>

          <!-- Social Icons -->
          <d-card-footer class="border-top d-flex justify-content-between">
            <d-link tag="a" to="login" class="mx-auto">
              Вернуться к форме авторизации
            </d-link>
          </d-card-footer>
        </d-card>

        <!-- Meta Details -->
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { required, sameAs } from 'vuelidate/lib/validators';
export default {
  computed: {
    password: {
      get() {
        return this.newPassword;
      },
      set(value) {
        this['SET_NEW_PASSWORD'](value);
      },
    },
    repeatPassword: {
      get() {
        return this.repeatNewPassword;
      },
      set(value) {
        this['SET_REPEAT_PASSWORD'](value);
      },
    },
    ...mapState('user', ['newPassword', 'repeatNewPassword']),
    ...mapState('auth', ['token']),
    ...mapState('auth/checkoutErrors', ['error']),
    ...mapGetters('auth/checkoutErrors', ['errorState', 'isValidBackend']),
    isValidPassword() {
      const checkPassword = this.password;
      const checkFormError = this.$v.$error;
      return checkFormError || this.isValidBackend ? 'invalid' : checkPassword ? 'valid' : null;
    },
  },
  validations: {
    password: {
      required,
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    ...mapActions('user', ['resetPasswordByEmail']),
    ...mapMutations('user/checkoutErrors', ['CHECKOUT_FAILURE']),
    ...mapMutations('user', ['SET_NEW_PASSWORD', 'SET_REPEAT_PASSWORD']),
    resetPassword() {
      this.$v.$touch();
      const { password } = this;
      if (!this.$v.$invalid) {
        this.resetPasswordByEmail(this.password);
      }
    },
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
