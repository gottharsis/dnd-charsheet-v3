import { RouteConfig } from "vue-router";

import Creator from "@/views/Creator.vue";
import Index from "@/views/Creator/Index.vue";
export const CreatorRoutes: RouteConfig = {
    path: "/creator",
    name: "Creator",
    component: Creator,
    children: [
        {
            path: "",
            name: "Creator_index",
            component: Index,
        },
    ],
};
