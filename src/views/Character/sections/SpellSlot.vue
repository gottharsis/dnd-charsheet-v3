<template>
    <div id="spell-slots">
        <el-card class="overview-card">
            <el-row :gutter="20" type="flex">
                <el-col v-for="slot in multiSlots" :key="slot.level">
                    <!-- <el-card class="overview-card">
                    <div slot="header">LEVEL {{ slot.level }}</div>
                    <div>
                        <span class="major-number">{{ slot.remaining }}</span>
                        / {{ slot.quantity }}
                    </div>
                    <el-button-group>
                        <el-button type="primary">
                            <i class="fas fa-dragon"></i>
                        </el-button>
                    </el-button-group>
                </el-card> -->

                    <div>Level {{ slot.level }}</div>

                    <div>
                        <span class="major-number">{{ slot.remaining }}</span>
                        / {{ slot.quantity }}
                    </div>
                    <el-button
                        type="primary"
                        :disabled="slot.quantity === 0 || slot.remaining === 0"
                    >
                        <i class="fas fa-dragon"></i>
                    </el-button>
                </el-col>

                <template v-if="pactSlot !== undefined">
                    <el-divider direction="vertical"></el-divider>
                    <div>Pact Slot (Level {{ pactSlot.level }})</div>

                    <div>
                        <span class="major-number">
                            {{ pactSlot.remaining }}
                        </span>
                        / {{ pactSlot.quantity }}
                    </div>
                    <el-button
                        type="primary"
                        :disabled="
                            pactSlot.quantity === 0 || pactSlot.remaining === 0
                        "
                    >
                        <i class="fas fa-dragon"></i>
                    </el-button>
                </template>
            </el-row>
        </el-card>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Magic } from "@/models/Magic";
import { store } from "@/store";
import { Slot } from "@/models/magic/SpellSlots";
export default Vue.extend({
    name: "SpellSlots",
    computed: {
        magic(): Magic {
            return store.character.magic;
        },
        multiSlots(): Slot[] {
            return this.magic.multiclassSlots
                .slice(1)
                .filter(({ quantity }) => quantity > 0);
            // .map((slot) => [slot, slot.remaining / slot.quantity]);
        },
        pactSlot(): Slot | undefined {
            return this.magic.pactSlot;
        },
    },
});
</script>
