<template>
  <AppNavigation />
  <router-view />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppNavigation from "@/components/AppNavigation.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    AppNavigation,
    AppFooter,
  },
});
</script>
