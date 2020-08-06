<template>
    <div id="creator-player-class">
        <h1>Choose Class</h1>

        <el-select v-model="creator.class" placeholder="Class">
            <el-option
                v-for="cl in classes"
                :key="cl.name"
                :value="cl"
                :value-key="cl.name"
                :label="cl.name"
            />
        </el-select>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CharacterCreator } from "@/creator/CharacterCreator";
import Pclasses from "@/reference/classes.json";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
export default Vue.extend({
    name: "Creator_PlayerClass",
    props: {
        creator: {
            type: CharacterCreator,
        },
    },
    data() {
        return {
            classes: Pclasses as SourceClass[],
        };
    },
});
</script>

<style></style>
