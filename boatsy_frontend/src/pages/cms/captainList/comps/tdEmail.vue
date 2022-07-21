<template>
  <a :href="`mailto:${value}`" style="font-size:11px">{{ value }}</a>
</template>
<script>
export default {
  props: ['value']
}
</script>
