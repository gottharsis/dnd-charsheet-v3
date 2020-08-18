<template>
    <el-collapse-item class="magic-source" :name="magicSource.name">
        <template slot="title">
            <h2>{{ title }}</h2>
        </template>
        <el-row v-for="[level, spells] in knownSpells" :key="level">
            <h3>{{ level }}</h3>
            <el-row :gutter="20">
                <el-col :span="6" v-for="known in spells" :key="known.name">
                    <spell-card :spell="known.spell" :showDivider="true">
                        <template slot="footer">
                            <template v-if="known.known.prepared">
                                <el-button
                                    type="success"
                                    @click="unprepareSpell(known)"
                                >
                                    <i class="fas fa-check"></i>
                                    Prepared!
                                </el-button>
                            </template>

                            <template v-else>
                                <el-button
                                    type="primary"
                                    @click="prepareSpell(known)"
                                >
                                    <i class="fas fa-scroll"></i>
                                    Prepare
                                </el-button>
                            </template>
                        </template>
                    </spell-card>
                </el-col>
            </el-row>
        </el-row>
    </el-collapse-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { MagicSource, KnownSpell } from "@/models/magic/MagicSource";
import { Spell } from "@/models/sourceinfo/Spell";
import allSpells from "@/reference/spells.json";
import { groupBy } from "lodash";

import SpellCard from "@/views/Character/tabs/Magic/SpellCard.vue";

interface SpellCard {
    spell: Spell;
    known: KnownSpell;
}

export default Vue.extend({
    name: "MagicSource",
    props: {
        magicSource: Object as PropType<MagicSource>,
    },
    data() {
        return {
            changeTracker: 1,
        };
    },
    computed: {
        knownSpells(): [string, SpellCard[]][] {
            const known = [...this.magicSource.knownSpells.values()]
                .map(
                    (knownSpell): SpellCard => {
                        const spell = (allSpells as Record<string, Spell>)[
                            knownSpell.spell
                        ];
                        return {
                            spell,
                            known: knownSpell,
                        };
                    }
                )
                .filter(({ spell }) => spell.level > 0);

            const groups = groupBy(known, (sp: SpellCard) => {
                const level = sp.spell.level;
                return `Level ${level}`;
            });
            return (this.changeTracker && Object.entries(groups).sort()) as [
                string,
                SpellCard[]
            ][];
        },
        title(): string {
            if (this.changeTracker < 0) return "";
            if (this.magicSource.toPrepare) {
                return `${this.magicSource.name} (${this.magicSource.numPrepared} / ${this.magicSource.toPrepare})`;
            } else {
                return `${this.magicSource.name} (${this.magicSource.numPrepared} prepared)`;
            }
        },
    },

    methods: {
        prepareSpell(spell: SpellCard) {
            this.magicSource.prepareSpell(spell.spell.slug);
            this.changeTracker++;
        },
        unprepareSpell(spell: SpellCard) {
            this.magicSource.unprepareSpell(spell.spell.slug);
            this.changeTracker++;
        },
    },
    components: {
        SpellCard,
    },
});
</script>
