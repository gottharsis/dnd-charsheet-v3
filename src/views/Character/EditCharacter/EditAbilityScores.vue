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
        <h2>Saving Throws</h2>
        <el-form>
            <el-row>
                <el-col
                    v-for="{ stat, isProficient } in sThrows"
                    :key="stat"
                    :span="4"
                >
                    <el-form-item :label="stat.toUpperCase()">
                        <el-checkbox
                            @input="setSavingThrow($event, stat)"
                            :checked="isProficient"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
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

interface SThrow {
    stat: ScoreAbility;
    isProficient: boolean;
}

export default Vue.extend({
    name: "EditAbilityScores",

    computed: {
        character(): Character {
            return store.character;
        },
        statArray(): [ScoreAbility, AbilityScore][] {
            return this.character.abilityScores.getArrayForm();
        },
        savingThrows(): Set<ScoreAbility> {
            return (this.changeTracker &&
                this.character.proficiencies.savingThrows) as Set<ScoreAbility>;
        },
        sThrows(): SThrow[] {
            return this.abilityOrder.map((stat) => ({
                stat,
                isProficient: this.savingThrows.has(stat),
            }));
        },
    },

    data() {
        return {
            abilityOrder,
            changeTracker: 1,
        };
    },

    methods: {
        setSavingThrow(isProficient: boolean, stat: ScoreAbility) {
            if (isProficient) {
                this.savingThrows.add(stat);
            } else {
                this.savingThrows.delete(stat);
            }
            this.changeTracker++;
            console.log(this.character.proficiencies.savingThrows);
        },
    },
});
</script>
