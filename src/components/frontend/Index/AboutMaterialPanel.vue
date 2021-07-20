<template>
  <section class="bg-product-info">
    <div class="bg-filter">
      <div class="about-cake-panel container py-50">
        <div
          class="
            handle-heat
            d-flex
            justify-content-between
            align-items-center
            flex-wrap
          "
          :class="{ active: isScrollToFirstMetarial }"
        >
          <div class="about-cake-img">
            <img
              class="img-fluid"
              src="@/assets/images/image-cake-2.jpg"
              alt="cake"
            />
          </div>
          <div class="p-12">
            <h3
              class="paragraph-title text-primary fs-4 fw-bold tracking-2 mb-5"
            >
              雞蛋
            </h3>
            <p class="paragraph-content-1 fs-6 lh-lg">
              我們的雞蛋僅來自由 Turo 和 Paria France <br />
              等嚴肅公司控制和認證的農場。<br />
            </p>
            <p class="paragraph-content-2 fs-6 m-0 lh-lg">
              這些公司所擁有的高質量標準，<br />
              得到了眾多重要的意大利和歐洲認證的證明。
            </p>
          </div>
        </div>

        <div
          class="
            hold-materials
            d-flex
            justify-content-between
            align-items-center
            flex-wrap
            pt-38
          "
          :class="{ active: isScrollToSecondMetarial }"
        >
          <div class="p-12 order-2 order-xl-1">
            <h3
              class="paragraph-title text-primary fs-4 fw-bold tracking-2 mb-5"
            >
              麵粉
            </h3>
            <p class="paragraph-content-1 fs-6 lh-lg">
              對於麵粉，我們選擇了兩家丹麥大公司的質量和專業知識，<br />
              這兩家公司都處於研磨行業的前沿。
            </p>
            <p class="paragraph-content-2 fs-6 lh-lg">
              精選、磨粉、篩粉、包裝經過一道道程序，<br />
              食材選用是我們不會妥協的地方。
            </p>
            <div class="about-material d-flex justify-content-end mt-12">
              <router-link
                to="/aboutMaterial"
                class="
                  text-decoration-none
                  duration-600
                  d-flex
                  align-items-center
                  p-1
                "
              >
                <h4 class="fs-6 lh-1 m-0">關於更多食材</h4>
                <span class="material-icons ms-1"> trending_flat </span>
              </router-link>
            </div>
          </div>
          <div class="about-flour-img order-1 order-xl-2">
            <img
              class="img-fluid"
              src="@/assets/images/image-flour-2.jpg"
              alt="flour"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutCake',
  inject: ['scroll'],
  data() {
    return {
      isPhone: false,
      isScrollToFirstMetarial: false,
      isScrollToSecondMetarial: false,
    };
  },
  watch: {
    scroll: {
      handler(scroll) {
        if (this.isPhone) {
          // isScrollToFirstMetarial
          if (scroll.Y >= 3142 && scroll.Y <= 4500) {
            this.isScrollToFirstMetarial = true;
          } else this.isScrollToFirstMetarial = false;

          // isScrollToSecondMetarial
          if (scroll.Y >= 4000 && scroll.Y <= 5000) {
            this.isScrollToSecondMetarial = true;
          } else this.isScrollToSecondMetarial = false;
        } else {
          // isScrollToFirstMetarial
          if (scroll.Y >= 2900 && scroll.Y <= 3900) {
            this.isScrollToFirstMetarial = true;
          } else this.isScrollToFirstMetarial = false;

          // isScrollToSecondMetarial
          if (scroll.Y >= 3500 && scroll.Y <= 4600) {
            this.isScrollToSecondMetarial = true;
          } else this.isScrollToSecondMetarial = false;
        }
      },
      deep: true,
    },
  },
  created() {
    this.isPhone = document.body.offsetWidth < 768;
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.bg-product-info {
  background: center no-repeat url(~@/assets/images/image-bg-product-info.jpg);
  background-size: cover;
}

.bg-filter {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.about-cake-panel {
  overflow: hidden;
}

.paragraph-title,
.paragraph-content-1,
.paragraph-content-2 {
  opacity: 0;
  transform: translateY(100px);
}

.about-cake-img {
  transform: translateX(-100%);
}

.about-flour-img {
  transform: translateX(100%);
}

.about-material {
  > a {
    margin-right: 5px;
    color: transparent;
    background: url(~@/assets/images/red-black.png) no-repeat;
    background-position: right -5px top 0;
    background-clip: text;
    &:hover {
      margin-right: 0;
      background-position: right -155px top 0;
    }
  }
}

.handle-heat,
.hold-materials {
  &.active {
    .about-cake-img,
    .about-flour-img {
      opacity: 1;
      transform: translateX(0);
    }
    .paragraph-title,
    .paragraph-content-1,
    .paragraph-content-2 {
      animation: handle-heat-ani 0.5s forwards;
    }
    .paragraph-title {
      animation-delay: 0.3s;
    }
    .paragraph-content-1 {
      animation-delay: 0.8s;
    }
    .paragraph-content-2 {
      animation-delay: 1.3s;
    }
  }
  .about-cake-img,
  .about-flour-img {
    opacity: 0;
    max-width: 700px;
    position: relative;
    transition: 0.5s transform, 5s opacity;
    &::before,
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: tint-color($danger, 10%);
      position: absolute;
      transition: 0.5s;
      clip-path: polygon(50px 0%, 50px 5px, 5px 5px, 5px 50px, 0% 50px, 0% 0%);
    }
    &::before {
      left: 20px;
      top: 20px;
    }
    &::after {
      right: 20px;
      bottom: 20px;
      transform: rotate(180deg);
    }
    &:hover {
      transform: scale(1.03) translateX(0);
      &::before {
        left: 10px;
        top: 10px;
      }
      &::after {
        right: 10px;
        bottom: 10px;
      }
    }
  }
}

@keyframes handle-heat-ani {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
