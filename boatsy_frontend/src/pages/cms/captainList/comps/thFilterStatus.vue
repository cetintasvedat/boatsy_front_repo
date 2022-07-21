<template>
  <div class="btn-group row">
    <div class="col-md-12">
    {{ title }}
    </div>
    <div class="col-md-12">
           <select class="form-control" v-model="keyword" :placeholder="`Ara ${field}...`" @change="search($event)">
                <option  value="0" :key="0"> Tümü</option>
                <option  v-bind:value="1"  :key="1"> Yüklenmedi</option>
                <option  v-bind:value="2" :key="2"> Onay bekliyor</option>
                <option  v-bind:value="3" :key="3"> Onaylanmış</option>
                <option  v-bind:value="4" :key="4"> Süresi Dolmuş</option>
            </select> 
    </div>
    
  

  </div>
</template>
<script>
export default {
  props: ['field', 'title', 'query'],
  data: () => ({
    keyword:"0",
    isActive:false
  }),
  mounted () {
    $(this.$el).on('shown.bs.dropdown', e => this.$refs.input.focus())
  },
  watch: {
    keyword :() =>{
      // reset immediately if empty
     this.search(null)
    }
  },
  methods: {
    onClick(){
      this.isActive=!this.isActive;
      this.$refs.input.focus()

    },
    search (event) {
      const { query } = this
      // `$props.query` would be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
      // custom query conditions must be set to observable by using `Vue.set / $vm.$set`
      if(this.keyword!="" &&this.keyword!=null &&this.keyword!=0){
          this.$set(query, this.field, parseInt(this.keyword)-1)
      query.offset = 0 // reset pagination
      this.isActive=false;

      }
      else if(parseInt(this.keyword)=="0"){
      this.$set(query, this.field, null)
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
