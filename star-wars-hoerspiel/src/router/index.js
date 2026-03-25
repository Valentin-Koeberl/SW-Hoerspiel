import { computed, h, markRaw, reactive } from "vue";
import StarWarsFanPage from "../components/StarWarsFanPage.vue";
import Player from "../components/Player.vue";
import StoryPage from "../components/StoryPage.vue";

const RawStarWarsFanPage = markRaw(StarWarsFanPage);
const RawPlayer = markRaw(Player);
const RawStoryPage = markRaw(StoryPage);

const routes = [
  {
    match(path) {
      if (path !== "/") {
        return null;
      }

      return {
        component: RawStarWarsFanPage,
        params: {},
      };
    },
  },
  {
    match(path) {
      if (path !== "/vorgeschichte") {
        return null;
      }

      return {
        component: RawStoryPage,
        params: {},
      };
    },
  },
  {
    match(path) {
      const match = path.match(/^\/chapter\/([^/]+)$/);
      if (!match) {
        return null;
      }

      return {
        component: RawPlayer,
        params: {
          bookId: decodeURIComponent(match[1]),
        },
      };
    },
  },
];

const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function normalizeToRoute(pathname) {
  if (baseUrl && pathname.startsWith(baseUrl)) {
    const rest = pathname.slice(baseUrl.length) || "/";
    pathname = rest.startsWith("/") ? rest : `/${rest}`;
  }

  for (const route of routes) {
    const matched = route.match(pathname);
    if (matched) {
      return {
        path: pathname,
        ...matched,
      };
    }
  }

  return {
    path: "/",
    component: RawStarWarsFanPage,
    params: {},
  };
}

function toBrowserPath(routePath) {
  if (baseUrl === "") {
    return routePath;
  }

  return routePath === "/" ? `${baseUrl}/` : `${baseUrl}${routePath}`;
}

const state = reactive({
  currentRoute: normalizeToRoute(window.location.pathname),
});

function setPath(pathname) {
  state.currentRoute = normalizeToRoute(pathname);
}

window.addEventListener("popstate", () => setPath(window.location.pathname));

export const router = {
  push(path) {
    const browserPath = toBrowserPath(path);
    if (window.location.pathname !== browserPath) {
      window.history.pushState({}, "", browserPath);
    }

    state.currentRoute = normalizeToRoute(path);
  },
};

export function installSimpleRouter(app) {
  app.config.globalProperties.$router = router;
  app.provide("simpleRouterState", state);
}

export function getCurrentRoute() {
  return computed(() => state.currentRoute);
}

export const RouterView = {
  name: "RouterView",
  setup() {
    return () => {
      const fallbackComponent = state.currentRoute.component ?? RawStarWarsFanPage;
      return h(fallbackComponent, { key: state.currentRoute.path });
    };
  },
};
