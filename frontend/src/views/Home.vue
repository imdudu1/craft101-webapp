<template>
  <div class="container">
    <!-- 메인 배너 영역 -->
    <div>
      <hooper>
        <slide>slide1</slide>
        <slide>slide2</slide>
        <slide>slide3</slide>
        <slide>slide4</slide>
      </hooper>
    </div>
    <!-- 랭킹, 게시판 새글 영역 -->
    <div class="row">
      <div class="col-6">
        <div>free board</div>
        <div>mod board</div>
      </div>
      <div class="col-6">ranking</div>
    </div>
    <!-- 아트게시판 갤러리 -->
    <div>art board</div>
    <!-- 마인크래프트 정보 -->
    <div>minecraft news</div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "App",
  components: {
    Hooper,
    Slide,
  },
};
</script>
