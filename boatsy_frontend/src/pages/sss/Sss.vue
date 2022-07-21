<template>
  <div class="container" style="padding-top: 60px">
    <div class="row sss-banner">
      <h4 style="text-align: center;font-size: 35px; color:white">{{$t('sss_captain_banner')}}</h4>
    </div>
    <div class="row" style="padding-top: 30px">
      <div class="col-md-4 col-sm-4 col-12" style="border-right-style: inset; padding: 5px">
        <button :class="{'sss-button-active w-150 border-style: inherit':baslangic}" class="sss-button"
                v-on:click="baslangicChange">{{$t('sss_captain_baslangicChange')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':ilanVerme}" class="sss-button w-150"
                v-on:click="ilanChange">{{$t('sss_captain_ilanChange')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':kirayaVerme}" class="sss-button w-150"
                v-on:click="kiraChange">{{$t('sss_captain_kiraChange')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':odemeAlma}" class="sss-button w-150"
                v-on:click="odemeChange">{{$t('sss_captain_odemeChange')}}
        </button>
        <button :class="{'sss-button-active w-150 border-style: inherit':iptalPolitika}" class="sss-button w-150"
                v-on:click="iptalChange">{{$t('sss_captain_iptalChange')}}
        </button>
      </div>
      <div class="col-md-1 col-sm-1 col-12" style="border-bottom-style: inset "></div>
      <div class="col-md-8 col-sm-8 col-12" style="min-height: 500px">
        <div v-if="baslangic">
          <p class="p1"><span class="s1">{{$t('sss_captain_baslangıc_p1')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_baslangıc_p2')}}.</span>
          </p>
          <br>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_baslangıc_p3')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('ss_captain_baslangıc_p4')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>

        </div>
        <div v-if="ilanVerme">
          <p class="p1"><span class="s1">{{$t('sss_captain_ilan_p1')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p3"><span class="s1">1-</span><span class="s2">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span
              class="s1">{{$t('sss_captain_ilan_p2')}}</span></p>
          <p class="p3"><span class="s1">2-</span><span class="s2">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span
              class="s1">{{$t('sss_captain_ilan_p3')}}</span></p>
          <p class="p3"><span class="s1">3-</span><span class="s2">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span
              class="s1">{{$t('sss_captain_ilan_p4')}}</span>
          </p>
          <p class="p3"><span class="s1">4-</span><span class="s2">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span
              class="s1">{{$t('sss_captain_ilan_p5')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ilan_s1')}}</span></p>
          <p class="p4"><span class="s1">P.S. : &ldquo;&nbsp;</span><span class="s3">&equiv;</span><span class="s1">{{$t('sss_captain_ilan_note')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
        </div>
        <div v-if="kirayaVerme">
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_kira_reservation')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_reservation-text')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_reservation-text2')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_reservation-text3')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_reservation_text4')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_reservation_text5')}}</span>
          </p>

          <p class="p2"><br></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_kira_belge')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_belge1')}}</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_belge2')}}</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_belge3')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_kira_belge4')}}</span>
          </p>
          <br>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_kira_belge5')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_liste1')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_liste2')}}</span>
          </p>

          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_günlük')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_günlük_text')}}</span>
          </p>
          <p class="p2"><span class="s1">{{$t('sss_captain_günlük_text2')}}</span>
          </p>
          <br>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span
              class="s1">{{$t('sss_captain_tekne')}}</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_tekne_text')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_soru')}}</span>
          </p>
          <p class="p2"><span class="s1">{{$t('sss_captain_soru2')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_soru3')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_soru4')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_soru5')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_soru6')}}</span>
          </p>
        </div>
        <div v-if="odemeAlma">

          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p1"><span class="s1">{{$t('sss_captain_ödeme')}}</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_text')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_text2')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_ödeme_para')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span
              class="s1">{{$t('sss_captain_ödeme_para_text')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_ödeme_ekstra')}}</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_ekstra_text')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_ödeme_rezervasyon')}} </span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_rezervasyon_çokEnsek')}}</span>
          </p>
          <p class="p2"><span
              class="s1">{{$t('sss_captain_ödeme_rezervasyon_Ensek')}}</span>
          </p>
          <p class="p2"><span
              class="s1">{{$t('sss_captain_ödeme_rezervasyon_katı')}}</span>
          </p>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_rezervasyon_çokKatı')}}</span>
          </p>
          <br>
          <p class="p2"><span class="s1">{{$t('sss_captain_ödeme_rezervasyon_text')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <br>
          <p class="p1"><span class="s1">{{$t('sss_captain_ödeme_rezervasyon_ödemeMiktar')}}</span>
          </p>
          <p class="p2"><span class="s1">&nbsp;</span></p>
          <p class="p2"><span
              class="s1">{{$t('sss_captain_ödeme_rezervasyon_ödemeMiktar-text')}}</span><span class="s3">&equiv;</span><span
              class="s1">{{$t('sss_captain_ödeme_rezervasyon_ödemeMiktar-text2')}}</span>
          </p>
        </div>
        <div v-if="iptalPolitika">
          <h3 style="font-family: bold">{{$t('sss_captain_iptalChange')}}</h3>
          {{$t('sss_captain_iptalChange_text')}}
          <br>
          <br>

          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_captain_iptalChange_text_soru')}}</h5>

          {{$t('sss_captain_iptalChange_text_2')}}
          <br>
          <br>
           {{$t('sss_captain_iptalChange_text_3')}}
          <br>
          <br>
          {{$t('sss_captain_iptalChange_text_4')}}
          <br>
          <br>
          {{$t('sss_captain_iptalChange_text_5')}}
          <br>
          <br>
          {{$t('sss_captain_iptalChange_text_6')}}
          <br>
          <br>
          {{$t('sss_captain_iptalChange_text_7')}}
          <br>
          <br>
          {{$t('sss_captain_iptalChange_text_8')}}
          <br>
          <br>
          <h5 style="font-family: bold;font-size: 25px">{{$t('sss_captain_iptalChange_text_9')}}</h5>
          {{$t('sss_captain_iptalChange_text_10')}}
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "Sss",
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
p.p1 {
  margin: 0.0px 0.0px 17.9px 0.0px;
  line-height: 24.5px;
  font: 21.3px Arial;
  color: #244084;
  -webkit-text-stroke: #244084
}

p.p2 {
  margin: 0.0px 0.0px 0.0px 0.0px;
  line-height: 18.4px;
  font: 16.0px Times;
  color: #000000;
  -webkit-text-stroke: #000000
}

p.p3 {
  margin: 0.0px 0.0px 0.0px 72.0px;
  text-indent: -24.0px;
  line-height: 18.4px;
  font: 16.0px Times;
  color: #000000;
  -webkit-text-stroke: #000000
}

p.p4 {
  margin: 0.0px 0.0px 0.0px 48.0px;
  line-height: 18.4px;
  font: 16.0px Times;
  color: #fb0007;
  -webkit-text-stroke: #fb0007
}

span.s1 {
  font-kerning: none
}

span.s2 {
  font: 9.3px 'Times New Roman';
  font-kerning: none
}

span.s3 {
  font: 16.0px Symbol;
  font-kerning: none
}

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
