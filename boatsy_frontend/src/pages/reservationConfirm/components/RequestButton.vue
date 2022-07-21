<template>
  <div class="col-12 payment-button" style="" v-if="profileModel.id > 0">
    <div
      class="col-12 col-sm-4 social-icons"
      style="display: flex; align-items: center; padding: 0 0 20px 0;"
    >
      <img
        src="/img/boatsy-visa-mastercard.png"
        style="width: 140px; height: 50px"
      />
      <img src="/img/amex.png" style="width: 50px; height: 45px" />
    </div>
    <button
      @click="sendRequest()"
      v-if="!loadingButton"
      style="
          width: 100%;
          height: 52px;
          font-size: 20px;
          font-weight: 500;"
    >
      {{ $t("boat_reservation_outline_wishlist") }}
    </button>
    <button v-else style="width: 212px">
      <img src="/assets/images/loading.gif" width="40px" />
    </button>
  </div>
  <div class="col-12 payment-button" style="margin-top: -10px" v-else>
    <div
      class="col-12 col-sm-4 social-icons"
      style="display: flex; align-items: center; padding: 0 0 20px 0;"
    >
      <img
        src="/img/boatsy-visa-mastercard.png"
        style="width: 140px; height: 50px"
      />
      <img src="/img/amex.png" style="width: 50px; height: 45px" />
    </div>
    <button @click="show">{{ $t("boat_reservation_outline_wishlist") }}</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { FETCH_BOOKING } from "../../../store/actions.type";
export default {
  data() {
    return {
      loadingButton: false,
      bookingInfo: [],
      bookingResponse: "",
    };
  },
  props: ["captainId", "boatId"],
  computed: {
    ...mapGetters({
      startDate: "getStartDate",
      endDate: "getEndDate",
      personCapacity: "getPersonCapacity",
      bookingNote: "getReservationNote",
      profileModel: "getProfileModel",
      boatDetail: "getBoatDetail",
      hourCount: "getHourCount",
    }),
  },
  methods: {
    async sendRequest() {
      this.loadingButton = true;
      var bookingInfo = {
        boatId: this.boatId,
        startDate: this.startDate,
        endDate: this.endDate,
        personCapacity: this.personCapacity,
        notes: this.bookingNote,
      };
      if (this.boatDetail.isdaily == 0) {
        var hourNote =
          "....Boatsy notu: Tekne " + this.hourCount + " saat kiralanıyor.";
        var bookingNote = this.bookingNote;
        bookingInfo.hourCount = this.hourCount;
        bookingInfo.notes = bookingNote + hourNote;
      }
      this.$store.commit("setBookingModel", bookingInfo);
      this.bookingResponse = await this.$store.dispatch(FETCH_BOOKING);
      this.loadingButton = false;

      if (this.bookingResponse.error == false) {
        var bookingId = this.bookingResponse.data.bookingId;
        this.$router.push({
          name: "BookingSuccess",
          params: { bookingId: bookingId },
        });
      } else {
        this.error = "İşlem Başarısız";
        this.$swal.fire(
          this.error,
          "Rezervasyon talebi gönderilemedi. Lürfen daha sonra tekrar deneyin.",
          "error"
        );
      }
    },
    show() {
      this.$modal.show("non-auth-send-booking-modal-with-payment");
    },
  },
};
</script>
