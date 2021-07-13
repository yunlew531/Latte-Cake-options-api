<template>
  <teleport v-if="titleTeleportPosition" :to="titleTeleportPosition">
    <h3
      class="title fw-bold text-white px-12 pt-10"
      :class="[
        { 'first-anime': playFirstAnime },
        { 'second-anime': !playFirstAnime },
      ]"
      :style="styleSheets.title"
      @animationend="handTeleport"
    >
      <span class="fw-bolder text-danger tracking-3">SPAGHETTI</span>
    </h3>
    <div class="btns-group ps-12" :class="{ show: !playFirstAnime }">
      <button type="button" class="btn btn-primary">瀏覽菜單</button>
      <button type="button" class="btn btn-primary ms-5">線上訂位</button>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    styleSheets: {
      type: Object,
    },
    isReadyTextShadow: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:isReadyTextShadow': (isReady) => typeof isReady === 'boolean',
  },
  data() {
    return {
      titleTeleportPosition: '',
      playFirstAnime: true,
    };
  },
  methods: {
    handTeleport() {
      this.playFirstAnime = false;
      this.titleTeleportPosition = '#titleTeleportAside';
      this.$emit('update:isReadyTextShadow', true);
    },
  },
  mounted() {
    this.titleTeleportPosition = '#titleTeleportMiddle';
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.title {
  font-family: 'Nothing You Could Do', cursive;
  text-shadow: 0.2rem 0.2rem 0.2rem $white;
  &.first-anime {
    transform: translateY(200%) scale(0.95);
    margin-top: 64px;
    font-size: 12rem;
    animation: first-anime 4s 0.8s forwards cubic-bezier(0.17, 0.67, 0.73, 1.16);
    &::first-letter {
      font-size: 20rem;
    }
  }
  &.second-anime {
    transform: scale(0);
    font-size: 6rem;
    margin-top: 0;
    animation: second-anime 0.5s forwards cubic-bezier(0.17, 0.67, 0.73, 1.16);
    &::first-letter {
      font-size: 10rem;
    }
  }
}
@keyframes first-anime {
  40% {
    transform: translateY(0) scale(0.95);
  }
  50% {
    transform: translateY(0) scale(0.95);
  }
  60% {
    transform: translateY(0) scale(1.05);
  }
  70% {
    transform: translateY(0) scale(1);
  }
  90% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(0) scale(0);
  }
}
@keyframes second-anime {
  100% {
    transform: scale(1);
  }
}

.btns-group {
  transform: translateY(100%);
  &.show {
    animation: btns-group 1s 1s forwards;
  }
}
@keyframes btns-group {
  to {
    transform: translateY(0);
  }
}
</style>
