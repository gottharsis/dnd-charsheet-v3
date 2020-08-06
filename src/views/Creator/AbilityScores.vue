<template>
    <div id="creator-ability-scores">
        <h1>Ability Scores</h1>
        <h2>Generation Method</h2>
        <el-row>
            <el-button-group>
                <el-button
                    :type="
                        currentGenerationMethod === 'Manual' ? 'primary' : ''
                    "
                    @click="currentGenerationMethod = 'Manual'"
                >
                    Manual
                </el-button>
                <el-button
                    :type="
                        currentGenerationMethod === 'Point Buy' ? 'primary' : ''
                    "
                    @click="currentGenerationMethod = 'Point Buy'"
                >
                    Point Buy
                </el-button>
            </el-button-group>
        </el-row>

        <h2>Chosen Stats</h2>

        <el-row>
            <el-col
                v-for="stat in ['str', 'dex', 'con', 'int', 'wis', 'cha']"
                :key="stat"
                :span="2"
                :push="6"
            >
                <div>{{ stat.toUpperCase() }}</div>
                <el-input v-model.number="creator.abilityScores[stat].score" />
            </el-col>
        </el-row>

        <template v-if="currentGenerationMethod === 'Point Buy'">
            <h3>Remaining Points: {{ remainingPoints }}</h3>
        </template>

        <template v-if="creator.race">
            <h2>Racial Ability Bonus - {{ creator.race.name }}</h2>
            <el-row>
                <el-col
                    v-for="stat in ['str', 'dex', 'con', 'int', 'wis', 'cha']"
                    :key="stat"
                    :span="2"
                    :push="6"
                >
                    <p>{{ stat.toUpperCase() }}</p>
                    <p style="font-weight: bold; font-size: 16px;">
                        {{ creator.race.ability[stat] }}
                    </p>
                </el-col>
            </el-row>

            <h2>Total Scores</h2>

            <el-row>
                <el-col
                    v-for="stat in ['str', 'dex', 'con', 'int', 'wis', 'cha']"
                    :key="stat"
                    :span="2"
                    :push="6"
                >
                    <p>{{ stat.toUpperCase() }}</p>
                    <p style="font-weight: bold; font-size: 16px;">
                        {{
                            creator.race.ability[stat] +
                            creator.abilityScores[stat].score
                        }}
                    </p>
                    <p>
                        Modifier:
                        {{
                            Math.floor(
                                (creator.race.ability[stat] +
                                    creator.abilityScores[stat].score -
                                    10) /
                                    2
                            )
                        }}
                    </p>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CharacterCreator } from "@/creator/CharacterCreator";
import { ScoreAbility } from "@/models/AbilityScores";
export default Vue.extend({
    name: "Creator_AbilityScores",
    data() {
        return {
            currentGenerationMethod: "Manual" as "Manual" | "Point Buy",
        };
    },
    props: {
        creator: CharacterCreator,
    },

    computed: {
        remainingPoints() {
            const totalPoints = 27 + 8 * 6;
            const usedPoints = ([
                "str",
                "dex",
                "con",
                "int",
                "wis",
                "cha",
            ] as ScoreAbility[])
                .map(
                    (stat) =>
                        (this.creator as CharacterCreator).abilityScores[stat]
                            .score
                )
                .reduce((a, b) => a + b);
            return totalPoints - usedPoints;
        },
    },
});
</script>

<style></style>
