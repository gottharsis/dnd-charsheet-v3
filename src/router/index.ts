import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { CreatorRoutes } from "./creator";
import Welcome from "@/views/Welcome.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Welcome",
        component: Welcome,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    // CreatorRoutes,
    {
        path: "/creator",
        name: "Creator",
        component: () => import("@/views/Creator.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
