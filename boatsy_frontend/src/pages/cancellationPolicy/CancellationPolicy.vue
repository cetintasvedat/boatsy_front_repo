<template>
  <div class="container" style="padding-top: 60px">
    <div class="row support-banner">
      <h4 style="text-align: center;font-size: 35px; color:white">İptal Politikası</h4>
    </div>
    <br>
    <h3 style="font-family: bold">İptal Süreci</h3>
    Avrupa'nın lider özel yat kiralama platformu Boatsy'nin, misafir & tekne sahiplerini eşit derecede
    koruyan, şeffaf iptal politikaları hakkında bilgi alın.
    <br>
    <br>
    <h5 style="font-family: bold;font-size: 25px">Tekne sahibinin tekneyi teslim etmemesi durumunda ne olur?</h5>
    Boatsy tekne sahibinin tekneyi teslim etmemesi durumunda platform üzerinden yapılan ödemeleri misafire iade
    etmekte ve benzer özelliklere sahip bir tekne bulunmasına yardımcı olmaktadır.
    <br>
    <br>
    Tekne sahibinin tekneyi teslim etmemesi durumunda, Boatsy’nin tekne sahibinden alacağı hizmet bedeli
    ileride yapılacak kiralamaların rezervasyon bedelinden düşülür.
    <br>
    <br>
    <h5 style="font-family: bold;font-size: 25px">Teslim edilen teknenin platformda detayları paylaşılan tekne
      olmaması durumunda ne yapmalıyım?
    </h5>
    Bu tarz bir durumda misafirin rezervasyonu herhangi bir ücret ödemeden iptal etme hakkı doğar. Bu hakkı
    kullanabilmek için misafirin iddiasını ispat eden fotoğrafları Boatsy’ye göndermesi yeterlidir.
    Fotoğrafların gönderilmesi durumunda Boatsy benzer özelliklere sahip bir tekne bulunması noktasında
    misafire yardımcı olur. Eğer tekne bulunamazsa platform aracılığıyla yapılan ödemenin tamamı misafire iade
    edilir.
    <br>
    <br>
    <h5 style="font-family: bold;font-size: 25px">Misafir herhangi bir mücbir sebepten dolayı tekne ile
      açılamaması durumunda ne olur?</h5>
    Misafirin herhangi bir mücbir sebepten dolayı tekne ile açılamaması durumunda, ödenmiş olan rezervasyon
    bedelinden hizmet bedeli düşüldükten sonra kalan tutar kendisine iade edilir. Hizmet bedelini misafire iade
    edip etmemek Boatsy’nin inisiyatifindedir.
    <br>
    <br>
    Eğer mücbir sebep herhangi başka bir tekneyle seyahat edilmesini engellemeyecek türdeyse, bu durumda,
    Boatsy misafir yeni bir tekne bulunması noktasında yardımcı olur. Yeni bir teknenin bulunması durumunda
    daha önceden alınmış olan hizmet bedeli yeni hizmet bedelinden mahsup edilir.
    <br>
    <br>
    <h5 style="font-family: bold;font-size: 25px">Misafir olarak rezervasyonumu iptal edebilir veya değiştirebilir
      miyim?
    </h5>
    Boatsy’de rezervasyon iptal koşullarını düzenleyen 4 paket bulunmaktadır. Detaylı bilgi için İptal
    Politikaları sayfasını ziyaret edebilirsiniz.
    <br>
    <br>
  </div>
</template>

<script>


export default {
  name: "CancellationPolicy",
  components: {},

  data() {
    return {
      items: [],
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
  },
};
</script>
<style scoped>
.support-banner {
  padding: 50px;
  background-size: cover;
  background-color: #ff3547 !important;
}

.support-button {
  padding: 5px;
  border-style: hidden;
  margin: 5px;
  min-width: 150px;
  background-color: white !important;
}

.support-button-active {
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
