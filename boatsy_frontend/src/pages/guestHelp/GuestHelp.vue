<template>
  <div class="container guest-help" style="max-height:100%;">
    <div class="row guest-help-one" style="padding:10px;color:#333;">
      <div class="col-md-6">
        <h4 class="work-title">Misafirler</h4>
        <h5 class="work-titles">
          Boatsy, tekne sahibi ve kaptanları, tekne kiralamak isteyen misafirler
          ile buluşturan bir tekne kiralama platformudur. Boatsy’nin amacı,
          tekne tatilini siz seyahat severler için daha kolay, ulaşılabilir ve
          daha güvenli hale getirmektir. Bu bölümde misafirlere dair tüm
          ayrıntılara ulaşabilirsiniz.
        </h5>
      </div>
      <div class="col-md-6 " style="text-align: center;">
        <img
          class="howboatsywork-image-1"
          src="/assets/images/illustrationiki.png"
          width="500px"
          style="margin-top:20px;"
        />
      </div>
    </div>

    <hr class="solid" />
    <h5 class="guest-help-footer-title" style="margin-top:48px">
      Popüler makaleler
    </h5>
    <div class="row guest-help-one-row" style="padding:20px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Tekne sahipleri ile iletişim kurabilir miyim?
          </h5>
          <h5>
            Tekne sahibinin, misafirin gönderdiği rezervasyon talebini
            onaylaması durumunda misafir..
          </h5>
          <a @click="show('boat-communication-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Kullanıcı hesabı nasıl açılır?
          </h5>
          <h5>
            Boasty web sitesi ya da Boatsy mobil uygulaması üzerinden e-posta
            veya sosyal medya hesabınız..
          </h5>
          <a @click="show('boat-user-account-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Mürettebat detaylarını nasıl öğrenirim?
          </h5>
          <h5>
            Misafir, mürettebat ile ilgili detaylı bilgi edinmek ve ek
            mürettebat talep etmek için tekne sahibi ile iletişim kurabilir.
          </h5>
          <a @click="show('crew-detail-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="row guest-help-two-row" style="padding:20px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Tekneye evcil hayvan getirmek serbest mi?
          </h5>
          <h5>
            Teknede evcil hayvan serbestliği tekne sahibinin insiyatifinde olan
            bir durumdur.
          </h5>
          <a @click="show('boat-pet-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Temizlik için ayrı bir ücret ödemem gerekiyor mu?
          </h5>
          <h5>
            Temizlik ücretinin ödenmesi durumu tekneden tekneye değişkenlik
            göstermektedir.
          </h5>
          <a @click="show('boat-clean-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Tekne sahibi tarafından istenen depozito nedir?
          </h5>
          <h5>
            Kiralama kaptansız yapılıyorsa, tekne sahibinin olası bir kaza
            durumuna karşı talep ettiği ücrete depozito denir.
          </h5>
          <a @click="show('boat-deposit-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="row guest-help-three-row" style="padding:20px; margin-bottom: 48px;">
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Misafirin herhangi bir mücbir sebepten dolayı tekne ile açılamaması
            durumunda ne olur?
          </h5>
          <h5>
            Bir Misafirin mücbir sebepten dolayı denize açılamaması durumu ile
            ilgili olarak, Tekne Sahibi, misafirlere genel bir kural olarak şu 3
            opsiyondan birini sunar:
          </h5>
          <a @click="show('option-guest-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div class="row">
          <h5 class="guest-help">
            Yemek konusunda opsiyonlarım nelerdir?
          </h5>
          <h5>
            Rezervasyon sürecinden yemek ile ilgili 2 opsiyon sunulmaktadır:
          </h5>
          <a @click="show('meal-option-modal')">
            <a class="guesthelp-continue">
              Devamını okuyun
            </a>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <modal name="boat-communication-modal" :height="300">
      <BoatOwnerCommunication></BoatOwnerCommunication>
    </modal>
    <modal name="boat-user-account-modal" :height="300">
      <BoatUserAccount></BoatUserAccount>
    </modal>
    <modal name="crew-detail-modal" :height="450">
      <CrewDetail></CrewDetail>
    </modal>
    <modal name="boat-pet-modal" :height="250">
      <BoatPet></BoatPet>
    </modal>
    <modal name="boat-clean-modal" :height="400">
      <BoatClean></BoatClean>
    </modal>
    <modal name="boat-deposit-modal" :height="400">
      <BoatDeposit></BoatDeposit>
    </modal>
    <modal name="option-guest-modal" :height="500">
      <OptionGuest></OptionGuest>
    </modal>
    <modal name="meal-option-modal" :height="500">
      <MealOption></MealOption>
    </modal>
  </div>
</template>
<script>
import BoatOwnerCommunication from './components/BoatOwnerCommunication.vue'
import BoatUserAccount from './components/BoatUserAccount.vue'
import CrewDetail from './components/CrewDetail.vue'
import BoatPet from './components/BoatPet.vue'
import BoatCleanFee from './components/BoatCleanFee.vue'
import BoatDeposit from './components/BoatDeposit.vue'
import OptionGuest from './components/OptionGuest.vue'
import MealOption from './components/MealOption.vue'

export default {
  components: {
    BoatOwnerCommunication,
    BoatUserAccount,
    CrewDetail,
    BoatPet,
    BoatCleanFee,
    BoatDeposit,
    OptionGuest,
    MealOption
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
.guest-help-one {
  margin-top: 50px;
}
.guesthelp-continue {
  color: #333 !important;
  font-size: 15px;
}
.guesthelp:hover {
  text-decoration: underline;
}
.guest-help-footer-title {
  font-weight: bold;
  font-size: 25px;
  margin-left: 5px;
  color: #333;
}
.guest-help {
  font-weight: bold;
  text-align: left;
  margin-top: 15px;
}
.guesthelp {
  text-align: left;
}
.guesthelp-title {
  margin-top: 150px;
  text-align: left;
  font-weight: bold;
}
</style>
