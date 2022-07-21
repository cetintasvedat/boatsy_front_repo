<template>
  <div>
    <a @click="routeToBoats(state, city)" class="popular-location-card">
      <img
        v-bind:src="source"
        style="
          width: 100%;
          background: black;
          border-radius: 3%;
        "
      />

      <div
        style="
          display: flex;
          justify-content: start;
          gap: 2px;
          width: 200px;
          margin-top: 8px;
        "
      >
        <p
          style="
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-style: bold;
            font-weight: 700;
          "
        >
          {{ city }}
        </p>
         <p style="margin: 0 10px 0 0; padding: 0; font-size: 16px">
           ,Türkiye
        </p>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ["state", "source", "city"],
  methods: {
    routeToBoats(state, city) {
      this.$store.commit("setBoatCity", "");
      if (city == state.split(",")[0]) {
        this.$router.push({
          name: "MapBoatsOnlyState",
          params: {
            boatState: state.split(",")[0],
          },
        });
      } else {
        this.$router.push({
          name: "MapBoatsLocation",
          params: {
            boatState: state.split(",")[0],
            boatCity: city,
          },
        });
      }
    },
  },
};
</script>
<style>
.popular-location-card img {
  object-fit: cover;
  aspect-ratio: 4/3;
}
</style>