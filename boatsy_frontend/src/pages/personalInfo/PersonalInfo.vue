<template>
  <div
    class="container personal-info-page"
    style="margin-top: 120px; text-align: start; min-height: 100vh"
  >
    <div class="row personal-info-page-header">
      <div class="col-12 header-top">
        <span
          ><router-link to="/account-settings">{{$t('login_security_bill')}}</router-link>
          <i class="fas fa-chevron-right" style="margin: 10px; font-size: 14px"></i>
          {{$t('account_personel_ınformation')}}
        </span>
      </div>
      <div class="col-12 header-bottom" style="padding-bottom: 40px">
        <h4>{{$t('account_personel_ınformation')}}</h4>
      </div>
    </div>
    <div class="row personal-info-page-body">
      <div class="col-lg-8">
        <div class="col-12 personal-info-content">
          <div class="user-profile-avatar">
            <i v-if="!user.id > 0" class="fas fa-user-circle useravatar"></i>
            <img
              v-if="user.id > 0"
              class="rounded-circle useravatars useravatar"
              :src="avatar == '' ? this.IMAGE_URL + user.avatar : avatarurl"
            />
          </div>

          <input
            type="file"
            style="display: none"
            id="avatarInput"
            @change="avatarImghandler"
          />

          <div class="row avatar-button" style="justify-content: start">
            <div v-on:click="uploadAvatar()" style="display: flex; align-items: center">
              <i class="fas fa-camera avatarIcon"></i>
            </div>
            <button
              class="personal-info-button"
              v-if="loadingButton"
              style="min-width: 80px"
            >
              <img src="/assets/images/loading.gif" width="25px" />
            </button>
            <button
              class="personal-info-button"
              v-if="saveButton && !loadingButton"
              @click="changeAvatar"
            >
              {{$t('notification_rec')}}
            </button>
          </div>
          <div class="input-container">
            <input
              type="text"
              v-model.trim="$v.user.name.$model"
              placeholder="Adınız"
              :class="{ 'is-invalid': validationStatus($v.user.name) }"
              class="form-control form-control-lg"
            />
            <div v-if="!$v.user.name.required" class="invalid-feedback">
              {{$t('personal_ınfo_name')}}
            </div>
          </div>
          <hr class="personal-info-solid" solid />
          <div class="input-container">
            <input
              type="text"
              v-model.trim="$v.user.surname.$model"
              placeholder="Soyadınız"
              :class="{ 'is-invalid': validationStatus($v.user.surname) }"
              class="form-control form-control-lg"
            />
            <div v-if="!$v.user.surname.required" class="invalid-feedback">
              {{$t('personal_info_surname')}}
            </div>
          </div>
          <hr class="personal-info-solid" solid />
          <div class="input-container">
            <date-picker
              format="DD/MM/YYYY"
              v-model.trim="user.birthday"
              style="width: 100%; padding: 0px"
              placeholder="Doğum tarihinizi girin"
              :disabled-date="(date) => date >= new Date(2012,1,1,0,0)"
            ></date-picker>
          </div>
          <hr class="personal-info-solid" solid />
          <div class="input-container">
            <input
              type="email"
              class="form-control"
              :placeholder="$t('forgot_password_email')"
              v-model.trim="$v.user.email.$model"
              :class="{ 'is-invalid': validationStatus($v.user.email) }"
            />
            <div v-if="!$v.user.email.required" class="invalid-feedback">
              {{$t('personal_info_email')}}
            </div>
            <div v-if="!$v.user.email.email" class="invalid-feedback">
              {{$t('personal_info_email')}}
            </div>
          </div>
          <hr class="personal-info-solid" solid />
          <div class="input-container">
            <vue-phone-number-input
              @update="phoneNumberModel = $event"
              :default-country-code="'TR'"
              :translations="trans"
              v-model.trim="$v.user.phoneNumber.$model"
              :class="{ 'is-invalid': validationStatus($v.user.phoneNumber) }"
            />
            <div
              v-if="!$v.user.phoneNumber.required || !$v.user.phoneNumber.check"
              class="invalid-feedback"
            >
              {{$t('personel_info_phone')}}
            </div>
          </div>
          <hr class="personal-info-solid" solid />
          <div class="input-container">
            <input
              :placeholder="$t('personel_ınfo_user_adres')"
              type="adress"
              class="form-control"
              v-model="user.address"
            />
          </div>
          <hr class="personal-info-solid" solid />
          <div class="confirm-button" style="justify-content: start">
            <button
              class="personal-info-button"
              v-if="loadingButton"
              style="min-width: 150px"
            >
              <img src="/assets/images/loading.gif" width="25px" />
            </button>
            <button class="personal-info-button" v-on:click="editProfile()" v-else>
              {{$t('personal_info_info-button')}}
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="container personal-info-detail">
          <div class="container personal-info-detail-style">
            <div v-if="user.identityVerify == 0">
              <div class="row">
                <i
                  class="fas fa-id-card"
                  style="font-size: 30px; padding: 10px; color: #ef4036"
                ></i>
              </div>
              <div class="row">
                <h1
                  class="personal-info-detail-title-two"
                  style="font-weight: bold; font-size: 17px; margin-top: 10px"
                >
                  {{$t('personel_info_detail-title-two')}}
                </h1>
                <h2 style="font-size: 1rem">
                  {{$t('personel_info_detail-title-two-2')}}
                  <br />
                  <br />
                  {{$t('personel_info_detail-title-two-3')}}
                </h2>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                style="display: none"
                id="identityInput"
                @change="identityImghandler"
              />

              <div class="row confirm-button" style="justify-content: start">
                <button class="identityVerify-info-button" v-on:click="uploadIdentity()">
                  {{$t('personel_info_uploadIdentity')}}
                </button>
              </div>
              <hr class="personal-info-body" solid />
            </div>
            <div v-else-if="user.identityVerify == 1">
              <div class="row">
                <i
                  class="fas fa-id-card"
                  style="font-size: 30px; padding: 10px; color: orange"
                ></i>
              </div>
              <div class="row">
                <h5
                  class="personal-info-detail-title-two"
                  style="font-weight: bold; font-size: 17px; margin-top: 10px"
                >
                  {{$t('personel_info_identity')}}
                </h5>
                <h6>
                  {{$t('personel_info_examination')}}
                  <br />
                  <br />
                </h6>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                style="display: none"
                id="identityInput"
                @change="identityImghandler"
              />
              <div class="row confirm-button" style="justify-content: start">
                <button
                  class="identityVerify-rupload-button"
                  v-on:click="uploadIdentity()"
                >
                  {{$t('personel_info_try_again')}}
                </button>
              </div>
              <hr class="personal-info-body" solid />
            </div>
            <div v-else>
              <div class="row">
                <i
                  class="fas fa-check-circle"
                  style="font-size: 40px; padding: 10px; color: green"
                ></i>
              </div>
              <div class="row">
                <h5
                  class="personal-info-detail-title-two"
                  style="font-weight: bold; font-size: 17px; margin-top: 10px"
                >
                  {{$t('personel_info_info-body')}}
                </h5>
              </div>
              <hr class="personal-info-body" solid />
            </div>
            <div class="row">
              <i
                class="fas fa-user-lock"
                style="font-size: 28px; padding: 10px; color: #ef4036"
              ></i>
            </div>
            <div class="row">
              <h1
                class="personal-info-detail-title"
                style="font-weight: bold; font-size: 17px; margin-top: 10px"
              >
                {{$t('personel_ınfo_personal-info-detail-title')}}
              </h1>
              <h2 style="font-size: 1rem">
                {{$t('personel_ınfo_personal-info-detail-text')}}
              </h2>
            </div>
            <hr class="personal-info-body" solid />
            <div class="row">
              <i
                class="fas fa-id-card"
                style="font-size: 30px; padding: 10px; color: #ef4036"
              ></i>
            </div>
            <div class="row">
              <h1
                class="personal-info-detail-title-two"
                style="font-weight: bold; font-size: 17px; margin-top: 10px"
              >
                {{$t('personal-info-detail-title-two')}}
              </h1>
              <h2 style="font-size: 1rem">
                {{$t('personal-info-detail-title-text')}}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../config/GlobalVariables";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { required, email, minLength, maxLength } from "vuelidate/lib/validators";
import {
  EDIT_PROFILE,
  UPDATE_AVATAR,
  REFRESH_PROFILE,
  UPDATE_IDENTITY,
} from "../../store/actions.type.js";
export default {
  components: { DatePicker },
  data() {
    return {
      saveButton: false,
      loadingButton: false,
      error: null,
      IMAGE_URL: IMAGE_URL,
      avatar: "",
      avatarurl: "",
      phoneNumberModel: {
        isValid: false,
      },
      user: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        identificationNumber: "",
        address: "",
        birthday: null,
        password: "",
        aboutMe: "",
        avatar: "",
        taxNumber: "",
        taxType: false,
        phoneTwo: "",
        companyName: "",
        rosette: "",
        dtInsert: null,
        spokenLanguage: [],
        iban: "",
      },
      trans: {
        countrySelectorLabel: "Ülke kodu",
        countrySelectorError: "Ülke kodu seçmediniz!",
        phoneNumberLabel: "Telefon numarası",
        phoneNumberError: "Telefon numarası yanlış",
        example: "Örnek",
      },
    };
  },
  validations: {
    user: {
      name: { required, minLength: minLength(3) },
      surname: { required },
      email: { required, email },
      birthday: { required },
      phoneNumber: {
        required,
        check(text) {
          return this.phoneNumberModel.isValid;
        },
      },
    },
  },
  computed: {
    ...mapGetters(["getProfileModel"]),
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    async editProfile() {
      this.loadingButton = true;
      this.$v.$touch();
      if (this.$v.$error) {
        return false;
      }
      var data = {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        phoneNumber:
          this.phoneNumberModel.countryCallingCode + this.phoneNumberModel.nationalNumber.replace(/\s+/g,""),
        address: this.user.address,
        identificationNumber: this.user.identificationNumber,
        birthday:
          new Date(this.user.birthday).getFullYear() +
          "-" +
          (new Date(this.user.birthday).getMonth() + 1) +
          "-" +
          new Date(this.user.birthday).getDate(),
        avatar: this.user.avatar,
      };

      var result = await this.$store.dispatch(EDIT_PROFILE, data);
      if (!result.error) {
        this.loadingButton = false;
        this.$swal.fire("İşlem Başarılı", "", "success");
        await this.$store.dispatch(REFRESH_PROFILE);
        this.user = this.getProfileModel;
        if (
          this.user.phoneNumber
            .replaceAll(" ", "")
            .replaceAll("(", "")
            .replaceAll(")", "").length > 11
        ) {
          this.user.phoneNumber = this.user.phoneNumber.slice(1);
        }
        this.user.birthday = new Date(this.getProfileModel.birthday);
      } else {
        this.loadingButton = false;
        this.error = "Bilgiler eksik ya da yanlış,tekrar giriniz.";
        this.$swal.fire(this.error, "", "error");
      }
    },
    async changeAvatar() {
      if (this.avatar != "") {
        this.loadingButton = true;
        var result = await this.$store.dispatch(UPDATE_AVATAR, {
          newImage: this.avatar.replace("data:", "").replace(/^.+,/, ""),
        });
        if (result.error) {
          this.loadingButton = false;
          this.error = "Profil resmi yüklenemedi.";
          this.$swal.fire(this.error, "", "error");
          return;
        } else {
          this.loadingButton = false;
          this.saveButton = false;
          this.$swal.fire("İşlem Başarılı", "", "success");
          await this.$store.dispatch(REFRESH_PROFILE);
          this.user = this.getProfileModel;
        }
      }
    },
    getBase64: (file) =>
      new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
      }),
    async avatarImghandler(target) {
      this.avatar = await this.getBase64(target.target.files[0]);
      this.avatarurl = URL.createObjectURL(target.target.files[0]);
      this.saveButton = true;
    },
    async identityImghandler(target) {
      var identityFile = await this.getBase64(target.target.files[0]);
      var result = await this.$store.dispatch(UPDATE_IDENTITY, {
        bytes: identityFile.replace("data:", "").replace(/^.+,/, ""),
        extension: target.target.files[0]["type"].replace("image/", ""),
      });
      if (result.error) {
        this.error = "Kimlik yüklenemedi.";
        this.$swal.fire(this.error, "", "error");
        return;
      } else {
        this.$swal.fire("İşlem Başarılı", "", "success");
        await this.$store.dispatch(REFRESH_PROFILE);
        this.user = this.getProfileModel;
      }
    },
    async uploadAvatar() {
      $("#avatarInput").click();
    },
    async uploadIdentity() {
      $("#identityInput").click();
    },
  },
  created: function () {
    this.user = this.getProfileModel;
    if (
      this.user.phoneNumber.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "")
        .length > 11
    ) {
      this.user.phoneNumber = this.user.phoneNumber.slice(1);
    }
    this.user.birthday = new Date(this.getProfileModel.birthday);
  },
};
</script>
<style>
.personal-info-button {
  padding: 12px;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  color: white;
  border: transparent;
  font-weight: bold;
}
.identityVerify-info-button {
  padding: 12px;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  background-color: #15bb3f;
  color: white;
  border: transparent;
  font-weight: bold;
}

.identityVerify-rupload-button {
  padding: 10px;
  font-size: 14px;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  background-color: orange;
  color: white;
  border: transparent;
  font-weight: bold;
}

.identityVerify--info-button {
  padding: 12px;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  background-color: #15bb3f;
  color: white;
  border: transparent;
  font-weight: bold;
}

.personal-info-button:hover {
  background-color: gray;
}
.avatarIcon {
  margin-left: 60px;
  margin-right: 30px;
  font-size: 20px;
}
.avatarIcon:hover {
  color: #ef4036;
}
.useravatars {
  width: 100px;
  padding: 0;
  margin: 0;
  margin-left: 5px;
  aspect-ratio: 1;
  object-fit: cover;
}
.personal-info-solid {
  margin-top: -25px;
  margin-left: 10px;
}
.header-bottom {
  margin-left: 15px;
  margin-top: 14px;
}
.header-bottom h4 {
  font-weight: bold;
  font-size: 25px;
}
.personal-info-body {
  width: 50px;
  color: gray;
}
.personal-info-detail-style {
  width: 300px;
  text-align: left;
  margin: 20px;
}
.personal-info-detail {
  padding: 10px;
  border: 1px solid silver;
  margin: 20px;
  border-radius: 0.5rem;
}
.personal-info-content {
  display: grid;
  gap: 2em;
  padding-bottom: 4em;
}
.header-top span {
  font-size: 16px;
  font-weight: 200;
}
.header-top a {
  color: #2c3e50 !important;
  margin-left: 15px;
}
.input-container span {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 5px;
  color: #333;
  margin-left: 10px;
}
.input-container span:hover {
  text-decoration: underline;
}
.input-container textarea {
  height: 150px !important;
  padding: 10px !important;
}
.personal-info-page .form-control {
  padding: 0 10px;
  max-width: 800px;
  border-color: white;
  font-size: 16px;
}
.header-top:hover a {
  text-decoration: underline;
}
.mx-input {
  border: none !important;
  box-shadow: none !important;
}
.input-tel__input,
.country-selector__input {
  border: none !important;
}
@media (max-width: 550px) {
  .personal-info-content {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
