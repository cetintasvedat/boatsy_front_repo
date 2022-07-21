<template>
  <div class="btn-group row">
    <div class="col-md-12">
    {{ title }}
    </div>
    <div class="col-md-12">
           <select class="form-control" v-model="keyword" :placeholder="`Ara ${field}...`" @change="search($event)">
                <option  value="-1" :key="-1"> Tümü</option>
                <option  value="0" :key="0"> Rezervasyon Kabul Edilmedi</option>
                <option  v-bind:value="1"  :key="1"> Rezervasyon Talebi</option>
                <option  v-bind:value="2" :key="2"> Rezervasyon Kabul Edildi</option>
                <option  v-bind:value="3" :key="3"> Ödeme Tamamlandı</option>
                <option  v-bind:value="100" :key="100"> Rezervasyon Tamamlandı</option>
                <option  v-bind:value="200" :key="200"> Rezervasyon İptal Talebi</option>
                <option  v-bind:value="999" :key="999"> Rezervasyon İptal</option>
            </select> 
    </div>
    
  

  </div>
</template>
<script>
export default {
  props: ['title','query'],
  data: () => ({
    keyword:"0",
    isActive:false,
    field: "extras",
  }),
  mounted () {
    $(this.$el).on('shown.bs.dropdown', e => this.$refs.input.focus())
  },
  methods: {
    onClick(){
      this.isActive=!this.isActive;
      this.$refs.input.focus()

    },
    search (event) {
      const { query } = this

      if(this.keyword!="" &&this.keyword!=null &&this.keyword!=-1){

          this.bookingStatus = `{\"booking_status\": \"${this.keyword}\"}`
          this.$set(query, this.field, this.bookingStatus)
         
          query.page = 1 // reset pagination
          this.isActive=false;

      }
      else {
          this.keyword = ""
          this.$set(query, this.field, this.keyword)
      }
      
    }
  }
}
</script>
<style>
input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
  cursor: pointer;
}
.active{
  display: block !important;
    position: absolute;
    position: absolute!important;
    top: 100%;
    top: 100%!important;
    width: 100%;
    left: -50%;
}
</style>
