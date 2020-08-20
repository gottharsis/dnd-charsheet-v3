<template>
    <div id="combat-tab">
        <el-row :gutter="20">
            <el-col :span="16"><health /></el-col>
            <el-col :span="8">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div slot="header">
                                AC
                            </div>
                            <div class="major-number">
                                {{ armor.ac }}
                            </div>
                            <div class="comment">
                                {{ armor.name }}
                            </div>
                        </el-card>
                    </el-col>

                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div slot="header">Initiative</div>
                            <div class="major-number">{{ initiative }}</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Health from "@/views/Character/sections/HealthIndicator.vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Armor } from "@/models/Armor";
import { modifierString } from "@/util/modifierString";
export default Vue.extend({
    name: "CombatTab",
    components: {
        Health,
    },
    computed: {
        character(): Character {
            return store.character;
        },
        armor(): Armor {
            return this.character.armor;
        },
        initiative(): string {
            return modifierString(this.character.initiative());
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.comment {
    color: $amethyst;
    font-style: italic;
}
</style>
