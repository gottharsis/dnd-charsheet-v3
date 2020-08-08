<template>
    <div class="ability-score-display">
        <el-row style="height: 100%;">
            <el-col :span="12" class="column">
                <div class="stat-name">{{ stat }}</div>
                <div class="stat-score">{{ score.score }}</div>
            </el-col>
            <el-col :span="12" class="column">
                <div class="stat-modifier">
                    {{ score.modifierString }}
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AbilityScore } from "@/models/AbilityScores";
export default Vue.extend({
    name: "AbilityScoreDisplay",
    props: {
        stat: String,
        score: AbilityScore,
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.ability-score-display {
    margin: 20px;
    flex: 1;

    .stat-name {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
    }

    .stat-score {
        font-size: 16px;
    }

    .stat-modifier {
        font-size: 32px;
        font-weight: bold;
    }

    .column {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
    }

    // border: 1px solid $border;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: $background-alt;

    border-radius: 2px;
}
</style>
