import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import { installSimpleRouter } from "./router";

const app = createApp(App);
installSimpleRouter(app);
app.mount("#app");
