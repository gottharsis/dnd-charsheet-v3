<template>
    <div id="skills">
        <h3>
            Skills

            <el-button type="info" @click="shouldEdit = !shouldEdit">
                <i class="fas fa-edit"></i>
            </el-button>
        </h3>
        <el-table
            :data="skillsWithModifiers"
            class="skill-table"
            cell-class-name="skill-cell"
            :show-header="false"
        >
            <el-table-column width="30">
                <template slot-scope="scope">
                    <span
                        class="proficiency-check"
                        v-if="scope.row.proficiency === 1"
                    >
                        <i class="fas fa-check"></i>
                    </span>
                    <span
                        class="proficiency-check"
                        v-if="scope.row.proficiency === 2"
                    >
                        <i class="fas fa-check-double"></i>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="Skill" prop="skill"></el-table-column>
            <!-- <el-table-column prop="stat" label="Stat" /> -->
            <el-table-column prop="modifier" label="Bonus" align="center" />

            <el-table-column v-if="shouldEdit" label="Edit">
                <template slot-scope="scope">
                    <el-select
                        :value="scope.row.proficiency"
                        @input="setProficiency($event, scope.row)"
                    >
                        <el-option
                            v-for="prof in proficiencyOptions"
                            :key="prof.text"
                            :label="prof.text"
                            :value="prof.value"
                        />
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import skillsRaw from "@/reference/skills.json";
import { Skill } from "@/models/sourceinfo/SourceSkill";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { ScoreAbility } from "@/models/AbilityScores";
import { modifierString } from "@/util/modifierString";
interface SkillWithModifier {
    skill: string;
    stat: string;
    modifier: string;
}
export default Vue.extend({
    name: "Skills",
    computed: {
        character(): Character {
            return store.character;
        },
        skillsWithModifiers(): SkillWithModifier[] {
            return (this.changeTracker &&
                this.skills.map((skill) => {
                    return {
                        skill: skill.name,
                        stat: skill.stat.toUpperCase(),
                        modifier: modifierString(
                            this.character.skillModifier(skill)
                        ),
                        proficiency: this.profSkills.get(skill.name) ?? 0,
                    };
                })) as SkillWithModifier[];
        },
        profSkills(): Map<string, number> {
            return this.character.proficiencies.skills;
        },
    },
    data() {
        return {
            skills: skillsRaw as Skill[],
            shouldEdit: false,
            proficiencyOptions: [
                {
                    text: "None",
                    value: 0,
                },
                {
                    text: "Proficient",
                    value: 1,
                },
                {
                    text: "Expertise",
                    value: 2,
                },
            ],
            changeTracker: 1,
        };
    },
    methods: {
        setProficiency(proficiency: number, skill: SkillWithModifier) {
            if (proficiency === 0) {
                this.profSkills.delete(skill.skill);
            } else {
                this.profSkills.set(skill.skill, proficiency);
            }
            this.changeTracker++;
        },
    },
});
</script>

<style lang="scss">
@import "@/styles/horizon.scss";

.skill-cell {
    background: $background-alt;
}

.proficiency-check {
    color: $positive;
}
</style>
