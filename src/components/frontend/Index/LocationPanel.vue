<template>
  <section class="bg-info overflow-hidden">
    <div
      ref="locationPanelEl"
      id="carouselLocation"
      class="location-panel carousel slide"
      :class="{ active: isScrollTo }"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselLocation"
          data-bs-slide-to="0"
          class="active"
        />
        <button type="button" data-bs-target="#carouselLocation" data-bs-slide-to="1" />
        <button type="button" data-bs-target="#carouselLocation" data-bs-slide-to="2" />
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="shop-taipei" />
          <div
            class="
              carousel-caption
              d-flex
              flex-column
              align-items-center
              justify-content-center
              top-50
              translate-middle-y
            "
          >
            <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
            <a
              href="javascript:;"
              @click="handDisplayCity('Taipei')"
              class="location-link d-inline-block text-decoration-none"
            >
              <h4 class="display-4 pt-5">台北信義店</h4>
              <p class="fs-4 fw-light">地址: 台北市信義區市府路1號</p>
            </a>
          </div>
        </div>
        <div class="carousel-item">
          <div class="shop-taichung" />
          <div
            class="
              carousel-caption
              d-flex
              flex-column
              align-items-center
              justify-content-center
              top-50
              translate-middle-y
            "
          >
            <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
            <a
              href="javascript:;"
              @click="handDisplayCity('Taichung')"
              class="location-link d-inline-block text-decoration-none"
            >
              <h4 class="display-4 pt-5">台中西屯店</h4>
              <p class="fs-4 fw-light">地址: 台中市西屯區台灣大道三段99號</p>
            </a>
          </div>
        </div>
        <div class="carousel-item">
          <div class="shop-kausheng" />
          <div
            class="
              carousel-caption
              d-flex
              flex-column
              align-items-center
              justify-content-center
              top-50
              translate-middle-y
            "
          >
            <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
            <a
              href="javascript:;"
              @click="handDisplayCity('Kaohsiung')"
              class="location-link d-inline-block text-decoration-none"
            >
              <h4 class="display-4 pt-5">高雄苓雅店</h4>
              <p class="fs-4 fw-light">地址: 高雄市苓雅區四維三路2號</p>
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="carousel-control-prev"
        data-bs-target="#carouselLocation"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        type="button"
        class="carousel-control-next"
        data-bs-target="#carouselLocation"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  inject: ['scroll'],
  data() {
    return {
      isScrollTo: false,
      carousel: null,
    };
  },
  methods: {
    setCarousel() {
      this.carousel = new Carousel(this.$refs.locationPanelEl, {
        interval: 8000,
        ride: 'carousel',
      });
    },
    handDisplayCity(city) {
      this.$store.dispatch('handDisplayCity', city);
      this.$router.push('/aboutUs');
    },
  },
  watch: {
    scroll: {
      handler(scroll) {
        const { locationPanelEl } = this.$refs;
        const { offsetTop, clientHeight } = locationPanelEl;
        if (
          scroll.Y > offsetTop - window.innerHeight * 0.67
          && scroll.Y < offsetTop + clientHeight * 0.67
        ) {
          this.isScrollTo = true;
          this.carousel.cycle();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.setCarousel();
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.location-panel {
  transform: translateY(50%);
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  &.active {
    transform: translateY(0);
  }
}

.carousel {
  height: 800px;
}
.shop-taipei,
.shop-taichung,
.shop-kausheng {
  height: 800px;
  background: center no-repeat;
  background-size: cover;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
  }
}
.shop-taipei {
  background-image: url(~@/assets/images/street-cafe-taipei.jpg);
}
.shop-taichung {
  background-image: url(~@/assets/images/street-cafe-taichung.jpg);
}
.shop-kausheng {
  background-image: url(~@/assets/images/street-cafe-kausheng.jpg);
}
.location-link {
  color: $white;
  &:hover {
    color: shade-color($white, 10%);
  }
}
</style>
