<template>
  <div class="boat-features-container">
    <div class="boat-features-header" style="padding-top: 32px">
      <h4>{{ $t("boat_facility_feature-model") }}</h4>
    </div>
    <div class="boat-features-body">
      <div class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/boat.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("search_bar_boat_type") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ $t(boatDetail.boattypename) }}</span>
        </div>
      </div>
      <div class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/boath-width.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_length") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ parseInt(boatDetail.boatheight) }} M</span>
        </div>
      </div>
      <div
        v-if="boatDetail.boattypename != 'Gulet'"
        class="boat-features-content"
      >
        <div class="boat-features-icon">
          <img src="/img/icons/tag_pricing_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_model") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.brandname }}</span>
        </div>
      </div>
      <div class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/calendar_clock_date_event_schedule_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_modelYear") }} </span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.modelyear }}</span>
        </div>
      </div>
      <div
        v-if="boatDetail.refityear != 0 && boatDetail.refityear != null"
        class="boat-features-content"
      >
        <div class="boat-features-icon">
          <img src="/img/icons/repair_service_tool_equipment_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_refitYear") }} </span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.refityear }}</span>
        </div>
      </div>
      <div class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/captain_marine_nautical_naval_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("filter_header_boat_rent_type") }}</span>
        </div>
        <div class="boat-features-text">
          <span
            >:
            {{
              boatDetail.captain == 0
                ? $t("filter_header_without_captain")
                : boatDetail.captain == 1
                ? $t("filter_header_with_captain")
                : $t("with_crew")
            }}</span
          >
        </div>
      </div>
      <div class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/group_people_person_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_personCapacity") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.personcapacity }}</span>
        </div>
      </div>
      <div v-if="boatDetail.wccount > 0" class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/wc.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_wcCount") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.wccount }}</span>
        </div>
      </div>
      <div v-if="boatDetail.showercount > 0" class="boat-features-content">
        <div class="boat-features-icon">
          <img src="/img/icons/bathroom_drizzle_head_shower_water_icon.png" />
        </div>
        <div class="boat-features-name">
          <span>{{ $t("boat_features_showerCount") }}</span>
        </div>
        <div class="boat-features-text">
          <span>: {{ boatDetail.showercount }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="checkDataStatusForButton()"
      class="boat-feature-button"
      style="margin-top: 30px"
    >
      <button @click="showModal()" class="feature-button-content">
        {{ $t("boat_facility_show_more") }}
      </button>
    </div>
    <modal name="show-more-feature-modal" :scrollable="true" height="auto">
      <div class="modal-header" style="padding: 1rem 1rem 1rem 0">
        <h4>{{ $t("boat_facility_feature-model") }}</h4>
        <i class="fas fa-times" @click="hideModal()"></i>
      </div>
      <div class="boat-feature-container-modal">
        <div class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/boat.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("search_bar_boat_type") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ $t(boatDetail.boattypename) }}</span>
          </div>
        </div>
        <div class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/boath-width.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_length") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ parseInt(boatDetail.boatheight) }} M</span>
          </div>
        </div>
        <div
          v-if="boatDetail.boattypename != 'Gulet'"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/tag_pricing_icon.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_model") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.brandname }}</span>
          </div>
        </div>
        <div class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/calendar_clock_date_event_schedule_icon.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_yapımYılı") }} </span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.modelyear }}</span>
          </div>
        </div>
        <div class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/captain_marine_nautical_naval_icon.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("filter_header_boat_rent_type") }}</span>
          </div>
          <div class="boat-features-text">
            <span
              >:
              {{
                boatDetail.captain == 0
                  ? $t("filter_header_without_captain")
                  : boatDetail.captain == 1
                  ? $t("filter_header_with_captain")
                  : $t("with_crew")
              }}</span
            >
          </div>
        </div>
        <div class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/group_people_person_icon.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_personCapacity") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.personcapacity }}</span>
          </div>
        </div>
        <div v-if="boatDetail.wccount > 0" class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/wc.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_wcCount") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.wccount }}</span>
          </div>
        </div>
        <div v-if="boatDetail.showercount > 0" class="boat-features-content">
          <div class="boat-features-icon">
            <img src="/img/icons/bathroom_drizzle_head_shower_water_icon.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_showerCount") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.showercount }}</span>
          </div>
        </div>
        <div
          v-if="boatDetail.accommodationcapacity > 0"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/skills-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat-features_accommodationcapacity") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.accommodationcapacity }}</span>
          </div>
        </div>
        <div
          v-if="
            boatDetail.singleroom +
              boatDetail.salonroom +
              boatDetail.masterroom +
              boatDetail.doubleroom >
            0
          "
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/master-bed.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat-features_number_cabins") }}</span>
          </div>
          <div class="boat-features-text">
            <span
              >:
              {{
                boatDetail.singleroom +
                boatDetail.salonroom +
                boatDetail.masterroom +
                boatDetail.doubleroom
              }}</span
            >
          </div>
        </div>
        <div
          v-if="parseFloat(boatDetail.motorhp) > 0"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/engine.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_motorhp") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.motorhp }}</span>
          </div>
        </div>
        <div
          v-if="boatDetail.mainsailing != '' && boatDetail.mainsailing != null"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/mainsailing.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_mainsailing") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.mainsailing }}</span>
          </div>
        </div>
        <div
          v-if="boatDetail.material != '' && boatDetail.material != null"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/membrane-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_material") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.material }}</span>
          </div>
        </div>
        <div
          v-if="parseInt(boatDetail.fullwidth) > 0"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/fit-to-width-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_fullwidth") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.fullwidth }}</span>
          </div>
        </div>
        <div
          v-if="boatDetail.waterpump != '' && boatDetail.waterpump != null"
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/pump-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_waterpump") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.waterpump }}</span>
          </div>
        </div>
        <div
          v-if="
            boatDetail.watertankcapacity != '' &&
            boatDetail.watertankcapacity != null
          "
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/wooden-beer-keg-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_watertankcapacity") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.watertankcapacity }}</span>
          </div>
        </div>
        <div
          v-if="
            boatDetail.fuelcapacity != '' && boatDetail.fuelcapacity != null
          "
          class="boat-features-content"
        >
          <div class="boat-features-icon">
            <img src="/img/icons/fuel-64.png" />
          </div>
          <div class="boat-features-name">
            <span>{{ $t("boat_features_fuelcapacity") }}</span>
          </div>
          <div class="boat-features-text">
            <span>: {{ boatDetail.fuelcapacity }}</span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  props: ["boatDetail"],
  methods: {
    showModal() {
      this.$modal.show("show-more-feature-modal");
    },
    hideModal() {
      this.$modal.hide("show-more-feature-modal");
    },
    checkDataStatusForButton() {
      if (
        this.boatDetail.accommodationcapacity > 0 ||
        this.boatDetail.singleroom +
          this.boatDetail.salonroom +
          this.boatDetail.masterroom +
          this.boatDetail.doubleroom >
          0 ||
        parseFloat(this.boatDetail.motorhp) > 0 ||
        (this.boatDetail.mainsailing != "" &&
          this.boatDetail.mainsailing != null) ||
        (this.boatDetail.material != "" && this.boatDetail.material != null) ||
        parseInt(this.boatDetail.fullwidth) > 0 ||
        (this.boatDetail.waterpump != "" &&
          this.boatDetail.waterpump != null) ||
        (this.boatDetail.watertankcapacity != "" &&
          this.boatDetail.watertankcapacity != null)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
.boat-features-container {
  text-align: start;
}
.boat-features-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
}
.boat-features-content {
  display: flex;
  align-items: center;
  align-content: center;
}
.boat-features-name {
  padding-left: 10px;
  width: 45%;
}
.boat-features-name span {
  font-weight: 600;
  font-size: 16px;
}
.boat-features-icon {
  width: 40px;
}
.boat-features-icon img {
  width: 100%;
}
@media (max-width: 990px) {
  .boat-features-body {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
