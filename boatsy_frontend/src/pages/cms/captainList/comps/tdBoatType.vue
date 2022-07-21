<template>
  <span>{{ t }}</span>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ['value', 'xprops'],
   computed: {
    ...mapGetters(["getBoatTypes"]),
    t () {
     return  this.getBoatTypes.find(element => element.id == this.value).name
     
     
    
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
