<template>
  <d-card>
    <d-card-body title="Реквизиты для договора и акта">
      <d-form>
        <d-form-row>
          <d-col lg="12">
            <d-form-row>
              <d-col md="12" class="form-group" :class="{ 'form-group--error': $v.form.name.$error }">
                <label for="item">Наименование </label> <br />
                <d-input
                  id="item"
                  v-model.trim="$v.form.name.$model"
                  type="text"
                  :state="validateField('name')"
                  @input="setField('name', $event)"
                  @focus.native="onFocusField('name')"
                  @blur.native="onBlurField('name')"
                />
                <div v-if="!focus.name && blur.name !== null">
                  <div v-if="!$v.form.name.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                  <div v-if="!$v.form.name.alphabet_cyrillic" class="validate-p-red">
                    Допустима только кириллица
                  </div>
                </div>
              </d-col>

              <d-col sm="12" md="6" class="form-group" :class="{ 'form-group--error': $v.form.inn.$error }">
                <label for="inn">ИНН</label>
                <d-input
                  id="inn"
                  v-model.trim="$v.form.inn.$model"
                  type="text"
                  pattern="[0-9]{10}([0-9]{2})?"
                  :state="validateField('inn')"
                  @input="setField('inn', $event)"
                  @focus.native="onFocusField('inn')"
                  @blur.native="onBlurField('inn')"
                />
                <div v-if="!focus.inn && blur.inn !== null">
                  <div v-if="!$v.form.inn.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                  <div v-if="!$v.form.inn.numeric" class="validate-p-red">
                    Допустимы только числа
                  </div>
                  <div v-if="!$v.form.inn.minLength && $v.form.inn.numeric" class="validate-p-red">
                    ИНН может иметь только
                    {{ $v.form.inn.$params.minLength.min }} цифр
                  </div>
                  <div v-if="!$v.form.inn.maxLength && $v.form.inn.numeric" class="validate-p-red">
                    ИНН может иметь только
                    {{ $v.form.inn.$params.maxLength.max }} цифр
                  </div>
                </div>
              </d-col>
              <d-col sm="12" md="6" class="form-group" :class="{ 'form-group--error': $v.form.kpp.$error }">
                <label for="kpp">КПП</label>
                <d-input
                  id="kpp"
                  v-model.trim="$v.form.kpp.$model"
                  type="text"
                  pattern="^$|[0-9]{9}"
                  :state="validateField('kpp')"
                  @input="setField('kpp', $event)"
                  @focus.native="onFocusField('kpp')"
                  @blur.native="onBlurField('kpp')"
                />
                <div v-if="!focus.kpp && blur.kpp !== null">
                  <div v-if="!$v.form.kpp.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                  <div v-if="!$v.form.kpp.numeric" class="validate-p-red">
                    Допустимы только числа
                  </div>
                  <div v-if="!$v.form.kpp.minLength && $v.form.kpp.numeric" class="validate-p-red">
                    КПП может иметь только
                    {{ $v.form.kpp.$params.minLength.min }} цифр
                  </div>
                  <div v-if="!$v.form.kpp.maxLength && $v.form.kpp.numeric" class="validate-p-red">
                    КПП может иметь только
                    {{ $v.form.kpp.$params.maxLength.max }} цифр
                  </div>
                </div>
              </d-col>
              <d-col
                md="12"
                class="form-group"
                :class="{
                  'form-group--error': $v.form.contact_name.$error,
                }"
              >
                <label for="contact_name">Контактное лицо</label>
                <d-input
                  id="contact_name"
                  v-model.trim="$v.form.contact_name.$model"
                  type="text"
                  :state="validateField('contact_name')"
                  @input="setField('contact_name', $event)"
                  @focus.native="onFocusField('contact_name')"
                  @blur.native="onBlurField('contact_name')"
                />
                <div v-if="!focus.contact_name && blur.contact_name !== null">
                  <div v-if="!$v.form.contact_name.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                  <div v-if="!$v.form.contact_name.alphabet_cyrillic" class="validate-p-red">
                    Допустима только кириллица
                  </div>
                </div>
              </d-col>
              <d-col md="12" class="form-group" :class="{ 'form-group--error': $v.form.phone.$error }">
                <label for="phone">Телефон</label>
                <d-input
                  id="phone"
                  v-model.trim="$v.form.phone.$model"
                  type="text"
                  placeholder="+7 (916) 123-45-67"
                  :state="validateField('phone')"
                  @input="setField('phone', $event)"
                  @focus.native="onFocusField('phone')"
                  @blur.native="onBlurField('phone')"
                />
                <div v-if="!focus.phone && blur.phone !== null">
                  <div v-if="!$v.form.phone.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                  <div v-if="!$v.form.phone.isPhone && $v.form.phone.$model.length > 0" class="validate-p-red">
                    Введите корректный номер телефона
                  </div>
                </div>
              </d-col>
              <d-col
                md="12"
                class="form-group"
                :class="{
                  'form-group--error': $v.form.delivery_address.$error,
                }"
              >
                <label for="delivery_address">Адрес доставки</label>
                <d-input
                  id="delivery_address"
                  v-model.trim="$v.form.delivery_address.$model"
                  name="delivery_address"
                  :state="validateField('delivery_address')"
                  @input="setField('delivery_address', $event)"
                  @focus.native="onFocusField('delivery_address')"
                  @blur.native="onBlurField('delivery_address')"
                />
                <div v-if="!focus.delivery_address && blur.delivery_address !== null">
                  <div v-if="!$v.form.delivery_address.required" class="validate-p-red">
                    * - обязательно к заполнению
                  </div>
                </div>
              </d-col>
              <d-col md="12" class="form-group">
                <d-button
                  v-if="
                    validateField('name') &&
                      validateField('inn') &&
                      validateField('kpp') &&
                      validateField('contact_name') &&
                      validateField('phone') &&
                      validateField('delivery_address')
                  "
                  id="activatedSaveButton"
                  ref="activatedSaveButton"
                  outline
                  theme="primary"
                  class="mb-2 mr-1"
                  type="button"
                  @click="
                    $preload('changePaymentDetails', {
                      name: form.name,
                      inn: form.inn,
                      kpp: form.kpp,
                      contact_name: form.contact_name,
                      phone: form.phone,
                      delivery_address: form.delivery_address,
                    });
                    refreshData();
                  "
                >
                  Сохранить
                </d-button>
                <d-button
                  v-else
                  id="disabledSaveButton"
                  ref="disabledSaveButton"
                  outline
                  disabled
                  theme="primary"
                  class="mb-2 mr-1"
                  type="button"
                >
                  Сохранить
                </d-button>
              </d-col>
            </d-form-row>
          </d-col>
        </d-form-row>
      </d-form>
    </d-card-body>
  </d-card>
</template>

<script>
// import Inputmask from "inputmask";
import { mapState, mapActions } from 'vuex';
import { required, minLength, maxLength, numeric, alpha, helpers } from 'vuelidate/lib/validators';
const alphabet_cyrillic = helpers.regex('alpha', /^[а-яА-ЯёЁ\s]*$/);
const isPhone = value =>
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm.test(value);

export default {
  data() {
    return {
      duration: 5,
      timeUntilDismissed: 0,
      alertTheme: null,
      form: {
        name: '',
        inn: '',
        kpp: '',
        contact_name: '',
        phone: '',
        delivery_address: '',
      },
      focus: {
        name: false,
        inn: false,
        kpp: false,
        contact_name: false,
        phone: false,
        delivery_address: false,
      },
      blur: {
        name: null,
        inn: null,
        kpp: null,
        contact_name: null,
        phone: null,
        delivery_address: null,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        alphabet_cyrillic,
      },
      inn: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        numeric,
      },
      kpp: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(9),
        numeric,
      },
      contact_name: {
        required,
        alphabet_cyrillic,
      },
      phone: {
        required,
        isPhone,
      },
      delivery_address: {
        required,
      },
    },
  },
  computed: {
    ...mapState('userPaymentDetails', ['requisites']),
  },
  watch: {
    requisites(newValue) {
      for (let [key, value] of Object.entries(newValue)) {
        this.setField(key, value);
        this.onFocusField(key);
        this.onBlurField(key);
      }
    },
  },
  mounted() {
    // const selector = document.getElementById("phoneNumber");
    // Inputmask({
    //   mask: "+9 (999) 999-99-99"
    // }).mask(selector);
    this.$preload('getRequisites');
  },
  methods: {
    ...mapActions('userPaymentDetails', ['getRequisites', 'changePaymentDetails']),
    setField(key, value) {
      this.form[key] = value;
      this.$v.form[key].$touch();
    },
    onFocusField(key) {
      this.focus[key] = true;
      this.blur[key] = null;
    },
    onBlurField(key) {
      if (!this.$v.form[key].$invalid) {
        this.focus[key] = false;
        this.blur[key] = true;
      } else {
        this.focus[key] = false;
        this.blur[key] = false;
      }
    },
    validateField(key) {
      return this.blur[key] && !this.$v.form[key].$invalid;
    },
    parseObject(object, value) {
      for (let element in object) {
        object[element] = value;
      }
    },
    refreshData() {
      this.parseObject(this.blur, null);
      this.parseObject(this.focus, false);
    },
  },
};
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.validate-p-red {
  margin: 0;
  padding: 0;
  color: #c4183c;
  height: 10px;
}

.page-title {
  white-space: nowrap;
}

.form-group {
  height: 100px;
  margin-bottom: 0rem;
}
@media screen and (max-width: 454px) {
  .page-title {
    white-space: normal;
  }
}
</style>
