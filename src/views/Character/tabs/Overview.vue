<template>
    <div id="overview">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="overview-card"><skills /></el-card>
            </el-col>
            <el-col :span="16" :gutter="30">
                <!-- First Row -->
                <el-row :gutter="20">
                    <h2>Basic Stats</h2>
                    <el-col :span="6">
                        <el-card class="overview-card">
                            <div slot="header">
                                AC
                            </div>
                            <!-- <h3>AC</h3> -->
                            <div class="major-number">{{ ac }}</div>
                        </el-card>
                    </el-col>

                    <el-col :span="6">
                        <el-card class="overview-card">
                            <div slot="header">
                                SPEED
                            </div>
                            <!-- <h3>SPEED</h3> -->
                            <div class="major-number">{{ speed }}</div>
                        </el-card>
                    </el-col>

                    <el-col :span="6">
                        <el-card class="overview-card">
                            <div slot="header">
                                SIZE
                            </div>
                            <!-- <h3>SPEED</h3> -->
                            <div class="major-number">{{ size }}</div>
                        </el-card>
                    </el-col>

                    <el-col :span="6">
                        <el-card class="overview-card">
                            <div slot="header">PROFICIENCY BONUS</div>
                            <div class="major-number">
                                +{{ proficiencyBonus }}
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-divider />
                <!-- Second Row -->
                <health-indicator />
                <el-divider />
                <!-- Third Row -->
                <other-proficiencies />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Skills from "../sections/Skills.vue";
import HealthIndicator from "../sections/HealthIndicator.vue";
import OtherProficiencies from "../sections/OtherProficiencies.vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
export default Vue.extend({
    name: "OverviewTab",
    components: {
        Skills,
        HealthIndicator,
        OtherProficiencies,
    },
    computed: {
        character(): Character {
            return store.character;
        },
        ac(): number {
            return this.character.armor.ac;
        },
        speed(): string {
            return this.character.speed;
        },
        size(): string {
            return this.character.size;
        },
        proficiencyBonus(): number {
            return this.character.playerClass.proficiencyBonus;
        },
    },
});
</script>
<style lang="scss">
@import "@/styles/horizon.scss";
.overview-card {
    .el-card__body {
        background: $background-alt;
    }

    .el-card__header {
        background: $accent;
        // color: $lightText;
    }
}
</style>
