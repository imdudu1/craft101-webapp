<template>
  <div class="board container border rounded pt-2 pb-2">
    <!-- 헤더 -->
    <div class="d-inline-block w-100 mb-1 pt-2 pb-2 border-bottom justify-content-center">
      <div class="float-left"><h1 class="board-header__title">{{ boardName }}</h1></div>
      <div class="float-right"><span
        class="board-header__more d-flex justify-content-center align-items-center">more</span>
      </div>
    </div>
    <!-- 리스트 -->
    <div>
      <ul class="list-unstyled m-0 w-100">
        <li v-for="article in articles" :key="article" class="board-body__list-item d-table w-100">
          <div class=" board-body__list-item__category d-table-cell">
            <span class="badge badge-info w-100">정보</span>
          </div>
          <div class=" board-body__list-item__subject d-table-cell"><p
            class="board-body__list-item__subject-content m-0 p-0">{{ article }}</p></div>
          <div class=" board-body__list-item__date d-table-cell"><p class="board-body__list-item__date-content m-0 p-0">
            3분 전</p></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "BoardWidget"
})
export default class BoardWidget extends Vue {
  @Prop({ required: true })
  private boardName!: string;

  @Prop({ required: true, type: Array })
  private articles!: string[];

  constructor() {
    super();
  }
}
</script>

<style scoped>
.board:not(:last-child) {
  margin-bottom: 10px;
}

.board-header__title {
  font-size: 16px;
  font-weight: 600;
}

.board-header__more {
  font-size: 13px;
}

.board-body__list-item div * {
  font-size: 13px;
}

.board-body__list-item:not(:last-child) {
  border-bottom: 1px solid #eff1f3;
  margin-bottom: 6px;
  padding-bottom: 6px;
}

.board-body__list-item__category {
  width: 50px;
  vertical-align: middle;
}

.board-body__list-item__category-content {
  text-align: center;
}

.board-body__list-item__subject {
  padding-left: 14px;
  vertical-align: middle;
}

.board-body__list-item__subject-content {
  text-overflow: ellipsis;
}

.board-body__list-item__date {
  width: 87px;
  padding-left: 7px;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.board-body__list-item__date-content {
  text-align: center;
}
</style>
