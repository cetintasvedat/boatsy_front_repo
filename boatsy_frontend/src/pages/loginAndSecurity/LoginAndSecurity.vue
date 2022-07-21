<template>
  <div
    class="container login-and-security-page"
    style="margin-top: 120px; text-align: start; min-height: 100vh"
  >
    <div class="row personal-info-page-header">
      <div class="col-12 header-top">
        <span class="loginsecurity-head-title"
          ><router-link to="/account-settings">{{$t('login_security_bill')}}</router-link>
          <i class="fas fa-chevron-right" style="margin: 10px; font-size: 14px"></i>
          {{$t('account_login_security')}}
        </span>
      </div>
      <div class="col-12 header-bottom" style="padding-bottom: 40px">
        <h1 class="loginsecurity-one-title"> {{$t('account_login_security')}}</h1>
      </div>
    </div>
    <div class="row login-and-security-page-body">
      <div class="col-lg-8">
        <div class="col-12 login-and-security-content">
          <div class="input-container">
            <span>{{$t('login_security_new_pass')}}</span>
            <input type="password" class="form-control" v-model="newPassword" />
          </div>
          <hr class="logandsecurity-solid" solid />

          <div class="input-container">
            <span>{{$t('login_security_reNewPassword')}}</span>
            <input type="password" class="form-control" v-model="reNewPassword" />
          </div>
          <hr class="logandsecurity-solid" solid />

          <div v-if="error != null" class="errordiv">
            <i class="fas fa-lock" style="color: #c13515; font-size: 44px"></i>
            <div class="errordivrigth">
              <div>{{ error }}</div>
            </div>
          </div>
          <div class="confirm-button">
            <div
              class="signup-content signup-button"
              @click="changePassword()"
              style="
                justify-content: center;
                align-items: center;
                display: flex;
                padding: 0;
                min-height: 65px;
              "
            >
              <img v-if="loading" src="/assets/images/loading.gif" style="width: 50px" />

              <input
                v-if="!loading"
                style="
                  padding: 12px;
                  font-size: 15px;
                  width: 100%;
                  letter-spacing: 1px;
                  border-radius: 0.5rem;
                  background-color: #ef4036;
                  color: white;
                  border: transparent;
                  font-weight: bold;
                "
                type="button"
                class="signup-button"
                :value="$t('signup-button')"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="container personal-info-detail" style="width: 350px">
          <div class="wrapper personal-info-detail-style">
            <div class="row">
              <i
                class="fas fa-fingerprint"
                style="font-size: 28px; padding: 10px; color: #ef4036"
              ></i>
            </div>
            <div class="row">
              <h2
                class="personal-info-detail-title"
                style="font-weight: bold; font-size: 17px; margin-top: 10px"
              >
                {{$t('login_security_info-detail-title')}}
              </h2>
              <h2 style="font-size:1rem">
               {{$t('login_security_info-detail-title2')}}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CHANGE_PASSWORD, OUT } from "../../store/actions.type.js";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      error: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getChangePassword"]),
  },

  methods: {
    async changePassword() {
      if (this.newPassword != this.reNewPassword) {
        this.error = "Parolalar uyuşmuyor.";
      } else if (this.newPassword.length < 8) {
        this.error = "Bu şifre hatalı. şifre en az 8 karakter olmalıdır.";
      } else {
        if (!this.loading) {
          this.loading = true;
          var data = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            reNewPassword: this.reNewPassword,
          };
          var result = await this.$store.dispatch(CHANGE_PASSWORD, data);
          if (!result.error) {
            this.$toast.success(
              "Şifreniz başarı ile değiştirildi, yönlendiriliyorsunuz.",
              {
                icon: "far fa-check-circle",
                timeout: 2500,
              }
            );
            var email = JSON.parse(localStorage.getItem("profileModel")).email;
            await this.$store.dispatch(OUT);
            await this.$store.dispatch("login", {
              password: this.newPassword,
              username: email,
            });
            this.loading = false;
            this.$router.push({
              path: "/account-settings",
            });
          } else {
            this.loading = false;
          }

        }
      }
    },
  },
};
</script>

<style>
.header-top .loginsecurity-head-title {
  font-size: 16px;
  font-weight: 200;
  margin-left: 10px;
}
.loginsecurity-one-title {
  font-weight: bold;
  font-size: 25px;
  color: #333;
  margin-left: 8px;
}
.login-and-security-button {
  padding: 12px;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 0.5rem;
  background-color: #ef4036;
  color: white;
  border: transparent;
  font-weight: bold;
}
.login-and-security-button:hover {
  background-color: gray;
}
.logandsecurity-solid {
  margin-top: -25px;
  margin-left: 10px;
}
.login-and-security-style {
  width: 300px;
  text-align: left;
  margin: 20px;
}
.login-and-security-detail {
  padding: 10px;
  border: 1px solid silver;
  margin: 20px;
  width: 500px;
  border-radius: 0.5rem;
}
.login-and-security-content {
  display: grid;
  gap: 2em;
  padding-bottom: 4em;
}
.login-and-security-page .form-control {
  padding: 0 10px;
  max-width: 600px;
  border-color: white;
}
.login-and-security-page-body {
  width: 75%;
}
@media (max-width: 700px) {
  .login-and-security-page-body {
    width: 100%;
  }
}
</style>
