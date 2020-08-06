<template>
    <div id="completion">
        <h1>Confirmation</h1>
        <h2>Basic Info</h2>
        <p>Name: {{ creator.name || "No name" }}</p>

        <h2>Race</h2>
        <p>{{ (creator.race && creator.race.name) || "None selected" }}</p>

        <h2>Ability Scores (non-racial)</h2>
        <el-row>
            <el-col
                v-for="stat in ['str', 'dex', 'con', 'int', 'wis', 'cha']"
                :key="stat"
                :span="2"
                :push="6"
            >
                <div>{{ stat.toUpperCase() }}</div>
                <div>{{ creator.abilityScores[stat].score }}</div>
            </el-col>
        </el-row>

        <h2>Class</h2>
        <p>{{ (creator.class && creator.class.name) || "None Selected" }}</p>

        <el-row>
            <el-button type="primary" @click="createCharacter">
                Create Character
            </el-button>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CharacterCreator } from "@/creator/CharacterCreator";
export default Vue.extend({
    name: "Confirmation",
    props: {
        creator: {
            type: CharacterCreator,
        },
    },
    methods: {
        createCharacter() {
            this.$emit("create-character");
        },
    },
});
</script>
