<template>
  <div class="row paymnet-online-captain-info" style="padding: 0;">
    <div class="col-12 reservation-info-header" style="padding-bottom: 14px">
      <h4 style="margin:0">{{ $t("Booking_Note_info-header") }}</h4>
    </div>
    <div
      class="col-12 reservation-captain-info"
      style="padding-bottom:0; margin-bottom:80px;"
    >
      <div
        style="width: 100%;
                  display: flex;
                  border: 1px solid rgb(216 216 216 / 90%);
                  border-radius: 10px;
                  box-shadow: 1px 1px 20px rgb(216 216 216 / 10%);"
      >
        <div style="width: 105px;">
          <div
            class="reservation-captain-info-image"
            style="width:100%; padding: 13px 0 0 14px;"
          >
            <img
              v-if="captainDetail.avatar == null"
              style="margin: 0"
              src="/assets/images/user_avatar.png"
            />
            <img :src="IMAGE_URL + captainDetail.avatar" v-else />
          </div>
          <div
            class="reservation-captain-info-text"
            style="font-size: 12px; padding-left: 14px;
              width: 100%;
              text-align: center;"
          >
            {{ captainDetail.name }} {{ captainDetail.surname }}
          </div>
        </div>
        <div
          class="row payment-online card-info"
          style="width: 100%; padding: 15px;"
        >
          <div class="reservation-note" style="width: 100%; padding-left: 15px">
            <textarea
              :placeholder="$t('booking_note_card_question')"
              v-model="bookingNote"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../config/GlobalVariables";
import { mapGetters } from "vuex";

export default {
  props: ["captainDetail"],
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      bookingNote: "",
    };
  },
  computed: {
    ...mapGetters(["getReservationNote"]),
  },
  watch: {
    bookingNote: function() {
      this.$store.commit("setReservationNote", this.bookingNote);
    },
  },
  mounted() {
    this.bookingNote = this.getReservationNote;
  },
};
</script>
<style>
.reservation-note textarea {
  width: 100%;
  padding: 12px;
  padding-left: 0;
  border-radius: 0.5rem;
  border: none;
  height: 100px;
  outline: none;
  resize: none;
}
</style>
