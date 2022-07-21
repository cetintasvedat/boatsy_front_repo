<template>
  <div class="payment-page-left">
    <div
      class="row paymnet-online"
      style="
        padding: 40px 0;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
      "
    >
      <div class="col-12 reservation-info-header" style="padding-bottom: 15px">
        <h4>{{$t('booking_detail_payment')}}</h4>
      </div>
      <div class="col-12 row payment-online card-info">
        <div class="col-12 card-info card-name" style="margin-bottom: 15px">
          <span class="date-info">{{$t('booking_detail_card-name')}}</span>
          <input
            type="text"
            placeholder="Adınız"
            v-model.trim="$v.name.$model"
            style="border-radius: 12px"
            :class="{ 'is-invalid': validationStatus($v.name) }"
          />

          <div
            v-if="!$v.name.required || !$v.name.minLength"
            class="invalid-feedback"
          >
            {{$t('booking_detail_name')}}
          </div>
        </div>
        <div class="col-12 card-info card-number">
          <span class="date-info">{{$t('booking_detail_card-number')}}</span>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            v-model.trim="$v.creditNumber.$model"
            v-cardformat:formatCardNumber
            @keyup="controlInstallment"
            :class="{ 'is-invalid': validationStatus($v.creditNumber) }"
          />
          <div
            v-if="!$v.creditNumber.required || !$v.creditNumber.minLength"
            class="invalid-feedback"
          >
            {{$t('booking_detail_number')}}
          </div>
        </div>
        <div class="col-6 card-info card-expiration" style="padding-right: 0">
          <span class="date-info">{{$t('booking_detail_card-expiration')}}</span>
          <input
            :maxlength="7"
            type="text"
            placeholder="AA/YY"
            v-model.trim="$v.cardExpiration.$model"
            v-cardformat:formatCardExpiry
            :class="{ 'is-invalid': validationStatus($v.cardExpiration) }"
          />
          <div
            v-if="!$v.cardExpiration.required || !$v.cardExpiration.minLength|| !$v.cardExpiration.maxLength"
            class="invalid-feedback"
          >
            {{$t('booking_detail_cardExpiration.required')}}
          </div>
        </div>
        <div class="col-6 card-info card-cvv" style="padding-left: 0">
          <span class="date-info" style="padding-left: 0">CVV</span>
          <input
            type="text"
            placeholder="123"
            v-model.trim="$v.cvvCode.$model"
            v-cardformat:formatCardCVC
            :class="{ 'is-invalid': validationStatus($v.cvvCode) }"
          />
          <div
            v-if="!$v.cvvCode.required || !$v.creditNumber.minLength"
            class="invalid-feedback"
          >
            {{$t('booking_detail_cvvCode.required')}}
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
            >{{$t('booking_detail_label-select')}}
          </span>
          <select
            style="height: 32px; width: 100%; border-radius: 12px"
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
    <div class="row paymnet-online" style="padding: 40px 0">
      <div>
        <div
          class="col-12 reservation-info-header"
          style="padding-bottom: 15px"
        >
          <h4>{{$t('booking_detail_canceled_polit')}}</h4>
        </div>
        <div class="col-12 book-detail-header" v-if="!getBoatRulesLoading">
          <div v-if="getBoatRules.reservationFlexibility == 0">
            <span style="font-weight: 600">{{$t('filter_header_esnek')}}</span>
            <p>{{$t('boat_condition_advance_payment_day')}}</p>
          </div>
          <div v-else-if="getBoatRules.reservationFlexibility == 1">
            <span style="font-weight: 600">{{$t('filter_header_esnek')}}</span>
            <p>
              {{$t('boat_condition_advance_payment_mounth')}}
            </p>
          </div>
          <div v-else>
            <span style="font-weight: 600">{{$t('booking_detail_boat_rules_private')}}</span>
            <p>{{ getBoatRules.reservationFlexibilityDesc }}</p>
          </div>
        </div>
        <div class="col-12 payment-button">
          <button @click="payment">{{$t('booking_detail_payment_ok')}}</button>
        </div>
      </div>
      <div class="col-12 col-sm-3 social-icons" style="display: flex">
        <img
          src="/img/boatsy-visa-mastercard.png"
          style="width: 150px; height: 60px"
        />
        <img src="/img/amex.png" style="width: 80px; height: 60px" />
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../../config/GlobalVariables";

import { mapGetters } from "vuex";
import {
  FETCH_BOAT_RULES,
  FETCH_BOOKING_DETAIL,
  CALCULATE_PAYMENT,
  PAYMENT,
} from "../../../../store/actions.type";
import format from "date-fns/format";
import "vue2-datepicker/index.css";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import differenceInDays from "date-fns/difference_in_days";
export default {
  name: "BookingDetailPayment",
  props: ["totalAmount", "boatid", "captainId"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
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
    };
  },
  validations: {
    name: { required, minLength: minLength(3) },
    creditNumber: { required, minLength: minLength(19) },
    cvvCode: { required, minLength: minLength(3) },
    cardExpiration: { required, minLength: minLength(7) ,maxLength:maxLength(7)},
  },
  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    totalDay(startDate, endDate) {
      return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    },
    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;
      var currencyList = this.$store.state.boat.currency;
      if (currencyList.length > 0) {
        return (
          Math.round(
            boatPrice / currencyList[this.selectedCurrency - 1].value
          ) +
          " " +
          currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
    controlInstallment() {
      var bookingId = this.$router.history.current.params["bookId"];
      var creditNumber = this.creditNumber.replaceAll(" ", "");
      var lenght = creditNumber.replace(/\s+/g, "").length;

      if (lenght == 6) {
        this.calculatePaymentBody.binNumber = creditNumber;
        this.calculatePaymentBody.bookingId = bookingId;

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
      }
      var creditNumber = this.creditNumber.split(" ").join("");
      var bookingId = this.$router.history.current.params["bookId"];
      var data = {
        cardNumber: creditNumber,
        cardDate: this.cardExpiration.replaceAll(" ", ""),
        cardPersonName: this.name,
        cardSecret: this.cvvCode,
        bookingId: bookingId.toString(),
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

    defaultImage(image) {
      if (image == null || image == undefined || image == "") {
        return "";
      } else {
        return image.split(";")[0];
      }
    },
    frameLoad(event) {},
  },
  async created() {
    window.onbeforeunload = function (event) {
      event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      event.target = $("#payment-3d-iframe");
    };
  },
  computed: {
    ...mapGetters([
      "getBookingDetail",
      "getBoatRules",
      "getBoatRulesLoading",
      "getInstallments",
    ]),
  },
};
</script>
<style>
.invalid-feedback {
  display: block !important;
  font-size: 100% !important;
}
.reservation-info-content {
  padding: 15px;
  justify-content: space-between;
  font-size: 16px;
}
.payment-page {
  display: grid;
  grid-template-columns: 50% 50%;
}
.reservation-info-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 600;
}
.payment-header h3 {
  font-weight: 600;
}
.payment-online .card-info input {
  width: 100%;
  padding: 30px 0 5px 10px;
  font-size: 16px !important;
  letter-spacing: 1px;
}
.payment-online .card-info span {
  padding-left: 15px;
}
.card-expiration input {
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 12px;
}
.card-cvv input {
  border-top: none;
  border-bottom-right-radius: 12px;
}
.card-number input {
  border-radius: 12px 12px 0 0;
}
.cancellation-policy-content {
  font-size: 16px !important;
  line-height: 20px !important;
  padding-bottom: 25px;
}

.payment-boat-detail-card-image img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 8px;
}
.payment-boat-detail-card-content {
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  padding: 0 !important;
}
.payment-boat-detail-card {
  padding: 25px;
  border: 1px solid silver;
  border-radius: 8px;
  top: 120px;
}
@media (min-width: 700px) {
  .payment-page .vm--modal {
    width: 700px !important;
    height: 450px !important;
  }
}
@media (min-width: 768px) {
  .payment-page-right {
    margin-left: 60px;
  }
  .payment-page .asd__wrapper {
    width: 100% !important;
  }
  .payment-page .asd__month--hidden {
    width: 0 !important;
  }
  .payment-page .asd__days-legend {
    margin-left: 30px !important;
  }
  .payment-page .asd__inner-wrapper {
    margin-left: 0 !important;
  }
}
@media (max-width: 992px) {
  .payment-page {
    grid-template-columns: 100%;
  }
  .payment-page-right {
    order: -1;
    margin: 0;
    padding-bottom: 20px;
  }
  .payment-boat-detail-card {
    position: relative;
    top: 0;
    border: none;
    padding: 0 !important;
  }
  .payment-detail.boat-score span,
  .payment-detail.boat-type span {
    font-size: 16px !important;
  }
}
@media (max-width: 768px) {
  .reservation-info-button,
  .payment-boat-detail-price {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
}
</style>
