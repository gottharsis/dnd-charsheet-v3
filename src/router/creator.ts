import { RouteConfig } from "vue-router";

import Creator from "@/views/Creator.vue";
import BasicInfo from "@/views/Creator/BasicInfo.vue";
export const CreatorRoutes: RouteConfig = {
    path: "/creator",
    name: "Creator",
    component: Creator,
    children: [
        {
            path: "",
            name: "Creator_basicInfo",
            component: BasicInfo,
        },
    ],
};
