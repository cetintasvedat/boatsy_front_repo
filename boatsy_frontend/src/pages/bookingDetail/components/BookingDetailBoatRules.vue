<template>
  <div class="row book-detail-body">
    <div class="col-12 book-detail-header">
      <h4>{{$t('booking_detail_boat_rules_detail-header')}}</h4>
    </div>
    <div class="col-12 row book-detail-content">
      <div class="col-10 book-detail-content-header">
        <span style="font-weight: 600">{{$t('booking_detail_boat_rules_capacity')}}</span><br />
        <span>{{$t('booking_detail_boat_rules_capacity_explain')}}</span>
      </div>
      <div class="col-2 book-detail-content-text">
        <span>{{ personCapacity }}</span>
      </div>
    </div>
    <div class="col-12 row book-detail-content">
      <div class="col-10 book-detail-content-header" v-if="!getBoatRulesLoading">
        <span style="font-weight: 600">{{$t('boat_condition_reservation_flexibility')}}</span>
        <br />
        <span v-if="getBoatRules.reservationFlexibility == 0"
          >{{$t('boat_condition_advance_payment_day')}}</span
        >

        <span v-if="getBoatRules.reservationFlexibility == 1"
          >{{$t('boat_condition_advance_payment_mounth')}}</span
        >

        <span v-if="getBoatRules.reservationFlexibility == 2">{{
          getBoatRules.reservationFlexibilityDesc
        }}</span>
      </div>
      <div
        v-if="getBoatRules.reservationFlexibility == 0"
        class="col-2 book-detail-content-text"
      >
        <span>{{$t('filter_header_esnek')}}</span>
      </div>
      <div
        v-if="getBoatRules.reservationFlexibility == 1"
        class="col-2 book-detail-content-text"
      >
        <span>{{$t('filter_header_katı')}}</span>
      </div>
      <div
        v-if="getBoatRules.reservationFlexibility == 2"
        class="col-2 book-detail-content-text"
      >
        <span>{{$t('booking_detail_boat_rules_private')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["boatRules", "personCapacity"],
  computed: {
    ...mapGetters(["getBoatRulesLoading", "getBoatRules"]),
  },
};
</script>
