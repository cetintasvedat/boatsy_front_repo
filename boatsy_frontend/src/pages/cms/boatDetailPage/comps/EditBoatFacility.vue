<template>
  <modal :scrollable="true" :height="'auto'" name="edit-boat-facility-modal">
    <div class="modal-header">
      <span style="float: left; font-size: 20px"
        >Tekne İmkanlarını Düzenle
      </span>
      <a v-on:click="hide">
        <i class="fas fa-times"></i>
      </a>
    </div>
    <div class="modal-body">
      <div class="row" v-for="(featureGroup, groupIndex) in featureList">
        <span class="col-12" style="font-weight:700; padding-bottom: 15px;">{{
          featureGroup.name
        }}</span>
        <div
          class="cms-checkbox col-md-6 mb-3"
          v-for="(feature, featureIndex) in featureGroup.features"
        >
          <label style="float: left">{{ feature.name }}</label>
          <div style="display: flex; align-items: center; gap:5px;">
            <div
              class="qtyDec"
              @click="feature.value == 0 ? 0 : (feature.value -= 1)"
            ></div>
            <div class="qtyInput" style="font-weight:normal !important;">
              {{ feature.value }}
            </div>
            <div class="qtyInc" @click="feature.value += 1"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 cms-save-button">
      <button @click="saveBoatFacility" v-if="!loadingButton">Kaydet</button>
      <button style="width:90px;" v-else>
        <img src="/assets/images/loading.gif" width="40px" />
      </button>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BOAT_FEATURES } from "../../../../store/actions.type";
import Vue from "vue";

export default {
  props: ["featureList"],
  data() {
    return {
      loadingButton: false,
      boatId: this.$router.history.current.params["boatId"],
    };
  },
  methods: {
    hide() {
      this.$modal.hide("edit-boat-facility-modal");
    },
    async saveBoatFacility() {
      this.loadingButton = true;

      const boatFacilityBody = {
        boatId: this.boatId,
        datai: this.featureList,
      };

      var res = await this.$store.dispatch(SET_BOAT_FEATURES, boatFacilityBody);

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
.cms-checkbox .qtyInc,
.cms-checkbox .qtyDec {
  width: 25px;
  height: 25px;
  font-size: 1.5em;
}
</style>
