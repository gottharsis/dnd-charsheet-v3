<template>
    <div id="spells-by-level">
        <h2>Spells by Level</h2>
        <el-row v-for="[level, spells] in spellsByLevel" :key="level">
            <h3>{{ level }}</h3>
            <el-row :gutter="20">
                <el-col
                    :span="6"
                    v-for="spellSrc in spells"
                    :key="spellSrc.key"
                >
                    <spell-card :spell="spellSrc.spell" :showDivider="true">
                        <template slot="footer">
                            <div class="bonus">
                                {{ spellSrc.source }}:
                                {{ modifierString(spellSrc.hitBonus) }}, DC
                                {{ spellSrc.dc }}
                            </div>

                            <el-tooltip placement="top" effect="light">
                                <div slot="content">
                                    <div><b>Upcast</b></div>
                                    <el-button
                                        v-for="slot in getUpcastSlots(
                                            spellSrc.spell.level
                                        )"
                                        :key="slot.text"
                                        @click="cast(slot)"
                                    >
                                        {{ slot.text }}
                                    </el-button>
                                </div>
                                <div style="width: 50%; margin: auto;">
                                    <el-button
                                        type="primary"
                                        v-if="spellSrc.spell.level > 0"
                                        @click="cast(spellSrc.spell.level)"
                                    >
                                        Cast
                                    </el-button>
                                </div>
                            </el-tooltip>
                        </template>
                    </spell-card>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Magic, SpellBySource } from "@/models/Magic";
import { store } from "@/store";
import { Dictionary } from "lodash";
import { modifierString } from "@/util/modifierString";

interface UpcastSlot {
    level: number;
    remaining: number;
    text: string;
    isPact?: boolean;
}

import SpellCard from "./SpellCard.vue";
export default Vue.extend({
    name: "SpellsByLevel",
    computed: {
        magic(): Magic {
            return store.character.magic;
        },
        spellsByLevel(): [string, SpellBySource[]][] {
            const spells = Object.entries(
                this.magic.preparedSpellsByLevel()
            ).map((sp) => {
                if (sp[0] === "0") sp[0] = "Cantrip";
                else sp[0] = `Level ${sp[0]}`;
                return sp;
            });
            return spells;
        },
        availableSlots(): UpcastSlot[] {
            const slots: UpcastSlot[] = this.magic.multiclassSlots
                .filter((slot) => slot.remaining > 0)
                .map((slot) => {
                    const text = `Level ${slot.level} (${slot.remaining})`;
                    return {
                        level: slot.level,
                        remaining: slot.remaining,
                        text,
                    };
                });

            if (this.magic.pactSlot) {
                const text = `Pact (Level ${this.magic.pactSlot.level}, ${this.magic.pactSlot.remaining})`;
                slots.push({
                    level: this.magic.pactSlot.level,
                    remaining: this.magic.pactSlot.remaining,
                    text,
                    isPact: true,
                });
            }

            return slots;
        },
    },
    components: {
        SpellCard,
    },
    methods: {
        // cast({ level }: { level: number | "pact" }) {
        //     if (level === "pact") {
        //         this.magic.pactSlot?.cast();
        //     } else {
        //         this.magic.cast(level);
        //     }
        // },
        cast(level: number | UpcastSlot) {
            if (typeof level === "number") {
                console.log("Casting spell of level " + level);
                if (level > 0 && level <= 9) {
                    this.magic.multiclassSlots[level].cast();
                }
            } else {
                console.log("Casting spell of level " + level.level);
                if (level.isPact) {
                    this.magic.pactSlot?.cast();
                } else {
                    this.magic.multiclassSlots[level.level].cast();
                }
            }
        },
        modifierString,
        getUpcastSlots(level: number): UpcastSlot[] {
            return this.availableSlots.filter((slot) => slot.level > level);
        },
    },
    data() {
        return {
            descriptionHtml: "",
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.bonus {
    margin: 5px;
    font-style: italic;
    color: $amethyst;
}
</style>
