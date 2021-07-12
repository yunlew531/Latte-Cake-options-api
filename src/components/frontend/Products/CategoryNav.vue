<template>
  <teleport v-if="navTeleport" :to="navTeleport">
    <section
      class="products-nav-panel bg-white rounded shadow-sm p-10"
      :class="{ 'drop-down': isScrollDown }"
    >
      <ul
        class="
          d-flex
          flex-grow-1
          list-unstyled
          text-center
          mb-0
          order-1
          overflow-hidden
        "
        :class="
          navTeleport === '#navbarTeleportAside' ? 'flex-wrap' : 'flex-nowrap'
        "
      >
        <li
          v-for="category in categoryList"
          :key="category"
          class="flex-grow-1 py-3 text-nowrap"
          :class="{ active: nowCategory === category }"
          @click="$emit('update:nowCategory', category)"
          @mouseenter="nowHoverCategory = category"
          @mouseleave="nowHoverCategory = ''"
        >
          {{ category }}
        </li>
      </ul>
      <div class="d-flex flex-column order-0">
        <div class="progress position-relative flex-grow-1">
          <div
            class="progress-bar position-absolute"
            :style="progressBarAnime"
            role="progressbar"
          ></div>
        </div>
      </div>
    </section>
  </teleport>
</template>

<script>
export default {
  props: {
    nowCategory: {
      type: String,
      default: '全部',
    },
    isScrollDown: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:nowCategory': (category) => typeof category === 'string',
  },
  inject: ['scroll'],
  data() {
    return {
      categoryList: ['全部', '咖啡', '蛋糕', '甜甜圈', '其他2', '其他3'],
      nowHoverCategory: '',
      navTeleport: '',
      teleportTopToAsideTimeout: null,
      teleportAsideToTopTimeout: null,
    };
  },
  computed: {
    progressBarAnime() {
      let style = [];
      const percent = 100 / this.categoryList.length;
      let position = 0;
      let sizeDirection = null;
      let zeroDirection = null;
      // 有 hover nav 時動畫停在 hover 元素，反之動畫停在 nowCategory 元素
      if (this.nowHoverCategory) {
        this.categoryList.forEach((item, idx) => {
          if (item === this.nowHoverCategory) position = idx * percent;
        });
      } else {
        this.categoryList.forEach((item, idx) => {
          if (item === this.nowCategory) position = idx * percent;
        });
      }
      // isScrollDown 判斷 nav 是水平或是垂直
      if (this.isScrollDown) {
        sizeDirection = 'height';
        zeroDirection = 'top';
      } else {
        sizeDirection = 'width';
        zeroDirection = 'left';
      }
      style = [
        { [sizeDirection]: `${percent}%` },
        { [zeroDirection]: `${position}%` },
      ];
      return style;
    },
  },
  watch: {
    isScrollDown(down) {
      // isScrollDown 會觸發css動畫，動畫跑完再 teleport
      if (down) {
        clearTimeout(this.teleportAsideToTopTimeout);
        this.teleportTopToAsideTimeout = setTimeout(() => {
          this.navTeleport = '#navbarTeleportAside';
        }, 150);
      } else {
        clearTimeout(this.teleportTopToAsideTimeout);
        this.teleportAsideToTopTimeout = setTimeout(() => {
          this.navTeleport = '#navbarTeleportTop';
        }, 150);
      }
    },
  },
  mounted() {
    this.navTeleport = '#navbarTeleportTop';
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.products-nav-panel {
  transform: translateY(-50px);
  margin-bottom: -30px;
  transition: 1s ease-in;
  > ul {
    > li {
      width: 16.667%;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: tint-color($danger, 30%);
      }
      &.active {
        color: $danger;
        font-weight: $font-weight-bold;
      }
    }
  }
  &.drop-down {
    display: flex;
    position: sticky;
    transform: translateY(-50%);
    margin-bottom: 0;
    animation: drop-down 0.3s both;
    li {
      width: 100%;
    }
    .progress {
      width: 3px;
      display: flex;
      flex-direction: column;
    }
    .progress-bar {
      width: 100%;
    }
  }
}
@keyframes drop-down {
  from {
    top: 20%;
  }
  to {
    top: 50%;
  }
}

.progress {
  height: 3px;
}

.progress-bar {
  transition: 0.3s;
  height: 100%;
}
</style>
