<template>
  <section
    ref="carouselPanel"
    class="carousel-panel position-relative"
    @mousemove="handTextShadow($event)"
    @mouseenter="isMouseInCarousel = true"
    @mouseleave="(isMouseInCarousel = false), handTextShadow($event)"
  >
    <div class="carousel-content position-absolute start-25 top-50 z-10 p-10">
      <h3
        class="title fw-bold fs-1 tracking-3 text-white"
        :style="styleSheets.title"
        @animationend="isReadyTextShadow = true"
      >
        歡迎光臨 <span class="text-danger">Latte & Cake</span>
      </h3>
      <div class="pt-3">
        <button type="button" class="btn btn-primary">瀏覽菜單</button>
        <button type="button" class="btn btn-primary ms-5">線上訂位</button>
      </div>
    </div>
    <div ref="carouselDom" class="carousel slide carousel-fade">
      <ul class="carousel-inner m-0 p-0">
        <li class="carousel-item bg-carousel-1 active"></li>
        <li class="carousel-item bg-carousel-2"></li>
        <li class="carousel-item bg-carousel-3"></li>
        <li class="carousel-item bg-carousel-4"></li>
        <li class="carousel-item bg-carousel-5"></li>
        <li class="carousel-item bg-carousel-6"></li>
      </ul>
    </div>
    <div class="scroll-btn position-absolute bottom-0 start-50 z-10">
      <span class="fs-1 text-white material-icons"> expand_more </span>
    </div>
  </section>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  name: 'Carousel',
  data() {
    return {
      carousel: null,
      isReadyTextShadow: false,
      isMouseInCarousel: false,
      styleSheets: {
        title: '',
      },
    };
  },
  methods: {
    handCarousel() {
      this.carousel = new Carousel(this.$refs.carouselDom, {
        interval: 10000,
        pause: false,
        ride: 'carousel',
      });
      this.carousel.cycle();
    },
    handTextShadow($event) {
      if (!this.isReadyTextShadow) return;
      const { offsetX, offsetY } = $event;

      if (
        $event.target !== this.$refs.carouselPanel ||
        !this.isMouseInCarousel
      ) {
        this.styleSheets.title = {
          transition: '1s',
          textShadow: '-0.1rem 0.1rem 0.5rem white',
        };
        return;
      }

      const lengthX =
        ((offsetX / this.$refs.carouselPanel.offsetWidth).toFixed(2) * 2 - 1) *
        -1;
      const lengthY =
        ((offsetY / this.$refs.carouselPanel.offsetHeight).toFixed(2) * 2 - 1) *
        -1;

      this.styleSheets.title = {
        textShadow: `
        ${lengthX * 1}rem ${lengthY * 1}rem 0.3rem white,
        ${lengthX * 2}rem ${lengthY * 2}rem 0.6rem white`,
      };
    },
  },
  mounted() {
    this.handCarousel();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
.carousel-panel {
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba($black, 0.15);
    position: absolute;
    z-index: 2;
  }
}

.carousel-content {
  overflow: hidden;
}

.title {
  animation: title-drop 1.5s forwards ease-in;
  transform: translateY(200%);
  opacity: 0;
}
@keyframes title-drop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.carousel-item {
  height: 100vh;
  background: no-repeat center;
  background-size: cover;
  filter: brightness(0);
  animation: scale-background 9s ease-out backwards;
}
@keyframes scale-background {
  0% {
    filter: brightness(1);
    transform: scale(1.1);
  }
  80% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(0);
    transform: scale(1);
  }
}
.scroll-btn {
  cursor: pointer;
  margin-bottom: 10px;
  opacity: 1;
  animation: scroll-btn-ani 5s infinite;
}
@keyframes scroll-btn-ani {
  100% {
    opacity: 0;
    margin-bottom: -50px;
  }
}
.bg-carousel-1 {
  background-image: url(~@/assets/images/carousel-1.jpg);
}
.bg-carousel-2 {
  background-image: url(~@/assets/images/carousel-2.jpg);
}
.bg-carousel-3 {
  background-image: url(~@/assets/images/carousel-3.jpg);
}
.bg-carousel-4 {
  background-image: url(~@/assets/images/carousel-4.jpg);
}
.bg-carousel-5 {
  background-image: url(~@/assets/images/carousel-5.jpg);
}
.bg-carousel-6 {
  background-image: url(~@/assets/images/carousel-6.jpg);
}
</style>
