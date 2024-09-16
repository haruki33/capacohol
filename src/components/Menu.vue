<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>

      <v-tabs color="grey-darken-2" centered>
        <v-tab
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          :to="link.to"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="background-color: #f7d88a">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      links: [
        { text: "regist", to: "/" },
        { text: "calendar", to: "/Calendar" },
        { text: "profile", to: "/Profile" },
      ],
    };
  },

  computed: {
    isMenuNeeded() {
      return this.$route.name !== "Login" && this.$route.name !== "SignIn";
    },
  },

  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.ui.secondary.pointing.menu {
  height: 100px;
  z-index: 1000; /* 必要に応じて値を調整してください */
}
.item {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem; /* アイコンのサイズを大きくします */
}
</style>
