<template>
  <div class="container captain-profile" v-if="!loading">
    <modal name="edit-modal" :height="700">
          <div class="modal-dialog" role="document">
      <div class="modal-content " style="ovedrflow:scrol">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Kullanıcı Düzenle
          </h5>
          <button type="button"
            class="close"
           @click="hide('edit-modal')"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row" style="    overflow: scroll;
    height: 400px;">
            <div class="col-md-6">
              <label>Ad</label>
              <input class="form-control"
                type="text"
               v-model="user.name"
                name="name" />
            </div>
            <div class="col-md-6">
              <label>Soyad</label>
              <input class="form-control"
                type="text"
                v-model="user.surname"
                name="surname" />
            </div>
            <div class="col-md-6">
              <label>1. Telefon Numarası</label>
              <input class="form-control"
                type="text"
                v-model="user.phoneNumber"
                name="phoneNumber" />
            </div>
            <div class="col-md-6">
              <label>2. Telefon Numarası</label>
              <input class="form-control"
                type="text"
                v-model="user.phoneTwo"
                name="phoneTwo" />
            </div>
            <div class="col-md-6">
              <label>Email</label>
              <input class="form-control"
                type="text"
                v-model="user.email"
                name="email" />
            </div>
            <div class="col-md-6">
              <label>Doğum Tarihi</label>
              <input class="form-control"
                type="date"
                v-model="user.birthday"
                name="birthday" />
            </div>
            <div class="col-md-6">
              <label>T.C. Numarası</label>
              <input class="form-control"
                type="text"
                v-model="user.identificationNumber"
                name="identificationNumber" />
            </div>
            <div class="col-md-6">
              <label>Vergi Numarası</label>
              <input class="form-control"
                type="text"
                v-model="user.taxNumber"
                name="taxNumber" />
            </div>
            <div class="col-md-6">
              <label>Şirket Adı</label>
              <input class="form-control"
                type="text"
                v-model="user.companyName"
                name="companyName" />
            </div>
            <div class="col-md-6">
              <label>IBAN</label>
              <input class="form-control"
                type="text"
                v-model="user.iban"
                name="iban" />
            </div>
            <div class="col-md-6">
              <label>Kullanıcı Rolü</label>
              <select name="userGroupId" v-model="user.userGroupId"
                class="custom-select">
                 <option  value=1>
                  Tekne Sahibi
                </option>
              
                <option selected value=2>
                  Misafir
                </option>
          
               
              </select>
            </div>
             <div class="col-md-6">
              <label>Kimlik doğrulaması</label>
              <select name="identityVerify" v-model="user.identityVerify"
                class="custom-select">
                <option value=0>
                  Gönderilmedi
                </option>
               
                <option  value=1>
                  Onay Bekliyor
                </option>
            
            
           
            
                <option  value=2>
                  Onaylandı
                </option>
            
                
         
              </select>
            </div>
            <div class="col-md-6">
              <label>Mail doğrulaması</label>
              <select name = "emailVerify" v-model="user.emailVerify"
                class="custom-select">
                <option value=0>
                  Gönderilmedi
                </option>
                <option  value=1>
                  Onay Bekliyor
                </option>
                 <option  value=2>
                  Onaylandı
                </option>
               
              </select>
            </div>

            <div class="col-md-6">
              <label>Telefon doğrulaması</label>
              <select name = "phoneVerify" v-model="user.phoneVerify"
                class="custom-select">
                <option value=0>
                  Gönderilmedi
                </option>
                
                <option  value=1>
                  Onay Bekliyor
                </option>

                <option  value=2>
                  Onaylandı
                </option>
          
              
            
              </select>
            </div>
            <div class="col-md-6">
              <label>Hakkdında</label>
              <textarea name = "aboutMe"  
                class="form-control" 
                rows = "10"
                v-model="user.aboutMe"
                aria-label="With textarea">
              
              </textarea>
            </div>
            <div class="col-md-6">
              <label>Adres</label>
              <textarea name = "address"  
                class="form-control" 
                rows = "10"
                aria-label="With textarea"
                v-model="user.addres">
               
              </textarea>
            </div>
            <div class="col-md-6">
              <label>Konuşulan Diller</label>
              <textarea name = "spokenLanguage"  
                class="form-control" 
                rows = "3"
                v-model="user.spokenLanguage"
                aria-label="With textarea">
               
              </textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button  @click="hide('edit-modal')"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal">
            İptal
          </button>
          <button @click="setEditUser()" type="button" class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>

    </modal>
    <div class="captain-profile-left">
      <div class="captain-profile-left-content">
        <div class="col">
          <div class="captain-profile-image">
            <img
              class="captain-avatar-style"
              style="margin-right: 10px; border-radius: 5rem"
              :src="IMAGE_URL + row.avatar"
            />
          </div>
          <div class="captain-profile-info" v-if="row.rosette != null">
            <div class="captain-profile-icon">
              <i class="fas fa-anchor"></i>
            </div>
            <div class="captain-profile-content">Süper Kaptan</div>
          </div>
            <div class="captain-profile-info">
            <div class="captain-profile-icon">
              <i class="fas fa-star" style="color: #ef4036"></i>
            </div>
            <div class="captain-profile-content">{{captainRate.rate!=null ? parseFloat(captainRate.rate).toFixed(2) :0 }} ( {{captainRate.count}} {{$t('map_boat_card_commentcount')}} )</div>
          </div>
          <h6 class="captain-name-profile-security">
            {{ uppercaseLetter(row.name) }} tarafından doğrulandı
          </h6>

        
             <div class="captain-profile-info cms-left-container" >
            <div class="captain-profile-icon">
               <i class="fas fa-user-check"></i>
            </div>
            <div class="cms-captain-detail-text-container">
              <span class="cms-captain-detail-spam"> Tc</span>:{{row.identificationNumber}}
               <span v-if="row.identityVerify == 0" class="cms-captain-detail-spam" > Yüklenmedi</span> 
              <span v-if="row.identityVerify == 1" class="cms-captain-detail-spam" style="color:blue"> Onay bekliyor</span> 
              <span v-if="row.identityVerify == 2" class="cms-captain-detail-spam" style="color:green"> Onaylanmış</span> 
              <span v-if="row.identityVerify == 3" class="cms-captain-detail-spam" > Yüklenmedi</span> 
              </div>
             
             <div class="row">
          
             </div>
              <a v-if="row.identityVerify != 0"
              @click="fileDowland('api/cms/get/identitycard?id='+row.id)"
              target="_black" style="color:green">
              indir
            </a>
          </div>
        
      
           <div class="captain-profile-info cms-left-container" >
            <div class="captain-profile-icon">
               <i class="fas fa-at"></i>
            </div>
            <div class="cms-captain-detail-text-container">
              <span class="cms-captain-detail-spam"> Eposta</span>:{{row.email}}</div>
           
              <span v-if="row.emailVerify == 0" class="cms-captain-detail-spam" > Yüklenmedi</span> 
              <span v-if="row.emailVerify == 1" class="cms-captain-detail-spam" style="color:blue"> Onay bekliyor</span> 
              <span v-if="row.emailVerify == 2" class="cms-captain-detail-spam" style="color:green"> Onaylanmış</span> 
              <span v-if="row.emailVerify == 3" class="cms-captain-detail-spam" > Yüklenmedi</span> 
          </div>

          <div class="captain-profile-info cms-left-container" >
            <div class="captain-profile-icon">
              <i class="fas fa-phone-volume"></i>
            </div>
            <div class="cms-captain-detail-text-container">
              <span class="cms-captain-detail-spam"> Telefon</span>:{{row.phoneNumber}}</div>
            
              <span v-if="row.phoneVerify == 0" class="cms-captain-detail-spam" > Yüklenmedi</span> 
              <span v-if="row.phoneVerify == 1" class="cms-captain-detail-spam" style="color:blue"> Onay bekliyor</span> 
              <span v-if="row.phoneVerify == 2" class="cms-captain-detail-spam" style="color:green"> Onaylanmış</span> 
              <span v-if="row.phoneVerify == 3" class="cms-captain-detail-spam" > Yüklenmedi</span> 
          </div>
          
          <h6 class="captain-profile-security">
            Hesabınızı doğrulamanın Boatsy topluluğunu güvende tutmaya nasıl yardımcı
            olduğu hakkında
            <router-link to="/trust/security"
              ><h6 class="captain-profile-security-footer">
                daha fazla bilgi edinin.
              </h6></router-link
            >
          </h6>
        </div>
      </div>
    </div>
    <div class="captain-profile-right">
      <div class="captain-detail">
        <h2 class="captain-name">
          Merhaba,ben {{ uppercaseLetter(row.name) }}
          {{ uppercaseLetter(row.surname) }}
        </h2>
      </div>
      <div class="captain-detail">
        <h2 class="captain-date" style="font-size: 16px; color: gray">
          {{ convertDate(row.dtInsert) }} yılında katıldı
        </h2>
      </div>
      <div class="captain-detail-about">
        <h2 class="captain-about">Hakkında</h2>
        <p>{{ row.aboutMe }}</p>
      </div>
      <div class="captain-detail-languages">
        <div class="language-icon">
          <i class="fas fa-comment"></i>
        </div>
        <div class="language-content">
          Konuştuğu diller: {{ row.spokenLanguage }}
        </div>
      </div>
      <div class="captain-detail-boats">
        <div class="captain-detail-boats-header">
          {{ uppercaseLetter(row.name) }} Kaptanın Tekneleri
        </div>

       
      </div>
      <div class="captain-detail-comments">
        <captain-comment></captain-comment>
      </div>
    </div>
  </div>
  <div class="loading-payment-page" v-else>
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>
<script>
import { IMAGE_URL } from "../../../../config/GlobalVariables";

import Vue from 'vue'
export default {
  data() {
    return {
      IMAGE_URL: IMAGE_URL,
      captainRate : [],
      loading: false,
      user:{name:"",surname:"",phoneNumber:"",phoneTwo:"",email:"",birthday:"",identificationNumber:"",taxNumber:"",companyName:"",iban:"",userGroupId:"",identityVerify:"",phoneVerify:"",aboutMe:"",spokenLanguage:""}
    };
  },
  props: ['field', 'title', 'query',"row"],
 
  methods: {
    convertDate(date) {
      if (date != "" && date != undefined && date != null) {
        return date.split("-")[0];
      } else {
        return date ?? "";
      }
    },
     hide(ModalName) {
      this.$modal.hide(ModalName);
    },
    uppercaseLetter(str) {
      if (str != "" && str != undefined && str != null) {
        var parcalar = str.split(" ");
        for (var i = 0; i < parcalar.length; i++) {
          var j = parcalar[i].charAt(0).toUpperCase();
          parcalar[i] = j + parcalar[i].substr(1).toLowerCase();
        }
        return parcalar.join(" ");
      } else {
        return str ?? "";
      }
    },
    async setEditUser(){
        var data = {
        isAdmin :1,
        userId: parseInt(this.user.id),
        name: this.user.name??"",
        surname:  this.user.surname??"",
        phoneNumber:this.user.phoneNumber??"",
        phoneTwo:this.user.phoneTwo??"",
        email: this.user.email??"",
        birthday: this.user.birthday??"",
        identificationNumber:this.user.identificationNumber??"",
        taxNumber:this.user.taxNumber??"",
        companyName: this.user.companyName??"",
        iban:this.user.iban??"",
        userGroupId: this.user.userGroupId??"",
        identityVerify:this.user.identityVerify??"",
        emailVerify:this.user.emailVerify??"",
        phoneVerify:this.user.phoneVerify??"",
        aboutMe: this.user.aboutMe??"",
        address: this.user.address??"",
        spokenLanguage:this.user.spokenLanguage??"",
    };
    var result= await Vue.prototype.$cmsService.setEditUser(data);
    if(!result.error){

          Vue.swal.fire("İşlem Başarılı", "Kullanıcı güncellendi", "succes");
          this.hide('edit-modal');
          $("#btnCaptainListReflesh").click();
        //location.reload();
    }else{
     Vue.swal.fire("İşlem Başarılı", "BEklenmedik bir hata oluştu", "error");
  
    }
    },
       fileDowland: async function(url){
     var res= await Vue.prototype.$cmsService.dowlandFile(url);
       var fileURL = window.URL.createObjectURL(new Blob([res.data]));
       if(res.status==200){
          var fileLink = document.createElement('a');
   
                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', this.row.name+'_'+this.row.id+'_'+url.split('/')[3] + '.'+res.headers["content-type"].split('/')[1]);
                     document.body.appendChild(fileLink);
   
                     fileLink.click();
                      Vue.swal.fire("İşlem Başarılı", "İşlem Başarılı", "succes");
       }
       else{
          Vue.swal.fire("İşlem Başarısız", "Dosya bulunamadı", "error");
       }
                    
    },
  },
  mounted(){
    this.user=this.row;
  },
  async created() {
      
  },
};
</script>
<style>
.cms-captain-detail-spam{
  font-weight: 700;
  color: #fb2f37;
  
}
.cms-left-container{
 padding: 5px;
}
.cms-captain-detail-text-container{
  font-size:12px;
}
.captain-profile {
  min-height:100vh;
}
.captain-profile-security {
  padding: 30px;
  border-radius: 0.5rem;
  width: 250px;
  text-align: left;
  font-size: 15px;
}
.captain-name-profile-security {
  padding: 30px;
  border-radius: 0.5rem;
  width: 250px;
  text-align: left;
  font-size: 22px;
  color: #333;
  font-weight: bold;
},

.captain-profile-security-footer {
  font-size: 15px;
  text-decoration: underline;
  color: black;
}
.captain-profile-security-footer:hover {
  color: black;
  font-weight: bold;
}
.captain-detail-comments {
  padding-bottom: 48px;
}
.captain-profile {
  padding-top: 80px !important;
}

.captain-profile-image img {
  width: 128px;
  height: 128px;
}
.captain-profile-image {
  padding: 24px 0;
}
.captain-profile-icon {
  align-items: center;
  display: grid;
  justify-content: center;
  justify-items: center;
}
.captain-profile-icons {
  display: grid;
  justify-content: center;
  justify-items: center;
}
.captain-profile-info {
  display: grid;
  grid-template-columns: 20% 80%;
  text-align: start;
  font-size: 16px;
  padding: 30px;
}
.captain-detail-boats-header {
  padding: 24px 0;
  font-size: 24px;
}
.captain-boats {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1.2em;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
.captain-detail-languages,
.captain-detail-location {
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  justify-content: center;
}
.captain-detail-languages {
  padding-bottom: 24px;
}
.captain-profile-left {
  padding: 24px;
}
.captain-profile-right {
  text-align: start;
  padding-top: 24px;
}
.captain-detail-languages {
  border-bottom: 1px solid #ddd;
}
.captain-date {
  padding-bottom: 30px;
}
@media (min-width: 1130px) {
  .captain-profile {
    display: grid;
    grid-template-columns: 25% 75%;
    padding-top: 80px;
  }
  .captain-profile-left-content {
    border: 1px solid #ddd;
    border-radius: 12px;
  }
}
@media (max-width: 1130px) {
  .captain-profile-image {
    grid-row: span 3;
  }
  .captain-profile-content {
    align-items: center;
    display: grid;
  }
}
@media (min-width: 1200px) {
  .captain-profile {
    max-width: 1300px;
  }
}
</style>
