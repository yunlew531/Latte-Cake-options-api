<template>
  <section class="bg-info">
    <div class="why-choose-us-panel bg-white-100" :class="{ active: isAnime }">
      <div class="container overflow-hidden pt-38 pb-25">
        <h3 class="title text-center">
          為什麼選擇
          <span class="text-danger fw-bold px-1">SPAGHETTI</span> ?
        </h3>
        <p class="paragraph text-center fs-6 fw-light pt-3">
          我們的功夫源自於義大利威尼斯，代代相傳並由
          <span class="text-danger fw-bold px-1">SPAGHETTI</span
          >使用最好的原料，<br />讓您以簡單的方式品嘗到健康而正宗的傳統風味。
        </p>
        <ul class="row list-unstyled g-8 py-8">
          <li class="col-4 card-item">
            <div
              class="
                card-container
                px-8
                py-12
                d-flex
                flex-column
                h-100
                shadow
                rounded
                overflow-hidden
              "
            >
              <div class="card-content">
                <h4 class="fs-3">品質</h4>
                <p class="m-0">
                  從尚未加工的原材料開始：蔬菜經過清潔，肉經過研磨、調味和煮熟，雞蛋手工破碎。
                </p>
              </div>
            </div>
          </li>
          <li class="col-4 card-item">
            <div
              class="
                card-container
                px-8
                py-12
                d-flex
                flex-column
                h-100
                shadow
                rounded
                overflow-hidden
              "
            >
              <div class="card-content">
                <h4 class="fs-3">烹飪</h4>
                <p class="m-0">
                  我們不斷學習，主動嘗試最新烹飪趨勢，以符合客人對我們的期待。
                </p>
              </div>
            </div>
          </li>
          <li class="col-4 card-item">
            <div
              class="
                card-container
                px-8
                py-12
                d-flex
                flex-column
                h-100
                shadow
                rounded
                overflow-hidden
              "
            >
              <div class="card-content">
                <h4 class="fs-3">服務</h4>
                <p class="m-0">
                  對待客人像對待自己的朋友一樣善待他們。<br />
                  無論您是誰，我們都提供無可挑剔的服務。
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['scroll'],
  data() {
    return {
      isAnime: false,
    };
  },
  watch: {
    scroll: {
      handler(scroll) {
        if (scroll.Y > 150 && scroll.Y < 1500) this.isAnime = true;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.why-choose-us-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  .title,
  .paragraph {
    opacity: 0;
    transition: 1s 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
  }
  .paragraph {
    transition-delay: 2s;
  }
  .card-item {
    transition: 1s ease-out;
    opacity: 0;
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
    &:nth-child(1) {
      transition-delay: 2.5s;
    }
    &:nth-child(2) {
      transition-delay: 3s;
    }
    &:nth-child(3) {
      transition-delay: 3.5s;
    }
  }
  &.active {
    transform: translateY(0%);
    .title,
    .paragraph {
      opacity: 1;
      transform: translateY(0);
    }
    .card-item {
      &:nth-child(n) {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}

.card-container {
  background: $white;
  transition: 0.3s 0.2s background-color ease-in;
  .card-content {
    transition: 0.3s 0.2s ease-in;
    h4 {
      transition: 0.3s 0.2s ease-in;
      color: $primary;
    }
  }
  &:hover {
    color: $white;
    background: tint-color($primary, 10%);
    .card-content {
      transform: translateY(-20%);
      h4 {
        color: $white;
      }
    }
  }
}
</style>
