<template>
    <div id="spell-slots">
        <h2>Spell Slots</h2>
        <el-card class="overview-card">
            <el-row :gutter="20" type="flex">
                <el-col v-for="slot in multiSlots" :key="slot.level">
                    <div>Level {{ slot.level }}</div>

                    <div>
                        <span class="major-number">{{ slot.remaining }}</span>
                        / {{ slot.quantity }}
                    </div>

                    <el-button-group>
                        <el-button
                            type="primary"
                            :disabled="
                                slot.quantity === 0 || slot.remaining === 0
                            "
                            size="mini"
                            @click="cast(slot.level)"
                        >
                            <i class="fas fa-dragon"></i>
                        </el-button>
                        <el-button
                            type="primary"
                            @click="recover(slot.level)"
                            size="mini"
                        >
                            <i class="fas fa-plus"></i>
                        </el-button>
                    </el-button-group>
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
                    <div>
                        <el-button
                            type="primary"
                            :disabled="
                                pactSlot.quantity === 0 ||
                                pactSlot.remaining === 0
                            "
                        >
                            <i class="fas fa-dragon"></i>
                        </el-button>
                        <el-button type="primary" @click="recover('pact')">
                            <i class="fas fa-plus"></i>
                        </el-button>
                    </div>
                </template>
            </el-row>
            <el-divider />
            <el-row>
                <el-button type="success" @click="recoverAll">
                    Recover All Slots
                </el-button>
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
    methods: {
        cast(level: number) {
            this.magic.cast(level);
        },
        pactCast() {
            this.magic.pactSlot?.cast();
        },
        recover(level: number) {
            this.magic.recoverSlot(level, 1);
        },
        recoverAll() {
            this.magic.recoverAllSlots();
        },
    },
});
</script>
