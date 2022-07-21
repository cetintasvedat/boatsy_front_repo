<template>
  <div class="btn-group row">
    <div class="col-md-12">
    {{ title }}
    </div>
    <div class="col-md-12">

        <input type="number" class="form-control" ref="input" style="width:100%;"
          v-model="keyword" @keydown.enter="search" :placeholder="`Ara ${field}...`">
   
    </div>
    
  

  </div>
</template>
<script>
export default {
  props: ['field', 'title', 'query'],
  data: () => ({
    keyword: '',
    isActive:false
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
      this.$set(query, this.field, parseInt(this.keyword))
      }
      else{
      this.$set(query, this.field, null)
      }

      query.offset = 0 // reset pagination
      this.isActive=false;
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
