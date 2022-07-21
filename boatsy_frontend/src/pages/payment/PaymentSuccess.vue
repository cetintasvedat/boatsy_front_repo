<template>
<html>
<head>
    <script type="application/javascript">
  gtag('event', 'conversion', {
      'send_to': 'AW-413738525/-SBYCN6P2pkDEJ3MpMUB',
      'value': {{amount}},
      'currency': {{currency}},
      'transaction_id': {{reservasionId}}
  });

  gtag('event', 'purchase', {
   'transaction_id': '{{reservasionId}}',
   'currency':  {{currency}},
   'value':  {{amount}},
   user_data: {
      email_address: {{mail}},
      phone_number:  {{phone}},
      address: {
         first_name: {{userName}},
         last_name: '{{userLastname}},
         region: 'tr',
         postal_code: '51379',
         country: 'Turkey',
      },
   },
   items: [{
      item_name: {{boatType}},
      quantity: 1,
      price:{{amount}},
      item_category:  'Boat',
      item_brand :  {{boatType}},
    }],
});
</script>
</head>
<div>
  <div class="col-12 layout d-flex justify-content-center">
      <div class="container success-payment-box" style="margin:auto; color: #fff;">
        <div class="row d-flex justify-content-center">
          <div class="top-content col-12">
            <h5 style="font-size:60px;color:white">{{$t('payment_success_congru')}}</h5>
          </div>
          <div class="top-content col-12">
            <h1 style="font-size:90px;color:white">{{$t('payment_succes_paymentReceived')}}</h1>
          </div>
        </div>
        <div class="bottom row" style="align-items: center;">
          <div class="col-12 col-lg-7">
            <h5 style="color:white">{{$t('payment_succes_bottom row')}}</h5>
          </div>
          <div class="col-12 col-lg-5">
            <button v-on:click="pushBooking">
              
             
            <a style="color: #fff;"> {{$t('payment_succes_view')}} </a></button> 
          </div>
        </div>
      </div>
    </div>
  </div> 
</html>

</template>
<script>
import { mapGetters } from "vuex";
export default {
  
  computed: mapGetters({
    user: "getProfileModel",
  }),
  data() {
    return {
      bookingId:this.$router.history.current.params["bookingId"],
      reservasionId:this.$router.history.current.params["reservasionId"],
      amount:this.$router.history.current.params["amount"],
      currency:this.$router.history.current.params["currency"],
      mail:this.$router.history.current.params["mail"],
      phone:this.$router.history.current.params["phone"],
      userName:this.$router.history.current.params["userName"],
      userLastname:this.$router.history.current.params["userLastname"],
      boatType:this.$router.history.current.params["boatType"],
    };
  },
  methods: {
    pushBooking(){
      if(this.user.id>0){
      this.$router.push({
          name: "BookingDetail",
          params: {
            bookId: this.bookingId,
          },
        });}
        else{
            this.$modal.show('signIn-modal');
        }
    },
  },
  async created() {
  },

};
</script>
<style scoped>
  .layout { min-height: 100vh; background-image:
      url('/assets/images/succes-payment.jpg'); background-size: cover; }
      .success-payment-box .bottom .row{
        flex-wrap: nowrap;
        justify-content: space-between;
      }
      .success-payment-box button{
        padding: 15px 20px;
        background: red;
        text-align: center;
        border: none;
        display: flex;
      }
      @media (min-width: 990px) {
        .top-content{
          text-align: center;
        }
        .bottom a{
          font-size: 24px;
        }
      }
      @media (min-width: 700px) {
         * { font-size: 40px; }
      }
      input[type="text"] { font-size: 50px; } body {
      margin: 0; }
</style>
