<template>
    <div id="creator-race">
        <h1>Race</h1>
        <el-row>
            <el-button-group>
                <el-button
                    :type="usingCustom ? '' : 'primary'"
                    @click="useExistingRace"
                >
                    Existing Race
                </el-button>
                <el-button
                    :type="usingCustom ? 'primary' : ''"
                    @click="useCustomRace"
                >
                    Custom Race
                </el-button>
            </el-button-group>
        </el-row>

        <template v-if="usingCustom">
            <el-form style="margin-top: 30px;">
                <h4>Name</h4>
                <el-row>
                    <el-col :span="12" :offset="6">
                        <el-form-item>
                            <el-input
                                v-model="customRace.name"
                                placeholder="Race Name"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

                <h4>Racial Ability Score Increase</h4>
                <el-row :gutter="20">
                    <el-col
                        v-for="stat in [
                            'str',
                            'dex',
                            'con',
                            'int',
                            'wis',
                            'cha',
                        ]"
                        :key="stat"
                        :span="2"
                        :push="6"
                    >
                        {{ stat.toUpperCase() }}
                        <el-input
                            type="number"
                            v-model.number="customRace.ability[stat]"
                        />
                    </el-col>
                </el-row>

                <h4>Size and Speed</h4>
                <el-row>
                    <el-col :push="6" :span="6">
                        Size
                        <el-select v-model="customRace.size">
                            <el-option
                                v-for="size in sizeOptions"
                                :key="size"
                                :label="size"
                                :value="size"
                            />
                        </el-select>
                    </el-col>

                    <el-col :span="6" :push="6">
                        Speed
                        <el-select v-model="customRace.speed">
                            <el-option
                                v-for="speed in speedOptions"
                                :key="speed"
                                :label="speed"
                                :value="speed"
                            />
                        </el-select>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        <template v-else>
            <el-row>
                <el-select v-model="creator.race" size="large">
                    <el-option
                        v-for="race in races"
                        :key="race.name"
                        :value="race"
                        :label="race.name"
                        :value-key="race.name"
                    />
                </el-select>
            </el-row>
            <h4>Racial ASI</h4>
            <el-row v-if="creator.race">
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
        </template>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SourceRace } from "@/models/sourceinfo/SourceRace";
import Races from "@/reference/races.json";
import { CharacterCreator } from "@/creator/CharacterCreator";
// interface RaceData {
//     customRace: SourceRace;
//     races: SourceRace[];
//     usingCustom: boolean;
// }
export default Vue.extend({
    name: "Creator_Race",
    props: {
        creator: CharacterCreator,
    },
    data() {
        const customRace: SourceRace = {
            name: "",
            ability: {
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0,
            },
            size: "med",
            speed: "30 ft",
        };
        return {
            customRace,
            races: Races,
            usingCustom: false,
            sizeOptions: ["small", "medium"],
            speedOptions: ["25 ft.", "30 ft.", "35 ft.", "40 ft."],
        };
        // as RaceData;
    },

    methods: {
        useExistingRace() {
            this.usingCustom = false;
        },
        useCustomRace() {
            this.usingCustom = true;
            this.creator.race = this.customRace;
        },
    },
});
</script>

<style></style>
