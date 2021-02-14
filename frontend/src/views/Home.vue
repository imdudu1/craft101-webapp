<template>
  <div class="container">
    <!-- 메인 배너 영역 -->
    <div class="mb-3">
      <hooper>
        <slide>slide1</slide>
        <slide>slide2</slide>
        <slide>slide3</slide>
        <slide>slide4</slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </div>
    <!-- 마인크래프트 정보 -->
    <div class="mb-3">minecraft news</div>
    <!-- 랭킹, 게시판 새글 영역 -->
    <div class="row mb-3">
      <div class="col-6">
        <BoardWidget board-name="📜 자유 게시판" :articles="exampleData" />
        <BoardWidget board-name="⚙️ 모드 게시판" :articles="exampleData" />
      </div>
      <div class="col-6">
        <ServerRankingLIst />
      </div>
    </div>
    <!-- 아트게시판 갤러리 -->
    <div class="mb-3">art board</div>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

import BoardWidget from "@/components/Home/BoardWidget.vue";
import ServerRankingLIst from "@/components/Home/ServerRankingLIst";

export default {
  name: "App",
  components: {
    ServerRankingLIst,
    Hooper,
    Slide,
    HooperNavigation,
    BoardWidget
  },
  data: function() {
    return {
      exampleData: ["test1", "test2", "test3", "test4", "test5"]
    };
  }
};
</script>
