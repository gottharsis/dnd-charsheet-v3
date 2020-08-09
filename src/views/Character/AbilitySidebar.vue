<template>
    <div id="ability-scores">
        <div class="column" :style="style">
            <ability-display
                v-for="[stat, abScore] in abilityScoresArray"
                :key="stat"
                :stat="stat"
                :score="abScore"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { Character } from "@/models/Character";
import {
    abilityOrder,
    AbilityScore,
    ScoreAbility,
} from "@/models/AbilityScores";
import AbilityDisplay from "./AbilitySidebar/AbilityDisplay.vue";
export default Vue.extend({
    name: "AbilitySidebar",
    computed: {
        character(): Character {
            return store.character;
        },
        abilityScoresArray(): [ScoreAbility, AbilityScore][] {
            return this.character.abilityScores.getArrayForm();
        },
        style(): Record<string, any> {
            return {
                "margin-top": `${this.offset}px`,
            };
        },
    },
    data() {
        return {
            abilityOrder,
            offset: 0,
        };
    },
    components: {
        AbilityDisplay,
    },
    mounted() {
        document.addEventListener("scroll", this.updateOffset);
    },
    methods: {
        updateOffset() {
            this.offset = Math.max(window.scrollY - 60, 0);
        },
    },
});
</script>

<style lang="scss" scoped>
.column {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 76px);
    transition: margin-top 0.2s linear;
}
</style>
