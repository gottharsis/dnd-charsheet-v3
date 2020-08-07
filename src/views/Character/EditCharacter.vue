<template>
    <!-- <div style="overflow-y: scroll !important;"> -->
    <el-container>
        <el-header>
            <el-button type="success" @click="save">Submit</el-button>
            <el-button type="warning" @click="reset">Reset</el-button>
        </el-header>
        <el-main>
            <edit-basic-info />
            <edit-ability-scores />
            <edit-health />
            <edit-classes />
        </el-main>
    </el-container>
    <!-- </div> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
// import rfdcModule from "rfdc";
import klona from "klona";

import EditBasicInfo from "./EditCharacter/EditBasicInfo.vue";
import EditAbilityScores from "./EditCharacter/EditAbilityScores.vue";
import EditHealth from "./EditCharacter/EditHealth.vue";
import EditClasses from "./EditCharacter/EditClasses.vue";

// const rfdc = rfdcModule();
export default Vue.extend({
    name: "EditCharacter",
    data() {
        return {
            characterBackup: undefined as Character | undefined,
            character: store.character,
        };
    },
    beforeMount() {
        this.characterBackup = klona(this.character);
        console.info("Before Mount!! Character backup set!!");
        console.log(this.characterBackup.name);
    },
    methods: {
        reset() {
            if (this.characterBackup) {
                const clone = klona(this.characterBackup);
                store.character = clone;
                this.character = clone;
                this.$forceUpdate();
            }
        },
        save() {
            this.$emit("close");
        },
    },
    components: {
        EditBasicInfo,
        EditAbilityScores,
        EditHealth,
        EditClasses,
    },
});
</script>
