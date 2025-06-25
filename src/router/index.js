import { createWebHistory, createRouter } from "vue-router";
import { useSystemStore } from "../stores/systemStore";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useSystemStore();

  const userNotRegistered = !store.user || Object.keys(store.user).length === 0;

  if (to.name !== "Home" && userNotRegistered) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
