<template>

    <div class="mb-4">
        <div class="col-md-12">
      {{ title }}
      </div>
   
      <v-date-picker
        v-model="range"
        mode="date"
        :masks="masks"
        is-range
         
      >
        <template v-slot="{ inputValue, inputEvents, isDragging }">
          <div class="flex flex-col sm:flex-row justify-start items-center">
        
            <div class="row">
              <div class="col-md-8">
              <textarea
                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                style="font-size:12px;height: 100%;line-height: 1; text-align: center;"
                
                v-on="inputEvents.start"
              >
              {{t}}
              </textarea>
              </div>
               <div class="col-md-3 btnIconThContainer">
              <i class="fas fa-search iconButtonTd" style="color:blue" @click="onDayClick"></i>
              <i class="fas fa-trash-alt iconButtonTd" style="color:red" @click="onDatDelete"></i>
              </div>
            </div>
            </div>
            
           
              
         
         
        </template>
      </v-date-picker>
    </div>
</template>
<script>
import format from "date-fns/format";
export default {
    props: ['field', 'title', 'query'],
  data() {
    return {
      isActive:false,
     dateFormat: "YYYY-MM-DD",
      range: {
        start: null,
        end: null,
      },
      masks: {
        input: 'YYYY-MM-DD',
      },
    };
  },
    computed: {
    t () {
     
     if(this.range.start!=null && this.range.end!=null){
       return format(this.range.start, this.dateFormat)+'\n-\n'+format(this.range.end, this.dateFormat);
     }
     else{
       return "Ara"
     }
      
     
    }
  },
   methods: {
    onDayClick() {
     const { query } = this
    
      this.$set(query, this.field, format(this.range.start, this.dateFormat)+'-DT-'+format(this.range.end, this.dateFormat))
      query.offset = 0 // reset pagination
      this.isActive=false;
    },
    onDatDelete(){
      const { query } = this
      this.range.start=null;
      this.range.end=null;
      this.$set(query, this.field,null)
      query.offset = 0 // reset pagination
      this.isActive=false;
    }
  },
};
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
.iconButtonTd{
  padding: 2px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 14px;
  width: 100%;
  height: 50%;
 
 
  
}
.btnIconThContainer{
  border-left: 1px solid #050505;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: #f5f5f5;
  border: 1px solid red;
}
.iconButtonTd:hover {
    cursor: pointer;
}
a[name="HeadSort"] {
 
}
</style>
