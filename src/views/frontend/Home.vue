<template>
  <Carousel />
  <WhyChooseUs />
  <HotSale />
  <ImmediatelyOrder />
  <AboutMaterialPanel />
  <OurTeam />
  <RestaurantLightbox />
  <LocationPanel />
</template>

<script>
import Carousel from '@/components/frontend/Index/Carousel.vue';
import WhyChooseUs from '@/components/frontend/Index/WhyChooseUs.vue';
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
    HotSale,
    ImmediatelyOrder,
    AboutMaterialPanel,
    OurTeam,
    RestaurantLightbox,
    LocationPanel,
  },
};
</script>
