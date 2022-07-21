<template>
  <div v-if="!getBoatRulesLoading" class="description-conditions">
    <h4 class="card-des-conditions">{{$t('boat_conditions_things_know')}}</h4>
    <div class="boat-conditions-container">
      <div class="boat-conditions-items">
        <div class="boat-conditions-header">{{$t('boat_conditions_boat_rule')}}</div>
        <div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-calendar-week"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat-conditions-content_gün')}} {{ $t(getBoatRules.checkInDay) }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-clock"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat-conditions-content_saat')}} {{ getBoatRules.checkIn }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-clock"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat-conditions-content_saat_out')}}{{ getBoatRules.checkOut }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-ship"></i>
            </div>
            <div class="boat-conditions-content">
              <span
                >{{$t('boat_condition_dailyUseOfDiesel')}}
                {{ getBoatRules.dailyUseOfDiesel }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-fan"></i>
            </div>
            <div class="boat-conditions-content">
              <span
                >{{$t('boat_condition_airConditionerWeeklyUse')}}
                {{ getBoatRules.airConditionerWeeklyUse }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-money-check"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_depositFee')}} {{ getBoatRules.depositFee }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-file-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="getBoatRules.isCaptainLicenseRequired == true">
                {{$t('boat_condition_isCaptainLicenseRequired')}}</span
              >
              <span v-else>{{$t('boat_condition_isNotCaptainLicenseRequired')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-paw"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="getBoatRules.petFree == true">{{$t('filter_header_pet')}}</span>
              <span v-else>{{$t('boat_condition_notPet')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="boat-conditions-items">
        <div class="boat-conditions-header">{{$t('boat_condition_price_included')}}</div>
        <div>
          <div v-if="getBoatRules.isTheFuelIncluded == true" class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-gas-pump"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_fuel')}}</span>
            </div>
          </div>
          <div
            v-if="getBoatRules.isTheFinalCleaningIncluded == true"
            class="boat-conditions"
          >
            <div class="boat-conditions-title">
              <i class="fas fa-broom"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_finalClean')}}</span>
            </div>
          </div>
          <div
            v-if="getBoatRules.isTheTransitlogIncluded == true"
            class="boat-conditions"
          >
            <div class="boat-conditions-title">
              <i class="far fa-file-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span>Transitlog</span>
            </div>
          </div>
          <div v-if="getBoatRules.isFoodIncluded == true" class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-cookie"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_eat')}}</span>
            </div>
          </div>
          <div v-if="getBoatRules.isMealPrepIncluded == true" class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_mealPrep')}}</span>
            </div>
          </div>
          <div v-if="getBoatRules.isAlcoholIncluded == true" class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-wine-glass-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{$t('boat_condition_alkol')}}</span>
            </div>
          </div>
          <div v-if="getBoatRules.isTheTipIncluded == true" class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-money-bill"></i>
            </div>
            <div class="boat-conditions-content">
              <span>{{'boat_condition_tip'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="boat-conditions-items">
        <div class="boat-conditions-header">{{$t('boat_condition_reservation_flexibility')}}</div>
        <div class="reservation-flexibility">
          <div v-if="getBoatRules.reservationFlexibility == 0">
            <span style="font-weight: 600">{{$t('filter_header_esnek')}}</span>
            <p style="margin-top:10px; margin-bottom:0">{{$t('boat_condition_advance_payment_day')}}</p>
          </div>
          <div v-else-if="getBoatRules.reservationFlexibility == 1">
            <span style="font-weight: 600">{{$t('filter_header_esnek')}}</span>
            <p style="margin-top:10px; margin-bottom:0">{{$t('boat_condition_advance_payment_mounth')}}</p>
          </div>
          <div v-else>
            <span style="font-weight: 600">Özel</span>
            <p style="margin-top:10px; margin-bottom:0">{{ getBoatRules.reservationFlexibilityDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-payment-page" style="min-height:0 !important" v-else>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
</template>

<script>
import { FETCH_BOAT_RULES } from "../../../store/actions.type.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "boat-card-conditions",
      boatRulesRequestModel: {
        userId: this.$store.state.boat.captainId,
        boatId: this.$store.state.boat.boatDetailId,
      },
      icons: [
        "",
        "fas fa-clock",
        "fa fa-clock",
        "fas fa-calendar-week",
        "fas fa-ship",
        "fas fa-fan",
        "",
        "fas fa-gas-pump",
        "fas fa-cookie",
        "fas fa-utensils",
        "fas fa-paw",
        "far fa-file-alt",
        "fas fa-broom",
        "fas fa-wine-glass-alt",
        "fas fa-money-bill",
        "far fa-file-alt",
        "fas fa-money-check",
      ],
    };
  },
  computed: {
    ...mapGetters(["getBoatRules", "getBoatRulesLoading"]),
  },
  async created() {
    this.$store.commit("setBoatRulesRequestModel", this.boatRulesRequestModel);
    this.$store.dispatch(FETCH_BOAT_RULES, this.$store.state.boat.boatDetailId);
  },
};
</script>

<style>
.description-conditions {
  padding: 48px 0;
  border-bottom: 1px solid #ddd;
}
.detail-page-conditions {
  text-align: start;
}
.boat-conditions {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10% 90%;
  padding-bottom: 10px;
}

.boat-conditions-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 30% 30% 40%;
}

.boat-conditions-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flexibility-header {
  font-weight: 600;
}

.boat-conditions-header {
  font-weight: 600;
  font-size: 1.2rem;
  padding: 10px 0;
}

@media (max-width: 780px) {
  .boat-conditions-container {
    grid-auto-flow: row;
    grid-template-columns: 100%;
  }
}
</style>
