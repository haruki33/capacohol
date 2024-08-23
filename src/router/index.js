import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Calendar from "../views/Calendar.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "register",
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar,
      meta: {
        title: "Calendar",
      },
    },
  ],
});

const DEFAULT_TITLE = "TITLE";

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE;
});

export default router;
