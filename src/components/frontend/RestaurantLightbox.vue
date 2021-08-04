<template>
  <section class="container py-25">
    <VueEasyLightbox
      scrollDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="imgIdx"
      @hide="hideLightbox"
    >
    </VueEasyLightbox>
    <div class="row">
      <div class="col-lg-4 small-shop-imgs pt-6">
        <div
          :style="{ 'background-image': `url(${imgFilter})` }"
          class="shop-img w-100 h-100"
          @click="showLightbox(0)"
        ></div>
      </div>
      <div class="small-shop-imgs col-lg-8">
        <ul class="row gx-6 gy-6 h-100 mt-6 mt-lg-0 list-unstyled">
          <li
            v-for="(img, key) in imgsFilter"
            :key="img"
            class="col-6 col-sm-4"
            @click="showLightbox(key + 1)"
          >
            <div :style="{ 'background-image': `url(${img})` }" class="shop-img w-100 h-100"></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { apiGetShopImg } from '@/api';
import VueEasyLightbox from 'vue-easy-lightbox';
import { useToast } from '@/methods';

export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      imgIdx: 0,
      visible: false,
      imgs: [],
    };
  },
  methods: {
    hideLightbox() {
      this.visible = false;
    },
    showLightbox(idx) {
      this.visible = true;
      this.imgIdx = idx;
    },
    async getShopImg() {
      try {
        const res = await apiGetShopImg();
        if (res.status === 200) this.imgs = res.data.map((img) => img.url);
      } catch (err) {
        useToast('無法取得圖片!', 'danger');
      }
    },
  },
  computed: {
    imgFilter() {
      return this.imgs[0];
    },
    imgsFilter() {
      return this.imgs.filter((image, key) => key !== 0);
    },
  },
  created() {
    this.getShopImg();
  },
};
</script>

<style lang="scss">
.btn__close {
  margin-top: 50px;
}
.vel-toolbar {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.shop-img {
  cursor: zoom-in;
  background: center no-repeat;
  background-size: cover;
  border-radius: $border-radius-lg;
  &:hover {
    filter: brightness(1.1);
  }
}
.small-shop-imgs {
  height: 416px;
}
</style>
