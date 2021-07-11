<template>
  <div class="navbar-bg"></div>
  <section
    class="container about-us-panel bg-white shadow-sm rounded mb-12 pt-8 px-8"
    :class="{ active: isAnimeReset }"
  >
    <div>
      <ul class="d-flex list-unstyled mb-12">
        <li class="flex-grow-1">
          <button
            type="button "
            class="city-btn btn text-white w-100 rounded-0 shadow-none"
            :class="{ active: shopPosition === 'Taipei' }"
            @click="setShopPosition('Taipei')"
          >
            台北店
          </button>
        </li>
        <li class="flex-grow-1">
          <button
            type="button "
            class="city-btn btn text-white w-100 rounded-0 shadow-none"
            :class="{ active: shopPosition === 'Taichung' }"
            @click="setShopPosition('Taichung')"
          >
            台中店
          </button>
        </li>
        <li class="flex-grow-1">
          <button
            type="button "
            class="city-btn btn text-white w-100 rounded-0 shadow-none"
            :class="{ active: shopPosition === 'Kaohsiung' }"
            @click="setShopPosition('Kaohsiung')"
          >
            高雄店
          </button>
        </li>
      </ul>
      <div v-for="(map, key) in mapSrc" :key="map" class="google-map">
        <iframe
          v-if="shopPosition === key"
          :src="map"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <RestaurantLightbox />
  </section>
</template>

<script>
import RestaurantLightbox from '@/components/frontend/RestaurantLightbox.vue';

export default {
  components: {
    RestaurantLightbox,
  },
  data() {
    return {
      shopPosition: '',
      isAnimeReset: true,
      mapSrc: {
        Taipei:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115676.73003252424!2d121.49439485820317!3d25.037541700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb9dc73545d%3A0x6513f5fb17ad1f67!2z6Ie65YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624710293387!5m2!1szh-TW!2stw',
        Taichung:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.282090079828!2d120.64467441536776!3d24.16183777885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d84daa07441%3A0x2c5e7459c2aaf71a!2z6Ie65Lit5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624725149252!5m2!1szh-TW!2stw',
        Kaohsiung:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10416.999211285864!2d120.3066260090534!3d22.61776753863218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x344465d114abb19!2z6auY6ZuE5biC5pS_5bqcIOWbm-e2reihjOaUv-S4reW_gw!5e0!3m2!1szh-TW!2stw!4v1624723884270!5m2!1szh-TW!2stw',
      },
    };
  },
  methods: {
    setShopPosition(city) {
      this.$store.dispatch('handDisplayCity', city);
    },
  },
  watch: {
    '$store.getters.shopPosition': {
      handler(val) {
        this.shopPosition = val;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.google-map {
  transform: scale(0);
}

.about-us-panel {
  transform: translateY(-50px);
  &.active {
    .google-map {
      animation: scale 0.3s forwards;
    }
  }
}
@keyframes scale {
  to {
    transform: scale(1);
  }
}

.navbar-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}

.city-btn {
  background: $black;
  &:hover {
    background: tint-color($black, 10%);
  }
  &.active {
    background: tint-color($black, 20%);
  }
}
</style>
