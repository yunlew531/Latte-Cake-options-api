<template>
  <section class="our-team">
    <div class="bg-filter">
      <div class="container py-25">
        <h3 class="text-center text-white">
          我們的專業 <span class="fw-bold text-danger">廚師</span>
        </h3>
        <ul class="row list-unstyled g-8 pt-8">
          <li class="col-4 chef-card position-relative">
            <img
              class="img-fluid"
              src="https://images.unsplash.com/photo-1611728022556-d1475c4ce9d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=923&q=80"
              alt="chef"
            />
            <div
              class="
                card-content
                text-center
                bg-white-100
                position-absolute
                bottom-0
                start-50
                shadow
                rounded-1
                p-5
              "
            >
              <h4 class="chef-name fs-5 pb-2 m-0">ANDERSON</h4>
              <span class="fs-7 text-black-200 d-block py-2">主廚</span>
              <div>
                <a href="javascript:;" class="link-icon">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-google"></i>
                </a>
              </div>
            </div>
          </li>
          <li class="col-4 chef-card position-relative">
            <img
              class="img-fluid"
              src="https://images.unsplash.com/photo-1614436163996-25cee5f54290?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80"
              alt="chef"
            />
            <div
              class="
                card-content
                text-center
                bg-white-100
                position-absolute
                bottom-0
                start-50
                shadow
                rounded-1
                p-5
              "
            >
              <h4 class="chef-name fs-5 pb-2 m-0">ESTELLA</h4>
              <span class="fs-7 text-black-200 d-block py-2">廚師</span>
              <div>
                <a href="javascript:;" class="link-icon">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-google"></i>
                </a>
              </div>
            </div>
          </li>
          <li class="col-4 chef-card position-relative">
            <img
              class="img-fluid"
              src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
              alt="chef"
            />
            <div
              class="
                card-content
                text-center
                bg-white-100
                position-absolute
                bottom-0
                start-50
                shadow
                rounded-1
                p-5
              "
            >
              <h4 class="chef-name fs-5 pb-2 m-0">ISRAEL</h4>
              <span class="fs-7 text-black-200 d-block py-2">廚師</span>
              <div>
                <a href="javascript:;" class="link-icon">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="javascript:;" class="link-icon ms-2">
                  <i class="bi bi-google"></i>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.our-team {
  background-size: cover;
  background: url(~@/assets/images/photo-bg.jpg) center no-repeat;
  background-attachment: fixed;
}

.bg-filter {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}

.chef-card {
  margin-bottom: 70px;
  .chef-name {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scaleX(35);
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: $primary;
    }
  }
  > img {
    height: 500px;

    width: 100%;
    object-fit: cover;
  }
  .card-content {
    transform: translateX(-50%) translateY(50%);
    width: 80%;
  }
}

.link-icon {
  color: $black-300;
  &:hover {
    color: $primary;
  }
}
</style>
