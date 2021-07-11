<template>
  <section class="container pt-38 pb-25">
    <h3 class="text-center">
      為什麼選擇 <span class="text-danger fw-bold px-1">Latte & Cake</span> ?
    </h3>
    <p class="text-center fs-6 fw-light pt-3">
      我們的功夫源自於義大利威尼斯，代代相傳並由
      <span class="text-danger fw-bold px-1">Latte & Cake</span
      >使用最好的原料，<br />讓您以簡單的方式品嘗到健康而正宗的傳統風味。
    </p>
    <ul class="d-flex list-unstyled row g-8 py-8">
      <li class="col-4">
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
      <li class="col-4">
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
      <li class="col-4">
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
export default {};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

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
