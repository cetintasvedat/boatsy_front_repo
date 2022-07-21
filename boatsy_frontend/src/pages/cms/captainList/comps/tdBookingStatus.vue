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
          return "Talep Kabul Edilmedi("+this.value+")"
        case 1:
          return "Rezervasyon Talebi("+this.value+")"
        case 2:
          return "Talep Kabul Edildi("+this.value+")"
        case 3:
          return "Ödeme Gerçekleşti("+this.value+")"
        case 999:
          return "Rezervasyon İptal("+this.value+")"
         case 100:
          return "Tamamlanan Rezervasyon("+this.value+")"
        case 200:
          return "Rezervasyon İptal Talebi("+this.value+")"
      }
     
     
    
  }
  }
}
</script>
