<template>
    <div id="other-proficiencies">
        <h2>
            Other Proficiencies
        </h2>
        <el-row>
            <el-col :span="8">
                <el-card class="overview-card">
                    <div slot="header">Languages</div>
                    <ul>
                        <li v-for="lang in languages" :key="lang">
                            {{ lang }}
                        </li>
                    </ul>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card class="overview-card">
                    <div slot="header">Tools</div>
                    <ul>
                        <li v-for="tool in tools" :key="tool">
                            {{ tool }}
                        </li>
                    </ul>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card class="overview-card">
                    <div slot="header">Weapons and Armor</div>
                    <div>
                        <b>Weapons:</b>
                        {{ weapons }}
                    </div>
                    <div>
                        <b>Armor:</b>
                        {{ armor }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Proficiencies } from "@/models/Proficiency";
export default Vue.extend({
    name: "OtherProficiencies",
    computed: {
        character(): Character {
            return store.character;
        },

        languages(): string[] {
            return [...this.character.proficiencies.languages];
        },
        tools(): string[] {
            const arr: string[] = [];
            this.character.proficiencies.tools.forEach((value, key) => {
                if (value >= 1) {
                    arr.push(key + (value === 2) ? " (Expertise)" : "");
                }
            });
            return arr;
        },
        armor(): string {
            return [...this.character.proficiencies.armor].join(", ");
        },
        weapons(): string {
            return [...this.character.proficiencies.weapons].join(", ");
        },
    },
});
</script>
