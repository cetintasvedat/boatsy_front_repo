<template>
    <div>
        <div class="modal-header">
            <h4>Telefon Numarası</br>
            <span>Doğrulama</span></h4>
            <i class="fas fa-arrow-left" @click="prevModal"></i>
        </div>
        <div class="activation-description">
            <p style="text-align: justify;">Telefonunuza doğrulama kodu gönderilmiştir. Lütfen telefonuza gönderilen doğrulama kodunu {{timerCount}} saniye içinde girin.</p>
        </div>
          <div v-if="error!=null" class="errordiv ">
                       <i class="fas fa-exclamation-circle" style="color:#c13515; font-size:64px"></i>
                       <div  class="errordivrigth">

                        <div style="font-weight: 700;"> Bunu yeniden deneyelim</div>
                         <div>{{error}}</div>
                       </div>  
        </div> 
        <div class="activation-input" @keyup="keyboardread">
            <input type="text" class="code-input" maxLength="1" pattern="[0-9]+" v-model="a1"  >
            <input type="text" class="code-input" maxLength="1" pattern="[0-9]+" v-model="a2" >
            <input type="text" class="code-input" maxLength="1" pattern="[0-9]+" v-model="a3" >
            <input type="text" class="code-input" maxLength="1" pattern="[0-9]+" v-model="a4" >
            <input type="text" class="code-input" maxLength="1" pattern="[0-9]+" v-model="a5" >
        </div>
        
        <div class="modal-bottom-content" style="display: flex; justify-content: space-between; flex-wrap: wrap;">

            <div class="activation-description">
                <p>Doğrulama kodu alamadınız mı?</br>
                <a  class="modal-bottom-text" @click="sendVerify()">Yeniden Gönder</a></p>
                <a href="" class="modal-bottom-text">Yardım Alın</a></p>
            </div>
            <div class="continue-button" style="padding:15px;">
                <button   class="modal-bottom-button" @click="onSubmit()">
                  <img  v-if="loading" src="/assets/images/loading.gif" style="width:50px">
                  <div v-if="!loading">Devam et</div></button>
                
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      allowKeys: ['0','1','2','3','4','6','7','8','9'],
      a1:null,
      a2:null,
      a3:null,
      a4:null,
      a5:null,
      timerCount: 180,
       error:null,
      loading:false,
    };
  },
  created(){
    setInterval(()=>{
      this.timerCount=this.timerCount -1

    },1000)

  },
  methods: {
    async sendVerify(){
     
      var data= await this.$store.dispatch("send_verify",);
       this.timerCount=180;
    },
   async onSubmit(){
    if(this.loading==false){
      this.loading==true;
      var code=(this.a1+this.a2+this.a3+this.a4+this.a5);
       var data= await this.$store.dispatch("verify",code);
       if(data.error){
         this.error="Doğrulama kodu hatalı"
       }
       else{
         this.$modal.hide("activasyon");
       }
       

    }
      
    },
    keyboardread($event){
      this.error=null;
      if(this.allowKeys.includes($event.key)){
        return $event.target.nextElementSibling.focus();
      }
    },
    prevModal() {
      this.$modal.hide('activation-input-modal');
      this.$modal.show('signIn-modal');
    },
    openActivationModal(){
      this.$modal.show('activation-input-modal');
    },
    show(ModalName){
      this.$modal.show(ModalName);
    },
    hide(ModalName) {
      this.$modal.hide(ModalName);
    },
  }
}
</script>
<style>
.code-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.code-input:invalid {
  border: 3px solid red;
  color: red;
}
.activation-input input[type=text]:focus{
  outline:none
}
.activation-input{
  padding: 0 10% 10% 10%;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 1.5em;
}
.modal-header h4{
  text-align: start;
  color: #ef4036;
  font-weight: 600;
}
.modal-header span{
  color: #325aa8;
}
.activation-description{
  text-align: start;
  padding: 16px;
}
.modal-bottom-button{
  padding: 10px 40px;
  border: none;
  border-radius: 12px;
  background: #ef4036;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
.activation-description a{
  color: #325aa8;
  font-weight: 600;
}
@media(max-width:460px){
 .activation-input{
    gap: 0.5em !important;
 }   
}
</style>