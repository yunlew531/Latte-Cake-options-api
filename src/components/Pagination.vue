<template>
  <section class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination m-0">
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page === 1 }"
        >
          <a
            class="page-link"
            href="javascript:;"
            aria-label="Previous"
            @click="handPage(-1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pagination.total_pages"
          :key="page"
          class="page-item"
          :class="[{ active: page === pagination.current_page }]"
        >
          <a
            class="page-link"
            href="javascript:;"
            @click="handPage(page, true)"
            >{{ page }}</a
          >
        </li>
        <li
          class="page-item"
          :class="{
            disabled: pagination.current_page === pagination.total_pages,
          }"
        >
          <a
            class="page-link"
            href="javascript:;"
            aria-label="Next"
            @click="handPage(1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: {
    handPage: (page) => typeof page === 'number',
  },
  data() {
    return {
      pagination: {},
    };
  },
  methods: {
    handPage(num, isPage) {
      let page = 1;
      if (isPage) {
        if (this.pagination.current_page === num) return;
        page = num;
      } else if (
        this.pagination.current_page + num
        >= this.pagination.total_pages
      ) {
        page = this.pagination.total_pages;
      }
      this.$emit('handPage', page);
    },
  },
  watch: {
    pages: {
      handler(val) {
        this.pagination = val;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
