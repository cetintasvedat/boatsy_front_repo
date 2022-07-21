<template>
  <div>
    <div class="modal-header">
      <h4>{{$t('create_account_boatsy')}}</h4>
      <i class="fas fa-times" @click="hide('signIn-modal')"></i>
    </div>
    <div class="modal-body" style="max-height: 500px">
      <div class="signup-content">
        <div v-if="error != null" class="errordiv">
          <i
            class="fas fa-exclamation-circle"
            style="color: #c13515; font-size: 64px"
          ></i>
          <div class="errordivrigth">
            <div style="font-weight: 700">{{$t('create_account_error')}}</div>
            <div>{{ $t(error) }}</div>
          </div>
        </div>
        <input type="text" placeholder="E-Mail Adresi" v-model="loginEmail" />
      </div>
      <div class="signup-content">
        <input type="password" placeholder="Şifre" v-model="loginPassword" />
      </div>

      <div
        class="signup-content"
        @click="onSubmit()"
        style="
          background: red;
          justify-content: center;
          align-items: center;
          display: flex;
          padding: 0;
          border-radius: 7px;
          min-height: 65px;
        "
      >
        <input type="button" v-if="!loading" class="signup-button" :value="$t('footers_sıgn_ın')" />
        <img v-if="loading" src="/assets/images/loading.gif" style="width: 50px" />
      </div>
      <!--
      <div class="social-accounts">
        <div class="signup-content">
          <button class="signup-facebook-button">
            <i class="fab fa-facebook"></i>Facebook ile Devam Et
          </button>
        </div>
        <div class="signup-content">
          <button class="signup-facebook-button">
            <i class="fab fa-google"></i>Google ile Devam Et
          </button>
        </div>
      </div>
      -->
      <div class="signup-content" style="margin-top: 20px">
        <span>{{$t('login_card_signup-content')}} <a @click="singup()">{{$t('header_register')}}</a></span>
      </div>
      <div class="signup-content">
        <span
          >{{$t('login_card_forget_pas')}}
          <a href="/forgetpassword" @click=" hide('signIn-modal')" class="new-password">{{$t('login_card_new-password')}}</a></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { LOGIN } from "../store/actions.type";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginPassword: "",
      loginEmail: "",
      error: null,
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getProfileModel"]),
  },

  methods: {
    singup() {
      this.hide("signIn-modal");
      this.show("signUp-modal");
    },
    show(ModalName) {
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
    async onSubmit() {
      this.loading = true;
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (this.loginEmail == "" && this.password == "") {
        this.error = "Lütfen tüm alanları doldurun";
      } else if (this.loginEmail == "") {
        this.error = "E-posta alanı boş bırakılamaz";
      } else if (this.password == "") {
        this.error = "Şifre alanı boş bırakılamaz";
      } else if (!emailPattern.test(this.loginEmail)) {
        this.error = "Bu e-posta hatalı. Başka e-posta kullanmayı deneyin";
      } else if (this.loginPassword.length < 8) {
        this.error = "Bu şifre hatalı. şifre en az 8 karakter olmalıdır";
      } else {
        var data = await this.$store.dispatch("login", {
          password: this.loginPassword,
          username: this.loginEmail,
          fn: function (payload) {
            payload.this = this;
            this.$store.commit("addMessageforSocket", payload);
          }.bind(this),
        });
        if (!data.error) {

          this.$modal.hide("signIn-modal");
          if(this.getProfileModel.userGroupId == 3) {
            window.location.href = "/cms";
          }
          if (this.getProfileModel.phoneVerify == 1) {
            var data = await this.$store.dispatch("send_verify");
            this.$modal.show("activasyon");
          }
        } else {
          this.error = data.message;
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>

.new-password {
  color: #325aa8;
}
.errordiv {
  border: 1px solid red;
  background-color: var(--f-mkcy-f);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.errordivrigth {
  margin-left: 10px;
  text-align: start;
}
</style>
