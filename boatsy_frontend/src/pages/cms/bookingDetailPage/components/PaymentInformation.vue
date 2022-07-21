<template>
  <div class="row book-detail-body">
    <div class="col-12 book-detail-header">
      <h4>{{ $t("booking_detail_card_detail-header") }}</h4>
    </div>
    <div
      class="col-12 row reservation-info-content"
      style="padding: 14px 0 20px 15px;"
    >
      <div class="col-6 reservation-info-header">
        <span style="font-weight: 600">{{ $t("publicPayment_dates") }}</span
        ><br />
      </div>
      <div
        class="col-3 reservation-info-button"
        style="justify-content: end; padding-right:0"
      >
        <a @click="show('payment-datepicker')">{{
          $t("travel_ınformation_edit")
        }}</a>
      </div>
    </div>
    <div class="col-12 book-detail-header">
      <table>
        <tr>
          <th style="font-weight: bold">{{ $t("payment_ınformation_day") }}</th>
          <th style="font-weight: bold">
            {{ $t("payment_ınformation_price") }}
          </th>
        </tr>
        <tr v-for="(element, index) in dateAndPriceList" :key="index">
          <td>
            {{
              element.date.getDate() +
                "/" +
                (element.date.getMonth() + 1) +
                "/" +
                element.date.getFullYear()
            }}
          </td>
          <td>{{ convertCurrency(element.price, booking.currencyvalue) }}</td>
        </tr>
      </table>
    </div>
    <modal name="payment-datepicker" class="modal-datepicker" height="auto">
      <div class="modal-header">
        <h4>{{ $t("travel_ınformation_date") }}</h4>
        <i class="fas fa-times" @click="hide('payment-datepicker')"></i>
      </div>
      <BoatDatepicker style="padding-top: 20px"></BoatDatepicker>
      <div class="col-12 payment-button" style="text-align: end">
        <button style="margin: 10px 0" @click="changeDate()" v-if="!loadingButton">
          {{ $t("travel_ınformation_approve") }}
        </button>
        <button v-else style="width: 112px">
          <img src="/assets/images/loading.gif" width="40px" />
        </button>
      </div>
    </modal>
  </div>
</template>
<script>
import format from "date-fns/format";
import differenceInDays from "date-fns/difference_in_days";
import {mapGetters} from "vuex";
import Vue from "vue";

export default {
  data() {
    return {
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      loadingButton: false,
    };
  },
   computed: {
    ...mapGetters([
      "getStartDate",
      "getEndDate",
    ]),
  },
  props: ["booking", "dateAndPriceList", "totalAmount"],
  methods: {
    totalDay(startDate, endDate) {
      return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    },
    convertCurrency(price, currencyValue) {
      var boatPrice = price * currencyValue;
      var currencyList = this.$store.state.boat.currency;
      if (currencyList.length > 0) {
        return (
          Math.round(boatPrice / currencyList[this.selectedCurrency - 1].value) +
          " " +
          currencyList[this.selectedCurrency - 1].symbol
        );
      } else {
        return boatPrice + " ₺";
      }
    },
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    async changeDate(){
      this.loadingButton = true;
      var body = {
        bookingId: this.$router.history.current.params["id"],
        startDate: this.getStartDate,
        endDate: this.getEndDate
      }

      var res = await Vue.prototype.$bookService.editBooking(body);
      this.hide('payment-datepicker');
      this.loadingButton = false;
      if (!res.error) {
        Vue.swal.fire("İşlem Başarılı", "Değişiklikler Kaydedildi", "success");
        window.location.reload();
      }
      else {
        Vue.swal.fire(
          "İşlem Başarısız",
          "Değişiklikler Kaydedilemedi.Lütfen Tekrar Deneyin.",
          "error"
        );
      }
    }
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  text-align: left;
  padding: 4px;
}
</style>
