import {
  SET_BOAT,
  SET_BOAT_RULES,
  SET_BOAT_FEATURES,
} from "../store/actions.type";

import Vue from "vue";
const cmsModule = {
  state: () => ({
    attributesDatePickerCMS: []
  }),
  mutations: {},
  getters: {},
  actions: {
    [SET_BOAT]: async function({ state }, body) {
      var res = await Vue.prototype.$cmsService.setBoat(body);
      return res;
    },
    [SET_BOAT_RULES]: async function({ state }, body) {
      var res = await Vue.prototype.$cmsService.setBoatRules(body);
      return res;
    },
    [SET_BOAT_FEATURES]: async function({ state }, body) {
      var res = await Vue.prototype.$cmsService.setBoatFeatures(body);
      return res;
    },
  },
};
export default cmsModule;
