<template>
  <div id="app">
    <AppNavigation />
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppNavigation from "@/components/AppNavigation.vue";
import AppFooter from "@/components/AppFooter.vue";

@Component({
  name: "App",
  components: { AppNavigation, AppFooter }
})
export default class App extends Vue {
}
</script>
