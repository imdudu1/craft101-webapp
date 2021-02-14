<template>
  <div class="container border rounded pt-2 pb-2 h-100">
    <!-- 헤더 -->
    <div class="d-inline-block w-100 mb-2 pt-2 pb-2 border-bottom justify-content-center">
      <div class="float-left"><h1 class="board-header__title">👑 서버 랭킹</h1></div>
      <div class="float-right"><span
        class="board-header__more d-flex justify-content-center align-items-center">more</span>
      </div>
    </div>
    <!-- 바디 -->
    <div></div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "ServerRankingLIst"
})
export default class ServerRankingLIst extends Vue {

}
</script>

<style scoped>
.board-header__title {
  font-size: 16px;
  font-weight: 600;
}
.board-header__more {
  font-size: 13px;
}

.board-body__list-item__category-content {
}

.board-body__list-item__subject-content {
}

.board-body__list-item__date-content {
}
</style>
