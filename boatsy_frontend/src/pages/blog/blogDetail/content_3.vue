<template>
  <div class="about-page">
    <div class="about-header">
      <div></div>
    </div>
    <div class="about-container" style="border-radius: 15px; padding: 50px">
      <div class="row" style="align-items: center">
        <div style="color: black" class="captain-app-header col-9">
          <h1 style="color: black" class="about-title-header">
            Tekne Tatiline Hazırlanırken Yapmanız Gerekenler
          </h1>
        </div>
        <div
          class="col-3 boat-horizontal-content"
          style="padding-right: 0px; padding-left: 0px"
        >
          <figure class="boat-card-image" style="margin: 0px !important">
            <div tabindex="0" class="" style="margin: -30px">
              <div
                class="flickity-viewport"
                style="height: 250px; width: 250px"
              >
                <div
                  class="flickity-slider"
                  style="left: 0px; transform: translateX(0%)"
                >
                  <img
                    src="https://boatsy.net/img/tekne-hazirlik.jpeg"
                    class="carousel-cell boat-card-image is-selected"
                    style="
                      position: absolute;
                      left: 0px;
                      transform: translateX(0%);
                      height: 100%;
                    "
                  />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>

    <div style="margin-top: 50px">
      <p>
        Bütün yıl çalıştınız ve mavi özgürlüğün hayaliyle kışı geçirdiniz. Tekne
        kiralamaya karar verdiniz fakat sizi bekleyen bu eşsiz deneyime nasıl
        hazırlıklı olmanız gerektiğinden emin değilsiniz. Sonuçta, bir tekne
        tatili için fazladan ya da eksik hazırlıkla gitme yükünü almak
        istemezsiniz.
      </p>
      <br />
      <p>
        Tekne tatili eşsiz bir deneyim olmasına karşın, hazırlıklı olmak size
        kusursuz bir tatil yaratmakta ilk adımdır.
      </p>
      <br />

      <div>
        <h4 style="font-weight: 700">1- Yanınıza çok eşya almayın.</h4>
        <p>
          Tekne tatillerinde konaklama yeriniz kamaralardır ve buralarda alanlar
          otel odalarından daha sınırlıdır. Kocaman bavullar yerine ufak bir
          bavula gerçekten ihtiyacınız olacak kadar eşyalarla yola çıkın. Hızlı
          kuruyan; birkaç kez giymekte sakınca görmeyeceğiniz kıyafetler, parmak
          arası terlikleriniz ve ekstradan birkaç mayo almanız önerimizdir.
        </p>
        <br />
        <h4 style="font-weight: 700">
          2- Güneş gözlüğünüz ve güneş kreminizi unutmayın.
        </h4>
        <p>
          Güneşin, birçok faydasının yanında bir o kadar yan etkisi de olduğunu
          artık hepimiz biliyoruz. Gölgeli birçok kısmı olsa da tekneler, D
          vitaminine doyacağınız yegane yerlerdendir. Hem gözlerinizi hem de
          cildinizi güneşin zararlı etkilerinden koruyup, maksimum faydayı
          alabilmeniz için güneş gözlüğünüz ve yeterli güneş kremini mutlaka
          yanınızda bulundurun.
        </p>
        <br />
        <h4 style="font-weight: 700">
          3- Şnorkel ve deniz gözlüğünüz mutlaka olsun.
        </h4>
        <p>
          Özellikle Türkiye’mizin turkuaz suları, içinde görülmeye değer birçok
          güzellik barındırıyor. Bu güzellikleri görebilmek için bir dalış
          gezisine gitmeseniz de huzurlu bir gezi sırasında da şnorkel ve deniz
          gözlüğünüzle bu turkuaz sularda yaşayacağınız deneyimin unutulmaz
          güzelliklerle süsleneceğine eminiz. Tekneler genellikle şnorkel ve
          deniz gözlüğü bulundurur fakat kendinize ait bir gözlük ve şnorkeliniz
          olması çok daha konforludur.
        </p>
        <br />

        <h4 style="font-weight: 700">4- Hazırlıklı olun.</h4>
        <p>
          Tatiliniz sırasında istediğiniz zaman karaya çıkma şansınız olsa da
          sürekli karada gibi market ve eczanelere ulaşımınız olmayacağını
          unutmayın. Düzenli kullanmanız gereken bir ilacınız varsa mutlaka
          yanınıza alın. Denizin rüzgardan dolayı sizi tutma ihtimaline karşı
          önleminizi alın. Ve denizin içinde olsanız bile su içmeyi unutmayın.
        </p>
        <br />
        <h4 style="font-weight: 700">5- Eğlenmeye vakit ayırın.</h4>
        <p>
          Tekne tatilinin çok huzurlu, kalabalıklardan uzak bir tatil seçeneği
          olduğunun farkındayız. Hepimizin de uzun bir yıl sonunda ihtiyaç
          duyduğu her şeyi karşılayacak bir deneyim. Fakat, bu kadar huzurun
          yanına, eğlenceyi eklemeyi unutmayın!
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
p {
  font-size: 15px;
}
.about-page-font {
  font-size: 10px;
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
  background-color: #c7e9f6;
}
.captain-app-col {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 60%;
  padding-right: 50px;
}
.about-page {
  margin: 0px 10%;
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