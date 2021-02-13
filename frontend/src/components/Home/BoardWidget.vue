<template>
  <div class="container mb-3">
    <!-- 헤더 -->
    <div class="row d-flex justify-content-between">
      <div>{{ boardName }}</div>
      <div>더보기</div>
    </div>
    <!-- 리스트 -->
    <div>
      <ul>
        <li v-for="article in articles" :key="article">
          <p>{{ article }}</p>
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
    console.log(this.articles);
  }
}
</script>

<style scoped></style>
