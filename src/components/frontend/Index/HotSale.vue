<template>
  <section
    class="hot-sale-panel container pt-12 pb-38"
    :class="{ active: isAnime }"
  >
    <h3 class="text-center fs-2 fw-bold text-danger mb-5">熱銷商品</h3>
    <h4 class="text-center fs-5 mb-12">值得您嘗鮮的選擇</h4>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :loop="true"
    >
      <swiper-slide
        v-for="(product, key) in 9"
        :key="key"
        class="rounded overflow-hidden bg-info"
      >
        <div class="swiper-img swiper-img-1">
          <div
            class="
              swiper-content
              position-absolute
              text-white
              bottom-0
              h-25
              w-100
              px-12
            "
          >
            <router-link to="/" class="text-reset text-decoration-none">
              {{ key }}
              <h2>蘋果蛋餅</h2>
              <p>鮮嫩多汁，現採現萃</p>
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="text-center mt-12">
      <router-link
        to="/products"
        class="
          all-product-btn
          position-relative
          rounded
          btn btn-primary
          px-12
          py-2
          overflow-hidden
        "
      >
        <span class="opacity-0">所有商品</span>
        <span
          class="btn-content position-absolute top-50 start-50 translate-middle"
          >所有商品</span
        >
      </router-link>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';

SwiperCore.use(Autoplay);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  inject: ['scroll'],
  data() {
    return {
      isAnime: false,
    };
  },
  watch: {
    scroll: {
      handler(scroll) {
        if (scroll.Y > 1000 && scroll.Y < 2300) this.isAnime = true;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styleSheets/custom/variables';

.hot-sale-panel {
  opacity: 0;
  transition: 1s ease-out;
  transform: translateY(50%);
  .swiper-content {
    h2,
    p {
      opacity: 0;
      padding-top: 100px;
      transition: 0.3s;
    }
    p {
      transition-delay: 0.2s;
    }
  }
  .swiper-img {
    height: 400px;
    background: center no-repeat;
    background-size: cover;
    position: relative;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;

      bottom: 0;
    }
    &:hover {
      .swiper-content {
        h2,
        p {
          opacity: 1;
          padding-top: 0;
        }
      }
      &::before {
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.8)
        );
      }
    }
  }
  .swiper-img-1 {
    background-image: url(~@/assets/images/swiper-1-1.jpg);
  }
  .all-product-btn {
    display: inline-block;
    .btn-content {
      transition: 0.2s;
      color: $white;
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: $white;
      top: -150%;
      left: 0;
      border-radius: $border-radius;
      transition: 0.2s ease-in-out;
    }
    &:hover {
      &::before {
        top: 0;
      }
      .btn-content {
        color: $danger;
      }
    }
  }
  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
