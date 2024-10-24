<template>
  <v-app>
    <Menu />
  </v-app>
</template>

<script>
// import { RouterView } from "vue-router";
import Menu from "@/components/Menu.vue";

export default {
  name: "App",

  components: {
    Menu,
  },
};
</script>
