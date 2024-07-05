import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TableView from "../views/TableView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "table",
    component: TableView,
  },
  {
    path: "/changeCurrency",
    name: "change currency",
    component: () => import("../views/ChangeCurrencyView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
