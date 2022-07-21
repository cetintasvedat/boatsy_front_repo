<template>
<ul>
  <li>{{row.personcapacity}}</li>
</ul> 
</template>
<script>


export default {
  props: ['value', 'xprops','row'],
   computed: {
 
    t () {
     return  this.row.name;
     
     
    
  }
  },
  data: () => ({
    displayBy: 'day'
  }),
  
  created () {
    this.xprops.eventbus.$on('CREATE_TIME_FORMAT', displayBy => {
      this.displayBy = displayBy
    })
  },

}
</script>
