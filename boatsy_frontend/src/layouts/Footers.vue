<template>
  <footer class="boatsy-footer" style="margin-top: 20px">
    <div class="container container-custom">
      <div class="row padding-top-footer">
        <div class="col-lg-3 col-md-6 col-6" style="text-align: start">
          <h5 style="font-size: 0.9rem; margin: 5px 0">
            {{ $t("footers_about") }}
          </h5>
          <ul class="links">
            <li>
              <router-link to="/about">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_about") }}
                </a>
              </router-link>
            </li>
            <li>
              <router-link to="/how/boatsy/works">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_operation") }}
                </a>
              </router-link>
            </li>
            <li>
              <router-link to="/blogs">
                <a style="font-weigth: 700; color: black"> Blog </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6" style="text-align: start">
          <h5 style="font-size: 0.9rem; margin: 5px 0">
            {{ $t("footers_boat_owner") }}
          </h5>
          <ul class="links">
            <li>
              <router-link to="/host/boats">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_boat_rent") }}
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6" style="text-align: start">
          <h5 style="font-size: 0.9rem; margin: 5px 0">
            {{ $t("footers_support") }}
          </h5>
          <ul class="links">
            <li>
              <router-link to="/help/home">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_help_center") }}
                </a>
              </router-link>
            </li>
            <li>
              <router-link to="/trust/security">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_trust_security") }}
                </a>
              </router-link>
            </li>
            <li>
              <router-link to="/privacypolicy">
                <a style="font-weigth: 700; color: black">
                  {{ $t("footers_kvkk") }}
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6" style="text-align: start">
          <h5 style="font-size: 0.9rem; margin: 5px 0">
            {{ $t("footers_contact") }}
          </h5>
          <ul class="contacts">
            <li style="margin: opx">
              <a href="tel:+908503079708" class=""
                ><i
                  class="fa fa-phone fa-2x"
                  style="
                    color: grey;
                    font-size: large;
                    padding-top: 0px;
                    margin-right: 5px !important;
                  "
                ></i>
                <h4
                  class="nav-link nav-black-link"
                  style="
                    float: right;
                    font-size: 14px !important;
                    margin-bottom: auto;
                  "
                >
                  0850 307 97 08
                </h4></a
              >
            </li>

            <li style="margin: opx">
              <a
                href="https://api.whatsapp.com/send?phone=905345002835"
                target="_blank"
                ><i
                  class="fa fa-whatsapp fa-2x"
                  style="
                    color: grey;
                    font-size: large;
                    padding-top: 0px;
                    margin-right: 5px !important;
                  "
                ></i>
                <h4
                  class="nav-link nav-black-link"
                  style="
                    float: right;
                    font-size: 14px !important;
                    margin-bottom: auto;
                  "
                >
                  0534 500 28 35
                </h4></a
              >
            </li>
            <li style="margin: opx">
              <a class=""
                ><i
                  class="fas fa-envelope fa-2x"
                  style="
                    color: grey;
                    font-size: medium;
                    padding-top: 0px;
                    margin-right:5px !important;
                  "
                ></i>
                <h4
                  class="nav-link nav-black-link"
                  style="
                    float: right;
                    font-size: 14px !important;
                    margin-bottom: auto;
                  "
                >
                  info@boatsy.net
                </h4></a
              >
            </li>
          </ul>
        </div>
      </div>
      <!--/row-->

      <div
        class="row"
        style="justify-content: space-between; align-items: center; padding-bottom: 15px"
      >
        <div
          class="col-12 col-sm-4 social-icons"
          style="display: flex; align-items: center;"
        >
          <img
            src="/img/boatsy-visa-mastercard.png"
            style="width: 140px; height: 50px"
          />
          <img src="/img/amex.png" style="width: 50px; height: 45px" />
          <img
            src="/img/trustpilot_logo.jpeg"
            style="width: 120px; height: 50px"
          />
        </div>
        <div
          class="col-12 col-sm-3 quick-links"
          style="
            display: flex;
            gap: 1em;
            align-items: center;
          "
        >
          <div class=""><a href="">© 2021 Boatsy</a></div>
        </div>
        <div
          class="col-12 col-sm-3 social-icons"
          style="
            display: flex;
            gap: 1em;
            align-items: center;
          "
        >
          <a href="https://www.facebook.com/boatsyapp" target="_blank"
            ><i class="ti-facebook" style="font-size: 20px"></i
          ></a>

          <a href="https://twitter.com/boatsyapp" target="_blank"
            ><i class="fab fa-twitter" style="font-size: 20px"></i
          ></a>

          <a href="https://www.instagram.com/boatsyapp/" target="_blank"
            ><i class="ti-instagram" style="font-size: 20px"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="search-list">
      <div class="container container-custom">
        <div
          class="search-header"
          style="text-align: center; font-size: 24px; position: relative; padding-top: 25px; font-weight: 700;"
        >
          EN ÇOK ARANANLAR
        </div>
        <div class="row" style="margin-top: 25px; padding-bottom: 15px;">
          <div class="col-12 col-md-6 col-lg-3 list-group">
            <li @click="routerToBoats('Muğla','','Gulet')">Muğla Gulet Kiralama</li>
            <li @click="routerToBoats( 'Muğla','Göcek','Katamaran')">Göcek Katamaran Kiralama</li>
            <li @click="routerToBoats('İstanbul','','Motoryat')">İstanbul Motoryat Kiralama</li>
            <li @click="routerToBoats('Muğla','Göcek','Gulet')">Göcek Gulet Kiralama</li>
            <li @click="routerToBoats('İzmir','','Gulet')">İzmir Gulet Kiralama</li>
          </div>
          <div class="col-12 col-md-6 col-lg-3 list-group">
            <li @click="routerToBoats('Antalya','','Yelkenli')">Antalya Yelkenli Kiralama</li>
            <li @click="routerToBoats('Muğla','Bodrum','Gulet')">Bodrum Gulet Kiralama</li>
            <li @click="routerToBoats('Muğla','Bozburun','Motoryat')">Bozburun Motoryat Kiralama</li>
            <li @click="routerToBoats('Muğla','Marmaris','Yelkenli')">Marmaris Yelkenli Kiralama</li>
            <li @click="routerToBoats('Muğla','Fethiye','Motoryat')">Fethiye Motoryat Kiralama</li>
          </div>
          <div class="col-12 col-md-6 col-lg-3 list-group">
            <li @click="routerToBoats('Antalya','Kemer','Motoryat')">Kemer Motoryat Kiralama</li>
            <li @click="routerToBoats('İstanbul','Fatih','Gulet')">Fatih Gulet Kiralama</li>
            <li @click="routerToBoats('İstanbul','Maltepe','Gulet')">Maltepe Gulet Kiralama</li>
            <li @click="routerToBoats('İstanbul','Beşiktaş','Motoryat')">Beşiktaş Motoryat Kiralama</li>
            <li @click="routerToBoats('Muğla','Datça','Yelkenli')">Datça Yelkenli Kiralama</li>
          </div>
          <div class="col-12 col-md-6 col-lg-3 list-group">
            <li @click="routerToBoats('Muğla','Göcek','Yelkenli')">Göcek Yelkenli Kiralama</li>
            <li @click="routerToBoats('Muğla','','Motoryat')">Muğla Motoryat Kiralama</li>
            <li @click="routerToBoats('Muğla','Bozburun','Gulet')">Bozburun Gulet Kiralama</li>
            <li @click="routerToBoats('Muğla','Bodrum','Yelkenli')">Bodrum Yelkenli Kiralama</li>
            <li @click="routerToBoats('Muğla','Bozburun','Katamaran')">Bozburun Katamaran Kiralama</li>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_PROFILE } from "../store/actions.type.js";

export default {
  data() {
    return {
      selectedCurrency: this.$store.getters.getSelectedCurrency,
    };
  },

  computed: mapGetters({
    user: "getProfileModel",
  }),

  methods: {
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    },
    async routerToBoats(state,city,boatType) {
      console.log(boatType);
      await this.$store.commit("setBoatType", boatType);
      city == '' ? window.location.href = '/mapboats/' + state :
                   window.location.href = '/mapboats/' + state + '-' + city 
    }
  },

  async created() {},
};
</script>

<style>
.search-list {
  background-image: url(/img/background_18_v3.jpg);
  background-position: center;
  background-size: cover;
  position: relative;
  color: #fff;
}
.list-group li {
  margin-bottom: 5px;
  cursor: pointer;
}
.search-list:before {
  position: absolute;
  content: "";
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.boatsy-footer {
  position: relative;
}
.social-icons a {
  display: flex;
  padding: 6px 7px 7px;
  border-radius: 7px;
  background: #d5d5d5;
  align-items: center;
  justify-content: center;
}

.social-icons i {
  color: #fff;
}
/* Mobile */
@media (max-width: 480px) {
  .social-icons,
  .quick-links {
    justify-content: center;
  }
}
@media (min-width: 600px) {
  .padding-top-footer {
    padding-top: 25px;
  }
}
@media (max-width: 599px) {
  .padding-top-footer {
    padding-top: 10px;
  }
}
</style>
