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
        title: "アルコールの記録/キャパコール",
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login/キャパコール",
      },
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "プロフィール/キャパコール",
      },
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar,
      meta: {
        title: "カレンダー/キャパコール",
      },
    },
  ],
});

const DEFAULT_TITLE = "TITLE";

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE;
});

export default router;
