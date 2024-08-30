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
        title: "記録/capacohol",
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        title: "ログイン/capacohol",
      },
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "プロフィール/capacohol",
      },
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar,
      meta: {
        title: "カレンダー/capacohol",
      },
    },
  ],
});

const DEFAULT_TITLE = "TITLE";

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE;
});

export default router;
