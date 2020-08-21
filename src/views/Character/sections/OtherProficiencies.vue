<template>
    <div id="other-proficiencies">
        <h2 @click="showEdit = true" style="cursor: pointer;">
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
                    <!-- <ul>
                        <li
                            v-for="{ tool, proficiency } in toolsArr"
                            :key="tool"
                        >
                            {{ tool }}
                            <span v-if="proficiency === 2">
                                (Expertise)
                            </span>
                        </li>
                    </ul> -->
                    <p v-for="{ tool, proficiency } in toolsArr" :key="tool">
                        <span
                            v-if="proficiency === 1"
                            class="proficiency-check"
                        >
                            <i class="fas fa-check"></i>
                        </span>
                        <span
                            v-else-if="proficiency === 2"
                            class="proficiency-check"
                        >
                            <i class="fas fa-check-double"></i>
                        </span>
                        {{ tool }}
                    </p>
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

        <el-dialog :visible.sync="showEdit" title="Edit Proficiencies">
            <el-form>
                <h3>Tools</h3>
                <el-row :gutter="30">
                    <el-col
                        :span="12"
                        v-for="{ tool, proficiency } in toolsArr"
                        :key="tool"
                    >
                        <el-row type="flex" justify="space-between">
                            <div>
                                {{ tool }}
                                <el-button type="text" style="color: red;" @click="deleteTool(tool)">
                                    <i class="fas fa-trash-alt"></i>
                                </el-button>
                            </div>
                            <div>
                                <el-select
                                    :value="proficiency"
                                    @input="setTool(tool, $event)"
                                >
                                    <el-option
                                        v-for="option in proficiencyOptions"
                                        :key="option.text"
                                        :value="option.value"
                                        :label="option.text"
                                    />
                                </el-select>
                            </div>
                        </el-row>
                        <!-- <el-form-item :label="tool">
                            <el-button type="text" style="color: red;">
                                <i class="fas fa-trash-alt"></i>
                            </el-button>
                            <el-select
                                :value="proficiency"
                                @input="setTool(tool, $event)"
                            >
                                <el-option
                                    v-for="option in proficiencyOptions"
                                    :key="option.text"
                                    :value="option.value"
                                    :label="option.text"
                                />
                            </el-select>
                        </el-form-item> -->
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-input v-model="newTool.tool" />
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="newTool.proficiency">
                            <el-option
                                v-for="option in proficiencyOptions"
                                :key="option.text"
                                :value="option.value"
                                :label="option.text"
                            />
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="success" @click="addTool">
                        <i class="fas fa-plus"></i>
                        Add Tool
                    </el-button>
                </el-row>
                <h3>Languages</h3>
                <el-row>
                    <el-col :span="8" v-for="lang in languages" :key="lang">
                        {{ lang }}
                        <el-button
                            type="text"
                            style="color: red;"
                            @click="deleteLanguage(lang)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </el-button>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-input v-model="newLang"></el-input>
                        <el-button type="success" @click="addLanguage">
                            <i class="fas fa-plus"></i>
                            Add Language
                        </el-button>
                    </el-col>
                </el-row>

                <h3>Weapons</h3>
                <el-row>
                    <el-col
                        :span="8"
                        v-for="weapon in weaponsArr"
                        :key="weapon"
                    >
                        {{ weapon }}
                        <el-button
                            type="text"
                            style="color: red;"
                            @click="deleteWeapon(weapon)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </el-button>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-input v-model="newWeapon"></el-input>
                        <el-button type="success" @click="addWeapon">
                            <i class="fas fa-plus"></i>
                            Add Weapon
                        </el-button>
                    </el-col>
                </el-row>

                <h3>Armor</h3>
                <el-row>
                    <el-col :span="8" v-for="armor in armorArr" :key="armor">
                        {{ armor }}
                        <el-button
                            type="text"
                            style="color: red;"
                            @click="deleteArmor(armor)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </el-button>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-input v-model="newArmor"></el-input>
                        <el-button type="success" @click="addArmor">
                            <i class="fas fa-plus"></i>
                            Add Armor
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
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
        proficiencies(): Proficiencies {
            return this.character.proficiencies;
        },

        languages(): string[] {
            return (this.changeTracker && [
                ...this.proficiencies.languages,
            ]) as string[];
        },

        armor(): string {
            const ar = [...this.proficiencies.armor].join(", ");
            return (this.changeTracker && ar) as string;
        },
        weapons(): string {
            const w = [...this.character.proficiencies.weapons].join(", ");
            return (this.changeTracker && w) as string;
        },
        weaponsArr(): string[] {
            return (this.changeTracker && [
                ...this.proficiencies.weapons,
            ]) as string[];
        },

        armorArr(): string[] {
            return (this.changeTracker && [
                ...this.proficiencies.armor,
            ]) as string[];
        },
        toolsArr(): { tool: string; proficiency: number }[] {
            return (this.changeTracker &&
                [
                    ...this.proficiencies.tools.entries(),
                ].map(([tool, proficiency]) => ({ tool, proficiency }))) as {
                tool: string;
                proficiency: number;
            }[];
        },
    },
    data() {
        return {
            changeTracker: 1,
            showEdit: false,
            newLang: "",
            newArmor: "",
            newWeapon: "",
            newTool: {
                tool: "",
                proficiency: 1,
            },
            proficiencyOptions: [
                {
                    text: "Proficient",
                    value: 1,
                },
                {
                    text: "Expertise",
                    value: 2,
                },
            ],
        };
    },
    methods: {
        addLanguage() {
            this.character.proficiencies.languages.add(this.newLang);
            this.newLang = "";
            this.changeTracker++;
        },

        deleteLanguage(lang: string) {
            this.proficiencies.languages.delete(lang);
            this.changeTracker++;
        },

        addArmor() {
            this.proficiencies.armor.add(this.newArmor);
            this.newArmor = "";
            this.changeTracker++;
        },
        deleteArmor(armor: string) {
            this.proficiencies.armor.delete(armor);
            this.changeTracker++;
        },
        addTool() {
            this.proficiencies.tools.set(
                this.newTool.tool,
                this.newTool.proficiency
            );
            console.log(this.proficiencies.tools);
            this.newTool = {
                tool: "",
                proficiency: 1,
            };
            this.changeTracker++;
        },
        deleteTool(tool: string) {
            this.proficiencies.tools.delete(tool);
            this.changeTracker++;
        },
        addWeapon() {
            this.proficiencies.weapons.add(this.newWeapon);
            this.newWeapon = "";
            this.changeTracker++;
        },
        deleteWeapon(weapon: string) {
            this.proficiencies.weapons.delete(weapon);
            this.changeTracker++;
        },
        setTool(tool: string, proficiency: number) {
            this.proficiencies.tools.set(tool, proficiency);
            this.changeTracker++;
        },
    },
});
</script>
