<template>
    <div id="creator">
        <el-container>
            <el-aside width="200px" class="sidemenu">
                <el-menu>
                    <h2>Steps</h2>
                    <el-menu-item
                        v-for="({ name }, i) in steps"
                        :key="i"
                        :class="{ 'active-link': i === stepIndex }"
                        @click="stepIndex = i"
                    >
                        {{ name }}
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main>
                <component
                    :is="currentStep"
                    :creator="creator"
                    @create-character="createCharacter"
                />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CharacterCreator } from "@/creator/CharacterCreator";
import BasicInfo from "./Creator/BasicInfo.vue";
import Race from "./Creator/Race.vue";
import AbilityScores from "./Creator/AbilityScores.vue";
import PlayerClass from "./Creator/PlayerClass.vue";
import Confirmation from "./Creator/Confirmation.vue";
import { saveCharacter } from "@/persist-data/persistCharacter";
import { store } from "@/store/store";

interface Step {
    name: string;
    component: any;
}

interface CreatorData {
    creator: CharacterCreator;
    steps: Step[];
    stepIndex: number;
}

export default Vue.extend({
    name: "Creator",
    data() {
        const d: CreatorData = {
            creator: new CharacterCreator(),
            steps: [
                {
                    name: "Basic Info",
                    component: BasicInfo,
                },
                {
                    name: "Race",
                    component: Race,
                },
                {
                    name: "Ability Scores",
                    component: AbilityScores,
                },
                {
                    name: "Initial Class",
                    component: PlayerClass,
                },
                {
                    name: "Confirmation",
                    component: Confirmation,
                },
            ],
            stepIndex: 0,
        };
        return d;
    },
    computed: {
        currentStep(): any {
            return this.steps[this.stepIndex].component;
        },
    },
    components: {
        BasicInfo,
        Race,
        AbilityScores,
        PlayerClass,
        Confirmation,
    },
    methods: {
        async createCharacter() {
            const character = this.creator.build();
            console.log(character);
            try {
                await saveCharacter(character);
                console.log("saved character");
                store.character = character;
            } catch (e) {
                console.log("Failed to Create");
                console.log(e);
            }
            // TODO: navigate to character view
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/themes/horizon.scss";
.active-link {
    background: $accent;
    color: $crimson;
}

.sidemenu {
    min-height: 100%;
}
</style>
