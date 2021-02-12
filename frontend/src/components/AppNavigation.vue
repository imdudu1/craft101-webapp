<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-4 d-flex justify-content-start align-content-center"
      ></div>
      <div class="col-md-4 d-flex justify-content-center align-content-center">
        <img class="logo-img" src="../assets/images/logo.png" alt="logo" />
      </div>
      <div class="col-md-4 d-flex justify-content-end align-content-center">
        <ul
          class="list-inline d-flex justify-content-center align-content-center"
        >
          <li class="list-inline-item">로그인</li>
          <li class="list-inline-item">회원가입</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppNavigation",
});
</script>

<style scoped>
.logo-img {
  height: 50px;
}
</style>
