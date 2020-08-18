<template>
    <div id="manage-magic-sources">
        <h1>Manage Magic Sources</h1>
        <el-button type="success" @click="showDialog = true">
            <i class="fas fa-plus"></i>
            New
        </el-button>
        <el-divider />
        <el-row :gutter="20">
            <el-col
                :span="6"
                v-for="magicSource in magicSources"
                :key="magicSource.name"
            >
                <el-card class="overview-card magic-source-card">
                    <el-form>
                        <h3>
                            {{ magicSource.name }}

                            <el-button
                                type="danger"
                                @click="removeSource(magicSource.name)"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </el-button>
                        </h3>

                        <el-form-item label="Casting Stat">
                            <el-select
                                v-model="magicSource.castingStat"
                                @input="recompute"
                            >
                                <el-option
                                    v-for="stat in abilityOrder"
                                    :key="stat"
                                    :value="stat"
                                    :label="stat.toUpperCase()"
                                />
                                <el-option
                                    :value="undefined"
                                    label="None (Fixed DC)"
                                />
                            </el-select>
                        </el-form-item>

                        <template v-if="magicSource.castingStat === undefined">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="DC">
                                        <el-input
                                            v-model.number="magicSource.dc"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Hit Bonus">
                                        <el-input
                                            v-model.number="
                                                magicSource.hitBonus
                                            "
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </template>

                        <el-form-item label="To Prepare">
                            <el-input
                                v-model.number="magicSource.toPrepare"
                                clearable
                                placeholder="N/A"
                            />
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="New Magic Source" :visible.sync="showDialog">
            <el-form>
                <el-form-item label="Name">
                    <el-input
                        v-model="newSource.name"
                        placeholder="Name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Progression">
                    <el-select v-model="newSource.spellSlotProgression">
                        <el-option
                            v-for="{ name, value } in progressionOptions"
                            :key="name"
                            :value="value"
                            :label="name"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="Casting Stat">
                    <el-select
                        v-model="newSource.castingStat"
                        clearable
                        placeholder="Fixed DC"
                    >
                        <el-option
                            v-for="stat in abilityOrder"
                            :key="stat"
                            :value="stat"
                            :label="stat.toUpperCase()"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="Level">
                    <el-input v-model.number="newSource.level" />
                </el-form-item>

                <template v-if="showDcInput">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="DC">
                                <el-input v-model.number="newSource.dc" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Hit Bonus">
                                <el-input v-model.number="newSource.hitBonus" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </template>

                <el-form-item label="To Prepare">
                    <el-input
                        v-model.number="newSource.toPrepare"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="success" @click="addNewSource">
                    <i class="fas fa-plus"></i>
                    Add New Source
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Magic } from "@/models/Magic";
import { store } from "@/store";
import { MagicSource } from "@/models/magic/MagicSource";
import { abilityOrder, ScoreAbility } from "@/models/AbilityScores";
import { Character } from "@/models/Character";

export default Vue.extend({
    name: "ManageMagicSources",
    computed: {
        character(): Character {
            return store.character;
        },
        magic(): Magic {
            return this.character.magic;
        },
        magicSources(): MagicSource[] {
            return this.magic.magicSources;
        },
        showDcInput(): boolean {
            return this.newSource.castingStat === undefined;
        },
    },
    data() {
        return {
            abilityOrder,
            newSource: {
                name: "",
                spellSlotProgression: 0,
                dc: 0,
                hitBonus: 0,
                level: 0,
                castingStat: undefined as ScoreAbility | undefined,
                toPrepare: undefined as undefined | number,
            },
            showDialog: false,
            progressionOptions: [
                {
                    name: "None",
                    value: 0,
                },
                {
                    name: "One-Third",
                    value: 0.33,
                },
                {
                    name: "Half",
                    value: 0.5,
                },
                {
                    name: "Full",
                    value: 1,
                },
            ],
        };
    },
    watch: {
        "newSource.castingStat": function (newVal, oldVal) {
            if (newVal === "") this.newSource.castingStat = undefined;
        },

        "newSource.toPrepare": function (newVal, oldVal) {
            if (newVal === "") this.newSource.toPrepare = undefined;
        },
    },
    methods: {
        addNewSource() {
            const source = new MagicSource(
                this.newSource.name,
                this.newSource.castingStat
            );
            source.dc = this.newSource.dc;
            source.hitBonus = this.newSource.hitBonus;
            source.toPrepare = this.newSource.toPrepare;
            source.level = this.newSource.level;
            source.spellSlotProgression = this.newSource.spellSlotProgression;
            this.magic.addMagicSource(source);

            this.newSource = {
                dc: 0,
                hitBonus: 0,
                toPrepare: undefined,
                level: 0,
                spellSlotProgression: 0,
                castingStat: undefined,
                name: "",
            };

            this.character.recompute();
            this.showDialog = false;
        },
        removeSource(name: string) {
            this.magic.removeMagicSource(name);
        },
        recompute() {
            this.character.recompute();
        },
    },
});
</script>
