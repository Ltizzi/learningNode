import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import TheLaunch from "./components/layout/TheLaunch.vue";
import TheUpcoming from "./components/layout/TheUpcoming.vue";
import TheHistory from "./components/layout/TheHistory.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/launch" },
    { path: "/launch", component: TheLaunch },
    { path: "/upcoming", component: TheUpcoming },
    { path: "/history", component: TheHistory },
  ],
});

export default router;
