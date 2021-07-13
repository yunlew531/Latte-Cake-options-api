<template>
  <Loading
    v-model:active="isLoading"
    :isFullPage="true"
    :background-color="'#000'"
    :lockScroll="true"
    :opacity="0.7"
  >
    <template v-slot:default class="position-absolute">
      <div class="loading"></div>
      <div class="cup-hand position-relative"></div> </template
  ></Loading>
  <Navbar />
  <main>
    <router-view />
  </main>
  <CartCanvas />
  <SubFooter />
  <Footer />
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import SubFooter from '@/components/frontend/SubFooter.vue';
import Footer from '@/components/frontend/Footer.vue';
import CartCanvas from '@/components/frontend/CartCanvas.vue';
import GetScrollY from '@/mixins/GetScrollY.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
    Navbar,
    SubFooter,
    Footer,
    CartCanvas,
  },
  mixins: [GetScrollY],
  provide() {
    return {
      scroll: this.scroll,
    };
  },
  data() {
    return {
      isLoading: null,
    };
  },
  watch: {
    '$store.getters.isLoading': {
      handler() {
        this.isLoading = this.$store.getters.isLoading;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.cup-hand {
  width: 35px;
  height: 35px;
  position: absolute;
  border: 7px solid $white;
  border-radius: 0 0 40% 40%;
  left: 83px;
  bottom: 65px;
  transform: rotate(-90deg);
}
.loading {
  width: 90px;
  height: 80px;
  border: 7px solid $white;
  border-radius: 0 0 35% 35%;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    width: 150%;
    height: 100%;
    position: absolute;
    left: -25%;
    bottom: -80%;
    background: $primary;
    animation: coffee-wave 2s infinite;
  }
  @keyframes coffee-wave {
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(5deg);
      bottom: -20%;
    }
  }
}
</style>
