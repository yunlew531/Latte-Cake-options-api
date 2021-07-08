<script>
export default {
  data() {
    return {
      scroll: { Y: 0 },
    };
  },
  methods: {
    getPosition() {
      this.scroll.Y = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.getPosition);
  },
  unmounted() {
    window.removeEventListener('scroll', this.getPosition);
  },
};
</script>
