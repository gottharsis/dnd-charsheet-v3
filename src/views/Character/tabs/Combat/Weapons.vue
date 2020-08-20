<template>
    <div id="weapons">
        <h2 @click="isEditVisible = true" style="cursor: pointer;">Weapons</h2>
        <el-row :gutter="20" justify="center">
            <el-col :span="6" v-for="weapon in weapons" :key="weapon.id">
                <el-card class="overview-card">
                    <div slot="header">{{ weapon.name }}</div>
                    <div class="major-number">{{ weapon.hitBonus }}</div>
                    <p>{{ weapon.damage }}</p>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
            title="Edit Weapons"
            :visible.sync="isEditVisible"
            @close="recompute"
        >
            <el-form>
                <div v-for="weapon in weapons" :key="weapon.id">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Name">
                                <el-input v-model="weapon.name" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="12"></el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Abilities">
                                <el-select v-model="weapon.ability" multiple>
                                    <el-option
                                        v-for="ability in abilityOrder"
                                        :key="ability"
                                        :value="ability"
                                        :label="ability.toUpperCase()"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Proficient?">
                                <el-checkbox v-model="weapon.isProficient" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item
                                label="Weapon Hit Bonus (for magic weapons)"
                            >
                                <el-input v-model.number="weapon.bonusToHit" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Damage">
                                <el-input v-model="weapon.damageDie" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Properties">
                        <el-input v-model="weapon.properties" />
                    </el-form-item>
                    <el-divider />
                </div>
                <h3>New Weapon</h3>
                <div>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Name">
                                <el-input v-model="newWeapon.name" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="12"></el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Abilities">
                                <el-select
                                    v-model="newWeapon.abilities"
                                    multiple
                                >
                                    <el-option
                                        v-for="ability in abilityOrder"
                                        :key="ability"
                                        :value="ability"
                                        :label="ability.toUpperCase()"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Proficient?">
                                <el-checkbox v-model="newWeapon.isProficient" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item
                                label="Weapon Hit Bonus (for magic weapons)"
                            >
                                <el-input v-model.number="newWeapon.bonus" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Damage">
                                <el-input v-model="newWeapon.damage" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Properties">
                        <el-input v-model="newWeapon.properties" />
                    </el-form-item>
                    <el-button type="success" @click="addNewWeapon">
                        <i class="fas fa-plus"></i>
                        Add New Weapon
                    </el-button>
                </div>
                <div></div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Weapon } from "@/models/Weapon";
import { store } from "@/store";
import { SpellBySource } from "@/models/Magic";
import { ScoreAbility, abilityOrder } from "@/models/AbilityScores";
import { Spell } from "@/models/sourceinfo/Spell";

const defaultNewWeapon = {
    name: "",
    damage: "",
    bonus: 0,
    abilities: [] as ScoreAbility[],
    isProficient: false,
    properties: "",
};

export default Vue.extend({
    name: "WeaponsSection",

    computed: {
        weapons(): Weapon[] {
            return store.character.weapons;
        },
    },

    data() {
        return {
            isEditVisible: false,
            newWeapon: Object.assign({}, defaultNewWeapon),
            abilityOrder,
        };
    },

    methods: {
        addNewWeapon() {
            this.weapons.push(new Weapon(this.newWeapon));
            this.newWeapon = Object.assign({}, defaultNewWeapon);
            this.recompute();
        },
        recompute() {
            store.character.recompute();
        },
    },
});
</script>
