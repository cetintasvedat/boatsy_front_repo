<template>
  <p  style="font-size:11px; padding:0px">{{ t }}</p>
</template>
<script>


export default {
  props: ['value', 'xprops'],
  data: () => ({
    displayBy: 'day'
  }),
  created () {
    this.xprops.eventbus.$on('CREATE_TIME_FORMAT', displayBy => {
      this.displayBy = displayBy
    })
  },
  computed: {
    t () {
      switch (this.value) {
        case 0:
          return "Yüklenmedi("+this.value+")"
        case 1:
          return "Onay bekliyor("+this.value+")"
        case 2:
          return "Onaylanmış("+this.value+")"
        case 3:
          return "Süresi Dolmuş("+this.value+")"
        default:
         return "Yüklenmedi("+this.value+")"
      }
     
     
    
  }
  }
}
</script>
