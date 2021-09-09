<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 300px;
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">{{ $route.meta.title }}</h1>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--3">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index-hotel",
  data() {
    return {};
  },
};
</script>
<style></style>
