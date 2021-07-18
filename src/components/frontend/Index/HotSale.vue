<template>
  <section class="bg-info overflow-hidden">
    <div class="hot-sale-panel bg-white-100" :class="{ active: isScrollTo }">
      <div class="container pt-12 pb-38">
        <h3
          class="
            title
            text-center
            fs-2
            fw-bold
            text-danger
            overflow-hidden
            mb-5
          "
        >
          熱銷商品
        </h3>
        <h4 class="text-center fs-5 mb-12">
          <p class="paragraph-text d-block m-0">值得您嘗鮮的選擇</p>
        </h4>
        <swiper
          :slides-per-view="3"
          :space-between="50"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :speed="2000"
          :loop="true"
          @swiper="setControlledSwiper"
        >
          <swiper-slide
            v-for="(product, key) in 9"
            :key="key"
            class="rounded overflow-hidden bg-info"
            @transitionend="playSwiper($event)"
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
          <router-link to="/products" class="d-block">
            <Button hoverBgColor="white" class="all-products-btn px-12 py-2"
              ><span class="btn-content">全部商品</span>
            </Button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import Button from '@/components/frontend/Button.vue';

SwiperCore.use(Autoplay);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Button,
  },
  inject: ['scroll'],
  data() {
    return {
      isScrollTo: false,
      swiper: null,
    };
  },
  methods: {
    setControlledSwiper(swiper) {
      this.swiper = swiper;
      this.swiper.autoplay.stop();
    },
    playSwiper($event) {
      if ($event.pseudoElement === '::before') this.swiper.autoplay.start();
    },
  },
  watch: {
    scroll: {
      handler(scroll) {
        if (scroll.Y > 1000 && scroll.Y < 2300) this.isScrollTo = true;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styleSheets/custom/variables';

.hot-sale-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  .title,
  .paragraph-text {
    opacity: 0;
    transition: 1s 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
  }
  .paragraph-text {
    transition-delay: 2s;
  }

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
  .swiper-slide:nth-of-type(4),
  .swiper-slide:nth-of-type(5),
  .swiper-slide:nth-of-type(6) {
    .swiper-img {
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 160%;
        height: 100%;
        background: $info;
        left: -190%;
        transform: skewX(30deg);
        z-index: 10;
        transition: 0.6s 2.8s cubic-bezier(0.16, 0.51, 0.83, 0.5);
      }
      &::after {
        background: $white-100;
        width: 160%;
        height: 100%;
        left: -30%;
        transform: skewX(30deg);
        transition: 0.6s 2.8s cubic-bezier(0.16, 0.51, 0.83, 0.5);
      }
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
  .all-products-btn {
    transition: 0.5s 3.8s;
    opacity: 0;
    transform: translateX(-100%) rotate3d(0, 1, 0, 90deg);
    .btn-content {
      color: $white;
      transition: 0.3s;
    }
    &:hover {
      .btn-content {
        color: $primary !important;
      }
    }
  }
  &.active {
    transform: translateY(0);
    .title,
    .paragraph-text {
      opacity: 1;
      transform: translateY(0);
    }
    .swiper-slide:nth-of-type(4),
    .swiper-slide:nth-of-type(5),
    .swiper-slide:nth-of-type(6) {
      .swiper-img {
        &::before {
          left: 140%;
        }
        &::after {
          left: 140%;
        }
      }
    }
    .all-products-btn {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
