<template>
  <div class="description-conditions" style="border: none;">
    <div class="cms-boat-conditions-container">
      <div class="card bg-light mb-3">
        <div class="card-header">
          <span style="float: left; padding: 7px; font-size: 20px"
            >Tekne İmkanları
          </span>
          <button
            class="btn_1"
            style="border-radius: 999px; float: right"
            v-on:click="show"
          >
            <i class="fa fa-edit"></i>
          </button>
        </div>
        <div class="card-body" v-if="!loading">
          <div
            class="card-feature-name row"
            v-for="featureGroup in featureList"
          >
            <span class="col-12" style="font-weight:700"
              >{{ featureGroup.name }} :
            </span>
            <div
              class="col-6 boat-conditions"
              style="padding-top: 10px; align-items: center;"
              v-for="feature in featureGroup.features"
            >
              <div class="boat-conditions-title">
                <img :src="setIcon(feature.name)" />
              </div>
              <div class="boat-conditions-content" style="padding-left: 5px;">
                <div class="reservation-flexibility" style="display:flex; justify-content: space-between">
                  <span> {{ feature.name }} </span>
                  <span style="font-weight:700"> {{ feature.value }} </span>
                </div>
              </div>
            </div>
          </div>
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
      <edit-boat-facility-modal
        :featureList="featureList"
      ></edit-boat-facility-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_BOAT_FEATURES,FETCH_BOAT_FEATURES_WITH_BOAT_TYPE_ID } from "../../../../store/actions.type.js";
import editBoatFacility from "./EditBoatFacility.vue";
export default {
  props: ["boatTypeId"],
  data() {
    return {
      icons: {
        "Sıcak Su": "/img/icons/hot_water.png",
        USB: "/img/icons/usb.png",
        Televizyon: "/img/icons/tv.png",
        Buzdolabı: "/img/icons/fridge.png",
        Buzluk: "/img/icons/freezer.png",
        Fırın: "/img/icons/oven.png",
        Ocak: "/img/icons/stove.png",
        "Dıştan Motorlu": "/img/icons/engine.png",
        "Dıştan Takma Motor": "/img/icons/nology_motor.png",
        "Otomatik Pilot": "/img/icons/artificial intelligence.png",
        GPS: "/img/icons/gps.png",
        "Derinlik Ölçer": "/img/icons/depth.png",
        Telsiz: "/img/icons/walkie-talkie.png",
        "Su Altı Aydınlatma": "/img/icons/light.png",
        Sprayhood: "/img/icons/markise.png",
        "Dış Duş": "/img/icons/shower_water.png",
        "Dıştan Takma Motor": "/img/icons/nology_motor.png",
        Gölgelik: "/img/icons/markise.png",
        Çapa: "/img/icons/anchor.png",
        "Güvertede Duş": "/img/icons/shower_water.png",
        "Güvertede Masa": "/img/icons/camping_table.png",
        "Güneşlenme Terası": "/img/icons/sun_travel_beach.png",
        "Tekneye Binme Merdiveni": "/img/icons/staircase.png",
        "Güneşlik Şemsiye": "/img/icons/summer_beach_umbrella.png",
        "Oturma Alanı": "/img/icons/outline_table.png",
        Bimini: "/img/icons/markise.png",
        Şnorkel: "/img/icons/snorkel.png",
        "Deniz Gözlüğü": "/img/icons/glasses.png",
        Olta: "/img/icons/fishing.png",
        Kano: "/img/icons/canoe.png",
      },
      loading: true,
    };
  },
  components: {
    "edit-boat-facility-modal": editBoatFacility,
  },
  computed: {
    ...mapGetters({
      featureList: "getBoatFeatureList"}),
  },
  async created() {
    await this.$store.dispatch(FETCH_BOAT_FEATURES)
    var res = await this.$store.dispatch(FETCH_BOAT_FEATURES_WITH_BOAT_TYPE_ID, this.boatTypeId)

    if(!res) {
      this.loading = false
    }
  },
  methods: {
    setIcon(itemName) {
      return this.icons[itemName];
    },
    show() {
      this.$modal.show("edit-boat-facility-modal");
    },
  },
};
</script>

<style>
.boat-conditions-title img {
  width: 14px;
}
</style>
