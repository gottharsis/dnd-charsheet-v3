<template>
    <el-container id="character" style="height: 100%;">
        <el-aside>
            <ability-sidebar></ability-sidebar>
        </el-aside>

        <el-container>
            <el-main>
                <!-- Edit Dialog -->
                <el-drawer
                    title="Edit Character"
                    :visible.sync="isEditDrawerVisible"
                    :destroy-on-close="true"
                >
                    <edit-character @close="isEditDrawerVisible = false" />
                </el-drawer>

                <h1>
                    {{ name }}
                    <el-button type="info" @click="isEditDrawerVisible = true">
                        <i class="far fa-edit"></i>
                    </el-button>
                </h1>
                <el-row>
                    {{ character.race }} {{ character.playerClass }}
                </el-row>

                <!-- <el-tabs tab-position="top">
                    <el-tab-pane
                        v-for="tab in tabs"
                        :key="tab.name"
                        :label="tab.name"
                    >
                        <component :is="tab.component" />
                    </el-tab-pane>
                </el-tabs> -->

                <el-menu
                    mode="horizontal"
                    :default-active="selectedTab"
                    :active-text-color="blue"
                >
                    <el-menu-item
                        v-for="{ name, path } in tabs"
                        :key="name"
                        :index="name"
                        @click="navigateTo(path)"
                    >
                        {{ name }}
                    </el-menu-item>
                </el-menu>

                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { Character } from "@/models/Character";
import AbilitySidebar from "./Character/AbilitySidebar.vue";
import EditCharacter from "./Character/EditCharacter.vue";

// import Overview from "./Character/tabs/Overview.vue";
// import Combat from "./Character/tabs/Combat.vue";
// import Magic from "./Character/tabs/Magic.vue";
// import Abilities from "./Character/tabs/Abilities.vue";
// import Inventory from "./Character/tabs/Inventory.vue";
// import SpellList from "./Character/tabs/SpellList.vue";
// import PrepareSpells from "./Character/tabs/PrepareSpells.vue";

interface Tab {
    name: string;
    component: any;
}
export default Vue.extend({
    name: "Character",
    computed: {
        character(): Character {
            return store.character;
        },
        name(): string {
            return this.character.name;
        },
        // selectedComponent(): any {
        //     if (this.selectedTab in this.tabs) {
        //         return this.tabs[this.selectedTab].component;
        //     }
        //     return this.tabs["overview"].component;
        // },
    },
    components: {
        AbilitySidebar,
        EditCharacter,
        // Overview,
        // Combat,
        // Inventory,
        // SpellList,
        // PrepareSpells,
    },
    data() {
        return {
            isEditDrawerVisible: false,
            tabs: [
                {
                    name: "Overview",
                    // component: Overview,
                    path: "/character/overview",
                },
                {
                    name: "Combat",
                    // component: Combat,
                    path: "/character/combat",
                },
                {
                    name: "Magic",
                    // component: Magic,
                    path: "/character/magic",
                },
                {
                    name: "Features and Abilities",
                    // component: Abilities,
                    path: "/character/abilities",
                },
                {
                    name: "Inventory",
                    // component: Inventory,
                    path: "/character/inventory",
                },
                {
                    name: "All Spells",
                    // component: SpellList,
                    path: "/character/spell-list",
                },
                {
                    name: "Prepare Spells",
                    // component: PrepareSpells,
                    path: "/character/prepare-spells",
                },
                {
                    name: "Manage Magic Sources",
                    path: "/character/manage-magic-sources",
                },
            ],
            // tabOrder: ["overview", "combat"],
            selectedTab: "",
        };
    },
    methods: {
        navigateTo(path: string) {
            this.$router.push(path);
        },
    },
});
</script>
