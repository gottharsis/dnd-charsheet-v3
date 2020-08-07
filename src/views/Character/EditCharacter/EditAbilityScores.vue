<template>
    <div id="edit-ability-scores">
        <h2>Ability Scores</h2>
        <form>
            <el-row>
                <el-col
                    v-for="[stat, ability] in statArray"
                    :key="stat"
                    :span="8"
                >
                    <div>{{ stat.toUpperCase() }}</div>
                    <div>
                        <el-input
                            type="number"
                            v-model.number="ability.score"
                        />
                    </div>
                </el-col>
            </el-row>
        </form>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import {
    abilityOrder,
    AbilityScores,
    ScoreAbility,
    AbilityScore,
} from "@/models/AbilityScores";
import { Character } from "@/models/Character";
import { store } from "@/store";
export default Vue.extend({
    name: "EditAbilityScores",

    computed: {
        character(): Character {
            return store.character;
        },
        statArray(): [ScoreAbility, AbilityScore][] {
            return this.character.abilityScores.getArrayForm();
        },
    },
});
</script>
