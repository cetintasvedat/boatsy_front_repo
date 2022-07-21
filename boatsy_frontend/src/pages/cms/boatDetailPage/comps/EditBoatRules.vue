<template>
  <modal
    :scrollable="true"
    :height="'auto'"
    :width="'60%'"
    name="edit-boat-rules-modal"
  >
    <div class="modal-header">
      <span style="float: left; padding: 7px; font-size: 20px"
        >{{$t('edit_boat_rules_modal')}}
      </span>
      <a v-on:click="hide">
        <i class="fas fa-times"></i>
      </a>
    </div>
    <div class="modal-body row">
      <div class="col-md-6 mb-3">
        <label style="float: left">Rezervasyon Esnekliği</label>
        <select
          class="form-control"
          style="border: 1px solid silver"
          v-model="boatRules.reservationFlexibility"
        >
          <option class="selectOption" value="0">Esnek</option>
          <option class="selectOption" value="1">Katı</option>
          <option class="selectOption" value="2">Özel</option>
        </select>
        <div
          style="margin-top:16px;"
          v-if="boatRules.reservationFlexibility == 2"
        >
          <label style="float: left">Lütfen bir açıklama giriniz : </label>
          <input
            type="text"
            class="form-control "
            v-model="boatRules.reservationFlexibilityDesc"
          />
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left"> {{$t('boat_rules_day"')}}</label>
        <input
          type="text"
          class="form-control "
          v-model="boatRules.checkInDay"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left"> {{$t('boat_rules_checkIn_hour')}}</label>
        <input
          type="time"
          class="form-control "
          v-model="boatRules.checkIn"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left"> {{$t('boat_rules_checkOut_hour')}} </label>
        <input
          type="time"
          class="form-control "
          v-model="boatRules.checkOut"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">
          Fiyata Dahil Günlük Seyir Limiti / Saat
        </label>
        <input
          type="number"
          class="form-control "
          v-model="boatRules.dailyUseOfDiesel"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">
          Fiyata Dahil Haftalık Klima Kullanımı / Saat
        </label>
        <input
          type="number"
          class="form-control "
          v-model="boatRules.airConditionerWeeklyUse"
          required
        />
      </div>
      <div class="col-md-6 mb-3" v-if="boatRules.isTheDepositIncluded">
        <label style="float: left"> Depozito Miktarı </label>
        <input
          type="number"
          class="form-control "
          v-model="boatRules.depositFee"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">
          Kendi Kurallarınız ve Iptal Koşullarınız
        </label>
        <input
          type="text"
          class="form-control "
          v-model="boatRules.explanationForRulesDesc"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left">
          Kiralamak İçin Kaptanlık Belgesi Gerekli
        </label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isCaptainLicenseRequired"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Evcil Hayvan Serbest </label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.petFree"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Yakıt Dahil </label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isTheFuelIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Son Temizlik Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isTheFinalCleaningIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Transitlog Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isTheTransitlogIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Yemek Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isFoodIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Yemek Hazırlığı Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isMealPrepIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Alkol Dahil</label>
        <input
          type="checkbox"
          style="margin:0 !important"
          class="form-control "
          v-model="boatRules.isAlcoholIncluded"
          required
        />
      </div>
      <div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Bahşiş Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isTheTipIncluded"
          required
        />
      </div><div class="cms-checkbox col-md-6 mb-3">
        <label style="float: left"> Depozito Dahil</label>
        <input
          type="checkbox"
          class="form-control "
          style="margin:0 !important"
          v-model="boatRules.isTheDepositIncluded"
          required
        />
      </div>
      <div class="col-12 cms-save-button">
        <button @click="saveBoatRules" v-if="!loadingButton">Kaydet</button>
        <button v-else style="width:90px;">
          <img src="/assets/images/loading.gif" width="40px" />
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import {
  FETCH_BOAT_RULES,
  SET_BOAT_RULES,
} from "../../../../store/actions.type.js";
import { mapGetters } from "vuex";
import Vue from "vue";
export default {
  props: ["boatRules"],
  data() {
    return {
      name: "edit-boat-rules-modal",
      loadingButton: false,
      boatRulesRequestModel: [
        {
          name: "Rezervasyon esknekliği",
          value: 0,
          description: "",
        },
        {
          name: "Check-in saati",
          value: "10:00",
        },
        {
          name: "Check-out saati",
          value: "12:00",
        },
        {
          name: "Check-In Günü",
          value: "12:00",
        },
        {
          name: "Mazot günlük ücrete dahil olan kullanım limiti (Saat)",
          value: 0,
        },
        {
          name: "Klima günlük ücrete dahil olan kullanım limiti (Saat)",
          value: 0,
        },
        {
          name: "Kendi Kurallarınız ve Iptal Koşullarınız",
          value: 0,
        },
        {
          name: "Yakıt Dahil",
          value: false,
        },
        {
          name: "Yemek dahil",
          value: false,
        },
        {
          name: "Yemek hazırlığı dahil",
          value: false,
        },
        {
          name: "Evcil hayvan serbest",
          value: false,
        },
        {
          name: "Transitlog Dahil",
          value: false,
        },
        {
          name: "Son Temizlik Dahil",
          value: false,
        },
        {
          name: "Alkol dahil",
          value: false,
        },
        {
          name: "Bahşiş dahil",
          value: false,
        },
        {
          name: "Kiralamak İçin Kaptanlık Belgesi Gerekli",
          value: false,
        },
        {
          name: "Depozito Miktarı",
          value: 0,
          description: "",
        },
      ],
    };
  },
  methods: {
    hide() {
      this.$modal.hide("edit-boat-rules-modal");
    },
    async saveBoatRules() {
      this.loadingButton = true;

      this.boatRulesRequestModel[0].value = this.boatRules.reservationFlexibility;
      this.boatRulesRequestModel[0].description = this.boatRules.reservationFlexibilityDesc;
      this.boatRulesRequestModel[1].value = this.boatRules.checkIn;
      this.boatRulesRequestModel[2].value = this.boatRules.checkOut;
      this.boatRulesRequestModel[3].value = this.boatRules.checkInDay;
      this.boatRulesRequestModel[4].value = this.boatRules.dailyUseOfDiesel;
      this.boatRulesRequestModel[5].value = this.boatRules.airConditionerWeeklyUse;
      this.boatRulesRequestModel[6].value = this.boatRules.explanationForRulesDesc;
      this.boatRulesRequestModel[7].value = this.boatRules.isTheFuelIncluded;
      this.boatRulesRequestModel[8].value = this.boatRules.isFoodIncluded;
      this.boatRulesRequestModel[9].value = this.boatRules.isMealPrepIncluded;
      this.boatRulesRequestModel[10].value = this.boatRules.petFree;
      this.boatRulesRequestModel[11].value = this.boatRules.isTheTransitlogIncluded;
      this.boatRulesRequestModel[12].value = this.boatRules.isTheFinalCleaningIncluded;
      this.boatRulesRequestModel[13].value = this.boatRules.isAlcoholIncluded;
      this.boatRulesRequestModel[14].value = this.boatRules.isTheTipIncluded;
      this.boatRulesRequestModel[15].value = this.boatRules.isCaptainLicenseRequired;
      this.boatRulesRequestModel[16].value = this.boatRules.isTheDepositIncluded;
      this.boatRulesRequestModel[16].description = this.boatRules.depositFee;

      const boatRulesBody = {
        boatId: this.$router.history.current.params["boatId"],
        infi: this.boatRulesRequestModel,
      };

      var res = await this.$store.dispatch(SET_BOAT_RULES, boatRulesBody);

      if (res.error != true) {
        this.loadingButton = false;
        Vue.swal.fire("İşlem Başarılı", "Değişiklikler Kaydedildi", "success");
        this.hide();
      } else {
        this.loadingButton = false;
        Vue.swal.fire(
          "İşlem Başarısız",
          "Değişiklikler Kaydedilemedi. Lütfen Tekrar Deneyin.",
          "error"
        );
      }
    },
  },
  computed: {
    ...mapGetters(["getBoatRules", "getBoatRulesLoading"]),
  },
  created() {},
};
</script>

<style>
.cms-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-body select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  cursor: pointer;
}
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
