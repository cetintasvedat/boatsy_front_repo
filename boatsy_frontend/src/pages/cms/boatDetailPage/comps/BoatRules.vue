<template>
  <div class="description-conditions" style="border: none;">
    <div class="cms-boat-conditions-container">
      <div class="card bg-light mb-3">
        <div class="card-header">
          <span style="float: left; padding: 7px; font-size: 20px">{{$t('boat_conditions_boat_rule')}} </span>
          <button
            v-if="!getBoatRulesLoading"
            class="btn_1"
            style="border-radius: 999px; float: right"
            v-on:click="show"
          >
            <i class="fa fa-edit"></i>
          </button>
        </div>
        <div v-if="!getBoatRulesLoading" class="card-body">
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fas fa-calendar-week"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <div v-if="boatRulesRequestModel.reservationFlexibility == 0">
                  <span>
                    {{$t('boat_condition_reservation_flexibility')}}({{$t('filter_header_esnek')}}) : {{$t('boat_condition_advance_payment_day')}}</span
                  >
                </div>
                <div v-else-if="boatRulesRequestModel.reservationFlexibility == 1">
                  <span
                    >{{$t('boat_condition_reservation_flexibility')}} ({{$t('filter_header_katı')}}) : {{$t('boat_condition_advance_payment_mounth')}}</span
                  >
                </div>
                <div v-else>
                  <span
                    >Rezervasyon Esnekliği (Özel) :
                    {{ boatRulesRequestModel.reservationFlexibilityDesc }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-calendar-week"></i>
            </div>
            <div class="boat-conditions-content">
              <span>Check-in Günü : {{ boatRulesRequestModel.checkInDay }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-clock"></i>
            </div>
            <div class="boat-conditions-content">
              <span>Check-in Saati : {{ boatRulesRequestModel.checkIn }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-clock"></i>
            </div>
            <div class="boat-conditions-content">
              <span>Check-out Saati : {{ boatRulesRequestModel.checkOut }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-ship"></i>
            </div>
            <div class="boat-conditions-content">
              <span
                >Fiyata Dahil Günlük Seyir Limiti / Saat :
                {{ boatRulesRequestModel.dailyUseOfDiesel }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-fan"></i>
            </div>
            <div class="boat-conditions-content">
              <span
                >Fiyata Dahil Haftalık Klima Kullanımı / Saat :
                {{ boatRulesRequestModel.airConditionerWeeklyUse }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-money-check"></i>
            </div>
            <div class="boat-conditions-content">
              <span>Depozito Miktarı : {{ boatRulesRequestModel.depositFee }}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-file-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isCaptainLicenseRequired == true">
                Kiralamak İçin Kaptanlık Belgesi Gereklidir</span
              >
              <span v-else>{{$t('boat_condition_isNotCaptainLicenseRequired')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-paw"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.petFree == true">Evcil Hayvan Serbest</span>
              <span v-else>Evcil Hayvan Serbest Değil</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-gas-pump"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isTheFuelIncluded == true"
                >Yakıt Fiyata Dahil</span
              >
              <span v-else>{{$t('boat_rules-isTheFuelNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-broom"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isTheFinalCleaningIncluded == true"
                >Son Temizlik Fiyata Dahil</span
              >
              <span else>{{$t('boat_rules-isTheFinalCleaningNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="far fa-file-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isTheTransitlogIncluded == true"
                >Transitlog Fiyata Dahil
              </span>
              <span else>{{$t('boat_rules-isTheTransitlogNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-cookie"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isFoodIncluded == true">Yemek Fiyata Dahil</span>
              <span v-else>Yemek Fiyata Dahil Değil</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isMealPrepIncluded == true"
                >Yemek Hazırlığı Fiyata Dahil</span
              >
              <span v-else>{{$t('boat_rules_isMealPrepNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-wine-glass-alt"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isAlcoholIncluded == true"
                >Alkol Fiyata Dahil</span
              >
              <span v-else>{{$t('boat_rules_isAlcoholNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-money-bill"></i>
            </div>
            <div class="boat-conditions-content">
              <span v-if="boatRulesRequestModel.isTheTipIncluded == true"
                >Bahşiş Fiyata Dahil</span
              >
              <span v-else>{{$t('boat_rules_isTheTipNotIncluded')}}</span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <i class="fas fa-file"></i>
            </div>
            <div class="boat-conditions-content">
              <span
                >Kendi Kurallarınız ve Iptal Koşullarınız :
                {{ boatRulesRequestModel.explanationForRulesDesc }}</span
              >
            </div>
          </div>
          <edit-boat-rules-modal :boatRules="boatRulesRequestModel"></edit-boat-rules-modal>
        </div>
        <div v-else class="card-body" style="height: 670px">
          <div
            class="loading-payment-page"
            style="min-height: 0 !important; padding-top: 250px"
          >
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FETCH_BOAT_RULES } from "../../../../store/actions.type.js";
import { mapGetters } from "vuex";
import editBoatRules from "./EditBoatRules.vue";

export default {
  props: ["boatId"],
  components: {
    'edit-boat-rules-modal':editBoatRules,
  },
  data() {
    return {
      name: "boat-rules",
      boatRulesRequestModel: 
      {
        "checkInDay": "Haftanın Her Günü",
        "isTheFuelIncluded": false,
        "isTheFinalCleaningIncluded": false,
        "isTheTransitlogIncluded": false,
        "isCaptainLicenseRequired": false,
        "isTheDepositIncluded": false,
        "depositFee": 0,
        "checkOut": "00:00",
        "checkIn": "10:00",
        "id": 0,
        "reservationFlexibility": 0,
        "petFree": false,
        "petFreeDesc": false,
        "isFoodIncluded": false,
        "isFoodIncludedDesc": false,
        "isMealPrepIncluded": false,
        "isAlcoholIncluded": false,
        "isTheTipIncluded": false,
        "dailyUseOfDiesel": 0,
        "airConditionerWeeklyUse": 0,
        "explanationForRules": false,
}
    };
  },
  computed: {
    ...mapGetters(["getBoatRules", "getBoatRulesLoading"]),
  },
  async created() {
    this.$store.commit("setBoatRulesRequestModel", this.boatRulesRequestModel);
    var res = await this.$store.dispatch(FETCH_BOAT_RULES, this.boatId);
    if(res.error != true) {
      this.boatRulesRequestModel = res.data;
    }
  },
  methods: {
    show() {
      this.$modal.show("edit-boat-rules-modal");
    },
  },
};
</script>

<style>
.boat-conditions-content {
  text-align: start;
}
.description-conditions {
  padding-top: 48px;
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
