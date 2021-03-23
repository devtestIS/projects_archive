<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">
              Регистрация
            </h5>

            <!-- Form Fields -->
            <d-form @submit.prevent="signUp">
              <div class="form-group">
                <label for="name">Имя</label>
                <d-input
                  id="name"
                  v-model="form.name"
                  :state="isValidName"
                  type="text"
                  placeholder="Имя"
                  @blur.native="$v.form.name.$touch()"
                />
                <div v-if="$v.form.$error">
                  <d-form-invalid-feedback v-show="!$v.form.name.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                </div>
              </div>
              <div v-if="uface" class="form-group">
                <label for="inn">ИНН</label>
                <d-input
                  id="inn"
                  v-model="form.inn"
                  :state="isValidInn"
                  type="text"
                  placeholder="ИНН"
                  @blur.native="$v.form.inn.$touch()"
                />
                <div v-if="$v.form.inn.$error">
                  <d-form-invalid-feedback v-show="!$v.form.inn.numeric" class="fields"
                    >Недопустимый формат</d-form-invalid-feedback
                  >
                </div>
                <div v-if="$v.form.$error">
                  <d-form-invalid-feedback v-show="!$v.form.inn.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Почта</label>
                <d-input
                  id="exampleInputEmail1"
                  v-model="form.email"
                  :state="isValidEmail"
                  type="text"
                  placeholder="Введите email"
                  @blur.native="$v.form.email.$touch()"
                />
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
                  @blur.native="$v.form.$touch()"
                />
                <div v-if="$v.form.$error">
                  <d-form-invalid-feedback v-show="!$v.form.password.required" class="fields"
                    >Обязательное поле</d-form-invalid-feedback
                  >
                  <d-form-invalid-feedback v-show="!$v.form.password.minLength" class="fields"
                    >Введённый пароль слишком короткий. Он должен содержать как минимум 8
                    символов.</d-form-invalid-feedback
                  >
                </div>
              </div>
              <div class="form-group mt-4 mb-3 d-table">
                <d-checkbox v-model="uface" toggle class="custom-toggle-sm">
                  <a href="">{{ uface ? 'Юридическое лицо' : 'Физическое лицо' }}</a>
                </d-checkbox>
              </div>
              <div class="form-group mb-3 d-table">
                <d-checkbox v-model="form.publicOffer" class="offer" required>
                  <a href="">Принимаю публичную оферту</a>
                </d-checkbox>
              </div>
              <d-button pill type="submit" class="btn-accent d-table mx-auto" :disabled="disabledButton">
                Зарегистрироваться
              </d-button>
            </d-form>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, requiredIf, numeric, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        name: '',
        inn: '',
        email: '',
        password: '',
        publicOffer: false,
      },
      uface: false,
    };
  },
  computed: {
    disabledButton() {
      return (
        !this.form.publicOffer ||
        this.isValidName === 'invalid' ||
        this.isValidEmail === 'invalid' ||
        this.isValidPassword === 'invalid' ||
        !this.form.name ||
        !this.form.email ||
        !this.form.password
      );
    },
    isValidName() {
      return this.$v.form.$error && !this.form.name ? 'invalid' : this.form.name ? 'valid' : null;
    },
    isValidInn() {
      return this.$v.form.$error || !this.$v.form.inn.numeric ? 'invalid' : this.form.inn ? 'valid' : null;
    },
    isValidEmail() {
      return this.$v.form.email.$error && (this.form.email || this.$v.form.$error)
        ? 'invalid'
        : this.form.email
        ? 'valid'
        : null;
    },
    isValidPassword() {
      return (this.$v.form.$error && !this.form.password) || !this.$v.form.password.minLength
        ? 'invalid'
        : this.form.password
        ? 'valid'
        : null;
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      inn: {
        numeric,
        required: requiredIf(function() {
          return this.uface;
        }),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      publicOffer: {
        required,
      },
    },
  },
  methods: {
    ...mapActions('register', ['registration']),
    signUp() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$preload('registration', this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid {
  border-color: #c4183c;
  box-shadow: 0 5px 11.5px rgba(196, 24, 60, 0.1);
}
.fields {
  display: block;
}
</style>
