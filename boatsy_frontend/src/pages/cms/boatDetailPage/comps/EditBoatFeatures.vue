<template>
  <modal
    :scrollable="true"
    :height="'auto'"
    :width="'60%'"
    name="edit-boat-features-modal"
  >
    <div class="modal-header">
      <span style="float: left; padding: 7px; font-size: 20px"
        >Tekne Özelliklerini Düzenle
      </span>
      <a v-on:click="hide">
        <i class="fas fa-times"></i>
      </a>
    </div>
    <div class="modal-body row">
      <div class="col-md-12 mb-3">
        <label style="float: left">Tekne Açıklaması</label>
        <input
          type="text"
          class="form-control"
          required
          v-model="boatFeatures.description"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tekne Tipi</label>
        <select
          type="text"
          class="form-control"
          style="border: 1px solid silver"
          v-model="boatFeatures.boattypename"
        >
          <option
            v-for="(boatType, index) in boatTypes"
            v-if="index != 0"
            :value="boatType.name"
          >
            {{ boatType.name }}
          </option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tekne Statüsü</label>
        <select
          class="form-control"
          v-model="boatFeatures.boatstatu"
          style="border: 1px solid silver"
        >
          <option value="0">Tekne özellikleri eksik</option>
          <option value="1">Tekne fotoğrafları eksik</option>
          <option value="2">Tekne kuralları eksik</option>
          <option value="3">Tekne ekstraları eksik</option>
          <option value="4">Zorunlu belgeleri eksik</option>
          <option value="5">Onay Bekliyor</option>
          <option value="6">Onaylandı</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Ülke</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.boatFeatures.ccountry.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.ccountry),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Şehir</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.boatFeatures.state.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.state),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">İlçe</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.boatFeatures.city.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.city),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Fiyatlandırma Türü</label>
        <select
          class="form-control"
          v-model="boatFeatures.isdaily"
          style="border: 1px solid silver"
        >
          <option value="0">Saatlik</option>
          <option value="1">Günlük</option>
        </select>
      </div>
      <div class="col-md-12 mb-3">
        <label style="float: left">Adres</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.boatFeatures.address.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.address),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Enlem</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.lat.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.lat),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Boylam</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.lng.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.lng),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Günlük Fiyat</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.dailyprice.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.dailyprice),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Kur Seçimi</label>
        <select
          type="text"
          class="form-control"
          v-model="boatFeatures.currencyid"
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
          v-model.trim="$v.boatFeatures.boatheight.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.boatheight),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Model</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="$v.boatFeatures.brandname.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.brandname),
          }"
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
          v-model.trim="$v.boatFeatures.modelyear.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.modelyear),
          }"
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
          v-model="boatFeatures.refityear"
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
          v-model.trim="$v.boatFeatures.personcapacity.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.personcapacity),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tuvalet Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.wccount.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.wccount),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Duş Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.showercount.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.showercount),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Konaklama Sayısı</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.accommodationcapacity.$model"
          :class="{
            'is-invalid': validationStatus(
              $v.boatFeatures.accommodationcapacity
            ),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Motor Beygir Gücü (Hp)</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.motorhp.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.motorhp),
          }"
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
          v-model="boatFeatures.mainsailing"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Tam Genişlik / Beam (m)</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.fullwidth.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.fullwidth),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Su Çekimi / Draft (m)</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.waterpump.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.waterpump),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Su Tankı Kapasitesi (Lt)</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.watertankcapacity.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.watertankcapacity),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Benzin Tankı Kapasitesi (Lt)</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.fuelcapacity.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.fuelcapacity),
          }"
          required
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Master Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.masterroom.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.masterroom),
          }"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Twin Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.twinroom.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.twinroom),
          }"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Double Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.doubleroom.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.doubleroom),
          }"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Single Kabin</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.singleroom.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.singleroom),
          }"
        />
      </div>
      <div class="col-md-6 mb-3">
        <label style="float: left">Salon</label>
        <input
          type="number"
          class="form-control"
          v-model.trim="$v.boatFeatures.salonroom.$model"
          :class="{
            'is-invalid': validationStatus($v.boatFeatures.salonroom),
          }"
        />
      </div>
      <div class="col-12 cms-save-button">
        <button @click="saveBoatFeatures" v-if="!loadingButton">Kaydet</button>
        <button v-else style="width: 90px">
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
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  props: ["boatFeatures", "boatTypes"],
  data() {
    return {
      setBoatObjectModel: {},
      loadingButton: false,
    };
  },
  validations: {
    boatFeatures: {
      name: { required, minLength: minLength(1) },
      modelyear: { required, minLength: minLength(1) },
      refityear: { required, minLength: minLength(1) },
      brandname: { required, minLength: minLength(1) },
      boatheight: { required, minLength: minLength(1) },
      ccountry: { required, minLength: minLength(1) },
      address: { required, minLength: minLength(1) },
      dailyprice: { required, minLength: minLength(1) },
      state: { required, minLength: minLength(1) },
      city: { required, minLength: minLength(1) },
      defaultimageindex: { required, minLength: minLength(1) },
      currencyid: { required, minLength: minLength(1) },
      twinroom: { required, minLength: minLength(1) },
      masterroom: { required, minLength: minLength(1) },
      doubleroom: { required, minLength: minLength(1) },
      singleroom: { required, minLength: minLength(1) },
      salonroom: { required, minLength: minLength(1) },
      wccount: { required, minLength: minLength(1) },
      showercount: { required, minLength: minLength(1) },
      motorhp: { required, minLength: minLength(1) },
      fullwidth: { required, minLength: minLength(1) },
      waterpump: { required, minLength: minLength(1) },
      watertankcapacity: { required, minLength: minLength(1) },
      fuelcapacity: { required, minLength: minLength(1) },
      accommodationcapacity: { required, minLength: minLength(1) },
      lat: { required, minLength: minLength(1) },
      lng: { required, minLength: minLength(1) },
      personcapacity: { required, minLength: minLength(1) },
    },
  },
  computed: {
    ...mapGetters({
      currency: "getCurrency",
    }),
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    hide() {
      this.$modal.hide("edit-boat-features-modal");
    },
    async saveBoatFeatures() {
      this.$v.$touch();
      if (this.$v.$error) {
        return false;
      }
      this.loadingButton = true;

      let boatTypeName = this.boatFeatures.boattypename;
      const selectedBoatType = this.boatTypes.find(function (type) {
        return type.name === boatTypeName;
      });

      this.setBoatObjectModel = {
        id: this.boatFeatures.id,
        name: this.boatFeatures.name,
        year: this.boatFeatures.modelyear,
        boatStatus: parseInt(this.boatFeatures.boatstatu),
        refitYear: this.boatFeatures.refityear,
        captain: this.boatFeatures.captain,
        minimumRentTime: this.boatFeatures.minimunrenttime??0,
        isDaily: this.boatFeatures.isdaily,
        boatTypeId: selectedBoatType.id,
        brandName: this.boatFeatures.brandname,
        boatHeight: this.boatFeatures.boatheight,
        description: this.boatFeatures.description,
        cCountry: this.boatFeatures.ccountry,
        address: this.boatFeatures.address,
        dailyPrice: this.boatFeatures.dailyprice,
        cState: this.boatFeatures.state,
        cCity: this.boatFeatures.city,
        defaultImageIndex: this.boatFeatures.defaultimageindex,
        currencyId: this.boatFeatures.currencyid,
        twinRoom: this.boatFeatures.twinroom,
        masterRoom: this.boatFeatures.masterroom,
        doubleRoom: this.boatFeatures.doubleroom,
        singleRoom: this.boatFeatures.singleroom,
        salonRoom: this.boatFeatures.salonroom,
        wcCount: this.boatFeatures.wccount,
        showerCount: this.boatFeatures.showercount,
        motorHp: this.boatFeatures.motorhp,
        mainSailing: this.boatFeatures.mainsailing,
        material: this.boatFeatures.material,
        fullWidth: this.boatFeatures.fullwidth,
        waterPump: this.boatFeatures.waterpump,
        waterTankCapacity: this.boatFeatures.watertankcapacity,
        fuelCapacity: this.boatFeatures.fuelcapacity,
        accommodationCapacity: this.boatFeatures.accommodationcapacity,
        lat: this.boatFeatures.lat,
        lng: this.boatFeatures.lng,
        personCapacity: this.boatFeatures.personcapacity,
      };

      var res = await this.$store.dispatch(SET_BOAT, this.setBoatObjectModel);

      if (res.error != true) {
        this.loadingButton = false;
        Vue.swal.fire("İşlem Başarılı", "Değişiklikler Kaydedildi", "success");
        this.hide();
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
