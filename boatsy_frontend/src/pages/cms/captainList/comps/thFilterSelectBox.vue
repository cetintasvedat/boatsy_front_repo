<template>
  <div class="btn-group row">
    <div class="col-md-12">
    {{ title }}
    </div>
   <div class="col-md-12">
           <select class="form-control" v-if="field=='boatTypeId'" v-model="keyword" :placeholder="`Ara ${field}...`" @change="search($event)">
                <option  value="0" :key="0"> Tümü</option>
                <option  v-for="item in getBoatTypes" :key="item.id" v-bind:value="item.id+1"  > {{item.name}}</option>
            
            </select> 
              <select class="form-control" v-if="field=='captain'" v-model="keyword" :placeholder="`Ara ${field}...`" @change="search($event)">
                <option  value="0" :key="0"> Tümü</option>
                <option  v-for="item in tdBoatPersonerType" :key="item.id" v-bind:value="item.id"  > {{item.name}}</option>
            
            </select> 
    </div>
    
  

  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ['field', 'title', 'query'],
  computed: {
    ...mapGetters(["getBoatTypes"]),
  },
  data: () => ({
    keyword: '',
    isActive:false,
    tdBoatPersonerType:[

      {id:1,name:"Kaptansız"},
      {id:2,name:"Kaptanlı"},
      {id:3,name:"Mürettebatlı"},
    ]
  }),
  mounted () {
    $(this.$el).on('shown.bs.dropdown', e => this.$refs.input.focus())
 
  },
  watch: {
    keyword (kw) {
      // reset immediately if empty
      if (kw === '') this.search()
    }
  },
  methods: {
    onClick(){
      this.isActive=!this.isActive;
      this.$refs.input.focus()

    },
    search () {
      const { query } = this
      // `$props.query` would be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
      // custom query conditions must be set to observable by using `Vue.set / $vm.$set`
   if(parseInt(this.keyword)>0){
      this.$set(query, this.field, parseInt(this.keyword)-1)
      }
      else{
      this.$set(query, this.field, null)
      }
      query.offset = 0 // reset pagination
      this.isActive=false;
    },
  
  created() {

  },
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
