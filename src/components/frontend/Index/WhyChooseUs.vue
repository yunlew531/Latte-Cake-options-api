<template>
  <section
    class="why-choose-us-panel container overflow-hidden pt-38 pb-25"
    :class="{ active: isAnime }"
  >
    <h3 class="title text-center overflow-hidden">
      <span class="title-text d-block">
        為什麼選擇
        <span class="text-danger fw-bold px-1">SPAGHETTI</span> ?
      </span>
    </h3>
    <p class="paragraph text-center fs-6 fw-light overflow-hidden pt-3">
      <span class="paragraph-text d-block">
        我們的功夫源自於義大利威尼斯，代代相傳並由
        <span class="text-danger fw-bold px-1">SPAGHETTI</span
        >使用最好的原料，<br />讓您以簡單的方式品嘗到健康而正宗的傳統風味。
      </span>
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
  .title-text,
  .paragraph-text {
    transition: 0.3s ease-in;
    transform: translateY(100%);
  }
  .title-text {
    transition-delay: 0.2s;
  }
  .paragraph-text {
    transition-delay: 0.6s;
  }
  .card-item {
    transition: 0.5s;
    &:nth-child(n) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateX(-100%);
      transition-delay: 1s;
    }
    &:nth-child(2) {
      transition-delay: 1.5s;
      transform: translateY(100%);
    }
    &:nth-child(3) {
      transform: translateX(100%);
      transition-delay: 1s;
    }
  }
  &.active {
    .title-text,
    .paragraph-text {
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
