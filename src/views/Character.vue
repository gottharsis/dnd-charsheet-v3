<template>
    <el-container id="character" style="height: 100%;">
        <el-aside>
            <ability-sidebar></ability-sidebar>
        </el-aside>

        <el-main>
            <!-- Edit Dialog -->
            <el-drawer
                title="Edit Character"
                :with-header="false"
                :visible.sync="isEditDrawerVisible"
                :destroy-on-close="true"
            >
                <edit-character @close="isEditDrawerVisible = false" />
            </el-drawer>

            <el-row>
                <h1>{{ name }}</h1>
                <div style="float: right;">
                    <el-button type="info" @click="isEditDrawerVisible = true">
                        <i class="far fa-edit"></i>
                    </el-button>
                </div>
            </el-row>
        </el-main>
    </el-container>
</template>
<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { Character } from "@/models/Character";
import AbilitySidebar from "./Character/AbilitySidebar.vue";
import EditCharacter from "./Character/EditCharacter.vue";
export default Vue.extend({
    name: "Character",
    computed: {
        character(): Character {
            return store.character;
        },
        name(): string {
            return this.character.name;
        },
    },
    components: {
        AbilitySidebar,
        EditCharacter,
    },
    data() {
        return {
            isEditDrawerVisible: false,
        };
    },
});
</script>
