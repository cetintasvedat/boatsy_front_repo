<template>
  <div>
    <div class="modal-header" style="justify-content: flex-end; border: none">
      <i
        class="fas fa-times"
        @click="hide('cancel-request-modal'), (loading = 'none')"
      ></i>
    </div>
    <div class="modal-body" style="text-align: center">
      <div v-if="loading == 'none'">
        <div class="reservation-note" style="width: 100%">
          <textarea
            placeholder="Lütfen iptal nedeninizi yazınız."
            v-model="bookingNote"
          ></textarea>
        </div>
        <div
          class="col-12 payment-button"
          style="
            padding-top: 30px;
            padding-right: 0 !important;
            text-align: end;
          "
        >
          <button @click="cancelRequest">
            <span>Gönder</span>
          </button>
        </div>
      </div>
      <div class="loading" v-if="loading == true">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div v-if="loading == false">
        <div class="icon-container">
          <i
            v-bind:class="response.icon"
            :style="{ color: response.color }"
          ></i>
        </div>
        <div class="modal-body-text" style="padding-top: 15px">
          <h3>{{ response.message }}</h3>
          <router-link to="/my-bookings"
            ><span style="font-weight: 600; text-decoration: underline"
              >Rezervasyonlarıma Git</span
            ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  CANCEL_REQUEST,
  FETCH_BOOKING_DETAIL,
} from "../store/actions.type.js";

export default {
  data() {
    return {
      bookingNote: "",
      loading: "none",
      response: {
        message: "",
        icon: "",
        color: "",
      },
    };
  },

  methods: {
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    async cancelRequest() {
      this.loading = true;
      var bookingId = this.$router.history.current.params["bookId"];
      var cancelRequestModel = {
        id: bookingId,
        comment: this.bookingNote,
      };
      this.$store.commit("setCancelRequestModel", cancelRequestModel);

      var data = await this.$store.dispatch(CANCEL_REQUEST);
      if (data.error == false) {
        this.loading = false;
        this.response.message = "Rezervasyon iptal talebiniz gönderilmiştir.";
        this.response.icon = "far fa-check-circle";
        this.response.color = "#24d914";
        this.$store.commit("setBookingId", bookingId);
        await this.$store.dispatch(FETCH_BOOKING_DETAIL);
      } else {
        this.loading = false;
        this.response.message =
          "Rezervasyon iptal talebiniz gönderilemedi. Lütfen tekrar deneyin.";
        this.response.icon = "fas fa-exclamation-circle";
        this.response.color = "#e01d0b";
      }
    },
  },
};
</script>
