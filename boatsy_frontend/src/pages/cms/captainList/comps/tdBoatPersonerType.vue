<template>
  <span>{{ t }}</span>
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
          return "kaptansız("+this.value+")"
        case 1:
          return "kaptanlı("+this.value+")"
        case 2:
          return "Mürettebatlı("+this.value+")"
        default:
         return "Bilinmiyor("+this.value+")"
      }
     
     
    
  }
  }
}
</script>
