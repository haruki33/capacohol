import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";

// v-calendar
import VCalendar from "v-calendar";
import "v-calendar/style.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

//v-calendarプラグインの登録
app.use(router);
app.use(VCalendar, {});
app.use(vuetify);
app.mount("#app");
