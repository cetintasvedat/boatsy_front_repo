<template>
  <div class="row-height">
    <h1 class="container boat-card-map-title"></h1>
    <div
      id="card_92"
      class="container"
      style="padding: 20px 0px; border-top: 1px solid rgb(221, 221, 221)"
    >
      <router-link v-for="item in itemList" :to="'/blogs/' + item.rooutePath">
        <div class="row">
          <div
            id="list_sidebar"
            class="container boat-card-horizontal"
            style="padding: 0px"
          >
            <a
              ><div
                class="row"
                style="width: 100%; padding: 20px 0px; margin: 0px"
              >
                <div
                  class="col-5 boat-horizontal-content"
                  style="padding-right: 0px; padding-left: 0px"
                >
                  <figure
                    class="boat-card-image"
                    style="margin: 0px !important"
                  >
                    <div
                      class="boat-card flickity-enabled is-draggable"
                      tabindex="0"
                    >
                      <div
                        class="flickity-viewport"
                        style="height: 200px; touch-action: pan-y"
                      >
                        <div
                          class="flickity-slider"
                          style="left: 0px; transform: translateX(0%)"
                        >
                          <img
                            :src="'https://boatsy.net/img/' + item.imgName"
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
                <div
                  class="col-7 boat-horizontal-content"
                  style="
                    flex-direction: column;
                    display: flex;
                    justify-content: space-between;
                    padding-right: 0px !important;
                  "
                >
                  <div class="card-horizontal">
                    <div style="text-align: start">
                      <h2 class="horizontal-boat-city" style="margin-top: 5px">
                        {{ item.header }}
                      </h2>
                      <p style="margin-top: 5px">
                        {{ item.content }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="boat-card-horizontal-comment"
                    style="
                      justify-content: space-between;
                      display: flex;
                      flex-wrap: wrap;
                    "
                  >
                    <div class="card-score"></div>
                    <div class="horizontal-price">
                      <div class="horizontal-card-price">
                        <strong
                          ><i class="fas fa-eye"></i>
                          {{ item.showCount }}</strong
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div></a
            >
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemList: [
        {
          rooutePath: "ilk-kez-tekne-tatiline-cikacaklara-tavsiyeler",
          header: "İlk Kez Tekne Tatiline Çıkacaklara Tavsiyeler",
          content:
            "Yıllardır tekne tatilini merak ediyorum ama işe nereden başlayacağımı bilmiyorum diyenlerden misiniz? Berrak denizlerin ve yeşilin birleşimine şahit olduğunuz, huzurlu ve bir kadar da keyifli bir tatil geçirmek istiyorsanız mavi yolculuk sizin için en iyi alternatiflerden biri olacaktır.",
          showCount: 374,
          imgName: "pexels-tatiana-twinslol-5368730.jpeg",
        },
        {
          rooutePath: "baharda-boatsy-ile-tekne-kirala",
          header:
            "Baharda Boatsy ile Tekne Kirala, Yaz Tatilin Erken Başlasın!",
          content:
            "Tatil sezonu başlayıp koylar insanla dolmadan önce, maviturunuza eklediğiniz koyların sakinliği ve temizliği ilekarşılaştığınızda şok olacaksınız.İnsansız geçen birkaçaydan sonra doğanın yenileyiciliğiyle tertemiz olmuşkoylar, sakinlikleri ve huzuruyla kafa dinlemekisteyenlere ideal bir deneyim sunuyor.",
          showCount: 1244,
          imgName: "baharda.jpeg",
        },
        {
          rooutePath: "tekne-tatiline-hazirlanirken-yapmaniz-gerekenler",
          header: "Tekne Tatiline Hazırlanırken Yapmanız Gerekenler",
          content:
            "Bütün yıl çalıştınız ve mavi özgürlüğün hayaliyle kışı geçirdiniz. Tekne kiralamaya karar verdiniz fakat sizi bekleyen bu eşsiz deneyime nasıl hazırlıklı olmanız gerektiğinden emin değilsiniz. Sonuçta, bir tekne tatili için fazladan ya da eksik hazırlıkla gitme yükünü almak istemezsiniz.",
          showCount: 2826,
          imgName: "tekne-hazirlik.jpeg",
        },
        {
          rooutePath: "tekne-kiralamanin-satin-almaktan-daha-iyi-olmasi",
          header:
            "Tekne Kiralamanın Satın Almaktan Daha İyi Olmasının 6 Sebebi",
          content:
            "Bir çok ihtiyacımızı karşılamak için artık telefon uygulamalarını kullanıyoruz. Buna tatil ihtiyaçlarımız da dahil. Örneğin, arabaya mı ihtiyacınız var? Binlerce değilse de yüzlerce seçenek mevcut. Otel rezervasyonu? Hiç sorun değil. Koy koy gezecek bir tekne mi istiyorsunuz? Nereden, nasıl, ne yapmak gerektiği noktasında biraz eksik kalmış durumdayız. Artık bu durum değişiyor.",
          showCount: 2426,
          imgName: "tekne-kira.jpeg",
        },
        {
          rooutePath: "tekne-kiralamadan-once-bilmeniz-gereken-ipuclari",
          header:
            "Tekne Kiralamadan Önce Bilmeniz Gereken İpuçları – Başlangıç Seviye Mavi Yolculuk",
          content:
            "Tekne sahibi olmamanız su üzerinde keyif dolu bir deneyim yaşamanıza engel değil. Tekne kiralamak, tekne sahibi olmanın maddi yükümlülüğü olmadan tekne tatilinin tadına varabileceğiniz en mükemmel seçenek. Biz de, tekne tatiline hazırlanmadan önce bilmeniz gereken bazı noktalar var. Bu yüzden tekne kiralayarak tekne tatiline çıkmadan önce ipuçlarını sizler için derledik.",

          showCount: 2181,
          imgName: "bilmeniz-gerekenler.jpeg",
        },
        {
          rooutePath: "teknenizi-kiraya-vermek-icin-hazirliklar",
          header:
            "Teknenizi Kiraya Vermek için Hazırlıklar",
          content:
            "Açık denizde olmak gibisi yok… Finansal olarak da bunu kaldırabildiğimiz sürece tabii. Tekne sahibi olmanın zevki ciddi bir maddi yükümlülüğü de beraberinde getiriyor, farkındayız.Nadiren de kullansanız, ki ülkemizde çoğu tekne sahibi teknesini her zaman kullanamıyor, tekneler oldukça masraflı olabiliyor. Sigorta, bakım, sudan çıkarma, suya indirme ve daha birçok masraf gerektiren kaleme sahip teknelerimizi nasıl değerlendirebiliriz? ",
          showCount: 1592,
          imgName: "tekneni-kirala.jpeg",
        },
      ],
    };
  },
};
</script>