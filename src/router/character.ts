import { RouteConfig } from "vue-router";
import Character from "@/views/Character.vue";

import Overview from "@/views/Character/tabs/Overview.vue";
import Combat from "@/views/Character/tabs/Combat.vue";
import Magic from "@/views/Character/tabs/Magic.vue";
import Abilities from "@/views/Character/tabs/Abilities.vue";
import Inventory from "@/views/Character/tabs/Inventory.vue";
import SpellList from "@/views/Character/tabs/SpellList.vue";
import PrepareSpells from "@/views/Character/tabs/PrepareSpells.vue";

export const CharacterRoutes: RouteConfig = {
    name: "character",
    path: "/character",
    component: Character,

    children: [
        {
            name: "overview",
            path: "overview",
            component: Overview,
        },
        {
            name: "combat",
            path: "combat",
            component: Combat,
        },
        {
            name: "magic",
            path: "magic",
            component: Magic,
        },
        {
            name: "abilities",
            path: "abilities",
            component: Abilities,
        },
        {
            name: "inventory",
            path: "inventory",
            component: Inventory,
        },
        {
            name: "spellList",
            path: "spell-list",
            component: SpellList,
        },
        {
            name: "prepareSpells",
            path: "prepare-spells",
            component: PrepareSpells,
        },
    ],
};
