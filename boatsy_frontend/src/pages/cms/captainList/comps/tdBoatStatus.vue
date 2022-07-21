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
        case -1:
          return "Yüklenmedi("+this.value+")"
        case 0:
          return "Özellikler eksik("+this.value+")"
        case 1:
          return "Görüntüler eksik("+this.value+")"
        case 2:
          return "Kurallar eksik("+this.value+")"
        case 3:
          return "Ekstralar eksik("+this.value+")"
        case 4:
          return "Dosyalar eksik("+this.value+")"
         case 5:
          return "onay bekliyor("+this.value+")"
        case 6:
          return "Onay("+this.value+")"
        default:
         return "Yüklenmedi("+this.value+")"
      }
     
     
    
  }
  }
}
</script>
