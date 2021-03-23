<template>
  <d-card class="mb-3">
    <d-card-body>
      <label for="feFirstName">Имя</label>
      <d-form-input
        id="feFirstName"
        v-model="userName"
        :state="isValidName"
        class="mb-3"
        type="text"
        placeholder="First Name"
        :disabled="!editable"
      />
      <div v-if="errorState && userData.userName">
        <d-form-invalid-feedback v-for="(item, index) in error" v-show="errorState" :key="index" class="fields mb-3">{{
          item.message
        }}</d-form-invalid-feedback>
      </div>
      <div v-if="$v.userData.$error">
        <d-form-invalid-feedback v-show="!$v.userData.userName.required" class="fields mb-3"
          >Обязательное поле</d-form-invalid-feedback
        >
      </div>
      <label for="feEmail">Электронная почта:</label>
      <d-form-input
        id="feEmail"
        v-model="userEmail"
        :state="isValidEmail"
        class="mb-3"
        type="email"
        placeholder="Email Address"
        :disabled="!editable"
      />
      <div v-if="errorState && userData.userEmail">
        <d-form-invalid-feedback v-for="(item, index) in error" v-show="errorState" :key="index" class="fields mb-3">{{
          item.message
        }}</d-form-invalid-feedback>
      </div>
      <div v-if="$v.userData.userEmail.$error">
        <d-form-invalid-feedback v-show="!$v.userData.userEmail.email" class="fields mb-3"
          >Некорректный email</d-form-invalid-feedback
        >
      </div>
      <div v-if="$v.userData.$error">
        <d-form-invalid-feedback v-show="!$v.userData.userEmail.required" class="fields mb-3"
          >Обязательное поле</d-form-invalid-feedback
        >
      </div>
      <d-button v-if="!editable" size="sm" theme="primary" class="mb-2 mr-1" @click.prevent="editable = !editable">
        Редактировать
      </d-button>
      <d-button v-if="editable" size="sm" theme="danger" class="mb-2 mr-1" @click.prevent="reset">
        Отмена
      </d-button>
      <d-button v-if="editable" size="sm" theme="success" class="mb-2 mr-1" @click.prevent="saveUser">
        Сохранить
      </d-button>
    </d-card-body>
  </d-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'TheEmaildReset',
  data() {
    return {
      editable: false,
    };
  },
  validations: {
    userData: {
      userName: {
        required,
      },
      userEmail: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapState('user', ['fullName', 'email']),
    ...mapState('user/checkoutErrors', ['error']),
    ...mapGetters('user/checkoutErrors', ['errorState', 'validationOld', 'validationNew', 'isValidBackend']),
    userData() {
      return {
        userName: this.userName,
        userEmail: this.userEmail,
      };
    },
    userName: {
      get() {
        return this.fullName;
      },
      set(value) {
        this.SET_USER_NAME(value);
        this.SET_USER(value);
      },
    },
    userEmail: {
      get() {
        return this.email;
      },
      set(value) {
        this.SET_USER_EMAIL(value);
      },
    },
    isValidName() {
      let error;
      if (this.$v.userData.$error && this.editable) {
        error = 'invalid';
      } else if (!this.$v.userData.$error && this.editable) {
        error = 'valid';
      } else if (!this.editable) {
        error = null;
      }
      return error;
    },
    isValidEmail() {
      return this.$v.userData.userEmail.$error && (this.userData.userEmail || this.$v.userData.$error)
        ? 'invalid'
        : this.userData.userEmail && this.editable
        ? 'valid'
        : null;
    },
  },
  methods: {
    ...mapMutations(['SET_USER']),
    ...mapMutations('user/checkoutErrors', ['CHECKOUT_FAILURE']),
    ...mapMutations('user', ['SET_USER_NAME', 'SET_USER_EMAIL']),
    ...mapActions('user', ['editUser', 'getUser']),
    saveUser() {
      const user = {
        name: this.userName,
        email: this.userEmail,
      };
      this.$v.userData.$touch();
      if (!this.$v.userData.$invalid && !this.isValidBackend) {
        this.editable = !this.editable;
        this.$preload('editUser', user);
      }
    },
    reset() {
      this.editable = !this.editable;
      this.$preload('getUser');
    },
  },
};
</script>

<style lang="css" scoped></style>
