import { h, reactive } from "vue";
import StarWarsFanPage from "../components/StarWarsFanPage.vue";
import Player from "../components/Player.vue";

const routes = {
  "/": StarWarsFanPage,
  "/player": Player,
};

const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function normalizeToRoute(pathname) {
  if (baseUrl && pathname.startsWith(baseUrl)) {
    const rest = pathname.slice(baseUrl.length) || "/";
    return rest.startsWith("/") ? rest : `/${rest}`;
  }

  return pathname in routes ? pathname : "/";
}

function toBrowserPath(routePath) {
  if (baseUrl === "") {
    return routePath;
  }

  return routePath === "/" ? `${baseUrl}/` : `${baseUrl}${routePath}`;
}

const state = reactive({
  currentPath: normalizeToRoute(window.location.pathname),
});

function setPath(pathname) {
  state.currentPath = normalizeToRoute(pathname);
}

window.addEventListener("popstate", () => setPath(window.location.pathname));

export const router = {
  push(path) {
    if (!(path in routes)) {
      return;
    }

    const browserPath = toBrowserPath(path);
    if (window.location.pathname !== browserPath) {
      window.history.pushState({}, "", browserPath);
    }

    state.currentPath = path;
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
