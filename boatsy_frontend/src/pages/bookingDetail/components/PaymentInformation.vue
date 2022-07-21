<template>
  <div class="row book-detail-body">
    <div class="col-12 book-detail-header">
      <h4>{{$t('booking_detail_card_detail-header')}}</h4>
    </div>
    <div class="col-12 book-detail-header">
      <table>
        <tr>
          <th style="font-weight: bold">{{$t('payment_ınformation_day')}}</th>
          <th style="font-weight: bold">{{$t('payment_ınformation_price')}}</th>
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
  </div>
</template>
<script>
import format from "date-fns/format";
import differenceInDays from "date-fns/difference_in_days";

export default {
  data() {
    return {
      selectedCurrency: this.$store.getters.getSelectedCurrency,
    };
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
