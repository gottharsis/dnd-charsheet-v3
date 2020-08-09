<template>
    <div id="health-indicator">
        <h3 style="margin: 0;">Health</h3>
        <el-row>
            <el-col :span="12">
                <el-card class="overview-card">
                    <h4>Current Health</h4>
                    <span class="major-number">{{ currentHp }}</span>
                    / {{ maxHp }}
                    <template v-if="tempHp > 0">
                        <h4>Temp HP</h4>
                        <div class="major-number">
                            {{ tempHp }}
                        </div>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="overview-card">
                    <h4>Heal or Damage</h4>
                    <el-row>
                        <el-input v-model.number="amount" />
                    </el-row>
                    <el-row>
                        <el-button @click="heal">Heal</el-button>
                        <el-button @click="damage">Damage</el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Health } from "@/models/Health";
export default Vue.extend({
    name: "HealthIndicator",
    computed: {
        character(): Character {
            return store.character;
        },
        health(): Health {
            return this.character.health;
        },
        currentHp(): number {
            return this.health.currentHp;
        },
        tempHp(): number {
            return this.health.tempHp;
        },
        maxHp(): number {
            return this.health.maxHp;
        },
    },
    data() {
        return {
            amount: 0,
        };
    },
    methods: {
        heal() {
            this.health.heal(Math.floor(this.amount));
            this.amount = 0;
        },
        damage() {
            this.health.damage(Math.floor(this.amount));
            this.amount = 0;
        },
    },
});
</script>
