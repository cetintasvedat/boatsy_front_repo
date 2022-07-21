<template>
    <a @click="RouteBoatsWithMap(boatType.img)">
        <div class="boat-group-by-type">
        <div class="boat-type-image">
            <img :src="'/img/'+boatType.img+'-kiralama.webp'" style="border-radius: 3%" />
        </div>
        <div>
            <h1
            style="font-size: 1rem; padding: 3px; font-weight: bold; margin-top: 10px"
            >
            {{$t(boatType.lang)}} {{$t('rent')}}
            </h1>
        </div>
    </div></a>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    props: ['boatType'],
     computed: {
    ...mapGetters(["getSelectedLang"]),
  },
    methods: {
        RouteBoatsWithMap(boatType) {
            this.$router.push({
                name: "AllBoats",
                params: {
                boatType: boatType,
                },
            });
        },
    }
}
</script>