<template>
  <body>
    <div class="container boatsy-help-home" style="height:100%;">
      <h1 class="help-home">{{$t('help_home_boatsy-help-home')}}</h1>
      <h2
        class="help-home-type"
        style="margin-top:20px;padding:20px;margin-right:50px;"
      >
        {{$t('help_home_help-home-type')}}
      </h2>
      <div class="row boatsy-help-one">
        <div class="helphome-card">
          <div class="col">
            <div class="container">
              <div class="row helphome-image-one" style="margin-left:30px;">
                <img
                  src="/assets/images/illustrationiki.png"
                  style="height:300px; width:350px;"
                />
              </div>
              <div class="row">
                <router-link to="/guest/help">
                  <h3 class="help-title" style="font-weigth:700; color:black">
                    {{$t('help_home_guest/help')}}
                  </h3>
                </router-link>
                <div class="row">
                  <h5 class="help-titles" style="padding:15px;">
                    {{$t('help_home_help-titles')}}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
        <div class="helphome-card">
          <div class="col">
            <div class="container">
              <div class="row helphome-image-two" style="margin-left:30px;">
                <img
                  height="300"
                  width="350"
                  src="/assets/images/illustrationuc.gif"
                />
              </div>
              <div class="row">
                <router-link to="/boat/owner/help">
                  <h3 class="help-title" style="font-weigth:700; color:black">
                    {{$t('help_home_boat/owner/help')}}
                  </h3>
                </router-link>
                <h5 class="help-titles" style="margin-top:10px;">
                  {{$t('help_home_help-titles2')}}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="help-footer-title">
        {{$t('help_home_help-footer-title')}}
      </h2>
      <div class="row one-column" style="margin-left:20px;">
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-health">{{$t('help_home_howworks-health')}}</h5>
            <h5>
             {{$t('help_home_howworks-health-title')}}
            </h5>
            <a @click="show('about-boatsy-modal')">
              <a class="helphome-continue">
                {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-support">
              {{$t('help_home_howworks-support')}}
            </h5>
            <h5>
              {{$t('help_home_title')}}
            </h5>
            <a @click="show('boat-advantages-modal')">
              <a class="helphome-continue">
                {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-cancel">
              {{$t('help_home_howworks-cancel')}}
            </h5>
            <h5>
              {{$t('help_home_howworks-cancel-text')}}
            </h5>
            <a @click="show('reservation-process-modal')">
              <a class="helphome-continue">
                {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="row two-column" style="margin-left:20px;">
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-health">
             {{$t('help_home_howworks-health2')}}
            </h5>
            <h5>
              {{$t('help_home_howworks-health-text')}}
            </h5>
            <a @click="show('boat-availability-modal')">
              <a class="helphome-continue">
               {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-support">
              {{$t('help_home_howwork_support')}}
            </h5>
            <h5>
             {{$t('help_home_howwork_support-text')}}
            </h5>
            <a @click="show('boat-document-modal')">
              <a class="helphome-continue">
               {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-cancel">
              {{$t('help_home_howworks-cancel2')}}
            </h5>
            <h5>
             {{$t('help_home_howworks-cancel2-text')}}
            </h5>
            <a @click="show('boat-reservation-modal')">
              <a class="helphome-continue">
               {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="row three-column" style="margin-left:20px; margin-bottom:48px;">
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-health">
              {{$t('help_home_howworks-health3')}}
            </h5>
            <h5>
             {{$t('help_home_howworks-health3-text')}}
            </h5>
            <a @click="show('boat-list-modal')">
              <a class="helphome-continue">
                {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <div class="row">
            <h5 class="howworks-support">
              {{$t('howworks-support')}}
            </h5>
            <h5>
              {{$t('howworks-support-text')}}
            </h5>
            <a @click="show('boat-loading-modal')">
              <a class="helphome-continue">
               {{$t('help_home_howworks-health-helphome-continue')}}
              </a>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
    <modal name="about-boatsy-modal" :height="400">
      <AboutBoatsy></AboutBoatsy>
    </modal>
    <modal name="boat-advantages-modal" :height="500">
      <BoatAdvantages></BoatAdvantages>
    </modal>
     <modal name="reservation-process-modal" :height="500">
      <ReservationProcess></ReservationProcess>
    </modal>
    <modal name="boat-availability-modal" :height="350">
      <BoatAvailability></BoatAvailability>
    </modal>
     <modal name="boat-document-modal" :height="500">
      <BoatDocument></BoatDocument>
    </modal>
    <modal name="boat-reservation-modal" :height="500">
      <BoatReservation></BoatReservation>
    </modal>
     <modal name="boat-list-modal" :height="500">
      <BoatList></BoatList>
    </modal>
    <modal name="boat-loading-modal" :height="370">
      <BoatLoading></BoatLoading>
    </modal>
  </body>
</template>

<script>
import AboutBoatsy from './components/AboutBoatsy.vue'
import BoatAdvantages from './components/BoatAdvantages.vue'
import ReservationProcess from './components/ReservationProcess.vue'
import BoatAvailability from './components/BoatAvailability.vue'
import BoatDocument from './components/BoatDocument.vue'
import BoatList from './components/BoatList.vue'
import BoatLoading from './components/BoatLoading.vue'

export default {
  name: "howboatsyworks",
  components: {
    AboutBoatsy,
    BoatAdvantages,
    ReservationProcess,
    BoatAvailability,
    BoatDocument,
    BoatList,
    BoatLoading
  },
  methods: {
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
  },
};
</script>

<style>
.boatsy-help-one{
  margin-bottom: 30px;
}
.helphome-continue {
  color: #333 !important;
  font-size: 15px;
}
.helphome-continue:hover {
  text-decoration: underline;
}
.helphome-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  margin-left: 40px;
  border-radius: 15px;
}
@media (max-width: 991px) {
  .helphome-card {
    width: 100% !important;
    margin: 0 0 30px 0;
  }
  .helphome-image-two,
  .helphome-image-one{
    justify-content: center;
  }
  .boatsy-help-one{
    padding: 0 15px;
  }
  .help-home-type{
    margin: 0 0 30px 0 !important;
    padding: 0 !important;
  }
  .one-column,
  .two-column,
  .three-column{
    margin: 0 !important;
  }
  .three-column{
    margin-bottom: 30px !important;
  }
  .help-home{
    font-size: 32px !important;
  }
  .help-home-type{
    font-size: 24px !important;
  }
  .helphome-image-two,
  .helphome-image-one{
    margin:0px !important;
    padding: 10px !important;
  }
  .helphome-image-two img,
  .helphome-image-one img{
    width: 100% !important;
    height: 180px !important;
  }
  .help-footer-title{
    margin-left: 0 !important
  }
}
.helphome-card:hover {
  box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.2);
}

.help-home-card .container {
  padding: 2px 4px;
}
.howworks-health {
  font-weight: bold;
  margin-top: 25px;
}
.howworks-support {
  margin-top: 25px;
  font-weight: bold;
}
.howworks-cancel {
  margin-top: 25px;
  font-weight: bold;
}
.help-footer-title {
  font-weight: bold;
  margin-left: 20px;
  font-size: 35px;
}
.help-title {
  font-weight: bold;
  color: #333 !important;
  letter-spacing: 0.5px;
}
.help-titles {
}
.help-title:hover {
  text-decoration: underline;
}
.container .boatsy-works {
  max-width: 600px;
}
.help-home {
  margin-top: 75px;
  font-weight: bold;
  font-size: 35px;
  text-align: center;
  padding: 20px;
}
</style>
