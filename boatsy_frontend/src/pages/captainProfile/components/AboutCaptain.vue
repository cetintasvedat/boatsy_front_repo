<template>
  <div>
    <div class="captain-detail">
      <h2 class="captain-name">{{$t('about_captain_captain-name')}} {{ uppercaseLetter(name) }}</h2>
    </div>
    <div class="captain-detail">
      <h2 class="captain-date" style="font-size: 16px; color: gray">
        {{ convertDate(dtInsert) }} {{$t('about_captain_captain-date')}}
      </h2>
    </div>
    <div class="captain-detail-about">
      <h2 class="captain-about">{{$t('about_captain_captain-about')}}</h2>
      <p>{{ aboutTitle }}</p>
    </div>
    <div class="captain-detail-languages">
      <div class="language-icon">
        <i class="fas fa-comment"></i>
      </div>
      <div class="language-content">{{$t('about_captain_captain-speak')}} {{ spokenLanguage }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "dtInsert", "aboutTitle", "spokenLanguage"],
  methods: {
    convertDate(date) {
      if (date != "" && date != undefined && date != null) {
        return date.split("-")[0];
      } else {
        return date ?? "";
      }
    },
    uppercaseLetter(str) {
      if (str != "" && str != undefined && str != null) {
        var parcalar = str.split(" ");
        for (var i = 0; i < parcalar.length; i++) {
          var j = parcalar[i].charAt(0).toUpperCase();
          parcalar[i] = j + parcalar[i].substr(1).toLowerCase();
        }
        return parcalar.join(" ");
      } else {
        return str ?? "";
      }
    },
  },
};
</script>
