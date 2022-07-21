<template>
  <div class="forget-page col-12 layout d-flex justify-content-center" v-if="!loadingButton">
    <div class="container forget-password-box" style="z-index: 2">
      <div class="row">
        <div class="left-content">
          <h1 style="color: #fff">{{$t('forgot_password_pass')}}</h1>
          <div v-if="isEmail">
            <h5 style="color: #fff">{{$t('forgot_password_email')}}</h5>
            <input v-model="email" type="email" pattern=".+@globex\.com" size="30" @keypress="errorMessage = false">
            <div
              v-if="errorMessage"
              class="invalid-feedback"
              style="margin-top:10px;"
            >
              <span>{{$t('forgot_password_error')}}</span>
            </div>
          </div>
          <div v-if="!isEmail">
            <h5 style="color: #fff">{{$t('forgot_password_Phone')}}</h5>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend" style="border: 3px; background: #fff;">+90</span>
              </div>
              <input v-model="phoneNumber" @keypress="phoneNumberMask" style="border-radius: 0 8px 8px 0;"/>
            </div>
            <div
              v-if="errorMessage"
              class="invalid-feedback"
              style="margin-top:10px;"
            >
              <span>{{$t('forgot_password_error')}}</span>
            </div>
            <h5
              style="color: #fff; margin-top: 10px; cursor: pointer"
              @click="isEmail = true"
              class="change-text"
            >
              {{$t('forgot_password_changeEmail')}}
            </h5>
          </div>
        </div>
        <div class="right-content">
          <button v-on:click="postService()">{{$t('forgot_password_send')}} <i class="fas fa-share"></i></button>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-else style="min-height:100vh;">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import httpClient from "../../services/basic/httpClient";
import { mapGetters } from "vuex";
import { FORGET_PASSWORD } from "../../store/actions.type.js";

export default {
  name: "ForgetPassword",
  components: {},

  data() {
    return {
      isEmail: true,
      httpClient: httpClient,
      email: "",
      phoneNumber: "",
      loadingButton: false,
      errorMessage: false,
    };
  },
  methods: {
    validateInput() {
      if(this.isEmail) {
         return this.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       );
      }
      else{
        return this.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
      }
     
    },
    async postService() {
      if(this.validateInput() != null) {
        this.loadingButton = true;
        var data = [];
        this.isEmail
          ? (data = { email: this.email })
          : (data = { phone: "90"+ this.phoneNumber.replace("(", "").replace(")","").replace(/\s+/g,"") });
        var res = await this.$store.dispatch(FORGET_PASSWORD, data);
        
        if(res.error) { 
          this.$router.push({path: '/forgetpassworderror' })
        }
        else{
          this.$router.push({path: '/forgetpasswordsuccess' })
        }
      }
      else{
        this.errorMessage = true
      }
    },
    phoneNumberMask(e) {
      this.errorMessage = false;
      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' ' + x[3] : ' ');
    }
  },

};
</script>
<style scoped>
.invalid-feedback span{
  background: rgb(255 0 0 / 46%);
  color:#fff;
  padding:5px 10px;
}
.layout {
  min-height: 100vh;
  background-image: url(/assets/images/forgat-password.jpg);
  background-size: cover;
}
.forget-password-box {
  margin: auto;
  color: #fff;
  text-align: start;
}
.forget-password-box input {
  height: 50px;
  border-radius: 8px;
  width: 325px;
  border: 3px solid #fff;
  background: #d3cfcf47;
  color: #ffff;
  font-size: 24px;
  padding-left: 10px;
}
.forget-password-box .row {
  justify-content: space-between;
  align-items: center;
  gap: 2em;
}
.change-text:hover {
  text-decoration: underline;
}
.right-content button {
  padding: 10px 20px;
  background: red;
  color: #fff;
  font-size: 16px;
  border: none;
}
.forget-page:before {
  content: "";
  min-width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  background: rgb(0 0 0 / 16%);
  position: absolute;
  z-index: 1;
}
@media (min-width: 990px) {
  .forget-password-box h1 {
    font-size: 4.5rem;
  }
  .forget-password-box h5 {
    font-size: 2.5rem;
  }
  .right-content button {
    font-size: 24px;
  }
}
@media (max-width: 990px) {
  .right-content {
    margin-top: 20px;
  }
  .forget-password-box .row {
    width: 100%;
  }
}
</style>
