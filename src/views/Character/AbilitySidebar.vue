<template>
    <div class="column">
        <ability-display
            v-for="[stat, abScore] in abilityScoresArray"
            :key="stat"
            :stat="stat"
            :score="abScore"
        />
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
    },
    data() {
        return {
            abilityOrder,
        };
    },
    components: {
        AbilityDisplay,
    },
});
</script>

<style lang="scss" scoped>
.column {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 76px);
}
</style>
