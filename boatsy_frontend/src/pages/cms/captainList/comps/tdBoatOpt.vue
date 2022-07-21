<template>
  <div class="btn-group btn-group-sm">
     <a :href='"/cms/boats/admin-show-boat-"+row.id' class="btn btn-default" title="info" target="_blank"
      :class="{ '-nested-comp-open-btn': true }"
       >
      <i class="fas fa-info-circle"></i>
    </a>
  <a  v-if="row.boatStatus==5" class="btn btn-default"  title="Display row"
      :class="{ '-nested-comp-open-btn': true }" style="background-color: green!important;"
      @click="approve()"
 >
<i class="fas fa-check-circle"></i>
    </a >

     <a  v-if="row.boatStatus==6" class="btn btn-default" title="Display row"
      :class="{ '-nested-comp-open-btn': true }" style="background-color: red!important;"
      @click="reject()"
     >
    <i class="fas fa-ban"></i>
    </a >
   
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['row', 'nested'],

  computed: {
 
  },
  methods: {
    toggleNestedComp (comp) {
      const { nested } = this
      if (nested.comp === comp) return nested.$toggle()
      nested.$toggle(comp, true)
    },

    async reject(){
  var result= await Vue.prototype.$cmsService.reject(this.row.id);
    if(!result.error){

          Vue.swal.fire("İşlem Başarılı", "Statu Onay Bekliyor olarak değiştirildi", "succes");
         
          $("#btnBoatListReflesh").click();
        //location.reload();
    }else{
     Vue.swal.fire("İşlem Başarılı", "Beklenmedik bir hata oluştu", "error");
  
    }
    },
    async  approve(){
  var result= await Vue.prototype.$cmsService.approve(this.row.id);
    if(!result.error){

          Vue.swal.fire("İşlem Başarılı", "Statu Onay olarak değiştirildi", "succes");
          $("#btnBoatListReflesh").click();
        //location.reload();
    }else{
     Vue.swal.fire("İşlem Başarılı", "Beklenmedik bir hata oluştu", "error");
  
    }

    }

  }
}
</script>
<style>
.-nested-comp-open-btn {
  color: #fff !important;
  background-color: #337ab7 !important;
}
</style>
