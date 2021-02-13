<template>
  <div class="container">
    <div class="row pt-3 pb-3">
      <div
        class="col-md-4 d-flex justify-content-start align-items-center"
      ></div>
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <img class="logo-img" src="../assets/logo.png" alt="logo" />
      </div>
      <div class="col-md-4 d-flex justify-content-end align-items-center">
        <nav>
          <a href="#" class="menu__list-item--padding p-0">로그인</a>
          <a href="#" class="menu__list-item--padding p-0">회원가입</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AppNavigation"
})
export default class AppNavigation extends Vue {
}
</script>

<style scoped>
.logo-img {
  height: 50px;
}

.menu__list-item--padding:not(:last-child) {
  margin-right: 16px;
}
</style>
