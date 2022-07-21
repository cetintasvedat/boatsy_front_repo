<template>
  <div>
    <div class="modal-header">
      <h1 style="font-size: 1.5rem; color: #ef4036; font-weight: bold">
      </h1>
      <i class="fas fa-times" @click="hide()" style="cursor: pointer;"></i>
    </div>
    <div class="modal-body" style="padding: 0 60px;">
      <div class="why-vv-box">
        <div class="icon">
          <img
            src="/img/tatil-danisma.svg"
            alt=""
            style="width: 100px !important; margin: 0 20px;"
          />
        </div>
        <div class="content ">
          <p class="title">{{ $t("special-vacation-consultant") }}</p>
          <p class="desc">{{ $t("special-vacation-consultant-text") }}</p>
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
          style="width: 100%; height: 200px; padding: 9px; border-radius: 7px;"
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
      <div class="why-vv-box">
        <div class="icon">
          <img
            src="/img/tekne.svg"
            alt=""
            style="width: 100px !important; margin: 0 20px;"
          />
        </div>
        <div class="content">
          <p class="title">{{ $t("ten-thousand-caravan") }}</p>
          <p class="desc">{{ $t("ten-thousand-caravan-text") }}</p>
        </div>
      </div>
      <div class="why-vv-box">
        <div class="icon">
          <img
            src="/img/fiyat-garanti.svg"
            alt=""
            style="width: 100px !important; margin: 0 20px;"
          />
        </div>
        <div class="content">
          <p class="title">{{ $t("best-price-guarantee") }}</p>
          <p class="desc">{{ $t("best-price-guarantee-text") }}</p>
        </div>
      </div>
      <div class="why-vv-box" style="margin-bottom: 40px;">
        <div class="icon">
          <img
            src="/img/canli-destek.svg"
            alt=""
            style="width: 100px !important; margin: 0 20px;"
          />
        </div>
        <div class="content">
          <p class="title">{{ $t("live-support") }}</p>
          <p class="desc">{{ $t("live-support-text") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NON_AUTH_FETCH_BOOKING } from "../../../store/actions.type";
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
    hide() {
      this.$modal.hide("InfoCardModal");
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
        var body = {
          boatId: 0,
          phoneNumber:
            this.phoneNumberData.countryCallingCode +
            this.phoneNumberData.nationalNumber,
          email: this.email,
          bookingNote:
            this.bookingNote +
            "...Boatsy not: Anasayfadaki karttan gönderildi.",
          startDate: this.getStartDate,
          endDate: this.getEndDate,
          url: "https://boatsy.net" + this.$router.history.current.fullPath,
        };
        var data = await this.$store.dispatch(NON_AUTH_FETCH_BOOKING, body);
        if (!data.error) {
          this.$modal.hide("InfoCardModal");
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

<style scoped>
.btn-x {
  border-radius: 50%;
  border: none;
  position: fixed;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 150px;
  height: 150px;
}

.title {
  text-align: center;
  padding-top: 30px;
  font-size: 30px;
  font-weight: 600;
  color: rgba(32, 32, 32, 0.55);
}

.desc {
  margin: -20px 30px 30px 30px;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  font-weight: 300;
  color: rgba(32, 32, 32, 0.55);
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
@media (max-width: 540px) {
  .modal-body {
    padding: 0 40px !important;
  }
}
</style>
