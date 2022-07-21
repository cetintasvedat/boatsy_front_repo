<template>
  <div class="colunm">
  <div class="row">
     <i class="fas fa-file-alt"></i>
     <a  @click="fileDowland('api/cms/get/boat/lisanse/'+row.userId+'/'+row.id)" target="dowland" >Lisans</a>
  </div>
   <div class="row">
     <i class="fas fa-file-alt"></i>
     <a  @click="fileDowland('api/cms/get/boat/insurance/'+row.userId+'/'+row.id)" target="dowland" >Sigorta</a>
  </div>
   <div class="row">
     <i class="fas fa-file-alt"></i>
     <a  @click="fileDowland('api/cms/get/boat/ownership/'+row.userId+'/'+row.id)" target="dowland" >Sahiplik-B.</a>
  </div>
   
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['row'],
 
  computed: {
  
  },
  methods: {
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
    fileShow:async function(url){
     var res= await Vue.prototype.$cmsService.dowlandFile(url);
    var file = new Blob([res], {type: res.headers["content-type"]});
       var fileURL = URL.createObjectURL(file);
    
       if(res.status==200){
       window.open(fileURL,"",'location=yes,height=570,width=520,scrollbars=yes,status=yes')
       }
       else{
          Vue.swal.fire("İşlem Başarısız", "Dosya bulunamadı", "error");
       }
                    
    },
    
  }
}
</script>
<style>
.-nested-comp-open-btn {
  color: #fff !important;
  background-color: #337ab7 !important;
}
</style>
