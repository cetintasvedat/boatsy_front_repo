import { get } from "jquery";
import Vue from "vue";
import { sameAs } from "vuelidate/lib/validators";
import format from "date-fns/format";
import i18n from '../plugins/i18n.js';
import {
  FETCH_POPULAR_BOAT,
  GET_BOAT_COMMENT,
  FETCH_FILTER_BOATS,
  FETCH_ALL_BOATS,
  FETCH_BOAT_TYPE,
  FETCH_LOCATION,
  FETCH_BOAT_DETAIL_FOR_BOAT_CARD,
  FETCH_BOAT_DETAIL,
  FETCH_BOAT_COMMENT,
  FETCH_BOAT_FEATURES_WITH_BOAT_TYPE_ID,
  FETCH_BOAT_FEATURES,
  FETCH_BOAT_RULES,
  FETCH_CAPTAIN_DETAIL,
  FETCH_CAPTAIN_BOAT,
  FETCH_CAPTAIN_COMMENT,
  FETCH_DISABLED_DATES,
  FETCH_CURRENCY,
  LIKED_BOAT,
  SET_LIKE_BOAT,
  FETCH_CAPTAIN_RATE,
  FETCH_BOAT_DETAIL_CMS,
  FETCH_DISABLED_DATES_CMS,
  SET_BLOCKS_DAY_CMS,
  DELETE_BLOCKS_DAY_CMS,
  SET_CUSTOM_PRICE_CMS
} from "./actions.type.js";
const boatModule = {
  state: () => ({
    profileId:
      localStorage.getItem("profileModel") != null
        ? JSON.parse(localStorage.getItem("profileModel")).id ?? 0
        : 0,

    popularBoatPaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: "id",
      filterObject: {},
    },
    allBoatsPaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: "id",
      filterObject: {},
    },
    filterDetailBoatsPaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: "id",
      filterObject: {},
    },
    filterBoatModel: {
      ascending: 1,
      byColumn: 0,
      limit: 20,
      page: 1,
      query: "",
      extras: "",
      orderBy: "id",
      filterObject: {},
    },
    boatTypePaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: null,
      filterObject: {},
    },
    locationPaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: null,
      filterObject: {},
    },
    boatFeaturePaginableRequestModel: {
      ascending: 1,
      byColumn: 0,
      limit: 10,
      page: 1,
      query: "",
      extras: "",
      orderBy: null,
      filterObject: {},
    },
    filterBookingModel: {
      ascending: 0,
      byColumn: 0,
      limit: 1000,
      page: 1,
      query: "",
      extras: "",
      orderBy: null,
      filterObject: {},
    },
    pagginableRequest: {
      ascending: 0,
      byColumn: 0,
      limit: 1000,
      page: 1,
      query: "",
      extras: "",
      orderBy: null,
      filterObject: {},
    },
    boatComments: [],
    startDate: format(new Date(), "YYYY-MM-DD"),
    endDate: format(new Date(), "YYYY-MM-DD"),
    boatCity: "",
    boatState: "",
    boatType: "Tüm Tekneler",
    personCapacity: 1,
    hourCount: 2,
    filterBoats: [],
    allBoats: [],
    boatTypes: [],
    popularBoats: [],
    locationList: [],
    boatListItemCount: 10,
    boatDetailId: "",
    boatDetail: [],
    captainId: "",
    captainDetail: [],
    boatComment: [],
    boatFeatures: [],
    boatRules: [],
    captainBoats: [],
    captainComment: [],
    boatDetailLoading: true,
    disabledDates: [],
    optionalDates: [],
    currency: [],
    selectedCurrency: 2,
    selectedBoatId: "",
    boatRulesRequestModel: [],
    boatRulesLoading: true,
    likedBoat: [],
    likedBoatModel: [],
    likedBoatLoading: false,
    mapFilterLoading: true,
    attributesDatePicker: [],
    checkedRules: [],
    isSuperCaptain: "",
    isCaptain: null,
    reservationFlexibilityPicked: "",
    maxPrice: 150000,
    minPrice: 1,
    languages: "",
    differencePriceList: [],
    reservationNote: "",
    allBoatsLoading: false,
    valCount: 0,
    boatFeatureList: [],
    boatLocationSearchModel: null,
    attributesDatePickerCMS: [],
    mapBoatSmilarBoatController: false,
    boatStatus: 3,
    bookingStatus: 0,
    showInformationBoxForBoatMapPage:false
  }),
  mutations: {
    setPopularBoats(state, boatList) {
      state.popularBoats = boatList;
    },
    setPopularBoatPaginableRequestModelLimit(state) {
      state.popularBoatPaginableRequestModel.page++;
    },
    setAllBoats(state, boatList) {
      state.allBoats = boatList;
    },
    setAllBoatsPaginableRequestModelLimit(state) {
      state.allBoatsPaginableRequestModel.page++;
    },
    setMapsBoatsPaginableRequestModelLimit(state, value) {
      if (value == undefined && value == null) {
        state.filterBoatModel.page++;
      } else {
        state.filterBoatModel.page = value;
      }
    },
    setStartDate(state, date) {
      format(date, "YYYY-MM-DD");
      state.startDate = date;
    },
    setEndDate(state, date) {
      format(date, "YYYY-MM-DD");
      state.endDate = date;
    },
    setBoatState(state, value) {
      state.boatState = value;
    },
    setBoatCity(state, value) {
      state.boatCity = value;
    },
    setBoatCountry(state, value) {
      state.boatCountry = value;
    },
    setBoatTypes(state, value) {
      state.boatTypes = value;
    },
    setBoatType(state, value) {
      state.boatType = value;
    },
    setPersonCapacity(state, value) {
      state.personCapacity = value;
    },
    setHourCount(state, value) {
      state.hourCount = value;
    },
    setLocationList(state, value) {
      state.locationList = value;
    },
    setBoatDetailId(state, value) {
      state.boatDetailId = value;
    },
    setCaptainId(state, value) {
      state.captainId = value;
    },
    setCaptainDetail(state, value) {
      state.captainDetail = value;
    },
    setBoatDetailLoading(state, value) {
      state.boatDetailLoading = value;
    },
    setCurrency(state, value) {
      state.currency = value;
    },
    setBoatRulesRequestModel(state, value) {
      state.boatRulesRequestModel = value;
    },
    setSelectedBoatId(state, value) {
      state.selectedBoatId = value;
    },
    setProfileId(state, value) {
      state.profileId = value;
    },
    setCheckedRules(state, value) {
      state.checkedRules = value;
    },
    setIsSuperCaptain(state, value) {
      state.isSuperCaptain = value;
    },
    setMaxPrice(state, value) {
      state.maxPrice = value;
    },
    setMinPrice(state, value) {
      state.minPrice = value;
    },
    setLanguages(state, value) {
      state.languages = value;
    },
    setIsCaptain(state, value) {
      state.isCaptain = value;
    },
    setReservationFlexibility(state, value) {
      state.reservationFlexibilityPicked = value;
    },
    setBoatRulesLoading: (state, value) => {
      state.boatRulesLoading = value;
    },
    setReservationNote: (state, value) => {
      state.reservationNote = value;
    },
    setFilterBoatModel(state) {
      state.filterBoatModel.filterObject = {};
    },
    setBoatDetail(state, value) {
      state.boatDetail = value;
    },
    setDefaultValueFilterBoatModel(state) {
      state.filterBoatModel = {
        ascending: 1,
        byColumn: 0,
        limit: 10,
        page: 1,
        query: "",
        extras: "",
        orderBy: "id",
        filterObject: {},
      };
    },
    setBoatLocationSearchModel: (state, value) => {
      state.boatLocationSearchModel = value;
    },
    setMapBoatSmilarBoatController: (state, value) => {
      state.mapBoatSmilarBoatController = value;
    },
    setBoatStatus: (state, value) => {
      state.boatStatus = value;
    },
    setBookingStatus: (state, value) => {
      state.bookingStatus = value;
    },
    setShowInformationBoxForBoatMapPage: (state, value) => {
      state.showInformationBoxForBoatMapPage = value;
    },
  },
  getters: {
    getHourCount: (state) => {
      return state.hourCount;
    },
    getPopularBoats: (state) => {
      return state.popularBoats;
    },
    getAllBoats: (state) => {
      return state.allBoats;
    },
    getBoatComment: (state) => {
      return state.boatComments;
    },
    getStartDate: (state) => {
      return state.startDate;
    },
    getEndDate: (state) => {
      return state.endDate;
    },
    getFilterBoats: (state) => {
      return state.filterBoats;
    },
    getBoatState: (state) => {
      return state.boatState;
    },
    getBoatCity: (state) => {
      return state.boatCity;
    },
    getBoatTypes: (state) => {
      return state.boatTypes;
    },
    getBoatType: (state) => {
      return state.boatType;
    },
    getPersonCapacity: (state) => {
      return state.personCapacity;
    },
    getLocationList: (state) => {
      return state.locationList;
    },
    getBoatLocationSearchModel: (state) => {
      return state.boatLocationSearchModel;
    },
    getBoatDetail: (state) => {
      return state.boatDetail;
    },
    getCaptainId: (state) => {
      return state.captainId;
    },
    getCaptainDetail: (state) => {
      return state.captainDetail;
    },
    getBoatComment: (state) => {
      return state.boatComment;
    },
    getBoatFeatures: (state) => {
      return state.boatFeatures;
    },
    getBoatRules: (state) => {
      return state.boatRules;
    },
    getCaptainBoats: (state) => {
      return state.captainBoats;
    },
    getCaptainComment: (state) => {
      return state.captainComment;
    },
    getBoatDetailLoading: (state) => {
      return state.boatDetailLoading;
    },
    getDisabledDates: (state) => {
      return state.disabledDates;
    },
    getOptionalDates: (state) => {
      return state.optionalDates;
    },
    getAttributesDatePicker: (state) => {
      return state.attributesDatePicker;
    },
    getCurrency: (state) => {
      return state.currency;
    },
    getSelectedCurrency: (state) => {
      state.selectedCurrency = window.localStorage.getItem("selectedCurrency");
      return state.selectedCurrency ?? 2;
    },
    getBoatRulesLoading: (state) => {
      return state.boatRulesLoading;
    },
    getLikedBoat: (state) => {
      return state.likedBoat;
    },
    getLikedBoatLoading: (state) => {
      return state.likedBoatLoading;
    },
    getMapFilterLoading: (state) => {
      return state.mapFilterLoading;
    },
    getProfileId: (state) => {
      return state.profileId;
    },
    getDifferencePriceList: (state) => {
      return state.differencePriceList;
    },
    getReservationNote: (state) => {
      return state.reservationNote;
    },
    getAllBoatsLoading: (state) => {
      return state.allBoatsLoading;
    },
    getAllBoatsPaginableRequestModelLimit: (state) => {
      return state.allBoatsPaginableRequestModel.page;
    },
    getMapsBoatsPaginableRequestModelLimit: (state) => {
      return state.filterBoatModel.page;
    },
    getBoatFeatureList: (state) => {
      return state.boatFeatureList;
    },
    getAttributesDatePickerCMS: (state) => {
      return state.attributesDatePickerCMS;
    },
    getMapBoatSmilarBoatController: (state) => {
      return state.mapBoatSmilarBoatController;
    },
    getBoatStatus: (state) => {
      return state.boatStatus;
    },
    getBookingStatus: (state) => {
      return state.bookingStatus;
    },
    getShowInformationBoxForBoatMapPage: (state) => {
      return state.showInformationBoxForBoatMapPage;
    },
  },
  actions: {
    [FETCH_POPULAR_BOAT]: function ({ state, commit }) {
      state.popularBoats = [];
      state.popularBoatPaginableRequestModel.extras =
        '{"user_id":"' + state.profileId + '"}';

      Vue.prototype.$boatService
        .getPopularBoat(state.popularBoatPaginableRequestModel)
        .then((val) => {
          state.popularBoats = [...state.popularBoats, ...val.data];
        });
    },

    [GET_BOAT_COMMENT]: function ({ state, commit }) {
      Vue.prototype.$boatService.getBoatComment(state.boatId).then((val) => {
        state.boatComments = [...state.boatComments, ...val.data];
      });
    },

    [FETCH_FILTER_BOATS]: async function ({ state, commit }, bounds) {
      state.filterBoatModel.limit = 20;
      if (bounds != undefined) {
        state.filterBoatModel.bounds = bounds
      } else {
        delete state.filterBoatModel.bounds
      }
      state.filterBoatModel.extras = '{"user_id":"' + state.profileId + '"}';
      state.filterBoatModel.filterObject = {};

      if (state.checkedRules.length > 0) {
        state.checkedRules.forEach((element) => {
          state.filterBoatModel.filterObject[element] = true;
        });
      }
      if (state.filterBoatModel.page == 1) {
        state.mapFilterLoading = true;
        state.filterBoats = [];
      }
      /*if (
        state.startDate != undefined &&
        (state.endDate != undefined) & state.personCapacity
      ) {*/
      state.filterBoatModel.extras =
        '{"start_date":"' +
        state.startDate +
        '","end_date":"' +
        state.endDate +
        '","person_capacity":' +
        (state.personCapacity ?? "") +
        ',"is_super_captain":"' +
        (state.isSuperCaptain ?? "") +
        '","price_Filter":"' +
        (state.minPrice ?? 1) +
        "-" +
        (state.maxPrice ?? 150000) +
        '","cap_lang":"' +
        (state.languages ?? "") +
        '","user_id":"' +
        (state.profileId ?? "") +
        '"}';
      //}
      if (state.boatState != undefined) {
        state.filterBoatModel.filterObject["b.c_state"] = state.boatState;
      }
      if (state.boatCountry != undefined) {
        state.filterBoatModel.filterObject["b.c_country"] = state.boatCountry;
      }
      if (state.boatCity != undefined) {
        state.filterBoatModel.filterObject["b.c_city"] = state.boatCity;
      }
      if (state.boatType == "Tümü" || state.boatType == "Tüm Tekneler") {
        state.boatType = "";
      }
      if (!(state.boatType == "Tümü" || state.boatType == "Tüm Tekneler")) {
        state.filterBoatModel.filterObject["bt.name"] = state.boatType;
      }

      if (state.isCaptain != null) {
        state.filterBoatModel.filterObject["b.captain"] = parseInt(
          state.isCaptain
        );
      }

      if (state.reservationFlexibilityPicked != "") {
        state.filterBoatModel.filterObject["br.reservation_flexibility"] =
          state.reservationFlexibilityPicked;
      }
      var val = await Vue.prototype.$boatService.getBoatByFilter(
        state.filterBoatModel
      );
      state.filterBoats = [...state.filterBoats, ...val.data];
      state.mapFilterLoading = false;
      return { count: val.count, data: val.data };
    },

    [FETCH_ALL_BOATS]: async function ({ state, commit }, isSmilar) {
      var current_boat_id = 0
      if (isSmilar == true) {
        current_boat_id = state.boatDetail.id;
        state.allBoats = [];
      }
      state.allBoatsPaginableRequestModel.extras =
        '{"user_id":"' + state.profileId + '"}';
      state.allBoatsPaginableRequestModel.limit = 20;
      state.boatListItemCount = state.allBoats.length;
      if (state.boatListItemCount <= state.valCount) {
        state.allBoatsLoading = true;
        var val = await Vue.prototype.$boatService.getBoatByFilter(
          state.allBoatsPaginableRequestModel
        );
        state.valCount = val.count;
        var boatList = [];
        val.data.forEach((element) => {
          if (element.id != current_boat_id) {
            boatList.push(element);
          }
        });

        state.allBoats = [...state.allBoats, ...boatList];
        state.allBoatsLoading = false;
      }
      return val.count;
    },

    [FETCH_BOAT_TYPE]: async function ({ state }) {
      await Vue.prototype.$boatService
        .getBoatType(state.boatTypePaginableRequestModel)
        .then((val) => {
          var list = [{ id: 0, name: "Tüm Tekneler" }];
          Array.prototype.push.apply(list, val.data);

          state.boatTypes = list;
        });
    },

    [FETCH_LOCATION]: async function ({ state }) {
      state.locationList = [];
      await Vue.prototype.$boatService
        .getLocation(state.locationPaginableRequestModel)
        .then((val) => {
          val.data.forEach((country) => {
            state.locationList.push(country.name);
            country.state.forEach((states) => {
              state.locationList.push(states.name + "," + country.name);
              states.city.forEach((city) => {
                state.locationList.push(
                  city.name + "," + states.name + "," + country.name
                );
              });
            });
          });
        });
    },

    [FETCH_BOAT_DETAIL]: async function ({ state }, boatId) {
      state.filterBoatModel.page = 1;
      var boatIdValue = state.boatDetailId;
      if (boatId != null && boatId != undefined) {
        boatIdValue = boatId;
      }
      state.filterBoatModel.extras = '{"user_id":"' + state.profileId + '"}';
      state.filterBoatModel.filterObject = {
        "b.id": boatIdValue,
      };

      state.boatDetailLoading = true;
      state.boatDetail = [];
      var val = await Vue.prototype.$boatService.getBoatByFilter(
        state.filterBoatModel
      );
      state.boatDetail = val.data[0];
      state.captainId = val.data[0].userid;
      var value = await Vue.prototype.$boatService.getCaptainDetail(
        val.data[0].userid
      );
      state.captainDetail = value.data;
      state.boatDetailLoading = false;
      return value;
    },
    [FETCH_BOAT_DETAIL_CMS]: async function ({ state }) {
      state.filterBoatModel.filterObject = {
        "b.id": state.boatDetailId,
      };
      state.filterBoatModel.extras = '{"user_id":"' + state.profileId + '"}';
      state.boatDetailLoading = true;
      state.boatDetail = [];
      await Vue.prototype.$boatService
        .getBoatByFilterForCMS(state.filterBoatModel)
        .then((val) => {
          state.boatDetail = val.data[0];
          state.captainId = val.data[0].userid;
          Vue.prototype.$boatService
            .getCaptainDetail(val.data[0].userid)
            .then((value) => {
              state.captainDetail = value.data;
              state.boatDetailLoading = false;
            });
        });
    },

    [FETCH_BOAT_DETAIL_FOR_BOAT_CARD]: async function ({ state }, boatId) {
      var boatDetail = [];
      var captainId = 0;
      var captainDetail = [];
      var responseCaptain = null;
      if (boatId != undefined && boatId > 0) {
        state.filterBoatModel.filterObject = {
          "b.id": boatId,
        };
        state.filterBoatModel.extras = '{"user_id":"' + state.profileId + '"}';
        return await Vue.prototype.$boatService.getBoatByFilter(
          state.filterBoatModel
        );
      }
    },

    [FETCH_CAPTAIN_RATE]: async function ({ state }) {
      return await Vue.prototype.$boatService.getCaptainRate(state.captainId);
    },

    [FETCH_CAPTAIN_DETAIL]: async function ({ state }, captainId) {
      var captId = state.captainId;
      if (captainId != null && captainId != undefined) {
        captId = captainId;
      }
      state.captainDetail = [];
      var value = await Vue.prototype.$boatService.getCaptainDetail(captId);
      state.captainDetail = value.data;
      return value.data;
    },

    [FETCH_BOAT_COMMENT]: function ({ state }) {
      Vue.prototype.$boatService
        .getBoatComment(state.boatDetailId)
        .then((val) => {
          state.boatComment = val.data;
        });
    },

    [FETCH_BOAT_FEATURES]: async function ({ state }) {
      state.boatFeaturePaginableRequestModel.filterObject = {
        boatId: state.boatDetailId,
      };
      var data = [];

      var val = await Vue.prototype.$boatService.getBoatFeatures(
        state.boatFeaturePaginableRequestModel
      );

      if (val.data.length >= 1) {
        data = val.data[0].features;
        state.boatFeatures = val.data[0].features;
      }
      return data;
    },

    [FETCH_BOAT_FEATURES_WITH_BOAT_TYPE_ID]: async function ({ state }, typeId) {
      state.boatFeaturePaginableRequestModel.filterObject = {
        boatTypeId: typeId,
      };
      var data = [];

      var val = await Vue.prototype.$boatService.getBoatFeaturesWithBoatTeypeId(
        state.boatFeaturePaginableRequestModel
      );

      if (state.boatFeatures.length == 0) {
        val.data.forEach((featureGroup, groupIndex) => {
          featureGroup.features.forEach((feature, featureIndex) => {
            val.data[groupIndex].features[featureIndex].value = 0;
          })
        })
      }
      else {
        val.data.forEach((featureGroup, groupIndex) => {
          featureGroup.features.forEach((feature, featureIndex) => {
            val.data[groupIndex].features[featureIndex].value = state.boatFeatures[groupIndex].features[featureIndex].value;
          })
        })
      }
      state.boatFeatureList = val.data;

      return val.error;
    },

    [FETCH_BOAT_RULES]: async function ({ state }, boatId) {
      state.boatRulesLoading = true;
      var val = await Vue.prototype.$boatService.getBoatRules(boatId);
      state.boatRules = val.data;
      state.boatRulesLoading = false;
      return val;
    },

    [FETCH_CAPTAIN_BOAT]: async function ({ state }) {
      state.filterBoatModel.filterObject = {
        "b.user_id": state.captainId,
      };
      state.filterBoatModel.extras = '{"user_id":"' + state.profileId + '"}';
      var val = await Vue.prototype.$boatService.getBoatByFilter(
        state.filterBoatModel
      );
      state.captainBoats = val.data;
    },

    [FETCH_CAPTAIN_COMMENT]: function ({ state }) {
      Vue.prototype.$boatService
        .getCaptainComment(state.captainId)
        .then((val) => {
          state.captainComment = val.data;
        });
    },

    [FETCH_DISABLED_DATES]: async function ({ state }, bootId) {
      var priceList = [];
      var blackoutDates = [];
      var spacialDates = [];
      var normalPrice;
      var dayDiff;
      var startDate = new Date();
      var endDate = new Date();
      state.attributesDatePicker = [];
      var id = 0;
      if (bootId != undefined && bootId != null) {
        id = bootId;
      } else {
        id = state.boatDetailId;
      }
      await Vue.prototype.$boatService
        .getfilterbookbyallmonththreetange({ id: id })
        .then((val) => {
          //Bugünden önceki tarihleri bloklaması için
          var blockDateList = [
            {
              start: null,
              end: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1
              ),
            },
          ];
          val.data.forEach((e) => {
            startDate = new Date(e.startdate);
            endDate = new Date(e.enddate);
            if (e.type == "BLOCK") {
              dayDiff = parseInt(
                (endDate - startDate) / (1000 * 60 * 60 * 24),
                10
              );
              blockDateList.push({
                start: new Date(
                  startDate.getFullYear(),
                  startDate.getMonth(),
                  startDate.getDate()
                ),
                end: new Date(
                  endDate.getFullYear(),
                  endDate.getMonth(),
                  endDate.getDate()
                ),
              });
              var tempDate = new Date(startDate);
              blackoutDates.push(new Date(tempDate));
              for (var i = 0; i < dayDiff; i++) {
                tempDate = new Date(
                  tempDate.getFullYear(),
                  tempDate.getMonth(),
                  tempDate.getDate() + 1
                );
                blackoutDates.push(new Date(tempDate));
              }
            } else if (e.type == "OPTIONAL_DAY") {
              dayDiff = parseInt(
                (endDate - startDate) / (1000 * 60 * 60 * 24),
                10
              );
              var tempDate = new Date(startDate);
              spacialDates.push({ date: new Date(tempDate), type: e.type });
              for (var i = 0; i < dayDiff; i++) {
                tempDate = new Date(
                  tempDate.getFullYear(),
                  tempDate.getMonth(),
                  tempDate.getDate() + 1
                );
                spacialDates.push({ date: new Date(tempDate), type: e.type });
              }
            } else if (e.type == "SPECIAL_PRICE") {
              dayDiff = Math.abs(endDate - startDate);
              dayDiff = Math.ceil(dayDiff / (1000 * 60 * 60 * 24));
              var tempDate = new Date(startDate);
              priceList.push({
                date: new Date(tempDate),
                price: parseFloat(e.amount),
              });
              for (var i = 0; i < dayDiff; i++) {
                priceList.push({
                  date: new Date(tempDate),
                  price: parseFloat(e.amount),
                });
                tempDate = new Date(
                  tempDate.getFullYear(),
                  tempDate.getMonth(),
                  tempDate.getDate() + 1
                );
              }
            } else if (e.type == "NORMAL_PRICE") {
              normalPrice = e.amount;
            }
          });
          //Bloklu günler state aktarıldı.
          state.disabledDates = blockDateList;
          //Özel fiyatlı günler state aktarıldı.
          state.differencePriceList = priceList;
          //Opsiyonel günler için
          if (spacialDates.length > 0) {
            /*
             "spacialDates" dizisindeki opsiyonel günler aranıp "attributesDatePicker" dizisine atılıyor.
             "attributesDatePicker" dizisindeki itemler takvimde işaretleniyor.
            */
            spacialDates.forEach((spacialDatesElement) => {
              var resultSearchAttributesDatePicker = state.attributesDatePicker.find(
                (x) =>
                  format(x.dates, "YYYY-MM-DD") ==
                  format(spacialDatesElement.date, "YYYY-MM-DD")
              );
              /*
              Bloklu günlerin üzerinde işaret çıkmaması için kontrol yapılıyor.
               */
              var resultSearchBlackoutDates = blackoutDates.find(
                (x) =>
                  format(x, "YYYY-MM-DD") ==
                  format(spacialDatesElement.date, "YYYY-MM-DD")
              );
              //geçmişte kabul edilmeyen işlemlerde işaret çıkmaması için
              var checkPastTime =
                spacialDatesElement.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1
                );

              if (
                resultSearchAttributesDatePicker == undefined &&
                resultSearchBlackoutDates == undefined &&
                checkPastTime == true
              ) {
                state.attributesDatePicker.push({
                  dates: new Date(
                    spacialDatesElement.date.getFullYear(),
                    spacialDatesElement.date.getMonth(),
                    spacialDatesElement.date.getDate()
                  ),
                  dot: {
                    color: "orange",
                  },
                  popover: {
                    label: i18n.t("boat_date_other_user"),
                    visibility: "hover",
                    hideIndicator: true,
                  },
                  customData: { type: "OPTIONAL_DAY" },
                });
              }
            });
          }

          //Özel fiyatlı günler için
          if (priceList.length > 0) {
            /*
             "priceList" dizisindeki özel fiyatlı günler aranıp "attributesDatePicker" dizisine atılıyor.
             "attributesDatePicker" dizisindeki itemler takvimde işaretleniyor.
            */
            priceList.forEach((priceListElement) => {
              var resultSearchAttributesDatePicker = state.attributesDatePicker.find(
                (x) =>
                  format(x.dates, "YYYY-MM-DD") ==
                  format(priceListElement.date, "YYYY-MM-DD") &&
                  x.customData.type == "SPECIAL_PRICE"
              );
              /*
              Bloklu günlerin üzerinde işaret çıkmaması için kontrol yapılıyor.
               */
              var resultSearchBlackoutDates = blackoutDates.find(
                (x) =>
                  format(x, "YYYY-MM-DD") ==
                  format(priceListElement.date, "YYYY-MM-DD")
              );
              //geçmişte kabul edilmeyen işlemlerde işaret çıkmaması için
              var checkPastTime =
                priceListElement.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1
                );

              if (
                resultSearchAttributesDatePicker == undefined &&
                resultSearchBlackoutDates == undefined
              ) {
                var boatPricewithCurrency =
                  priceListElement.price * state.boatDetail.currencyvalue;
                var currencyList = state.currency;
                var selectedCurrency = this.getters.getSelectedCurrency;
                if (currencyList.length > 0) {
                  boatPricewithCurrency =
                    Math.round(
                      boatPricewithCurrency /
                      currencyList[selectedCurrency - 1].value
                    ) +
                    " " +
                    currencyList[selectedCurrency - 1].symbol;
                } else {
                  boatPricewithCurrency = boatPricewithCurrency + " ₺";
                }
                state.attributesDatePicker.push({
                  dates: new Date(
                    priceListElement.date.getFullYear(),
                    priceListElement.date.getMonth(),
                    priceListElement.date.getDate(),
                    checkPastTime == true
                  ),
                  dot: {
                    color: "blue",
                  },
                  popover: {
                    label:
                      i18n.t("boat_different_price_body_1") +
                      boatPricewithCurrency +
                      i18n.t("boat_different_price_body_2"),
                    visibility: "hover",
                    hideIndicator: true,
                  },
                });
              }
            });
          }
        });
      return priceList;
    },

    [FETCH_CURRENCY]: async function ({ state }) {
      var val = await Vue.prototype.$boatService.getCurrency();
      state.currency = val.data;
      return state.currency;
    },
    [LIKED_BOAT]: async function ({ state }, page) {
      var totalCount = 0;
      if (page != undefined && page != null) {
        state.allBoatsPaginableRequestModel.limit = 10;
        state.allBoatsPaginableRequestModel.page = page;
      }
      state.allBoatsPaginableRequestModel.extras =
        '{"user_id":"' + state.profileId + '"}';
      state.allBoatsPaginableRequestModel.filterObject = {};
      if (page == 1) {
        state.likedBoatLoading = true;
      }
      var val = await Vue.prototype.$boatService.getLikedBootByFilter(
        state.allBoatsPaginableRequestModel
      );
      if (page == 1) {
        state.likedBoat = val.data;
      } else {
        state.likedBoat = [...state.likedBoat, ...val.data];
      }
      state.likedBoatLoading = false;
      return val.count;
    },

    [SET_LIKE_BOAT]: async function ({ state }) {
      var res = await Vue.prototype.$boatService.setLikeBoat(
        state.selectedBoatId
      );
      return res;
    },

    [FETCH_DISABLED_DATES_CMS]: async function ({ state }, bootId) {
      var priceList = [];
      var blackoutDates = [];
      var spacialDates = [];
      var blockDates = [];
      var blockDatesForBooking = [];
      var normalPrice;
      var dayDiff;
      var startDate = new Date();
      var endDate = new Date();
      state.attributesDatePickerCMS = [];

      await Vue.prototype.$boatService
        .getfilterbookbyallmonththreetange({ id: bootId })
        .then((val) => {
          //Bugünden önceki tarihleri bloklaması için
          var blockDateList = [
            {
              start: null,
              end: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1
              ),
            },
          ];
          val.data.forEach((e) => {
            startDate = new Date(e.startdate);
            endDate = new Date(e.enddate);
            if (e.type == "BLOCK") {
              dayDiff = parseInt(
                (endDate - startDate) / (1000 * 60 * 60 * 24),
                10
              );
              var tempDate = new Date(startDate);
              if (e.bookingstatus == 10) {
                blockDates.push({ date: new Date(tempDate), type: e.type, id: e.id });
                for (var i = 0; i < dayDiff; i++) {
                  tempDate = new Date(
                    tempDate.getFullYear(),
                    tempDate.getMonth(),
                    tempDate.getDate() + 1
                  );
                  blockDates.push({ date: new Date(tempDate), type: e.type, id: e.id });
                }
              } else {
                blockDatesForBooking.push({ date: new Date(tempDate), type: e.type, id: e.id });
                for (var i = 0; i < dayDiff; i++) {
                  tempDate = new Date(
                    tempDate.getFullYear(),
                    tempDate.getMonth(),
                    tempDate.getDate() + 1
                  );
                  blockDatesForBooking.push({ date: new Date(tempDate), type: e.type, id: e.id });
                }
              }

            } else if (e.type == "OPTIONAL_DAY") {
              dayDiff = parseInt(
                (endDate - startDate) / (1000 * 60 * 60 * 24),
                10
              );
              var tempDate = new Date(startDate);
              spacialDates.push({ date: new Date(tempDate), type: e.type, id: e.id });
              for (var i = 0; i < dayDiff; i++) {
                tempDate = new Date(
                  tempDate.getFullYear(),
                  tempDate.getMonth(),
                  tempDate.getDate() + 1
                );
                spacialDates.push({ date: new Date(tempDate), type: e.type, id: e.id });
              }
            } else if (e.type == "SPECIAL_PRICE") {
              dayDiff = Math.abs(endDate - startDate);
              dayDiff = Math.ceil(dayDiff / (1000 * 60 * 60 * 24));
              var tempDate = new Date(startDate);
              priceList.push({
                date: new Date(tempDate),
                price: parseFloat(e.amount),
              });
              for (var i = 0; i < dayDiff; i++) {
                priceList.push({

                  date: new Date(tempDate),
                  price: parseFloat(e.amount),
                });
                tempDate = new Date(
                  tempDate.getFullYear(),
                  tempDate.getMonth(),
                  tempDate.getDate() + 1
                );
              }
            } else if (e.type == "NORMAL_PRICE") {
              normalPrice = e.amount;
            }
          });
          //Bloklu günler state aktarıldı.
          state.disabledDates = blockDateList;
          //Özel fiyatlı günler state aktarıldı.
          state.differencePriceList = priceList;

          //Özel fiyatlı günler için
          if (priceList.length > 0) {
            /*
             "priceList" dizisindeki özel fiyatlı günler aranıp "attributesDatePickerCMS" dizisine atılıyor.
             "attributesDatePickerCMS" dizisindeki itemler takvimde işaretleniyor.
            */
            priceList.forEach((priceListElement) => {
              var resultSearchAttributesDatePicker = state.attributesDatePickerCMS.find(
                (x) =>
                  format(x.dates, "YYYY-MM-DD") ==
                  format(priceListElement.date, "YYYY-MM-DD") &&
                  x.customData.type == "SPECIAL_PRICE"
              );

              //geçmişte kabul edilmeyen işlemlerde işaret çıkmaması için
              var checkPastTime =
                priceListElement.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1
                );

              if (
                resultSearchAttributesDatePicker == undefined
              ) {
                var boatPricewithCurrency =
                  priceListElement.price + " " + state.boatDetail.currencysymbol;
                state.attributesDatePickerCMS.push({
                  dates: new Date(
                    priceListElement.date.getFullYear(),
                    priceListElement.date.getMonth(),
                    priceListElement.date.getDate(),
                    checkPastTime == true
                  ),
                  dot: {
                    color: "blue",
                  },
                  popover: {
                    label:
                      "Fiyat " +
                      boatPricewithCurrency +
                      " olarak belirlemiştir.",
                    visibility: "hover",
                    hideIndicator: true,
                    customData: { type: "SPECIAL_PRICE", id: priceListElement.id },

                  },
                });
              }
            });
          }

          //Bloklanan günler için
          if (blockDates.length > 0) {
            /*
             "priceList" dizisindeki özel fiyatlı günler aranıp "attributesDatePickerCMS" dizisine atılıyor.
             "attributesDatePickerCMS" dizisindeki itemler takvimde işaretleniyor.
            */
            blockDates.forEach((priceListElement) => {
              var resultSearchAttributesDatePicker = state.attributesDatePickerCMS.find(
                (x) =>
                  format(x.dates, "YYYY-MM-DD") ==
                  format(priceListElement.date, "YYYY-MM-DD") &&
                  x.type == "BLOCK"
              );
              //geçmişte kabul edilmeyen işlemlerde işaret çıkmaması için
              var checkPastTime =
                priceListElement.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1
                );

              if (
                resultSearchAttributesDatePicker == undefined
              ) {
                state.attributesDatePickerCMS.push({
                  dates: new Date(
                    priceListElement.date.getFullYear(),
                    priceListElement.date.getMonth(),
                    priceListElement.date.getDate(),
                    checkPastTime == true
                  ),
                  dot: {
                    color: "red",
                  },
                  popover: {
                    label:
                      "Bu tarih Bloklanmış. id: " + priceListElement.id,
                    visibility: "hover",
                    hideIndicator: true,
                    customData: {
                      type: "BLOCK", id: priceListElement.id
                    },
                  },
                });

              }
            });
          }

          //Teknenin tarihi rezervasyon sebeiyle bloklanmışsa 
          if (blockDatesForBooking.length > 0) {
            /*
             "priceList" dizisindeki özel fiyatlı günler aranıp "attributesDatePickerCMS" dizisine atılıyor.
             "attributesDatePickerCMS" dizisindeki itemler takvimde işaretleniyor.
            */
            blockDatesForBooking.forEach((priceListElement) => {
              var resultSearchAttributesDatePicker = state.attributesDatePickerCMS.find(
                (x) =>
                  format(x.dates, "YYYY-MM-DD") ==
                  format(priceListElement.date, "YYYY-MM-DD") &&
                  x.type == "BLOCK"
              );

              //geçmişte kabul edilmeyen işlemlerde işaret çıkmaması için
              var checkPastTime =
                priceListElement.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 1
                );

              if (
                resultSearchAttributesDatePicker == undefined
              ) {
                state.attributesDatePickerCMS.push({
                  dates: new Date(
                    priceListElement.date.getFullYear(),
                    priceListElement.date.getMonth(),
                    priceListElement.date.getDate(),
                    checkPastTime == true
                  ),
                  dot: {
                    color: "yellow",
                  },
                  popover: {
                    label:
                      "Bu tarih rezervasyon sebebi ile bloklanmış. Rezervasyon id: " + priceListElement.id,
                    visibility: "hover",
                    hideIndicator: true,
                    customData: { type: "BLOCK", id: priceListElement.id },
                  },
                });
              }
            });
          }
        });
      return priceList;
    },

    [SET_BLOCKS_DAY_CMS]: async function ({ state }) {

      var body = {
        id: 0,
        startday: format(state.startDate, "YYYY-MM-DD"),
        endday: format(state.endDate, "YYYY-MM-DD"),
        captainid: 0,
        boatId: state.boatDetail.id,
        bookingStatus: 10,
      }
      var res = await Vue.prototype.$boatService.setBlockDay(
        body
      );
      return res;
    },
    [DELETE_BLOCKS_DAY_CMS]: async function ({ state }, body) {

      var res = await Vue.prototype.$boatService.deleteBlockDay(
        body
      );
      return res;
    },

    [SET_CUSTOM_PRICE_CMS]: async function ({ state }, body) {

      var res = await Vue.prototype.$boatService.setCustomPrice(
        body
      );
      return res;
    },
  },
};
export default boatModule;
