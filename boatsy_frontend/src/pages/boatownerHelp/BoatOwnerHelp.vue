<template>
  <div class="container boatowner-help" style="max-height:100%;">
    <div class="row owner-help-one" style="padding:10px;color:#333;">
      <div class="col-md-6">
        <h4 class="work-title">Tekne Sahipleri</h4>
        <h5 class="work-titles">
          Teknenizi Boatsy ayrıcalıklarından yararlanarak kiraya vermek ister
          misiniz? Boatsy’de ücretsiz profil oluşturun ve rezervasyon talepleri
          almaya başlayın. Güvenli ödeme yönteminden yararlanarak para kazanmaya
          başlamak sizin elinizde. Bu bölümde tekne kiralamaya dair tüm
          ayrıntılara ulaşabilirsiniz.
        </h5>
      </div>
      <div class="col-md-6" style="text-align:center;">
        <img
          class="howboatsywork-image-1"
          src="/assets/images/illustrationuc.gif"
          width="450px"
          style="margin-top:20px;"
        />
      </div>
    </div>

    <hr class="solid" />
    <h2 class="owner-help-footer-title">
      Popüler makaleler
    </h2>
    <div class="row owner-help-one-row" style="padding:20px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            BoatsyCaptain’da tekne sahibi olarak hesap nasıl açılır?
          </h5>
          <h5>
            BoatsyCaptain uygulamasını, telefonunuzun uygulama mağazasından ya
            da aşağıdaki linklerden uygun olanına tıklayarak indirebilirsiniz.
          </h5>
          <a @click="show('boat-owner-account-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Kiralama bedelini nasıl belirlemelisiniz?
          </h5>
          <h5>
            Boatsy Hizmet Bedeli, tekne sahibinin belirlediği toplam kiralama
            bedelinden %20’si alınarak hesaplanır.
          </h5>
          <a @click="show('renting-price-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Bana ait olmayan teknenin listelemesini yapabilir miyim?
          </h5>
          <h5>
            Boatsy ile tekne sahibi olmasanız da tekne listeleyebilirsiniz.
          </h5>
          <a @click="show('another-boat-list-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="row owner-help-two-row" style="padding:20px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Tekne kiralarken faturalama süreci nasıl yürür?
          </h5>
          <h5>
            Tekne sahibi, misafire rezervasyon anında alınan kapora bedeli
            üzerinden fatura oluşturur.
          </h5>
          <a @click="show('invoice-process-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Rezervasyon esnekliği opsiyonları nelerdir?
          </h5>
          <h5>
            Boatsy, misafirlere rezervasyon esnekliği ile ilgili 3 opsiyon
            sunmaktadır:
          </h5>
          <a @click="show('reservation-flexibility-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Bir rezervasyona ilişkin kazancımı nasıl görebilirim?
          </h5>
          <h5>
            BoatsyCaptain uygulamanızın sağ üst köşesinde bulunan “≡” butonuna
            tıklayarak açılan menüden “Kazanımlarım” ekranını
            görüntüleyebilirsiniz.
          </h5>
          <a @click="show('reservation-earning-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="row owner-help-three-row" style="padding:20px; margin-bottom:48px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Tekne sahibi olarak bir rezervasyonu iptal edebilir miyim?
          </h5>
          <h5>
            Eğer Tekne sahibi olarak onaylanmış bir rezervasyonu iptal
            ederseniz..
          </h5>
          <a @click="show('cancel-reservation-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="boatowner-help">
            Misafirin tekneyi teslim almaması durumunda ne olur?
          </h5>
          <h5>
            Misafir rezervasyonunu iptal etmeden tekneyi teslim almadığı
            takdirde
          </h5>
          <a @click="show('guest-delivery-modal')">
            <a class="owner-help-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <modal name="boat-owner-account-modal" :height="450">
      <BoatOwnerAccount></BoatOwnerAccount>
    </modal>
    <modal name="renting-price-modal" :height="300">
      <RentingPrice></RentingPrice>
    </modal>
    <modal name="another-boat-list-modal" :height="300">
      <AnotherBoatList></AnotherBoatList>
    </modal>
    <modal name="invoice-process-modal" :height="300">
      <InvoiceProcess></InvoiceProcess>
    </modal>
    <modal name="reservation-flexibility-modal" :height="500">
      <ReservationFlexibility></Reservationflexibility>
    </modal>
    <modal name="reservation-earning-modal" :height="300">
      <ReservationEarning></ReservationEarning>
    </modal>
    <modal name="cancel-reservation-modal" :height="500">
      <CancelReservation></CancelReservation>
    </modal>
    <modal name="guest-delivery-modal" :height="370">
      <GuestDelivery></GuestDelivery>
    </modal>
  </div>
</template>

<script>
import BoatOwnerAccount from './components/BoatOwnerAccount.vue'
import RentingPrice from './components/RentingPrice.vue'
import AnotherBoatList from './components/AnotherBoatList.vue'
import InvoiceProcess from './components/InvoiceProcess.vue'
import ReservationFlexibility from './components/ReservationFlexibility.vue'
import ReservationEarning from './components/ReservationEarning.vue'
import CancelReservation from './components/CancelReservation.vue'
import GuestDelivery from './components/GuestDelivery.vue'

export default {
  methods: {
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
  },
  components: {
    BoatOwnerAccount,
    RentingPrice,
    AnotherBoatList,
    InvoiceProcess,
    ReservationFlexibility,
    ReservationEarning,
    CancelReservation,
    GuestDelivery
  }
};
</script>

<style>
.owner-help-continue {
  color: #333 !important;
  font-size: 15px;
}
.owner-help-footer-title {
  font-weight: bold;
  font-size: 25px;
  margin-left: 5px;
  color: #333;
  margin-top: 48px;
}
.boatowner-help {
  font-weight: bold;
  text-align: left;
  margin-top: 15px;
}
.boatownerhelp {
  text-align: left;
}
.boatowner-title {
  margin-top: 100px;
  text-align: left;
  font-weight: bold;
}
</style>
