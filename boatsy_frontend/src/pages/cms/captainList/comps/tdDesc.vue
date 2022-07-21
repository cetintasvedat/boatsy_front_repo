<template>
  <div style="
    max-width: 100px;
    justify-content: left;
    text-align: justify;
    overflow:hidden" :title="t">{{t}}</div>
</template>
<script>
export default {
  props: ['value'],
 computed: {
    t () {
      if(this.value!=null&& this.value!=undefined){

          return this.value.slice(0,this.value.length>50?50:this.value.length );
      }
      else
      {
        return "";
      }
     
     
    
  
  }
}
}
</script>
