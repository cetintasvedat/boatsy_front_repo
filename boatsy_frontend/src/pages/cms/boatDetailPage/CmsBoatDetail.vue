<template>
  <div class="boatDetail">
    <loading v-if="getBoatDetailLoading == true"></loading>
    <div v-else>
      <div class="row" style="margin: 80px 30px 0 30px">
        <a
          class="btn btn-default"
          title="info"
          :class="{ '-nested-comp-open-btn': true }"
        >
          <span>Eklenme Tarihi: {{ changeDateFormat(getBoatDetail.inserteddate,'DD-MM-YYY') }}</span>
        </a>
         <a
          class="btn btn-default"
          title="info"
          :class="{ '-nested-comp-open-btn': true }"
        >
          <span>Güncelleme Tarihi: {{ changeDateFormat(getBoatDetail.updateddate,'DD-MM-YYY') }}</span>
        </a>
           <a
          class="btn btn-default"
          title="info"
          :class="{ '-nested-comp-open-btn': true }"
        >
          <span>Beğenilme Sayısı: {{getBoatDetail.likecount}}</span>
        </a>
        <a
          :href="'/captainprofile/' + getBoatDetail.userid"
          class="btn btn-default"
          title="info"
          target="_blank"
          :class="{ '-nested-comp-open-btn': true }"
        >
          <span>Kaptan Id: {{ getBoatDetail.userid }}</span>
        </a>
      </div>
      <ImageUploader
        :images="getBoatDetail.image"
        :boatId="getBoatDetail.id"
      ></ImageUploader>
      <br />
      <BoatCalendar :boatId="boatId"></BoatCalendar>
      <div class="cms-edit-cards">
        <boatRules :boatId="boatId" style="width: 100%"></boatRules>
        <boatFeatures
          :boatDetail="getBoatDetail"
          :boatTypes="getBoatTypes"
          style="width: 100%"
        ></boatFeatures>
        <boatFacility
          :boatTypeId="getBoatDetail.boattypeid"
          style="width: 100%"
        ></boatFacility>
      </div>
    </div>
  </div>
</template>
<script>
import boatRules from "./comps/BoatRules.vue";
import boatFeatures from "./comps/BoatFeatures.vue";
import boatFacility from "./comps/BoatFacility.vue";
import loading from "./comps/LoadingDetail.vue";
import ImageUploader from "./comps/ImageUploader.vue";
import BoatCalendar from "./comps/BoatCalendar.vue";
import { mapGetters } from "vuex";
import format from "date-fns/format";

import {
  FETCH_BOAT_DETAIL_CMS,
  FETCH_BOAT_TYPE,
} from "../../../store/actions.type.js";
export default {
  components: {
    boatRules,
    loading,
    boatFeatures,
    ImageUploader: ImageUploader,
    boatFacility,
    BoatCalendar,
  },
  data() {
    return {
      boatId: 0,
      dateFormat: "DD.MM.YYYY",
    };
  },
  async created() {
    this.boatId = this.$router.history.current.params["boatId"];
    this.$store.commit(
      "setBoatDetailId",
      this.$router.history.current.params["boatId"]
    );
    this.$store.dispatch(FETCH_BOAT_TYPE);
    this.$store.dispatch(FETCH_BOAT_DETAIL_CMS);
  },
  computed: {
    ...mapGetters([
      "getBoatDetail",
      "getCaptainDetail",
      "getBoatDetailLoading",
      "getBoatRulesLoading",
      "getBoatTypes",
      "getStartDate",
      "getEndDate",
    ]),
  },
  methods: {
   changeDateFormat(date) {
      if( date != null ) {
        return format(new Date(date), 'DD/MM/YYYY');
      }
      else return 'Belirtilmemiş';
    },
  },
};
</script>
<style>
.cms-edit-cards {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
}
.boatDetailForCms {
  max-width: 100%;
  padding: 50px;
  margin-top: 30px;
}
.loading-detail-container {
  height: 15px;
  margin-top: 15px;
  width: 100px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.loading-detail-header {
  width: 125px;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.image-loading {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #ddd;
  animation-name: loadingEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
@media (max-width: 1024px) {
  .cms-edit-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .cms-edit-cards {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
}
</style>
