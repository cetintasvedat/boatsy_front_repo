<template>
  <div>
    <div class="modal-header">
      <h4>{{ $t("boat_reservation_outline_wishlist") }}!</h4>
      <i
        class="fas fa-times"
        @click="hide('non-auth-send-booking-modal-with-payment')"
      ></i>
    </div>
    <div
      class="modal-body"
      style="overflow: scroll; height: 85vh; scrollbar-width: thin"
    >
      <div class="support-body">
        <div class="support-body-text" style="font-size: 12px">
          {{ $t("non_auth_booking_with_payment_body") }}
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
          style="border: 1px solid lightgray; height: 75px !important"
          :placeholder="$t('booking_note_card_question')"
          v-model="bookingNote"
        ></textarea>
      </div>
      <div class="payment-page-left" style="padding-top: 10px">
        <div
          class="row paymnet-online"
          style="
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
            border-top: 1px solid #ddd;
          "
        >
          <div
            class="col-12 reservation-info-header"
            style="padding-bottom: 0px"
          >
            <h4>{{ $t("booking_detail_payment") }}</h4>
          </div>
          <div class="col-12 row payment-online card-info">
            <div class="col-12 card-info card-name" style="margin-bottom: 10px  !important">
              <span class="">{{
                $t("booking_detail_card-name")
              }}</span>
              <input
                type="text"
                placeholder="Adınız"
                v-model.trim="$v.name.$model"
                style="border-radius: 5px !important; height: 40px !important; padding: 10px !important"
                :class="{ 'is-invalid': validationStatus($v.name) }"
              />

              <div
                v-if="!$v.name.required || !$v.name.minLength"
                class="invalid-feedback"
              >
                {{ $t("booking_detail_name") }}
              </div>
            </div>
            <div class="col-12 card-info card-number">
              <span class="">{{
                $t("booking_detail_card-number")
              }}</span>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                v-model.trim="$v.creditNumber.$model"
                v-cardformat:formatCardNumber
                style="border-radius: 5px; height: 40px; padding: 10px"
                @keyup="controlInstallment"
                :class="{ 'is-invalid': validationStatus($v.creditNumber) }"
              />
              <div
                v-if="!$v.creditNumber.required || !$v.creditNumber.minLength"
                class="invalid-feedback"
              >
                {{ $t("booking_detail_number") }}
              </div>
            </div>
            <div
              class="col-6 card-info card-expiration"
              style="padding-right: 0; padding-top: 10px"
            >
              <span class="">{{
                $t("booking_detail_card-expiration")
              }}</span>
              <input
                :maxlength="7"
                type="text"
                placeholder="AA/YY"
                style="
                  border-radius: 5px;
                  height: 40px;
                  padding: 10px;
                  border-top: 1px solid lightgray;
                "
                v-model.trim="$v.cardExpiration.$model"
                v-cardformat:formatCardExpiry
                :class="{ 'is-invalid': validationStatus($v.cardExpiration) }"
              />
              <div
                v-if="
                  !$v.cardExpiration.required ||
                  !$v.cardExpiration.minLength ||
                  !$v.cardExpiration.maxLength
                "
                class="invalid-feedback"
              >
                {{ $t("booking_detail_cardExpiration.required") }}
              </div>
            </div>
            <div
              class="col-6 card-info card-cvv"
              style="padding-left: 0; padding-top: 10px"
            >
              <span class="" style="padding-left: 0">CVV</span>
              <input
                type="text"
                placeholder="123"
                v-model.trim="$v.cvvCode.$model"
                style="
                  border-radius: 5px;
                  height: 40px;
                  padding: 10px;
                  border-top: 1px solid lightgray;
                "
                v-cardformat:formatCardCVC
                :class="{ 'is-invalid': validationStatus($v.cvvCode) }"
              />
              <div
                v-if="!$v.cvvCode.required || !$v.creditNumber.minLength"
                class="invalid-feedback"
              >
                {{ $t("booking_detail_cvvCode.required") }}
              </div>
            </div>
            <div
              class="row col-12 card-info installment"
              style="
                justify-conten: space-between;
                padding-top: 30px;
                padding-right: 0;
              "
            >
              <span
                class="col-4 label-select"
                style="font-size: 16px; font-weight: 600"
                >{{ $t("booking_detail_label-select") }}
              </span>
              <select
                style="height: 32px; width: 100%; border-radius: 12px;padding:5px"
                v-model="selectedInstallment"
                class="col-8 selectMenu"
              >
                <option
                  v-for="(element, index) in getInstallments"
                  :key="index"
                  class="selectOption"
                  :value="element.InstallmentNumber"
                >
                  <div v-if="element.InstallmentNumber == 1">Tek çekim</div>
                  <div v-else>
                    {{ element.InstallmentNumber }} x
                    {{ element.PerInstallmentAmount }}
                  </div>
                </option>
              </select>
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>
<script>
import {
  NON_AUTH_FETCH_BOOKING_WITH_PAYMENT,
  CALCULATE_PAYMENT,
  PAYMENT,
} from "../store/actions.type.js";
import format from "date-fns/format";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      creditNumber: "",
      cvvCode: "",
      cardExpiration: "",
      calculatePaymentBody: {
        binNumber: "",
        bookingId: "",
      },
      name: "",
      selectedInstallment: 1,
      secureUrl: "",
      prevent_bust: false,
      from_loading_204: false,
      frame_loading: false,
      prevent_bust_timer: 0,
      primer: true,
      phoneNumber: "",
      phoneNumberData: null,
      email: "",
      error: null,
      loading: false,
      bookingNote: "",
      bookingId:0,
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
  validations: {
    name: { required, minLength: minLength(3) },
    creditNumber: { required, minLength: minLength(19) },
    cvvCode: { required, minLength: minLength(3) },
    cardExpiration: {
      required,
      minLength: minLength(7),
      maxLength: maxLength(7),
    },
  },
  created() {
    this.bookingNote = this.getReservationNote;
    window.onbeforeunload = function (event) {
      event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      event.target = $("#payment-3d-iframe");
    };
  },
  computed: {
    ...mapGetters([
      "getReservationNote",
      "getStartDate",
      "getEndDate",
      "getInstallments",
    ]),
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    controlInstallment() {
      var creditNumber = this.creditNumber.replaceAll(" ", "");
      var lenght = creditNumber.replace(/\s+/g, "").length;

      if (lenght == 6) {
        this.calculatePaymentBody.binNumber = creditNumber;
        this.calculatePaymentBody.bookingId = this.bookingId;
        this.calculatePaymentBody.boatId =
          this.$router.history.current.params["boatId"];
        this.calculatePaymentBody.startDate = this.getStartDate;
        this.calculatePaymentBody.endDate = this.getEndDate;

        this.$store.commit(
          "setCalculatePaymentRequestModel",
          this.calculatePaymentBody
        );
        this.$store.dispatch(CALCULATE_PAYMENT);
      }
    },
    async payment() {
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) {
        return false;
      }else if (this.bookingId <1){
        return false;
      }
      var creditNumber = this.creditNumber.split(" ").join("");
      var data = {
        cardNumber: creditNumber,
        cardDate: this.cardExpiration.replaceAll(" ", ""),
        cardPersonName: this.name,
        cardSecret: this.cvvCode,
        bookingId: this.bookingId.toString(),
        cardInstallmentNumber: this.selectedInstallment,
      };

      this.$store.commit("setPaymentRequestModel", data);
      var res = await this.$store.dispatch(PAYMENT);
      if (res.error == false) {
        this.secureUrl = res.data;
        window.location = res.data;
      } else {
        this.$swal.fire("İşlem Başarılı", res.errorMessage, "success");
      }
    },

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
      this.$v.$touch();
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (this.email == "" && this.phoneNumber == "") {
        this.error = "Lütfen tüm alanları doldurun";
      } else if (this.email == "") {
        this.error = "E-posta alanı boş bırakılamaz";
      } else if (!emailPattern.test(this.email)) {
        this.error = "Bu e-posta hatalı. Başka e-posta kullanmayı deneyin";
      } else if (this.phoneNumber.length < 8) {
        this.error = "Telefon numarası hatalı";
      } else if (this.$v.$pendding || this.$v.$error) {
        return false;
      } else {
        this.loading = true;

        var creditNumber = this.creditNumber.split(" ").join("");
        var bookingId = this.$router.history.current.params["bookId"];
        var body = {
          boatId: this.$router.history.current.params["boatId"],
          phoneNumber:
            this.phoneNumberData.countryCallingCode +
            this.phoneNumberData.nationalNumber,
          email: this.email,
          bookingNote: this.bookingNote,
          startDate: this.getStartDate,
          endDate: this.getEndDate,
        };

        // this.$store.commit("setPaymentRequestModel", data);
        // var res = await this.$store.dispatch(PAYMENT);
        // if (res.error == false) {
        //   this.secureUrl = res.data;
        //   window.location = res.data;
        // } else {
        //   this.$swal.fire("İşlem Başarılı", res.errorMessage, "success");
        // }
        var data = await this.$store.dispatch(
          NON_AUTH_FETCH_BOOKING_WITH_PAYMENT,
          body
        );
        
        if (!data.error) {
         this.bookingId = data.data.bookingId;
         window.fbq('track', 'AddToCart', {bookingId: data.data.bookingId,currency:this.$store.getters.getSelectedCurrency==1?"TRY":this.$store.getters.getSelectedCurrency==2?"EUR":"USD"});
         await this.payment();
         
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
