<template>
    <el-container id="character" style="height: 100%;">
        <el-aside>
            <ability-sidebar></ability-sidebar>
        </el-aside>

        <el-main>
            <h1>{{ name }}</h1>
        </el-main>
    </el-container>
</template>
<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { Character } from "@/models/Character";
import AbilitySidebar from "./Character/AbilitySidebar.vue";
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
    },
});
</script>
