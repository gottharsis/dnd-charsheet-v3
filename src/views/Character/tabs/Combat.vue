<template>
    <div id="combat-tab">
        <!-- first row -->
        <el-row :gutter="20">
            <el-col :span="16"><health /></el-col>
            <el-col :span="8">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div slot="header">
                                AC
                            </div>
                            <div class="major-number">
                                {{ armor.ac }}
                            </div>
                            <div class="comment">
                                {{ armor.name }}
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div slot="header">Initiative</div>
                            <div class="major-number">{{ initiative }}</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card class="overview-card">
                    <div slot="header">
                        SAVING THROWS
                    </div>
                    <el-row>
                        <el-col
                            :span="4"
                            v-for="{ stat, bonus } in savingThrows"
                            :key="stat"
                        >
                            {{ stat.toUpperCase() }}
                            <div class="major-number">
                                {{ bonus }}
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <!-- second row -->
        <el-row :gutter="20">
            <el-col :span="8" id="tracked-abilities">
                <el-card
                    class="overview-card"
                    v-for="ability in trackedAbilities"
                    :key="ability.id"
                >
                    <el-row type="flex" justify="space-between">
                        <h3 style="margin: 0;">{{ ability.name }}</h3>
                        <el-button-group>
                            <el-button @click="ability.use()" type="primary">
                                <i class="fas fa-dragon"></i>
                            </el-button>
                            <el-button
                                @click="ability.restore()"
                                type="primary"
                            >
                                <i class="fas fa-plus"></i>
                            </el-button>
                        </el-button-group>
                        <h3 style="margin: 0;">
                            {{ ability.remainingUses }} / {{ ability.maxUses }}
                        </h3>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Health from "@/views/Character/sections/HealthIndicator.vue";
import { Character, SavingThrow } from "@/models/Character";
import { store } from "@/store";
import { Armor } from "@/models/Armor";
import { modifierString } from "@/util/modifierString";
import { Ability } from "@/models/Ability";
import { abilityOrder, ScoreAbility } from "@/models/AbilityScores";

export default Vue.extend({
    name: "CombatTab",
    components: {
        Health,
    },
    data() {
        return { abilityOrder };
    },
    computed: {
        character(): Character {
            return store.character;
        },
        armor(): Armor {
            return this.character.armor;
        },
        initiative(): string {
            return modifierString(this.character.initiative());
        },
        trackedAbilities(): Ability[] {
            return this.character.abilities;
        },
        savingThrows(): SavingThrow[] {
            return this.character.savingThrows;
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.comment {
    color: $amethyst;
    font-style: italic;
}
</style>
