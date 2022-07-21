<template>
  <div class="container my-bookings" v-if="!getBookingLoading">
    <div v-if="getAllBooking.length > 0">
      <div class="my-bookings-header">
        <h1 style="font-size:1.75rem;font-weight:bold;">{{$t('user_bookings_trips')}}</h1>
      </div>
      <div class="row my-bookings-header-bottom" style="gap: 1.5em">
        <a>
          <div
            class="header-button"
            @click="
              (selectedTab = 'nextBooking'),
                (isActiveNext = !isActiveNext),
                (isActiveLast = !isActiveLast)
            "
            :class="{ activeButton: isActiveNext }"
          >
            {{$t('user_bookings_onComing')}}
          </div></a
        >
        <a>
          <div
            class="header-button"
            @click="
              (selectedTab = 'lastBooking'),
                (isActiveNext = !isActiveNext),
                (isActiveLast = !isActiveLast)
            "
            :class="{ activeButton: isActiveLast }"
          >
            {{$t('user_bookings_past')}}
          </div></a
        >
      </div>
      <div
        id="booking"
        v-on:scroll="onComingBooking()"
        class="my-bookings-body"
        v-if="selectedTab === 'lastBooking'"
      >
        <div
          class="col my-bookings-content"
          v-for="(element, index) in getAllBooking"
          :key="index"
          style="opacity: 0.7"
          v-if="controlDates(element.startdate) < 0"
        >
          <reservation-detail-card :bookDetail="element"></reservation-detail-card>
        </div>
        <img
          v-if="scrollStatus"
          src="/assets/images/loading.gif"
          style="width: 50px; align-self: center"
        />
      </div>
      <div id="booking" v-on:scroll="onComingBooking()" class="my-bookings-body" v-else>
        <div
          class="col my-bookings-content"
          v-for="(element, index) in getAllBooking"
          :key="index"
          v-if="controlDates(element.startdate) >= 0"
        >
          <ReservationDetailCard :bookDetail="element"></ReservationDetailCard>
        </div>
        <img
          v-if="scrollStatus"
          src="/assets/images/loading.gif"
          style="width: 50px; align-self: center"
        />
      </div>
    </div>
    <div style="text-align: center" v-else>
      <h2 class="bookings-not-found" style="font-weight: bold;font-size:1.5rem">
        {{$t('user_bookings_not-found')}}
      </h2>
      <h2 style="font-size:1.25rem">{{$t('user_bookings_not-found2')}}</h2>
    </div>
  </div>
  <div class="loading-payment-page" v-else>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import ReservationDetailCard from './components/ReservationDetailCard.vue'
import { FETCH_ALL_BOOKING } from "../../store/actions.type.js";
import { mapGetters } from "vuex";
import format from "date-fns/format";
import differenceInDays from "date-fns/difference_in_days";
export default {
  data() {
    return {
      page: 1,
      buttonClass: "header-button",
      selectedTab: "nextBooking",
      todayDate: format(new Date(), "YYYY-MM-DD"),
      isActiveLast: false,
      isActiveNext: true,
      loading: false,
      totalBookingCount: -1,
      scrollStatus: true,
    };
  },
  components: {
    ReservationDetailCard
  },
  computed: {
    ...mapGetters(["getAllBooking", "getBookingLoading"]),
  },

  methods: {
    controlDates(startDate) {
      return differenceInDays(startDate.split(" ")[0], this.todayDate);
    },
    async onComingBooking() {
      var scrollingElement = document.getElementById("booking");
      var scrollResult = scrollingElement.scrollTop + scrollingElement.clientHeight - 100;
      if (
        scrollResult == scrollingElement.scrollHeight - 100 &&
        this.totalBookingCount != this.getAllBooking.length
      ) {
        this.scrollStatus = true;
        this.page = this.page + 1;
        var bookingCount = await this.$store.dispatch(FETCH_ALL_BOOKING, this.page);
        this.totalBookingCount = bookingCount;
        this.scrollStatus = false;
      }
    },
  },

 async created() {
    window.onpopstate = function () {
      location.reload()
    };
    this.$store.dispatch(FETCH_ALL_BOOKING, this.page);
    this.scrollStatus = false;
  },
};
</script>

<style>
.my-bookings {
  text-align: start;
  padding-top: 100px;
  min-height: 60vh;
}
.my-bookings-header h3 {
  font-weight: 600;
}
.my-bookings-header-bottom {
  font-size: 16px;
  font-weight: 600;
  color: rgb(113, 113, 113);
  border-bottom: 1px solid #ddd;
}
#selected {
  color: #000;
  border: 2px solid #000;
}
.header-button {
  padding: 15px;
}
.header-button:hover {
  background-color: #f3efef;
  color: #000;
}
.my-bookings-content {
  padding-top: 5px;
  border-radius: 10px;
  border: 1px solid silver;
  
}
.my-bookings-body {
  display: flex;
  flex-direction: column;
  gap: 2em;
 
  margin-top: 2em;
  min-width: 64px;
  padding: 20px;
  padding-bottom: 75px;
  overflow-y: auto;
  height: 100%;
  padding: 0 20% 265px 20%;
  height: calc(100vh - 70px);
}
.popular-boat-list::-webkit-scrollbar,
.my-bookings-body::-webkit-scrollbar {
  background: #ddd;
  width: 8px;
}
.popular-boat-list::-webkit-scrollbar-thumb,
.my-bookings-body::-webkit-scrollbar-thumb {
  background: #b5b2b2;
  border-radius: 8px;
}
.activeButton {
  color: #000;
  border-bottom: 4px solid #000;
}
@media (max-width: 991px) {
  .my-bookings-body {
    width: 100%;
    padding: 0 15px 0 0;
  }
}
@media (max-width: 764px) {
  .booking-card {
    flex-direction: column;
  }
  .booking-body,
  .booking-card-image {
    width: 100% !important;
  }
}
</style>
