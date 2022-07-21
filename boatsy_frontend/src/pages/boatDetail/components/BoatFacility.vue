<template>
  <div class="description-facility">
    <div class="row des-facility">
      <div class="col-md-12 facility">
        <h4 class="card-des-facility">
          {{ $t("boat_facility_card-des-facility") }}
        </h4>
      </div>
    </div>

    <div class="boat-feature-container">
      <div v-for="(element, index) in getBoatFeatures" :key="index">
        <div
          v-for="item in element.features"
          class="boat-feature-card"
          v-if="index < 2"
        >
          <div v-if="item.value > 0" class="boat-feature-info">
            <div class="feature-icon">
              <img v-bind:src="setIcon(item.name)" alt="" />
            </div>
            <div class="feature-content">
              <span> {{ $t(item.name) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="boat-feature-button" style="margin-top: 9px">
      <button @click="getDetailBoatFeature()" class="feature-button-content">
        {{ $t("boat_facility_show_more") }}
      </button>
    </div>
    <modal name="feature-modal" :scrollable="true" height="auto">
      <div class="modal-header" style="padding: 1rem 1rem 1rem 1rem">
        <h4>{{ $t("boat_facility_feature-model") }}</h4>
        <i class="fas fa-times" @click="hide()"></i>
      </div>
      <div class="boat-feature-container-modal" style="padding-left: 1rem">
        <div v-for="element in getBoatFeatures">
          <div class="feature-name">
            <h5>{{ $t(element.name) }}</h5>
          </div>
          <div v-for="item in element.features" class="boat-feature-card">
            <div v-if="item.value > 0" class="boat-feature-info">
              <div class="feature-icon">
                <img v-bind:src="setIcon(item.name)" alt="" />
              </div>
              <div class="feature-content">
                <span> {{ $t(item.name) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_BOAT_FEATURES } from "../../../store/actions.type.js";
export default {
  data() {
    return {
      name: "boat-card-facility",
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
    };
  },
  computed: {
    ...mapGetters(["getBoatFeatures"]),
  },
  async created() {
    this.$store.commit(
      "setBoatDetailId",
      this.$router.history.current.params["boatId"]
    );
    this.$store.dispatch(FETCH_BOAT_FEATURES);
  },
  methods: {
    setIcon(itemName) {
      return this.icons[itemName];
    },
    getDetailBoatFeature() {
      this.$modal.show("feature-modal");
    },
    show() {
      this.$modal.show("feature-modal");
    },
    hide() {
      this.$modal.hide("feature-modal");
    },
  },
};
</script>

<style>
.description-facility {
  margin-top: 30px !important;
}

.des-facility {
  display: grid;
  grid-auto-flow: column;
  gap: 1.5em;
  justify-content: start;
}
.feature-name h5 {
  text-align: start;
  padding-top: 20px;
}
.boat-feature-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.boat-feature-container-modal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;
}
.boat-feature-info {
  display: flex;
  align-items: center;
  padding-top: 10px;
}

.boat-feature-info img {
  width: 36px;
  height: auto;
}
.feature-content {
  text-align: start;
  padding-left: 10px;
}

.description-facility h4 {
  text-align: start !important;
}

.support-body-button,
.boat-feature-button {
  display: flex;
  justify-content: flex-start;
}
.feature-icon {
  width: 50px;
}
.feature-icon img {
  width: 100%;
}
.feature-button-content {
  padding: 10px 40px;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #fff;
}

@media (max-width: 982px) {
  .boat-feature-container {
    grid-template-columns: 50%;
  }
}

@media (max-width: 526px) {
  .boat-feature-container {
    grid-template-columns: 100%;
  }
}
</style>
