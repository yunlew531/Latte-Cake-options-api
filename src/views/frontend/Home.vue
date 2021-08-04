<template>
  <Carousel />
  <WhyChooseUs />
  <Menu ref="menuPanelEl" />
  <HotSale />
  <ImmediatelyOrder />
  <AboutMaterialPanel ref="aboutMaterialPanelEl" />
  <OurTeam />
  <RestaurantLightbox />
  <LocationPanel />
</template>

<script>
import Carousel from '@/components/frontend/Index/Carousel.vue';
import WhyChooseUs from '@/components/frontend/Index/WhyChooseUs.vue';
import Menu from '@/components/frontend/Index/Menu.vue';
import HotSale from '@/components/frontend/Index/HotSale.vue';
import ImmediatelyOrder from '@/components/frontend/Index/ImmediatelyOrder.vue';
import AboutMaterialPanel from '@/components/frontend/Index/AboutMaterialPanel.vue';
import OurTeam from '@/components/frontend/Index/OurTeam.vue';
import RestaurantLightbox from '@/components/frontend/RestaurantLightbox.vue';
import LocationPanel from '@/components/frontend/Index/LocationPanel.vue';

export default {
  name: 'Index',
  components: {
    Carousel,
    WhyChooseUs,
    Menu,
    HotSale,
    ImmediatelyOrder,
    AboutMaterialPanel,
    OurTeam,
    RestaurantLightbox,
    LocationPanel,
  },
  data() {
    return {
      isAjaxResponse: false,
    };
  },
  methods: {
    scrollToEl(ref) {
      const el = this.$refs[ref].$refs[ref];
      const position = el.offsetTop;
      window.scrollTo(0, position);
    },
  },
  watch: {
    isAjaxResponse: {
      handler(status) {
        if (status && this.$route.params.scrollToEl) {
          this.$nextTick(() => {
            this.scrollToEl(this.$route.params.scrollToEl);
          });
        }
      },
    },
  },
  created() {
    this.$store.dispatch('getAllProducts').then(({ success }) => {
      if (success) this.isAjaxResponse = true;
    });
    this.$emitter.on('scrollToEl', this.scrollToEl);
  },
  unmounted() {
    this.$emitter.off('scrollToEl', this.scrollToEl);
  },
};
</script>
