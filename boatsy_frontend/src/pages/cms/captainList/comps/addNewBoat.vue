<template>
  <modal
    :scrollable="true"
    :height="'auto'"
    :width="'60%'"
    name="new-boat-modal"
  >
    <div class="modal-header">
      <span style="float: left; padding: 7px; font-size: 20px"
        >Yeni Tekne Ekle
      </span>
      <a v-on:click="hide">
        <i class="fas fa-times"></i>
      </a>
    </div>
    <div class="modal-body row">
      <div class="col-md-12 mb-3">
        <label style="float: left">Kaptan ID</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.captainId"
          required
        />
      </div><div class="col-md-12 mb-3">
        <label style="float: left">Tekne Açıklaması</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.description"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tekne Tipi</label>
        <select
          type="text"
          class="form-control"
          v-model="boatFeatures.boatTypeName"
          style="border: 1px solid silver"
        >
          <option
            v-for="(boatType, index) in boatTypes"
            v-if="index != 0"
            :value="boatType.name"
            >{{ boatType.name }}</option
          >
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Ülke</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.cCountry"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Şehir</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.cState"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">İlçe</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.cCity"
          required
        />
      </div>
      <div class="col-md-12 mb-3">
        <label style="float: left">Adres</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.address"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Enlem</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.lat"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Boylam</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.lng"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Fiyatlandırma Türü</label>
        <select
          class="form-control"
          v-model="boatFeatures.isDaily"
          style="border: 1px solid silver"
        >
          <option value="0">Saatlik</option>
          <option value="1">Günlük</option>
        </select>
      </div>
       <div class="col-md-6 mb-3">
        <label style="float: left">Fiyat</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.dailyPrice"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Minumum Kiralama Süresi</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.minimumRentTime"
          required
        />
        </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Kur Seçimi</label>
        <select
          type="text"
          class="form-control"
          v-model="boatFeatures.currencyId"
          style="border: 1px solid silver"
        >
         <option
              v-for="(element, index) in currency"
              :key="index"
              :value="element.id"
              class="selectOption"
            >
              {{ element.description }}
          </option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tekne Uzunluğu</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.boatHeight"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Model</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.brandName"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Yapım Yılı</label>
        <input
          type="number"
          min="1000"
          max="2022"
          class="form-control"
          v-model="boatFeatures.year"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Refit Yılı</label>
        <input
          type="number"
          min="1000"
          max="2022"
          class="form-control"
          v-model="boatFeatures.refitYear"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Kiralama Türü</label>
        <select
          class="form-control"
          v-model="boatFeatures.captain"
          style="border: 1px solid silver"
        >
          <option value="0">Kaptansız</option>
          <option value="1">Kaptanlı</option>
          <option value="2">Mürettebatlı</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Seyir Kapasitesi</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.personCapacity"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tuvalet Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.wcCount"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Duş Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.showerCount"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Konaklama Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.accommodationCapacity"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Motor Beygir Gücü (Hp)</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.motorHp"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tekne Malzemesi</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.material"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Ana Yelken</label>
        <input
          type="text"
          class="form-control"
          v-model="boatFeatures.mainSailing"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tam Genişlik / Beam (m)</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.fullWidth"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Su Çekimi / Draft (m)</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.waterPump"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Su Tankı Kapasitesi (Lt)</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.waterTankCapacity"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Benzin Tankı Kapasitesi (Lt)</label>
        <input type="number" class="form-control" v-model="boatFeatures.fuelCapacity" required />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Master Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.masterRoom"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Twin Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.twinRoom"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Double Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.doubleRoom"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Single Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.singleRoom"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Salon</label>
        <input
          type="number"
          class="form-control"
          v-model="boatFeatures.salonRoom"
        />
      </div>
      <div class="col-12 cms-save-button">
        <button @click="saveBoatFeatures" v-if="!loadingButton">Kaydet</button>
        <button v-else style="width:90px;">
          <img src="/assets/images/loading.gif" width="40px" />
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import Vue from "vue";
import { FETCH_BOAT_RULES, SET_BOAT } from "../../../../store/actions.type.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      boatFeatures: {
        id : 0,
        name : "",
        year : 0,
        refitYear :0,
        captain : "",
        minimumRentTime : 0,
        isDaily :0,
        boatTypeId : 0,
        brandName : "",
        boatHeight : 0,
        description : "",
        cCountry : "",
        address : "",
        dailyPrice : 0,
        cState : "",
        cCity : "",
        boatTypeName:"Gulet",
        defaultImageIndex : 0,
        currencyId : 0,
        twinRoom : 0,
        masterRoom : 0,
        doubleRoom : 0,
        singleRoom : 0,
        salonRoom : 0,
        wcCount : 0,
        showerCount : 0,
        motorHp : 0,
        mainSailing : "",
        material : "",
        fullWidth :0,
        waterPump :0,
        waterTankCapacity : 0,
        fuelCapacity : 0,
        accommodationCapacity : 0,
        lat : 0,
        lng : 0,
        personCapacity : 1,
        captainId:0
      },
      loadingButton: false,
    };
  },
  computed: {
    ...mapGetters({
      currency: "getCurrency",
      boatTypes: "getBoatTypes"
    }),
  },

  methods: {
    hide() {
      this.$modal.hide("new-boat-modal");
    },
    async saveBoatFeatures() {
      this.loadingButton = true;

      this.boatFeatures.name = this.boatFeatures.boatTypeName + " " + this.boatFeatures.year;
      let boatTypeName = this.boatFeatures.boatTypeName;
      const selectedBoatType = this.boatTypes.find(function(type) {
        return type.name === boatTypeName;
      });

      this.boatFeatures.boatTypeId = selectedBoatType.id;

      var res = await this.$store.dispatch(SET_BOAT, this.boatFeatures);

      if (res.error != true) {
        Vue.swal.fire("İşlem Başarılı", "Değişiklikler Kaydedildi", "success",3000);
        
        this.$router.push({
          name: 'CmsBoatDetail',
          params: {
            boatId : res.data.id
          }
        })
      } else {
        this.loadingButton = false;
        Vue.swal.fire(
          "İşlem Başarısız",
          "Değişiklikler Kaydedilemedi.Lütfen Tekrar Deneyin.",
          "error"
        );
      }
    },
  },
};
</script>
<style>
.cms-save-button {
  text-align: end;
}
.cms-save-button button {
  border: none;
  background-color: #ef4036;
  padding: 10px 20px;
  color: #fff;
}
</style>
