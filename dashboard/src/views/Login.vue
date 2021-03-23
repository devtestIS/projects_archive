<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">
              Войдите или зарегистрируйтесь
            </h5>

            <!-- Form Fields -->
            <d-form>
              <div class="form-group">
                <label for="exampleInputEmail1">Почта</label>
                <d-input
                  id="exampleInputEmail1"
                  v-model="form.email"
                  :state="isValidEmail"
                  type="email"
                  placeholder="Введите email"
                  @blur.native="check('email')"
                />
                <div v-if="errorState && form.email">
                  <d-form-invalid-feedback
                    v-for="(item, index) in error"
                    v-show="errorState"
                    :key="index"
                    class="fields"
                    >{{ item.message }}</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.form.email.$error">
                  <d-form-invalid-feedback v-show="!$v.form.email.email" class="fields"
                    >Некорректный email</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.form.$error">
                  <d-form-invalid-feedback v-show="!$v.form.email.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <d-input
                  id="exampleInputPassword1"
                  v-model="form.password"
                  :state="isValidPassword"
                  type="password"
                  placeholder="Введите пароль"
                  @blur.native="check('password')"
                />
                <div v-if="errorState && form.password">
                  <d-form-invalid-feedback
                    v-for="(item, index) in error"
                    v-show="errorState"
                    :key="index"
                    class="fields"
                    >{{ item.message }}</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.form.$error">
                  <d-form-invalid-feedback v-show="!$v.form.password.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                </div>
              </div>
              <d-button
                pill
                type="submit"
                class="btn-accent d-table mx-auto"
                :disabled="
                  (isValidEmail === null && isValidPassword === null) ||
                    (isValidEmail === 'valid' && isValidPassword === null) ||
                    (isValidEmail === null && isValidPassword === 'valid') ||
                    (isValidEmail === 'invalid' && isValidPassword === 'invalid') ||
                    (isValidEmail === 'valid' && isValidPassword === 'invalid') ||
                    (isValidEmail === 'invalid' && isValidPassword === 'valid') ||
                    (isValidEmail === 'invalid' && isValidPassword === null) ||
                    (isValidEmail === null && isValidPassword === 'invalid')
                "
                @click.prevent="login"
              >
                Войти в систему
              </d-button>
            </d-form>
          </d-card-body>

          <!-- Social Icons -->
          <d-card-footer class="border-top d-flex justify-content-between">
            <d-link tag="a" to="forgot-password">
              Забыли пароль?
            </d-link>
            <d-link tag="a" to="register" class="ml-auto">
              Регистрация
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
import { required, email } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState('auth/checkoutErrors', ['error']),
    ...mapGetters('auth/checkoutErrors', ['errorState', 'isValidBackend']),
    isValidEmail() {
      const checkEmailEmpty = this.form.email;
      const checkEmailError = this.$v.form.email.$error;
      const checkFormError = this.$v.form.$error;
      const checkErrors = checkEmailError && (checkEmailEmpty || checkFormError);

      return checkErrors || this.isValidBackend ? 'invalid' : checkEmailEmpty ? 'valid' : null;
    },
    isValidPassword() {
      const checkPassword = this.form.password;
      const checkFormError = this.$v.form.$error;
      const checkErrors = checkFormError && !checkPassword;

      return checkErrors || this.isValidBackend ? 'invalid' : checkPassword ? 'valid' : null;
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions('auth', ['getToken']),
    ...mapMutations('auth/checkoutErrors', ['CHECKOUT_FAILURE']),
    login() {
      this.$v.form.$touch();
      const { email, password } = this.form;
      if (!this.$v.form.$invalid) {
        this.$preload('getToken', { email, password });
      }
    },
    check(val) {
      this.$v.form[val].$touch();
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
