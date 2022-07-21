<template>
  <div class="description-conditions" style="border: none">
    <div class="cms-boat-conditions-container">
      <div class="card bg-light mb-3">
        <div class="card-header">
          <span style="float: left; padding: 7px; font-size: 20px"
            >{{ $t("boat_facility_feature-model") }}
          </span>
          <button
            class="btn_1"
            style="border-radius: 999px; float: right"
            v-on:click="show"
          >
            <i class="fa fa-edit"></i>
          </button>
        </div>
        <div class="card-body">
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("BoatFeatures_boat_status") }}
                  {{
                    boatDetail.boatstatu == 0
                      ? "Özellikler Eksik"
                      : boatDetail.boatstatu == 1
                      ? "Tekne fotoğrafları eksik"
                      : boatDetail.boatstatu == 2
                      ? "Tekne kuralları eksik"
                      : boatDetail.boatstatu == 3
                      ? "Tekne ekstraları eksik"
                      : boatDetail.boatstatu == 4
                      ? "Zorunlu belgeleri eksik"
                      : boatDetail.boatstatu == 5
                      ? "Onay Bekliyor"
                      : "Onaylı"
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <img src="/img/icons/boat.png" />
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span
                  >{{ $t("BoatFeatures_tekne tipi") }}
                  {{ boatDetail.boattypename }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("BoatFeatures_tekne_acıklama") }}
                  {{ boatDetail.description }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("BoatFeatures_Country") }}{{ boatDetail.ccountry }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("BoatFeatures_City ") }}{{ boatDetail.state }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("boatFeatures_District") }}{{ boatDetail.city }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-address-card-o" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span
                  >{{ $t("boatFeatures_address") }} {{ boatDetail.address }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("boatFeatures_Latitude") }} {{ boatDetail.lat }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span
                  >{{ $t("boatFeatures_Longitude ") }} {{ boatDetail.lng }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions" style="padding-top: 10px">
            <div class="boat-conditions-title">
              <img src="/img/icons/boat.png" />
            </div>
            <div class="boat-conditions-content">
              <div class="reservation-flexibility">
                <span>
                  {{ $t("boatFeatures_Daily Price")
                  }}{{ boatDetail.dailyprice }}
                </span>
              </div>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/boath-width.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_length") }}: {{ boatDetail.boatheight }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/tag_pricing_icon.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_model") }}: {{ boatDetail.brandname }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img
                src="/img/icons/calendar_clock_date_event_schedule_icon.png"
              />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_yapımYılı") }} :
                {{ boatDetail.modelyear }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/repair_service_tool_equipment_icon.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_refitYear") }} :
                {{ boatDetail.refityear }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/captain_marine_nautical_naval_icon.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("filter_header_boat_rent_type") }} :
                {{ boatDetail.captain }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/group_people_person_icon.png" />
            </div>
            <div class="boat-conditions-content">
              <span>
                {{ $t("boat_features_personCapacity") }} :
                {{ boatDetail.personcapacity }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/wc.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_wcCount") }} : {{ boatDetail.wccount }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img
                src="/img/icons/bathroom_drizzle_head_shower_water_icon.png"
              />
            </div>
            <div class="boat-conditions-content">
              <span>
                {{ $t("boat_features_showerCount") }} :
                {{ boatDetail.showercount }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/skills-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat-features_accommodationcapacity") }}:
                {{ boatDetail.accommodationcapacity }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/master-bed.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_sleeping_masterroom") }} :
                {{ boatDetail.masterroom }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/double-bed.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boatFeatures_Twin") }}: {{ boatDetail.twinroom }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/double-bed.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_sleeping_doubleroom") }}:
                {{ boatDetail.doubleroom }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/single-bed.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_sleeping_singleroom") }}:
                {{ boatDetail.singleRoom }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/salon.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_sleeping_room") }} : {{ boatDetail.salonroom }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/engine.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_motorhp") }} : {{ boatDetail.motorhp }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/membrane-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_material") }} :
                {{ boatDetail.material }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/mainsailing.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_mainsailing") }}:
                {{ boatDetail.mainsailing }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/fit-to-width-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_fullwidth") }}: {{ boatDetail.fullwidth }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/pump-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_waterpump") }} :
                {{ boatDetail.waterpump }}
              </span>
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/wooden-beer-keg-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_watertankcapacity") }}:
                {{ boatDetail.watertankcapacity }}</span
              >
            </div>
          </div>
          <div class="boat-conditions">
            <div class="boat-conditions-title">
              <img src="/img/icons/fuel-64.png" />
            </div>
            <div class="boat-conditions-content">
              <span
                >{{ $t("boat_features_fuelcapacity") }}:
                {{ boatDetail.fuelcapacity }}
              </span>
            </div>
          </div>
          <edit-boat-features-modal
            :boatFeatures="boatDetail"
            :boatTypes="boatTypes"
          ></edit-boat-features-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FETCH_BOAT_RULES } from "../../../../store/actions.type.js";
import { mapGetters } from "vuex";
import editBoatFeatures from "./EditBoatFeatures.vue";

export default {
  props: ["boatDetail", "boatTypes"],
  methods: {
    show() {
      this.$modal.show("edit-boat-features-modal");
    },
  },
  components: {
    "edit-boat-features-modal": editBoatFeatures,
  },
};
</script>

<style>
.boat-conditions-title img {
  width: 14px;
}
</style>
