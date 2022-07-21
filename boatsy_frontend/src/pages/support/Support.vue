<template>
  <div class="container" style="padding-top: 60px">
    <div class="sss-banner">
      <h4 style="text-align: center;font-size: 35px; color:white">{{$t('support_boasty_support')}}</h4>
    </div>
    <div class="help-type" style="padding-top: 30px;padding-bottom: 30px">
      <h3 class="help-title">{{$t('support_boasty_help-title')}}</h3>
      <div class="row">
        <div class="col-lg-5 col-12" style="background-color: #e5eff3">
          <router-link to="/sss/user">
            <img height="300" width="350" src="/assets/images/illustrationiki.png">
            <div class="text">
              <h3>{{$t('support_users')}}</h3>
              <p>{{$t('support_user')}}</p></div>
          </router-link>
        </div>
        <div class="col-lg-1 col-1" style="background-color: white;padding-top: 10px"></div>
        <div class="col-lg-5 col-12" style="background-color: #e5eff3; padding-top: 20px">
          <router-link to="/sss/captain">
            <img height="300" width="350" src="/assets/images/illustrationuc.gif">
            <div class="text"><h3>{{$t('support_captain')}}</h3>
              <p>{{$t('support_captain_tex')}}</p></div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row" style="padding-top: 30px">
    </div>
  </div>
</template>
<script>


export default {
  name: "SssUser",
  components: {},

  data() {
    return {
      baslangic: true,
      ilanVerme: false,
      kirayaVerme: false,
      odemeAlma: false,
      iptalPolitika: false,
      items: [
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg",
        },
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg",
        },
        {
          img: true,
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg",
        },
      ],
      datePickerValue: "",
      timePickerValue: "",
      time3: null,
    };
  },
  methods: {
    handlePickersValue() {
      let output = "Pick date and time";
      if (this.datePickerValue && this.timePickerValue)
        output = `${this.datePickerValue}, ${this.timePickerValue}`;
      else if (this.datePickerValue) output = this.datePickerValue;
      else if (this.timePickerValue) output = this.timePickerValue;
      return output;
    },
    baslangicChange() {
      this.baslangic = true;
      this.ilanVerme = false;
      this.kirayaVerme = false;
      this.odemeAlma = false;
      this.iptalPolitika = false;
    },
    ilanChange() {
      this.baslangic = false;
      this.ilanVerme = true;
      this.kirayaVerme = false;
      this.odemeAlma = false;
      this.iptalPolitika = false;
    },
    kiraChange() {
      this.baslangic = false;
      this.ilanVerme = false;
      this.kirayaVerme = true;
      this.odemeAlma = false;
      this.iptalPolitika = false;
    },
    odemeChange() {
      this.baslangic = false;
      this.ilanVerme = false;
      this.kirayaVerme = false;
      this.odemeAlma = true;
      this.iptalPolitika = false;
    },
    iptalChange() {
      this.$nextTick(() => {
        this.baslangic = false;
        this.ilanVerme = false;
        this.kirayaVerme = false;
        this.odemeAlma = false;
        this.iptalPolitika = true;
      })
    },
  },
};
</script>
<style scoped>
.sss-banner {
  padding: 50px;
  background-size: cover;
  background-color: #ff3547 !important;
}

.sss-button {
  padding: 5px;
  border-style: hidden;
  margin: 5px;
  min-width: 150px;
  background-color: white !important;
}

.sss-button-active {
  padding: 5px;
  border-style: inherit;
  margin: 5px;
  min-width: 150px;
  color: white;

  background-color: #8aa9ff !important;

}

.active-pink-3 input[type="text"] {
  border: 1px solid #f48fb1;
  box-shadow: 0 0 0 1px #f48fb1;
  border-radius: 30px;
}

a {
  text-decoration: underline;
  text-decoration-color: black;
}

.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 20px;
}

.multi-column {
  column-count: 2;
  column-gap: 20px;
  column-fill: auto;
}
</style>
