<template>
  <div class="about-page">
    <div class="about-header">
      <div>
        <h2 s>Hakkımızda</h2>
      </div>
    </div>
    <div
      class="about-container container row"
      style="border-radius:15px; display: flex; gap: 1.5em;
            padding: 0;
            margin: 0;
            flex-wrap: nowrap;"
    >
      <div
        class="col-12 col-md-6 about-container-image"
        style="width:100%; padding:0; display: flex; "
      >
        <img
          src="img/boatsyapp(1).png"
          style="width:100%; border-radius:15px;"
        />
      </div>
      <div
        class="col-12 col-md-6 captain-app-col"
        style="background-color: #c7e9f6; border-radius:15px;"
      >
        <div class="about-page-font">
          Boatsy, tekne kiralamayı gelişmiş teknolojiyle oldukça hızlı ve
          güvenilir hale getiren bir pazar yeri hizmetidir.
        </div>
        <br />
        <div class="about-page-font">
          Boatsy, tekne kiralama sektöründe gelişmiş teknoloji kullanarak üstün
          hizmet deneyimi sunmayı hedefler. Boatsy, tekne sahipleri ile tekne
          kiralamak isteyen misafirleri saniyeler içinde bir araya getirmeyi
          amaçlamaktadır.
        </div>
      </div>
    </div>

    <div style="margin-top: 50px">
      <div>
        <h2 style="font-weight: 500">Vizyonumuz</h2>
        <p style="font-size: 20px; margin-bottom: 50px;">
          Gelişmiş teknoloji sayesinde global bir marka haline gelerek öncü bir
          pazar yeri olmak, kullanıcılarımızın en iyi deneyimlerini sağlamada
          lider olmak.
        </p>
      </div>
      <div>
        <h2 style="font-weight: 500">Misyonumuz</h2>

        <p style="font-size: 20px; margin-bottom: 50px;">
          Deniz tutkunlarının tekne yolculuğuna çıkmasını daha erişebilir kılmak
          ve yaygınlaştırmak. Deniz yolculuğunun, etkinliklerinin ve tatilinin
          herkes tarafından en kolay bir şekilde organize edilmesini sağlamak.
          Güvenli ödeme yöntemleri ve yeni çözümlerle entegreli hizmet ağı ile
          sektörde otomasyonu geliştirmek.
        </p>
      </div>
    </div>

    <div class="">
      <h2>Hikayemiz</h2>
      <div class="">
        <p class="about-page-font" style="font-size:20px; margin-bottom: 50px;">
          Tekne kiralamak isteyen misafirler ile tekne sahiplerini tek bir
          dokunuşla bir araya getiren Boatsy, gelişmiş teknolojiyi trendlere
          uygulamaktadır. 2022 yılında Gazi Teknopark’ta kurulan Boatsy; mavi
          yolculuk tutkunlarına benzersiz bir hizmet deneyimi sunmaktadır.<br /><br />Tekne
          tatilinin daha erişilebilir olması, lokasyona bağlı eşitsizliğin
          azaltılması ve taraflar arası memnuniyetin artırılması için Boatsy’i
          geliştirmeye devam ediyoruz. olması, lokasyona bağlı eşitsizliğin
          azaltılması ve taraflar arası memnuniyetin artırılması için Boatsy’i
          geliştirmeye devam ediyoruz.
        </p>
      </div>
      <div class="">
        <img src="img/about.png" style="width: 100%; border-radius: 15px;" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.about-container-image{

}
.about-page-font {
  font-size: 20px;
}
.about-header {
  margin: 100px 0px 50px 0px;
  /* color: black; */
  background: white;
}
.about-title {
}
.about-container {
  background-position: center;
  background-size: cover;
  position: relative;
}
.captain-app-col {
  padding-top: 50px;
  padding-bottom: 50px;
  padding-right: 50px;
}
.about-page {
  margin: 0px 20%;
}

@media (max-width: 768px) {
  .about-container{
    flex-wrap: wrap !important;
  }
}
@media (max-width: 591px) {
  .about-page {
    margin: 0px 5% !important;
  }

  .captain-app-col {
    width: unset !important;
  }

  .about-page-font {
    font-size: 15px !important;
  }
  .about-title-header {
    font-size: 25px;
  }
}
</style>
