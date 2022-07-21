<template>
  <header
    v-bind:style="
      this.$route.name == 'HomePage' ? 'position:absolute  !important' : ''
    "
  >
    <nav class="navbar-costum" style="place-items: center">
      <div id="logo" class="navbar-costum" style="width: 100%">
        <router-link to="/">
          <a
            class="logo-for-web"
            v-bind:class="
              isscroll || blackColor ? 'nav-link nav-black-link' : 'nav-link'
            "
            style="padding: 0px !important; margin: 0px 0px -10px -25px"
          >
            <img
              v-bind:src="
                this.$route.name != 'HomePage' || isscroll || blackColor
                  ? '/assets/images/boatsy-kirmizi.png'
                  : '/assets/images/boatsy-beyaz.png'
              "
              width="120"
              height="60"
              alt=""
              class="logo_sticky header-boatsy-logo"
              style="margin-top: 7px; width: 120px; height: 60px"
            />
          </a>
        </router-link>

        <a
          v-if="this.$route.name == 'HomePage'"
          class="header-phone-number"
          v-bind:class="
            this.$route.name != 'HomePage' || isscroll || blackColor
              ? 'nav-link nav-black-link'
              : 'nav-link'
          "
          href="tel:+908503079708"
          style=""
          @click="facebookEvent"
        >
          <i class="fa fa-phone fa-2x" style="font-size: x-large" />
          <h4
            v-bind:class="
              this.$route.name != 'HomePage' || isscroll || blackColor
                ? 'nav-link nav-black-link'
                : 'nav-link'
            "
            style="
              float: right;
              font-weight: bold;
              font-size: 20px;
              margin: 0;
              white-space: nowrap;
            "
          >
            0850 307 97 08
          </h4>
        </a>
      </div>

      <div class="nav-rigth-side">
        <a
          v-bind:class="
            this.$route.name != 'HomePage' || isscroll || blackColor
              ? 'nav-link nav-black-link'
              : 'nav-link'
          "
          v-on:click="isHiddenCurrency = !isHiddenCurrency"
          style="z-index: 1; padding: 1em"
        >
          <i class="fas fa-globe currencyMenu" style="font-size: large"></i>
        </a>
        <button
          class="navbar-costum-toggler"
          type="button"
          v-on:click="isHidden = !isHidden"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div class="navbar-costum-toggler-button">
            <i class="fas fa-bars menuIcon"></i>
            <i v-if="!user.id > 0" class="fas fa-user-circle useravatar"></i>
            <img
              v-if="user.id > 0"
              class="rounded-circle avatar useravatar"
              :src="IMAGE_URL + user.avatar"
            />
          </div>
          <div
            v-if="!isHidden"
            class="navbar-menu"
            style="
              z-index: 5;
              box-shadow: rgb(0 0 0 / 15%) 0px 10px 37px !important;
            "
          >
            <ul>
              <!--Giriş ve kayıt olma linkleri sadece giriş yapmamış kullanıcıda gosterilecek -->
              <li v-if="!user.id > 0">
                <a
                  style="font-weight: 700; color: black"
                  @click="show('signIn-modal')"
                  >{{ $t("header_log_ın") }}
                </a>
              </li>
              <li v-if="!user.id > 0">
                <a
                  style="font-weigth: 700; color: black"
                  @click="show('signUp-modal')"
                  >{{ $t("header_register") }}</a
                >
              </li>

              <li v-if="user.id > 0">
                <router-link
                  to="/message"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_message") }}
                </router-link>
              </li>
              <li v-if="user.id > 0 && user.userGroupId == 2">
                <router-link
                  to="/notifications"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_notification") }}
                </router-link>
              </li>
              <li v-if="user.id > 0 && user.userGroupId == 2">
                <router-link
                  to="/my-bookings"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_rezervation") }}
                </router-link>
              </li>
              <li v-if="user.id > 0 && user.userGroupId == 2">
                <router-link
                  to="/liked/boat"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_like_boat") }}
                </router-link>
              </li>
              <!--Admin menu -->

              <li v-if="user.id > 0 && user.userGroupId == 3">
                <router-link
                  to="/cms/captain/list"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_captan") }}
                </router-link>
              </li>
              <li v-if="user.id > 0 && user.userGroupId == 3">
                <router-link
                  to="/cms/bookings"
                  style="font-weigth: 700; color: black"
                >
                  Rezervasyonlar
                </router-link>
              </li>
              <li v-if="user.id > 0 && user.userGroupId == 3">
                <router-link
                  to="/cms/boat/list"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_boats") }}
                </router-link>
              </li>
              <!--Admin menu -->
              <li v-if="user.id > 0">
                <router-link
                  to="/account-settings"
                  style="font-weigth: 700; color: black"
                >
                  {{ $t("header_profile") }}
                </router-link>
              </li>

              <li v-if="user.id > 0">
                <router-link
                  to="/help/home"
                  style="font-weigth: 700; color: black"
                  >{{ $t("header_help") }}</router-link
                >
              </li>
              <li v-if="user.id > 0">
                <a @click="logout()" style="font-weigth: 700; color: black">
                  {{ $t("header_log_out") }}
                </a>
              </li>
            </ul>
          </div>
        </button>

        <div
          class="navbar-menu"
          style="
            top: 60px;
            right: 100px;
            width: 185px;
            padding: 16px;
            text-align: start;
            z-index: 5;
            box-shadow: rgb(0 0 0 / 15%) 0px 10px 37px !important;
          "
          v-if="!isHiddenCurrency"
        >
          <span class="label-select">{{ $t("Headers_money") }} </span>
          <select
            v-model="selectedCurrency"
            @change="updateCurrency"
            class="selectMenu"
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
          <span class="label-select">{{ $t("Headers_languages") }} </span>
          <select
            v-model="selectedLanguage"
            @change="changeLang"
            class="selectMenu"
          >
            <option
              v-for="(lang, index) in languages"
              :key="index"
              :value="lang.info.code"
              class="selectOption"
            >
              {{ lang.info.name }}
            </option>
          </select>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import i18n from "@/plugins/i18n";
import Vue from "vue";

import { SET_PROFILE } from "../store/actions.type.js";
import { FETCH_CURRENCY } from "../store/actions.type.js";
import { mapGetters } from "vuex";
import CreateAccountCard from "../components/CreateAccount.vue";
import LoginCard from "../components/LoginCard.vue";
import { IMAGE_URL } from "../config/GlobalVariables";

export default {
  components: {
    CreateAccount: CreateAccountCard,
    LoginCard: LoginCard,
  },

  props: ["isscroll"],

  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      name: "Headers",
      isHidden: true,
      selectedCurrency: 1,
      isHiddenCurrency: true,
      blackColor: true,
      languages: Object.values(i18n.messages),
      selectedLanguage: "tr",
      headerForMobilHomePage: false,
    };
  },

  computed: {
    ...mapGetters({
      user: "getProfileModel",
      currency: "getCurrency",
    }),
  },

  methods: {
    changeLang() {
      localStorage.setItem("lang", this.selectedLanguage);
      location.reload();
    },
    facebookEvent() {
      window.fbq('track', 'Contact', {});
    },
    windowsClick(event) {
      var targetStatus =
        event.target == window.$(".navbar-costum-toggler")[0] ||
        event.target == window.$(".navbar-costum-toggler-button")[0] ||
        event.target == window.$(".useravatar")[0] ||
        event.target == window.$(".menuIcon")[0] ||
        event.target == window.$(".navbar-menu")[0] ||
        event.target == window.$(".currencyMenu")[0] ||
        event.target == window.$(".selectMenu")[0] ||
        event.target == window.$(".selectMenu")[1] ||
        event.target == window.$(".selectOption")[0] ||
        event.target == window.$(".label-select")[0] ||
        event.target == window.$(".nav-link")[0];
      if (!targetStatus) {
        this.isHidden = true;
        this.isHiddenCurrency = true;
      }
      if (this.$route.name == "HomePage") {
        this.blackColor = false;
        if (window.innerWidth < 600) {
          this.headerForMobilHomePage = true;
        }
      } else {
        this.blackColor = true;
        this.headerForMobilHomePage = false;
      }
    },
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    logout() {
      this.$store.dispatch("out", {
        password: this.loginPassword,
        username: this.loginEmail,
      });
      this.$router.go(this.$router.currentRoute);
    },

    updateCurrency() {
      window.localStorage.setItem("selectedCurrency", this.selectedCurrency);
      this.$router.go();
    },
  },
  async mounted() {
    if (this.currency.length < 1) {
      await this.$store.dispatch(FETCH_CURRENCY);
    }
    this.selectedCurrency = this.$store.getters.getSelectedCurrency;
  },

  async created() {
    this.selectedLanguage = localStorage.getItem("lang");
    window.addEventListener("click", this.windowsClick);
  },

  destroyed: function () {
    window.removeEventListener("keydown", this.windowsClick);
  },
};
</script>

<style>
.header-phone-number {
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.2em;
}
.navbar-costum-toggler {
  border: 1px solid #6c757d !important;
}
.avatar {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  margin-left: 5px;
}
.navbar-menu select {
  width: 100%;
  height: 35px;
  border-radius: 9px;
  padding: 5px;
  margin: 5px 0 15px 0;
}

@media (min-width: 600px) {
  .logo-for-web {
    margin: -10px 0px -10px -25px !important;
  }
}
@media (max-width: 430px) {
  .header-phone-number h4.nav-link {
    position: absolute;
    visibility: hidden;
    width: 0 !important;
  }
}
</style>
