<template>
  <div>
    <div class="modal-header">
      <h4>{{ $t("boat_reservation_outline_wishlist") }}!</h4>
      <i class="fas fa-times" @click="hide('non-auth-send-booking-modal')"></i>
    </div>
    <div
      class="modal-body"
      style="overflow: scroll; height: 90vh; scrollbar-width: thin"
    >
      <div class="support-body">
        <div class="support-body-text">
          {{ $t("non_auth_booking_body") }}
        </div>
      </div>
      <div class="signup-content">
        <div v-if="error != null" class="errordiv">
          <i
            class="fas fa-exclamation-circle"
            style="color: #c13515; font-size: 64px"
          ></i>
          <div class="errordivrigth">
            <div style="font-weight: 700">
              {{ $t("create_account_error") }}
            </div>
            <div>{{ $t(error) }}</div>
          </div>
        </div>
        <input
          style="padding: 9px !important"
          type="text"
          :placeholder="$t('notification_email')"
          v-model="email"
        />
      </div>
      <div class="signup-content">
        <vue-phone-number-input
          :default-country-code="'TR'"
          :translations="trans"
          :countryCallingCode="countryCallingCode"
          name="phoneNumber"
          v-model="phoneNumber"
          @update="updatePhoneNumber"
          style="font-size: 9px"
        />
      </div>
      <div class="reservation-note">
        <textarea
          :placeholder="$t('booking_note_card_question')"
          v-model="bookingNote"
        ></textarea>
      </div>
      <div
        class="signup-content"
        @click="onSubmit()"
        style="
          background: red;
          justify-content: center;
          align-items: center;
          display: flex;
          padding: 0;
          border-radius: 7px;
          min-height: 65px;
        "
      >
        <input
          type="button"
          v-if="!loading"
          class="signup-button"
          :value="$t('forgot_password_send')"
        />
        <img
          v-if="loading"
          src="/assets/images/loading.gif"
          style="width: 50px"
        />
      </div>
      <div class="signup-content" style="margin-top: 20px">
        <span>{{ $t("or") }}</span>
      </div>
      <div class="signup-content">
        <span style="color: #325aa8">
          <a @click="login()">{{ $t("footers_sıgn_ın") }}</a></span
        >
      </div>
      <div class="signup-content">
        <span
          >{{ $t("login_card_signup-content") }}
          <a style="color: #325aa8" @click="singup()">{{
            $t("header_register")
          }}</a></span
        >
      </div>
      <div class="signup-content">
        <span
          >{{ $t("login_card_forget_pas") }}
          <a
            href="/forgetpassword"
            @click="hide('signIn-modal')"
            class="new-password"
            >{{ $t("login_card_new-password") }}</a
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { NON_AUTH_FETCH_BOOKING } from "../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      phoneNumber: "",
      phoneNumberData: null,
      email: "",
      error: null,
      loading: false,
      bookingNote: "",
      countryCallingCode: 90,
      trans: {
        countrySelectorLabel:
          this.$i18n.locale != "tr" ? "Country code" : "Ülke kodu",
        countrySelectorError:
          this.$i18n.locale != "tr"
            ? "You have not selected a country code!"
            : "Ülke kodu seçmediniz!",
        phoneNumberLabel:
          this.$i18n.locale != "tr" ? "Phone number" : "Telefon numarası",
        phoneNumberError:
          this.$i18n.locale != "tr"
            ? "Phone number is wrong!"
            : "Telefon numarası yanlış!",
        example: this.$i18n.locale != "tr" ? "Example" : "Örnek",
      },
    };
  },
  created() {
    this.bookingNote = this.getReservationNote;
  },
  computed: {
    ...mapGetters(["getReservationNote", "getStartDate", "getEndDate"]),
  },

  methods: {
    updatePhoneNumber(data) {
      this.phoneNumberData = data;
    },
    singup() {
      this.hide("non-auth-send-booking-modal");
      this.show("signUp-modal");
    },
    login() {
      this.hide("non-auth-send-booking-modal");
      this.show("signIn-modal");
    },
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
    async onSubmit() {
      this.loading = true;
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (this.email == "" && this.phoneNumber == "") {
        this.error = "Lütfen tüm alanları doldurun";
      } else if (this.email == "") {
        this.error = "E-posta alanı boş bırakılamaz";
      } else if (!emailPattern.test(this.email)) {
        this.error = "Bu e-posta hatalı. Başka e-posta kullanmayı deneyin";
      } else if (this.phoneNumber.length < 8) {
        this.error = "Telefon numarası hatalı";
      } else {
        var data = await this.$store.dispatch(NON_AUTH_FETCH_BOOKING, {
          boatId: this.$router.history.current.params["boatId"],
          phoneNumber:
            this.phoneNumberData.countryCallingCode +
            this.phoneNumberData.nationalNumber,
          email: this.email,
          bookingNote: this.bookingNote,
          startDate: this.getStartDate,
          endDate: this.getEndDate,
          url: "https://boatsy.net" + this.$router.history.current.fullPath,
        });
        if (!data.error) {
          this.$modal.hide("non-auth-send-booking-modal");
          this.$toast.success(
            this.$i18n.t("success_non_auth_booking_message"),
            {
              icon: "far fa-check-circle",
              timeout: 2500,
            }
          );
        } else {
          this.error = data.message;
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.new-password {
  color: #325aa8;
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
</style>
