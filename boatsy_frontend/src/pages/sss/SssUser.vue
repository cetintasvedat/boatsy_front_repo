<template>
  <div class="container" style="padding-top: 60px">
    <div class="row sss-banner">
      <h4 style="text-align: center;font-size: 35px; color:white">{{$t('sss_captain_banner')}}</h4>
    </div>
    <div class="row" style="padding-top: 30px">
      <div class="col-md-4 col-sm-4 col-12 " style="border-right-style: inset; padding: 5px">
        <button :class="{'sss-button-active w-150 border-style: inherit':giris}" class="sss-button"
                v-on:click="girisChange">{{$t('sss_user_giriş')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':rezervasyonYapma}" class="sss-button w-150"
                v-on:click="rezervasyonYapmaChange">{{$t('sss_user_reservation')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':imkanEkstra}" class="sss-button w-150"
                v-on:click="imkanEkstraChange">{{$t('sss_user_imkan')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':odemeYapma}" class="sss-button w-150"
                v-on:click="odemeYapmaChange">{{$t('sss_captain_odemeChange')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':iptalPolitika}" class="sss-button w-150"
                v-on:click="iptalChange">{{$t('sss_user_iptal')}}
        </button>
      </div>
      <div class="col-md-1 col-sm-1 col-12" style="border-bottom-style: inset "></div>
      <div class="col-md-8 col-sm-8 col-12">
        <div v-if="giris">
          <h3 style="font-family: bold">{{$t('sss_user_giriş')}}</h3>
         {{$t('sss_user_giriş_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('help_home_howworks-health')}}</h5>
         {{$t('sss_user_boatsy_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_avantaj')}}</h5>
          {{$t('sss_user_avantaj_text')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_text2')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_text3')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_text4')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_text5')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_text6')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_avantaj_nasıl')}}</h5>
          {{$t('sss_user_avantaj_nasıl_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_avantaj_rezervasyon')}}</h5>
          {{$t('sss_user_avantaj_rezervasyon_text')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text2')}}
          <br>
          <br>
         {{$t('sss_user_avantaj_rezervasyon_text3')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text4')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text5')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text6')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text7')}}
          <br>
          <br>
          {{$t('sss_user_avantaj_rezervasyon_text8')}}


        </div>
        <div v-if="rezervasyonYapma">
          <h3 style="font-family: bold">{{$t('sss_user_reservation')}}</h3>
          {{$t('sss_user_rezervasyon_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_tekne')}}</h5>
          {{$t('sss_user_rezervasyon_tekne_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_günlük')}}</h5>
          {{$t('sss_user_rezervasyon_günlük_text')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_günlük_text2')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_müsait')}}</h5>
          {{$t('sss_user_rezervasyon_müsait_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_müsait_text2')}}</h5>
          {{$t('sss_user_rezervasyon_müsait_text3')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_ödeme')}}</h5>
          {{$t('sss_user_rezervasyon_ödeme_text')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_min')}}</h5>
          {{$t('sss_user_rezervasyon_min_txt')}} <br>
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px"> {{$t('sss_user_rezervasyon_iletişim')}}</h5>
          {{$t('sss_user_rezervasyon_iletişim_txt')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_iletişim_txt2')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_rezervasyon_cocuk')}} </h5>
          {{$t('sss_user_rezervasyon_cocuk_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_rezervasyon_transitlog')}}</h5>
          {{$t('sss_user_rezervasyon_transitlog_txt')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_transitlog_txt2')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_transitlog_txt3')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_rezervasyon_pet')}}
          </h5>
          {{$t('sss_user_rezervasyon_pet_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_rezervasyon_alterna')}} </h5>

          {{$t('sss_user_rezervasyon_alterna_txt')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt1')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt2')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt3')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt4')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt5')}}
          <br>
          <br>
          {{$t('sss_user_rezervasyon_alterna_txt6')}}

          <br>
          <br>


        </div>
        <div v-if="imkanEkstra">
          <h3 style="font-family: bold">{{$t('sss_user_imkan_title')}}</h3>
          {{$t('sss_user_imkan_title_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_klima')}}</h5>
          {{$('sss_user_imkan_klima_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_günlük_seyir')}}</h5>
          {{$t('sss_user_imkan_günlük_seyir_txt')}}
          <br>
          {{$t('sss_user_imkan_günlük_seyir_txt2')}}

          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_detay')}}</h5>
          {{$t('sss_user_imkan_detay_txt')}}
          <br>
          {{$t('sss_user_imkan_detay_txt2')}}
          <br>
          {{$t('sss_user_imkan_detay_txt3')}}
          <br>
          {{$t('sss_user_imkan_detay_txt4')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_servis_botu')}}</h5>
          {{$t('sss_user_imkan_servis_botu_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_buzdolabı')}}</h5>
          {{$t('sss_user_imkan_buzdolabı_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_imkan_rota')}}</h5>
          {{$t('sss_user_imkan_rota_txt')}}
          <br>
          {{$t('sss_user_imkan_rota_txt2')}}
          <router-link to="/">{{$t('sss_user_imkan_rota_txt3')}}</router-link>
          {{$t('sss_user_imkan_rota_txt4')}}
          <br>
          <br>

        </div>
        <div v-if="odemeYapma">
          <h3 style="font-family: bold">{{$t('sss_user_ödeme')}}</h3>
          {{$t('sss_user_ödeme_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_txt2')}}</h5>
          {{$t('sss_user_ödeme_txt3')}}
          <br>
          {{$t('sss_user_ödeme_txt4')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$('sss_user_ödeme_yakıt')}}</h5>
          {{$t('sss_user_ödeme_yakıt_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_rez_bed')}}</h5>
          {{$t('sss_user_ödeme_rez_bed_txt')}}
          <br>
          {{$t('sss_user_ödeme_rez_bed_txt2')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_doğrudan')}}</h5>
          {{$t('sss_user_ödeme_doğrudan_txt')}}

          <br>{{$t('sss_user_ödeme_doğrudan_txt1')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt2')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt3')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt4')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt5')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt6')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt7')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt8')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt9')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt10')}}
          <br>{{$t('sss_user_ödeme_doğrudan_txt11')}}
          <br>
         {{$t('sss_user_ödeme_doğrudanText')}}
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_KDV')}}</h5>
          {{$t('sss_user_ödeme_KDV_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_fatura')}}</h5>
          {{$t('sss_user_ödeme_fatura_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_seçenek')}}</h5>
          {{$t('sss_user_ödeme_seçenek_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_ödeme_depozito')}}</h5>
          {{$('sss_user_ödeme_depozito_txt')}}
          <br>
          {{$t('sss_user_ödeme_depozito_txt2')}}
          <br>
          <br>

        </div>
        <div v-if="iptalPolitika">
          <h3 style="font-family: bold">{{$t('sss_user_iptal')}}</h3>
          {{$t('sss_user_iptal_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_iptal_teslim')}}</h5>
          {{$t('sss_user_iptal_teslim_txt')}}
          <br>
          <br>
          {{$t('sss_user_iptal_teslim_txt2')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_iptal_platform')}}
          </h5>
          {{$t('sss_user_iptal_platform_txt')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_iptal_mücbir')}}</h5>
          {{$t('sss_user_iptal_mücbir_txt')}}
          <br>
          <br>
          {{$t('sss_user_iptal_mücbir_txt2')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_user_iptal_misafir')}}
          </h5>
          {{$t('sss_user_iptal_misafir_txt')}}
          <br>
          <br>
        </div>
      </div>

    </div>
  </div>
</template>
<script>


export default {
  name: "SssCaptain",
  components: {},

  data() {
    return {
      giris: true,
      rezervasyonYapma: false,
      imkanEkstra: false,
      odemeYapma: false,
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
    girisChange() {
      this.giris = true;
      this.rezervasyonYapma = false;
      this.imkanEkstra = false;
      this.odemeYapma = false;
      this.iptalPolitika = false;
    },
    rezervasyonYapmaChange() {
      this.giris = false;
      this.rezervasyonYapma = true;
      this.imkanEkstra = false;
      this.odemeYapma = false;
      this.iptalPolitika = false;
    },
    imkanEkstraChange() {
      this.giris = false;
      this.rezervasyonYapma = false;
      this.imkanEkstra = true;
      this.odemeYapma = false;
      this.iptalPolitika = false;
    },
    odemeYapmaChange() {
      this.giris = false;
      this.rezervasyonYapma = false;
      this.imkanEkstra = false;
      this.odemeYapma = true;
      this.iptalPolitika = false;
    },
    iptalChange() {
      this.$nextTick(() => {
        this.giris = false;
        this.rezervasyonYapma = false;
        this.imkanEkstra = false;
        this.odemeYapma = false;
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

.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.accordion:after {
  content: '\002B';
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>
