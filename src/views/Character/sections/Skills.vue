<template>
    <div id="skills">
        <h3>Skills</h3>
        <el-table
            :data="skillsWithModifiers"
            class="skill-table"
            cell-class-name="skill-cell"
            :show-header="false"
        >
            <el-table-column prop="skill" label="Skill"></el-table-column>
            <!-- <el-table-column prop="stat" label="Stat" /> -->
            <el-table-column prop="modifier" label="Bonus" />
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
interface SkillWithModifier {
    skill: string;
    stat: string;
    modifier: number;
}
export default Vue.extend({
    name: "Skills",
    computed: {
        character(): Character {
            return store.character;
        },
        skillsWithModifiers(): SkillWithModifier[] {
            return this.skills.map((skill) => ({
                skill: skill.name,
                stat: skill.stat.toUpperCase(),
                modifier: this.character.skillModifier(skill),
            }));
        },
    },
    data() {
        return {
            skills: skillsRaw as Skill[],
        };
    },
});
</script>

<style lang="scss">
@import "@/styles/horizon.scss";

.skill-cell {
    background: $background-alt;
}
</style>
