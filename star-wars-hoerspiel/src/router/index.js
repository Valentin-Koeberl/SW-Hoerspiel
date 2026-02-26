import { h, reactive } from "vue";
import StarWarsFanPage from "../components/StarWarsFanPage.vue";
import Player from "../components/Player.vue";

const routes = {
  "/": StarWarsFanPage,
  "/player": Player,
};

const state = reactive({
  currentPath: window.location.pathname in routes ? window.location.pathname : "/",
});

function setPath(path) {
  state.currentPath = path in routes ? path : "/";
}

window.addEventListener("popstate", () => setPath(window.location.pathname));

export const router = {
  push(path) {
    if (!(path in routes)) {
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }

    setPath(path);
  },
};

export function installSimpleRouter(app) {
  app.config.globalProperties.$router = router;
  app.provide("simpleRouterState", state);
}

export const RouterView = {
  name: "RouterView",
  setup() {
    return () => {
      const component = routes[state.currentPath] ?? routes["/"];
      return h(component);
    };
  },
};
