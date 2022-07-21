<template>
  <div class="boat-reservation">
    <div class="box_detail booking">
      <div class="booking-detail-header">
        <div class="price">
          <span class="price-res"
            >{{ checkAvaragePrice().checkResult ? "" : "Ortalama" }}
            {{
              convertCurrency(
                parseInt(price / checkAvaragePrice().dayDiff),
                boatDetail.currencyvalue
              )
            }}
            /
            {{
              boatDetail.isdaily == 0
                ? $t("payment_information_hour")
                : $t("payment_ınformation_day")
            }}
          </span>
          <br />
          <span style="font-size: 15px; color: gray">
            {{ $t("boat_reservation_dailyprice") }}
          </span>
          <br />
          <br />

          <span
            class="price-res"
            v-if="
              (new Date(range.end) - new Date(range.start)) /
                (1000 * 3600 * 24) >
              0
            "
            >{{ $t("boat_reservation_price") }}
            {{ convertCurrency(price, boatDetail.currencyvalue) }}
          </span>
        </div>
        <div class="card-res-score">
          <strong v-if="doubleConverter(boatDetail.commentavarage) != 'NaN'"
            ><i class="fas fa-star res"></i>
            {{ doubleConverter(boatDetail.commentavarage) }}</strong
          >
          <strong v-else><i class="fas fa-star res"></i> 0</strong>
        </div>
      </div>

      <div class="form-group input-dates scroll-fix">
        <div class="" @click="focusScroll">
          <v-date-picker
            v-model="range"
            :masks="masks"
            mode="date"
            :disabled-dates="this.getDisabledDates"
            :attributes="this.getAttributesDatePicker"
            @dayclick="onDayClick"
            color="red"
            is-range
          >
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <div class="reservation-date-input-container">
                <div class="col-6 reservation-start-date">
                  <span class="date-info">{{
                    $t("boat_reservation_start-date")
                  }}</span>
                  <input
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="getDate()"
                    v-on="inputEvents.start"
                    readonly="readonly"
                  />
                </div>
                <div class="col-6 reservation-end-date">
                  <span class="date-info" style="left: 20px">{{
                    $t("boat_reservation_end-date")
                  }}</span>
                  <input
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="getDateEnd()"
                    v-on="inputEvents.end"
                    readonly="readonly"
                  />
                </div>
              </div>
            </template>
          </v-date-picker>
        </div>
        <div class="reservation-note">
          <textarea
            :placeholder="$t('booking_note_card_question')"
            v-model="bookingNote"
          ></textarea>
        </div>
      </div>
      <a
        class="add_top_30 btn_1 full-width outline wishlist"
        @click="router(boatDetail.id)"
        >{{ $t("boat_reservation_outline_wishlist") }}</a
      >
      <div class="text-center">
        <small>{{ $t("boat_reservation_pay") }} </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import format from "date-fns/format";

export default {
  props: ["boatDetail"],
  components: {},
  data() {
    return {
      name: "boat-card-reservation",
      selectedCurrency: this.$store.getters.getSelectedCurrency,
      bookingNote: "",
      dateAndPriceList: [],
      totalAmount: 0,
      price: this.boatDetail.dailyprice,
      changedCount: 0,
      boatDefaultPrice: 0,
      blockDateList: [
        {
          start: null,
          end: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1
          ),
        },
      ],
      masks: {
        input: "D MMMM",
      },
      dateFormat: "YYYY-MM-DD",
      range: {
        start: new Date(),
        end: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 5
        ),
      },
      disabledDates: [],
      attributes: [],
    };
  },

  computed: {
    ...mapGetters([
      "getStartDate",
      "getEndDate",
      "getProfileModel",
      "getDifferencePriceList",
      "getOptionalDates",
      "getAttributesDatePicker",
      "getDisabledDates",
    ]),
  },

  watch: {
    getAttributesDatePicker: function () {
      this.boatDefaultPrice = this.differentPriceChecker();
    },
    getStartDate: function () {
      this.differentPriceChecker();
      this.onChangeRange();
    },
    getEndDate: function () {
      this.differentPriceChecker();
      this.onChangeRange();
    },
  },
  created() {
    this.boatDefaultPrice = this.boatDetail.dailyprice;
  },
  mounted: function () {
    this.disabledDates = this.getDisabledDates;

    //Opsiyonel günlerin takvimde turuncu nokta ile gösterilmesi için
    if (this.getOptionalDates.lenght > 0) {
      this.attributes = [
        // Attributes for todos
        ...this.getOptionalDates.forEach((element) => ({
          dates: element.date,
          dot: {
            color: "orange",
          },
          popover: {
            label:
              element.type == "OPTIONAL_DAY"
                ? "Bu tarihte başka bir misafir tarafından rezervasyon talebi gönderilmiş fakat tekne sahibi tarafından henüz kabul edilmemiş."
                : "",
            visibility: "hover",
            hideIndicator: true,
          },
        })),
      ];
    }
    this.range = {
      start: new Date(this.getStartDate),
      end: new Date(this.getEndDate),
    };
  },
  methods: {
    checkAvaragePrice() {
      var dayDiff =
        parseInt(
          (new Date(this.range.end) - new Date(this.range.start)) /
            (1000 * 60 * 60 * 24),
          10
        ) + 1;
      var tempPrice = this.boatDetail.dailyprice
      if (this.dateAndPriceList.lenght > 0) {
        tempPrice = this.dateAndPriceList[0].price;
      }

      var differentPriceCheck = true;
      this.dateAndPriceList.forEach((element) => {
        if (tempPrice != element.price) {
          differentPriceCheck = false;
        }
      });
      var result = {
        dayDiff: dayDiff,
        checkResult: differentPriceCheck,
      };

      return result;
    },
    onChangeRange() {
      this.range = {
        start: new Date(this.getStartDate),
        end: new Date(this.getEndDate),
      };
    },
    onDayClick(day) {
      this.$store.commit(
        "setStartDate",
        format(this.range.start, this.dateFormat)
      );
      this.$store.commit("setEndDate", format(this.range.end, this.dateFormat));
    },
    getDate() {
      return new Date(this.getStartDate).toLocaleDateString("tr-TR", {
        month: "long",
        day: "2-digit",
      });
    },
    getDateEnd() {
      return new Date(this.getEndDate).toLocaleDateString("tr-TR", {
        month: "long",
        day: "2-digit",
      });
    },
    differentPriceChecker() {
      this.totalAmount = 0;
      this.dateAndPriceList = [];
      var startDate = new Date(this.getStartDate);
      var endDate = new Date(this.getEndDate);
      var dayDiff = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10);
      var tempDate = new Date(startDate);
      var bookingDayList = [tempDate];

      for (var i = 0; i < dayDiff; i++) {
        tempDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate() + 1
        );
        bookingDayList.push(new Date(tempDate));
      }

      bookingDayList.forEach((bookingDayListElement) => {
        var resultFind = this.getDifferencePriceList.find(
          (x) =>
            x.date.getFullYear() +
              "" +
              x.date.getMonth() +
              "" +
              x.date.getDate() ==
            bookingDayListElement.getFullYear() +
              "" +
              bookingDayListElement.getMonth() +
              "" +
              bookingDayListElement.getDate()
        );
        if (resultFind != undefined) {
          this.dateAndPriceList.push({
            price: resultFind.price,
            date: resultFind.date,
          });
          this.totalAmount = this.totalAmount + parseInt(resultFind.price);
        } else {
          this.dateAndPriceList.push({
            price: parseInt(this.boatDetail.dailyprice),
            date: bookingDayListElement,
          });
          this.totalAmount =
            this.totalAmount + parseInt(this.boatDetail.dailyprice);
        }
      });
      this.price = this.totalAmount;
      return this.price;
    },
    doubleConverter(value) {
      return parseFloat(value).toFixed(1);
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
    router(boatId) {
      this.$store.commit("setReservationNote", this.bookingNote);
      window.fbq("track", "InitiateCheckout", {
        boatId: boatId,
        startDate: this.getStartDate,
        endDate: this.getEndDate,
      });
      if (this.getStartDate != "" && this.getEndDate != "") {
        this.$router.push({
          name: "UserBookConfirm",
          params: {
            boatId: boatId,
            startDate: this.getStartDate,
            endDate: this.getEndDate,
          },
        });
      } else {
        this.focusScroll();
      }
    },
    show() {
      this.$store.commit("setReservationNote", this.bookingNote);
      this.$modal.show("non-auth-send-booking-modal");
    },
    focusScroll() {
      document
        .getElementById("datepicker-container")
        .focus({ preventScroll: false });
    },
    changeDateFormat(date) {
      return format(date, "DD.MM.YYYY");
    },
  },
};
</script>

<style>
.boat-reservation {
  width: 100% !important;
  box-shadow: 0px 6px 16px rgb(0 0 0 / 12%);
  padding-bottom: 15px;
  border-radius: 20px;
}
.add_top_30.btn_1.full-width.purchase {
  background-color: #ef4036 !important;
  border-radius: 0.5rem !important;
  color: #fff;
}
.text-center {
  margin-top: 15px !important;
  font-size: 16px !important;
}
.price-res {
  font-size: 19px !important;
}
.booking input {
  font-weight: 500;
  height: 45px;
  border-radius: 0.5rem !important;
}
.booking .panel-dropdown {
  background-color: #fff;
  font-size: 14px;
  font-size: 0.875rem;
  border-radius: 3px;
  border: 1px solid #d2d8dd;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 0 10px 0;
  border-radius: 0.5rem !important;
}
a.btn_1.full-width.wishlist,
.btn_1.full-width.wishlist {
  border-color: #ef4036 !important;
  color: #fff !important;
  border-radius: 0.5rem !important;
}
.box_detail {
  padding: 25px 25px 15px 25px;
  border: 1px solid white !important;
  background-color: white !important;
  margin-bottom: 30px;
  border-radius: 1rem !important;
}
.panel-dropdown a:after {
  font-family: "ElegantIcons";
  font-display: swap;
  content: "\33";
  font-size: 24px;
  font-size: 1.5rem;
  color: #000 !important;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  position: absolute;
  right: 0;
  top: -8px;
}
.fas.fa-star.res {
  font-size: 15px !important;
  color: #ef4036;
}
.booking-detail-header {
  display: flex;
  justify-content: space-between;
}

.date-info {
  position: absolute;
  left: 12px;
  top: 8px;
  font-weight: 600;
  font-size: 14px;
}
.scroll-fix {
  padding-top: 30px;
}
.reservation-start-date input,
.reservation-end-date input {
  padding: 36px 0 18px 12px;
  width: 100%;
  border: 1px solid;
  cursor: pointer;
  font-size: 14px;
}
.reservation-start-date {
  padding: 0 7.5px 15px 0 !important;
}
.reservation-end-date {
  padding: 0 0 15px 7.5px !important;
}
.reservation-note textarea {
  width: 100%;
  padding: 12px;
  border-radius: 0.5rem;
  border: 1px solid #000;
  height: 100px;
}
.reservation-date-input-container {
  display: flex;
  flex-wrap: nowrap;
}
.booking-detail-header {
  border-bottom: 1px solid #ededed;
}
.icon-container i {
  font-size: 100px;
}
@media (min-width: 800px) {
  .detail-page-right {
    position: -webkit sticky;
    position: sticky;
    height: 100%;
    top: 125px;
  }
}
@media (max-width: 799px) {
  .detail-page-right {
    position: fixed !important;
    width: 100% !important;
    background-color: #fff;
    left: 0 !important;
    bottom: 0 !important;
    transition: 0.1 all ease;
    margin: 0;
  }
  .price-res {
    margin-right: 0 !important;
    font-size: 16px !important;
  }
  .detail-page-left {
    width: 100%;
  }
  .card-res-score,
  .share-buttons,
  .text-center,
  a.btn_1.full-width.outline.wishlist.favourite,
  .form-group.input-dates.scroll-fix {
    position: absolute;
    visibility: hidden;
  }
  .boat-reservation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 20px 20px 0 0 !important;
  }
  .box_detail .price {
    border: none !important;
    padding: 0 25px 0 25px;
    margin: 0;
  }
  .box_detail.booking {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 15px 15px 0 15px;
  }
  a.btn_1.full-width.wishlist {
    margin: 0;
    width: 50%;
  }
  .booking-detail-header {
    width: 50%;
    border: none;
  }
}
@media (max-width: 480px) {
  .box_detail.booking {
    font-size: 12px;
  }
}
</style>
