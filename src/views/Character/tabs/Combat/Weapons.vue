<template>
    <div id="weapons">
        <h2>Weapons</h2>
        <el-row :gutter="20" justify="center">
            <el-col :span="6" v-for="weapon in weapons" :key="weapon.id">
                <el-card class="overview-card">
                    <div slot="header">{{ weapon.name }}</div>
                    <div class="major-number">{{ weapon.hitBonus }}</div>
                    <p>{{ weapon.damage }}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Weapon } from "@/models/Weapon";
import { store } from "@/store";
import { SpellBySource } from "@/models/Magic";
export default Vue.extend({
    name: "WeaponsSection",

    computed: {
        weapons(): Weapon[] {
            return store.character.weapons;
        },
    },
});
</script>
