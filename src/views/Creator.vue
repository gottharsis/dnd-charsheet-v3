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
                    >
                        {{ name }}
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main>
                <component :is="currentStep" :creator="creator" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { CharacterCreator } from "@/creator/CharacterCreator";
import BasicInfo from "./Creator/BasicInfo.vue";
export default {
    name: "Creator",
    data() {
        return {
            creator: new CharacterCreator(),
            steps: [
                {
                    name: "Basic Info",
                    component: BasicInfo,
                },
                {
                    name: "Race",
                    component: null,
                },
            ],
            stepIndex: 0,
        };
    },
    computed: {
        currentStep() {
            return this.steps[this.stepIndex].component;
        },
    },
    components: {
        BasicInfo,
    },
};
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
