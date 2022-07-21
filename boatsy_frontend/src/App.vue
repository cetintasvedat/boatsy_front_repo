<template>
  <div id="app" class="app">
    <headers
      v-bind:style="{ background: backgroundColor, boxShadow: boxShadow }"
      :isscroll="isscroll"
    ></headers>

    <HomePage v-if="this.$route.name == 'HomePage'"></HomePage>
    <div v-else>
      <router-view></router-view>
    </div>
    <a @click="supportModal">
      <img
        class="whatsapp-chat"
        src="/img/wp-transparent.png"
        :style="{
          bottom:
            this.$route.name == `BoatDetail` && isMobile ? `100px` : `50px`,
        }"
      />
    </a>
    <div class="information-box" :style="{ display: selectedBox }">
      Tıklayın, Tatil Danışmanınız sizi arasın.
      <i class="fas fa-times" @click="closeBox"></i>
    </div>
    <div
      v-if="
        getShowInformationBoxForBoatMapPage &&
        (this.$route.name == 'MapBoats' ||
          this.$route.name == 'MapBoatsLocation' ||
          this.$route.name == 'MapBoatsOnlyState' ||
          this.$route.name == 'MapBoatsOnlyCountry')
      "
    >
      <a @click="showSupportModal">
        <img
          class="whatsapp-chat"
          src="/img/tatil-danisma.svg"
          style="
            bottom: 50px;
            left: 25px;
            background-color: white;
            border-radius: 99px;
          "
          :style="{
            bottom:
              this.$route.name == `BoatDetail` && isMobile ? `100px` : `50px`,
          }"
        />
      </a>
      <div class="information-box-map-page" style="display: block">
        Aradığınızı bulamadınız mı ? Tıklayın, Uzman Tatil Danışmanınız sizinle
        iletişime geçsin.
        <i class="fas fa-times" @click="hideInfoBox"></i>
      </div>
    </div>

    <footers></footers>

    <modal name="activasyon" :height="570">
      <VerifyCodeCard></VerifyCodeCard>
    </modal>
    <modal name="signUp-modal" :height="800">
      <CreateAccount></CreateAccount>
    </modal>
    <modal name="non-auth-send-booking-modal" :height="800">
      <NonAuthSendBookingModal></NonAuthSendBookingModal>
    </modal>
    <modal name="non-auth-send-booking-modal-with-payment" :height="800">
      <NonAuthSendBookingModalWithPayment></NonAuthSendBookingModalWithPayment>
    </modal>
    <modal name="signIn-modal" height="auto">
      <LoginCard></LoginCard>
    </modal>
    <div class="info-card-modal">
      <modal name="InfoCardModal" :height="750">
        <InfoCardModal></InfoCardModal>
      </modal>
    </div>
    <!-- 
    <div class="layout-home" v-if="getRouterToApp">
      <a :href="storeUrl"> <button>UYGULAMADA AÇ</button></a>
      <div class="close-layout" @click="hideLayout">
        <i class="fas fa-times"></i>
      </div>
    </div>---->
  </div>
</template>

<script>
import InfoCardModal from "./pages/homePage/components/InfoCardModal.vue";
import HomePage from "./pages/homePage/Home.vue";
import verifyCodeCard from "./components/VerifyCodeCard.vue";
import CreateAccount from "./components/CreateAccount.vue";
import LoginCard from "./components/LoginCard.vue";
import NonAuthSendBookingModal from "./components/NonAuthSendBookingModal.vue";
import NonAuthSendBookingModalWithPayment from "./components/NonAuthSendBookingModalWithPayment.vue";
import { mapGetters } from "vuex";
import { FETCH_BOAT_TYPE, FETCH_LOCATION } from "./store/actions.type";

export default {
  name: "App",
  computed: {
    ...mapGetters([
      "getRouterToApp",
      "getBoatDetailLoading",
      "getSelectedLang",
      "getShowInformationBoxForBoatMapPage",
    ]),
  },
  data() {
    return {
      scrollNavbar: false,
      backgroundColor: "",
      boxShadow: "",
      isscroll: false,
      isMobile: false,
      color: "#000",
      storeUrl: "",
      selectedBox:
        window.localStorage.getItem("selectedBox") != null ? "none" : "block",
    };
  },
  components: {
    VerifyCodeCard: verifyCodeCard,
    CreateAccount: CreateAccount,
    LoginCard: LoginCard,
    HomePage: HomePage,
    NonAuthSendBookingModal: NonAuthSendBookingModal,
    NonAuthSendBookingModalWithPayment: NonAuthSendBookingModalWithPayment,
    InfoCardModal: InfoCardModal,
  },
  methods: {
    handleScroll(event) {
      this.scrollNavbar = event.currentTarget.scrollY >= 50;
      if (event.currentTarget.scrollY >= 50) {
        this.backgroundColor = "#fff";
        this.boxShadow = "0px 6px 16px rgb(0 0 0 / 25%)";
        this.isscroll = true;
      } else {
        this.backgroundColor = "";
        this.boxShadow = "";
        this.isscroll = false;
      }
    },
    handleUrl(event) {
      $("body").click();
      window.scrollTo(0, 0);
      if (this.$route.name == "HomePage") {
        this.$store.dispatch("auth/setName", true);
      } else {
        this.$store.dispatch("auth/setName", false);
      }
    },
    hideLayout() {
      this.$store.commit("setRouterToApp", false);
    },
    closeBox() {
      window.localStorage.setItem("selectedBox", false);
      this.selectedBox = "none";
    },
    supportModal() {
      if (this.isMobile == true) {
        window.location.href =
          "https://api.whatsapp.com/send?phone=905345002835";
      } else {
        this.$modal.show("InfoCardModal");
      }
    },
    showSupportModal() {
      this.$modal.show("InfoCardModal");
    },
    hideInfoBox() {
      this.$store.commit("setShowInformationBoxForBoatMapPage", false);
    },
  },
  created() {
    this.$store.commit("setSelectedLang", localStorage.getItem("lang"));
    this.$store.dispatch(FETCH_BOAT_TYPE);
    this.$store.dispatch(FETCH_LOCATION);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("locationchange", this.handleUrl);

    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera()
        );
      },
    };

    if (isMobile.Android()) {
      this.storeUrl =
        "https://play.google.com/store/apps/details?id=com.atilabs.boatsy.boatsy&gl=TR";
    }
    if (isMobile.iOS()) {
      this.storeUrl = "https://apps.apple.com/app/id1606890492";
    }
    if (isMobile.any()) {
      this.isMobile = true;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.addEventListener("locationchange", this.handleUrl);
  },
};
</script>

<style>
.whatsapp-chat {
  position: fixed;
  z-index: 2147483647 !important;
  width: 70px;
  right: 25px;
  background: transparent;
}
.information-box {
  position: fixed;
  text-align: center;
  padding: 20px;
  background-color: rgba(49, 60, 76, 0.98);
  color: #fff;
  bottom: 50px;
  z-index: 100;
  right: 109px;
  width: 147px;
}
.information-box:before {
  content: "" !important;
  display: block !important;
  border-left: 10px solid #313c4c !important;
  border-left-color: rgba(49, 60, 76, 0.98) !important;
  border-bottom: 10px solid transparent !important;
  position: absolute !important;
  right: -10px !important;
  bottom: 25px !important;
}
.information-box i {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.information-box-map-page {
  position: fixed;
  text-align: center;
  padding: 20px;
  background-color: rgba(49, 60, 76, 0.98);
  color: #fff;
  bottom: 50px;
  z-index: 100;
  left: 105px;
  width: 190px;
}
.information-box-map-page:before {
  content: "" !important;
  display: block !important;
  border-right: 10px solid #313c4c !important;
  border-left-color: rgba(49, 60, 76, 0.98) !important;
  border-bottom: 10px solid transparent !important;
  position: absolute !important;
  left: -10px !important;
  bottom: 25px !important;
}
.information-box-map-page i {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap");
.vs__search,
.vs__search:focus {
  z-index: 1 !important;
}
body {
  font-family: "Montserrat", sans-serif !important;
}
.vc-popover-content-wrapper {
  z-index: 999 !important;
}
.vm--modal {
  padding: 20px !important;
}

.row-height .vm--modal {
  height: auto !important;
  overflow-y: scroll !important;
  max-height: 700px !important;
  padding-bottom: 0;
  top: calc((100% - 700px) / 2) !important;
}
.map-filter-header::-webkit-scrollbar {
  display: none;
}

.map-filter-footer {
  position: relative;
}
.right-filter-button .multiselect {
  height: 0 !important;
}
.checkbox-filter-header,
.radio-group-map-header {
  grid-column: span 2;
}
.range-slider-minmax-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;
  justify-items: center;
  padding: 38px 0 10px 0;
}
.range-slider {
  padding-right: 16px;
}
.info-card-modal .vm--modal {
  overflow-y: scroll !important;
}
.maxmin-card {
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.maxmin-card-header {
  color: #ddd;
}
.vue-slider {
  padding-top: 38px !important;
}
.qtyButtons-guest-text {
  width: 90px;
  height: 90px;
  text-align: center;
  align-items: center;
  font-size: 2.5em;
  display: flex;
  justify-content: center;
}
.right-filter-button input,
.map-boat-type input {
  border: 1px solid #ddd;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  border-radius: 18px;
  background: transparent;
  margin-right: 10px;
  color: #333;
  padding: 10px 30px;
  position: relative;
}
.map-boat-type input:hover {
  border-radius: 18px !important;
  background-color: #ef4036 !important;
  color: white !important;
}
.map-boat-type input:checked {
  background-color: #ef4036 !important;
  border-radius: 8px !important;
}
.map-filter {
  left: 17px !important;
  cursor: pointer !important;
  text-align: center !important;
  border: 1px solid rgb(221, 221, 221) !important;
  background-color: rgb(255, 255, 255) !important;
  outline: none !important;
  border-radius: 18px !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", sans-serif !important;
  position: relative !important;
  padding: 10px 22px !important;
  font-size: 14px !important;
  line-height: 20px !important;
  font-weight: 600;
}
.map-filter-button {
  margin-top: -60px;
}
.filter-dropdown-container {
  position: absolute;
  background-color: #fff;
  z-index: 100;
  top: 60px;
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 37px !important;
  border-radius: 8px;
}
.filter-dropdown-container .qtyDec,
.filter-dropdown-container .qtyInc {
  width: 30px;
  height: 30px;
  font-size: 1.75rem;
}
.filter-dropdown-container .radio-group,
.filter-dropdown-container .guest-info,
.filter-dropdown-container .range-slider {
  padding: 20px 40px 30px 40px !important;
}

.guest-info,
.form-check-super-captain,
.range-slider {
  padding-top: 48px;
  padding-left: 16px;
}
.radio-group1 {
  padding-top: 28px !important;
  padding-bottom: 28px !important;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
}
.button-map-filter-search {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.button-content {
  background: #000;
  padding: 10px 25px;
  color: #fff;
  border-radius: 12px;
}
.check-super-captain-content,
.is-super-captain-content,
.checkbox-filter-content,
.reservation-flexibility-content,
.boat-type-content {
  display: flex;
  align-items: center;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
  display: inline-block !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(176, 176, 176) !important;
  height: 24px !important;
  width: 24px !important;
  margin: 15px 15px 15px 0 !important;
  accent-color: #000;
}
.vue-slider-process {
  background-color: #000 !important;
}
.vue-slider-dot-tooltip-inner {
  border-color: #ef4036;
  background-color: #ef4036;
}
.boatMapCard img {
  width: 100%;
  object-fit: cover;
}
.row.col-12.map-filter-header {
  padding: 15px 30px 15px 50px;
  margin-left: 30px;
}
@media (min-width: 768px) and (max-width: 992px) {
  .row.col-12.map-filter-header {
    max-width: 720px;
    padding: 10px 35px;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .row.col-12.map-filter-header {
    max-width: 540px;
    padding: 10px 35px;
  }
}
@media (max-width: 1045px) {
  .map-quick-filter-buttons {
    padding-bottom: 10px;
  }
}
@media (max-width: 770px) {
  .boat-type {
    visibility: hidden;
    position: absolute;
  }
}
@media (max-width: 700px) {
  .header-map-filter .vm--modal {
    height: 100% !important;
    overflow-y: scroll !important;
    top: 0px !important;
    max-height: 100% !important;
    padding-bottom: 0px !important;
  }
}
@media (max-width: 480px) {
  .map-filter-header {
    padding: 10px 15px !important;
    max-width: 100%;
  }
  .map-filter-header::-webkit-scrollbar {
    display: none;
  }
  .header-map-filter {
    position: relative;
  }
  .header-map-filter:after {
    position: absolute !important;
    height: 100% !important;
    width: 30px !important;
    z-index: 3 !important;
    right: -1px !important;
    top: 0;
    background: linear-gradient(
      to left,
      rgb(255 255 255) 56.77%,
      rgba(255, 255, 255, 0) 94.47%
    ) !important;
    content: "";
  }
}
.select-asc-border {
  z-index: 100 !important;
}
.select-asc-border .multiselect__single {
  font-size: 14px !important;
  font-weight: 600 !important;
  padding: 11px 30px 11px 20px !important;
  border: 1px solid #ddd !important;
  border-radius: 18px !important;
  line-height: 16px !important;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 216px;
  width: 200px !important;
  text-align: center !important;
}
.select-asc-border .multiselect__select:before {
  top: 22px !important;
}
.select-asc-border .multiselect__option--highlight {
  background-color: #ef4036 !important;
  color: #fff !important;
}
.multiselect__content_wrapper {
  z-index: 100 !important;
  display: block;
}
.select-asc-border .multiselect__tags {
  padding: 0 !important;
}
.select-asc-border .multiselect__content-wrapper {
  left: 0 !important;
  width: 100% !important;
  min-width: 240px !important;
  box-shadow: rgb(0 0 0 / 30%) 0px 10px 37px !important;
  border-radius: 8px;
}
.select-asc-border {
  z-index: 1;
}
.fas.fa-share-alt,
.fas.fa-star,
.far.fa-heart,
.fas.fa-anchor,
.fas.fa-map-marked-alt {
  color: #ef4036;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ddd;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
.signup-content {
  padding-bottom: 18px;
}
.signup-content span {
  font-size: 16px;
  font-weight: 600;
}
.loading-payment-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-button button {
  background-color: #ef4036;
  color: #fff;
  font-weight: 600;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff !important;
}
.leaflet-control-geosearch form {
  display: none;
  position: absolute;
  top: 0;
  left: 200px !important;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  background-clip: padding-box;
  z-index: -1;
  height: auto;
  margin: 0;
  padding: 0 8px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 65%);
  border-radius: 30px !important;
  width: 300px;
  padding: 20px !important;
  justify-content: center;
  align-items: center;
  display: flex;
  display: flex !important;
}
.layout-home {
  padding: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  z-index: 1;
  display: none;
}
.layout-home button {
  border: none;
  padding: 10px 20px;
  color: #fff;
  background-color: #ef4036;
  border-radius: 10px;
}
.close-layout {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  cursor: pointer;
}
.leaflet-bar-part-single {
  display: none;
}
@media (max-width: 800px) {
  .app {
    overflow-x: hidden !important;
  }
}
@media (max-width: 768px) {
  .layout-home {
    display: flex !important;
  }
}
@media (min-width: 992px) {
  .boat-card-map-title {
    margin-left: 35px !important;
  }
}
@media (max-width: 991px) {
  .map-right {
    display: none !important;
  }
  .select-asc-border {
    z-index: 1 !important;
  }
}
@media (max-width: 480px) {
  .boat-card-map-title {
    padding-left: 15px;
  }
}

.header-position {
  position: unset !important;
}

@media (max-width: 550px) {
  .read_more {
    opacity: 1 !important;
    visibility: visible !important;
  }
  .filter-dropdown-container {
    margin-left: -250px !important;
  }
  .vc-popover-content-wrapper {
    z-index: 999 !important;
  }
  .boat-description {
    padding: 0px 0px 10px 0px !important;
  }
  .boat-features,
  .support,
  .sleeping-plan,
  .detail-page-facility {
    padding: 0px 0 20px 0 !important;
  }
  .whatsapp-chat {
    display: block;
  }
}
@media (min-width: 374px) {
  header {
    padding: 15px 15px 5px 10px !important;
  }
}
@media (min-width: 389px) {
  header {
    padding: 15px 15px 5px 18px !important;
  }
}
@media (min-width: 414px) {
  header {
    padding: 15px 15px 5px 25px !important;
  }
}
</style>
