<template>
  <div
    class="row book-detail-body"
    style="border: none !important; padding-bottom: 40px"
    v-if="!getBookingCommentLoading"
  >
    <div class="col-12 book-detail-header">
      <h4>{{$t('footers_support')}}</h4>
    </div>
    <div class="col-12 row book-detail-content">
      <div class="col-12 book-detail-content-header">
        <router-link to="/support"
          ><span style="font-weight: 600; text-decoration: underline"
            >{{$t('booking_detail_bottom/support')}}</span
          ></router-link
        ><br />
        <router-link to="/sss"
          ><span style="font-weight: 600; text-decoration: underline"
            >{{$t('booking_detail_bottom/sss')}}</span
          ></router-link
        >
      </div>
    </div>
    <div
      class="col-12 payment-button"
      style="padding-top: 30px"
      v-if="booking.bookingstatus == 1"
    >
      <button @click="show('cancel-request-modal')">{{$t('booking_detail_bottom_cancel-request-modal')}}</button>
    </div>
    <div
      class="col-12 payment-button"
      style="padding-top: 30px"
      v-if="booking.bookingstatus == 200"
    >
      <button disabled>{{$t('booking_detail_bottom_disabled')}}</button>
    </div>
    <div
      class="col-12 payment-button"
      style="padding-top: 30px"
      v-if="booking.bookingstatus == 2"
    >
      <PaymentComponent
        :boatid="booking.boatid"
        :captainId="booking.userid"
      ></PaymentComponent>
    </div>
    <div
      class="col-12 comment-booking"
      style="padding-top: 30px"
      v-if="booking.bookingstatus == 100"
    >
      <div v-if="getBookingCommentDetail.id > 0">
        <div class="rev-content">
          <div class="rating">
            <div class="rev-voted">
              <i
                class="icon_star voted"
                :key="index"
                v-for="(n, index) in parseInt(getBookingCommentDetail.rate)"
              >
              </i>
            </div>
          </div>
          <div class="rev-text">
            <p class="comment-body">
              {{ getBookingCommentDetail.body }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="rating-stars" :style="{ animation: animation }">
          <vue-star-rate
            :rateRange="1"
            :maxIcon="5"
            :iconHeight="22"
            :iconWidth="22"
            :hasCounter="false"
            iconColor="#FDCC0D"
            iconColorHover="#FDCC0D"
            iconShape="star"
            v-on:ratingSet="myRatingMethod"
          ></vue-star-rate>
        </div>
        <div class="reservation-note" style="width: 100%">
          <textarea
            placeholder="Nasıl bir yolculuk deneyimlediğinizden bahsedin."
            v-model="ratingNote"
          ></textarea>
        </div>
        <div
          class="col-12 payment-button"
          style="padding-top: 30px; padding-right: 0 !important; text-align: end"
        >
          <button @click="sendingVote">
            <span v-if="!loadingButton">Gönder</span>
            <img
              v-if="loadingButton"
              src="/assets/images/loading.gif"
              style="width: 50px"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueStarRate from "vue-js-star-rating";
import { mapGetters } from "vuex";
import { SET_BOOKING_COMMENT, GET_BOOKING_COMMENT } from "../../../../store/actions.type";
import PaymentComponent from './BookingDetailPayment.vue'

export default {
  props: ["booking"],
  data() {
    return {
      loadingButton: false,
      bookingNote: "",
      loading: "none",
      response: {
        message: "",
        icon: "",
        color: "",
      },
      ratingNote: "",
      rate: 0,
      animation: "",
      isComment: false,
    };
  },
  components: {
    vueStarRate,
    PaymentComponent
  },
  computed: {
    ...mapGetters(["getBookingCommentDetail", "getBookingCommentLoading"]),
  },
  methods: {
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    myRatingMethod(rating) {
      this.rate = rating;
    },
    async sendingVote() {
      if (this.rate != 0) {
        this.animation = "";
        this.loadingButton = true;
        var requestBody = {
          boatId: this.booking.boatid,
          ratingBody: this.ratingNote,
          userId: this.booking.userid,
          rate: this.rate,
          bookingId: this.booking.id,
        };
        this.$store.commit("setCommentRequestModel", requestBody);
        var res = await this.$store.dispatch(SET_BOOKING_COMMENT);
        if (res.error == false) {
          var response = await this.$store.dispatch(GET_BOOKING_COMMENT);
          if (response.error == false) {
            this.loadingButton = false;
          }
        }
      } else {
        this.animation = "shake-animation 4.72s ease";
      }
    },
  },
};
</script>
