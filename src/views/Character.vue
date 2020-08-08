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

                <el-tabs tab-position="top">
                    <el-tab-pane
                        v-for="tab in tabs"
                        :key="tab.name"
                        :label="tab.name"
                    >
                        <component :is="tab.component" />
                    </el-tab-pane>
                </el-tabs>
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

import Overview from "./Character/tabs/Overview.vue";
import Combat from "./Character/tabs/Combat.vue";

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
        Overview,
        Combat,
    },
    data() {
        return {
            isEditDrawerVisible: false,
            tabs: [
                {
                    name: "Overview",
                    component: Overview,
                },
                {
                    name: "Combat",
                    component: Combat,
                },
            ],
            // tabOrder: ["overview", "combat"],
            // selectedTab: "overview",
        };
    },
});
</script>
