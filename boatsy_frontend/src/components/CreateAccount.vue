<template>
  <div>
    <div class="modal-header">
      <h4>{{ $t("create_account_boatsy") }}</h4>
      <i class="fas fa-times" @click="hide()"></i>
    </div>
    <div
      class="modal-body"
      style="overflow: scroll; height: 90vh; scrollbar-width: thin"
    >
      <div v-if="error != null" class="errordiv">
        <i
          class="fas fa-exclamation-circle"
          style="color: #c13515; font-size: 64px"
        ></i>
        <div class="errordivrigth">
          <div style="font-weight: 700">{{ $t("create_account_error") }}</div>
          <div>{{ error }}</div>
        </div>
      </div>
      <div class="signup-content">
        <input
          type="text"
          v-on:click="checkOnClickFunction($event)"
          name="username"
          v-model.trim="$v.username.$model"
          :placeholder="$t('name')"
          :class="{ 'is-invalid': validationStatus($v.username) }"
          class="form-control form-control-lg"
        />
        <div
          v-if="!$v.username.required && checkOnClick.username"
          class="invalid-feedback"
        >
          {{ $t("personal_ınfo_name") }}
        </div>
      </div>
      <div class="signup-content">
        <input
          type="text"
          name="surname"
          v-on:click="checkOnClickFunction($event)"
          :placeholder="$t('surname')"
          v-model.trim="$v.surname.$model"
          :class="{ 'is-invalid': validationStatus($v.surname) }"
          class="form-control form-control-lg"
        />
        <div
          v-if="!$v.surname.required && checkOnClick.surname"
          class="invalid-feedback"
        >
          {{ $t("personal_info_surname") }}
        </div>
      </div>
      <div class="signup-content">
        <input
          name="email"
          style="padding: 10px"
          v-on:click="checkOnClickFunction($event)"
          type="text"
          :placeholder="$t('email_address')"
          v-model.trim="$v.email.$model"
          :class="{ 'is-invalid': validationStatus($v.email) }"
        />
        <div
          v-if="!$v.email.required && checkOnClick.email"
          class="invalid-feedback"
        >
          {{ $t("personal_info_email") }}
        </div>
        <div v-if="!$v.email.email" class="invalid-feedback">
          {{ $t("create_account-email") }}
        </div>
      </div>
      <div
        class="signup-content"
        style="
          width: 100%;
          border: 1px solid silver;
          padding-bottom: 0px;
          border-radius: 7px;
        "
      >
        <v-date-picker
          v-model="birthday"
          mode="date"
          color="red"
          :available-dates="{
            start: null,
            end: new Date(),
          }"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              readonly="readonly"
              style="border: none; background-color: white"
              :placeholder="$t('birthday')"
              class="form-control form-control-lg"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
      <br />
      <div
        class="signup-content"
        style="
          width: 100%;
          padding-bottom: 0px;
          border-radius: 7px;
        "
      >
        <vue-phone-number-input
          :default-country-code="'TR'"
          :translations="trans"
          v-on:click="checkOnClickFunction($event)"
          name="phoneNumber"
          v-model="phoneNumber"
          :class="{ 'is-invalid': validationStatus($v.phoneNumber) }"
          style="font-size: 9px"
        />
        <div
          v-if="
            (!$v.phoneNumber.required || !$v.phoneNumber.check) &&
            checkOnClick.phoneNumber
          "
          class="invalid-feedback"
        >
          {{ $t("personel_info_phone") }}
        </div>
      </div>
      <br />
      <div class="signup-content">
        <input
          type="password"
          style="padding: 10px"
          :placeholder="$t('password')"
          v-model="password"
          name="password"
          v-on:click="checkOnClickFunction($event)"
          min="8"
          :class="{ 'is-invalid': validationStatus($v.password) }"
        />
        <div
          v-if="!$v.password.required && checkOnClick.password"
          class="invalid-feedback"
        >
          {{ $t("create_account_password") }}
        </div>
        <div v-if="!$v.password.check" class="invalid-feedback">
          {{ $t("create_account_password2") }}
        </div>
        <div v-if="!$v.password.minLength" class="invalid-feedback">
          {{ $t("create_account_password_min") }}
          {{ $v.password.$params.minLength.min }}
          {{ $t("create_account_password_min_length") }}
        </div>
        <div v-if="!$v.password.maxLength" class="invalid-feedback">
          {{ $t("create_account_password_max") }}
          {{ $v.password.$params.maxLength.max }}
          {{ $t("create_account_password_min_length") }}
        </div>
      </div>
      <div class="signup-content">
        <input
          type="password"
          name="passwordAgain"
          style="padding: 10px"
          :placeholder="$t('re_password')"
          v-on:click="checkOnClickFunction($event)"
          v-model="passwordCheck"
          min="8"
          :class="{ 'is-invalid': validationStatus($v.passwordCheck) }"
        />
        <div
          v-if="!$v.passwordCheck.required && checkOnClick.passwordAgain"
          class="invalid-feedback"
        >
          {{ $t("create_account_password") }}
        </div>
        <div v-if="!$v.passwordCheck.check" class="invalid-feedback">
          {{ $t("create_account_password2") }}
        </div>
      </div>
      <div
        class="signup-content signup-button"
        @click="createAccount()"
        style="
          background: red;
          justify-content: center;
          align-items: center;
          display: flex;
          padding: 0;
          min-height: 65px;
          border-radius: 7px !important;
        "
      >
        <img
          v-if="loading"
          src="/assets/images/loading.gif"
          style="width: 50px"
        />
        <input
          type="button"
          v-if="!loading"
          class="signup-button"
          :value="$t('register')"
        />
      </div>

      <!--
      <div
        class="signup-content signup-divider"
        style="border-bottom:1px solid #ddd;"
      ></div>
    
          <div class="social-accounts">
            <div class="signup-content">
              <button class="signup-facebook-button">
                <i class="fab fa-facebook"></i>Facebook ile Devam Et
              </button>
            </div>
            <div class="signup-content">
              <button class="signup-facebook-button">
                <i class="fab fa-google"></i>Google ile Devam Et
              </button>
            </div>
          </div>
      -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import format from "date-fns/format";

import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  components: {},

  data() {
    return {
      disabledAfter: new Date(),
      name: "CreateAccount",
      dateFormat: "YYYY-MM-DD",
      username: "",
      surname: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordCheck: "",
      birthday: "",
      trans: {
        countrySelectorLabel: this.$i18n.locale != "tr"?"Country code":"Ülke kodu",
        countrySelectorError: this.$i18n.locale != "tr"?"You have not selected a country code!":"Ülke kodu seçmediniz!",
        phoneNumberLabel: this.$i18n.locale != "tr"?"Phone number":"Telefon numarası",
        phoneNumberError: this.$i18n.locale != "tr"?"Phone number is wrong!":"Telefon numarası yanlış!",
        example:this.$i18n.locale != "tr"?"Example": "Örnek",
      },
      error: null,
      loading: false,
      checkOnClick: {
        username: false,
        surname: false,
        email: false,
        phoneNumber: false,
        password: false,
        passwordAgain: false,
      },
    };
  },
  validations: {
    username: { required, minLength: minLength(3) },
    surname: { required },
    passwordCheck: {
      required,
      check(text) {
        return text == this.passwordCheck;
      },
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(24),
      check(text) {
        return text == this.passwordCheck;
      },
    },
    name: { required },
    email: { required, email },
    phoneNumber: {
      required,
      check(text) {
        const regex = /^[1-9]\d{2}\d{3}\d{4}/;
        return !regex.test(text.replace(" ", ""));
      },
    },
  },
  computed: {
    ...mapGetters(["getProfileModel"]),
  },

  methods: {
    checkOnClickFunction(data) {
      if (data.target.name == "username") this.checkOnClick.username = true;
      else if (data.target.name == "surname") this.checkOnClick.surname = true;
      else if (data.target.name == "email") this.checkOnClick.email = true;
      else if (data.target.name == "phoneNumber")
        this.checkOnClick.phoneNumber = true;
      else if (data.target.name == "password")
        this.checkOnClick.password = true;
      else if (data.target.name == "passwordAgain")
        this.checkOnClick.passwordAgain = true;
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    async createAccount() {
      if (this.loading == false) {
        this.loading = true;

        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) {
          this.loading = false;
          return;
        }

        var data = {
          name: this.username,
          surname: this.surname,
          email: this.email,
          phoneNumber: "90" + this.phoneNumber.replace(/\s+/g, ""),
          password: this.password.trim(),
          birthday:
            this.birthday == ""
              ? format(new Date(), this.dateFormat)
              : format(this.birthday, this.dateFormat),
        };
        var result = await Vue.prototype.$profileService.setProfil(data);

        if (result.error) {
          this.error = this.$i18n.t(result.errorMessage) ;
          this.loading = false;
          return;
        } else {
          var result2 = await this.$store.dispatch("login", {
            password: this.password.trim(),
            username: this.email,
          });

          Vue.swal.fire(
            "İşlem Başarılı",
            "Kaydınız başarıyla eklendi",
            "success"
          );
          this.$modal.hide("signUp-modal");
          if (this.getProfileModel.phoneVerify == 1) {
            var data = await this.$store.dispatch("send_verify");
            this.$modal.show("activasyon");
          }
          this.loading = false;
          return;
        }
      }
    },
    checkForm() {
      return false;
    },
    hide() {
      this.$modal.hide("signUp-modal");
    },
  },
};
</script>

<style>
.modal-body::-webkit-scrollbar {
  display: none;
}
.social-accounts {
  padding-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
}
.country-selector__country-flag[data-v-46e105de] {
  margin: auto 0;
  position: absolute;
  top: 15px !important;
  left: 11px;
  z-index: 1;
  cursor: pointer;
}
.mx-datepicker-popup {
  position: fixed !important;
}
.country-selector__label {
  font-size: 8px !important;
}
.modal-body select,
.modal-body input {
  width: 100%;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 7px;
}

.signup-google-button,
.signup-facebook-button {
  width: 100%;
  padding: 15px;
  display: grid;
  grid-template-columns: 10% 90%;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 700;
}
.modal-body input[type="button"] {
  background-color: #ef4036;
  border: none;
  color: #fff;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.2rem;
}
.modal-header i {
  font-size: 25px;
}
@media (max-width: 700px) {
  .vm--modal {
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow-y: scroll !important;
    top: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .social-accounts {
    grid-template-columns: repeat(1, 1fr);
  }
  .errordiv {
    border: 1px solid red;
    background-color: var(--f-mkcy-f);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }
  .errordivrigth {
    margin-left: 10px;
    text-align: start;
  }
  .invalid-feedback {
    display: block !important;
  }
}
</style>
