<template>
    <div id="spell-list">
        <h2>Spell List</h2>
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-card class="overview-card">
                    <div class="container">
                        <el-form class="config">
                            <el-row type="flex" :gutter="10">
                                <el-col>
                                    <p>Rituals</p>
                                    <el-switch
                                        v-model="filters.ritual"
                                        active-text="Rituals only"
                                        inactive-text="Any"
                                    />
                                </el-col>

                                <el-col>
                                    <p>Concentration</p>
                                    <el-select
                                        v-model="filters.concentration"
                                        value-key="text"
                                    >
                                        <el-option
                                            v-for="{
                                                value,
                                                text,
                                            } in concentrationOptions"
                                            :key="text"
                                            :value="value"
                                            :label="text"
                                        />
                                    </el-select>
                                </el-col>

                                <el-col>
                                    <p>Minimum Level</p>
                                    <el-input
                                        v-model.number="filters.minLevel"
                                    />
                                </el-col>

                                <el-col>
                                    <p>Maximum Level</p>
                                    <el-input
                                        v-model.number="filters.maxLevel"
                                    />
                                </el-col>
                                <el-col>
                                    <p>Classes</p>
                                    <el-select
                                        multiple
                                        v-model="filters.allowedClasses"
                                    >
                                        <el-option
                                            v-for="cl in spellcastingClasses"
                                            :key="cl"
                                            :value="cl"
                                            :label="cl"
                                        />
                                    </el-select>
                                </el-col>
                            </el-row>
                            <div style="height: 20px;" />
                            <el-row type="flex" justify="center">
                                <el-col :span="18">
                                    <el-input
                                        v-model="searchTerm"
                                        placeholder="Search"
                                    />
                                </el-col>
                            </el-row>
                        </el-form>

                        <el-row class="apparatus">
                            <el-col class="list" :span="8">
                                <div
                                    v-for="spell in filteredSpells"
                                    :key="spell.slug"
                                    @click="select(spell)"
                                    class="spell"
                                >
                                    {{ spell.name }}
                                </div>
                            </el-col>

                            <el-col class="list" :span="16">
                                <div
                                    v-if="spellToView !== undefined"
                                    style="padding: 10px;"
                                >
                                    <h1>{{ spellToView.name }}</h1>
                                    <div>
                                        <el-button
                                            v-for="{
                                                magicSource,
                                                isKnown,
                                            } in magicSources"
                                            :key="magicSource.name"
                                            :type="
                                                isKnown ? 'success' : 'primary'
                                            "
                                            @click="
                                                toggleCurrentSpell(magicSource)
                                            "
                                        >
                                            <!-- <template v-if="isKnown">
                                                <i class="fas fa-check"></i>
                                            </template>
                                            <template v-else>
                                                <i class="fas fa-scroll"></i>
                                            </template> -->
                                            <i class="fas fa-scroll" />
                                            {{ magicSource.name }}
                                        </el-button>
                                    </div>
                                    <p>
                                        <i>
                                            {{ levelText }},
                                            {{ spellToView.school }}
                                        </i>
                                    </p>
                                    <p>
                                        <b>Classes:</b>
                                        {{ spellToView.classes.join(", ") }}
                                    </p>
                                    <p>
                                        <b>Components:</b>
                                        {{ spellToView.components }}
                                    </p>
                                    <p>
                                        <b>Range:</b>
                                        {{ spellToView.range }}
                                    </p>
                                    <p>
                                        <b>Duration:</b>
                                        {{ spellToView.duration }}
                                    </p>
                                    <p>
                                        <b>Casting Time:</b>
                                        {{ spellToView.casting_time }}
                                    </p>
                                    <p>
                                        <b>Concentration:</b>
                                        {{
                                            spellToView.concentration
                                                ? "Yes"
                                                : "No"
                                        }}
                                    </p>
                                    <p>
                                        <b>Ritual:</b>
                                        {{ spellToView.ritual ? "Yes" : "No" }}
                                    </p>

                                    <p v-html="selectedSpellDescription"></p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import spellsRaw from "@/reference/spells.json";
import classes from "@/reference/classes.json";
import { Spell } from "@/models/sourceinfo/Spell";
import marked from "marked";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
import Fuse from "fuse.js";
import { MagicSource } from "@/models/magic/MagicSource";
import { store } from "@/store";
import { Magic } from "@/models/Magic";
import { Character } from "@/models/Character";

export default Vue.extend({
    name: "SpellList",
    computed: {
        character(): Character {
            return store.character;
        },
        filteredSpells(): Spell[] {
            const searchTerm = this.searchTerm.trim();
            const searchResults =
                !this.fuse || searchTerm === ""
                    ? this.spells
                    : this.fuse
                          .search(this.searchTerm)
                          .filter(({ score }) => score!! < this.maxScore)
                          .map((i) => i.item);
            const filtered = searchResults.filter((sp) => {
                if (this.filters.ritual && !sp.ritual) {
                    return false;
                }

                if (
                    this.filters.allowedClasses.length > 0 &&
                    !sp.classes.some((cl) =>
                        this.filters.allowedClasses.includes(cl)
                    )
                ) {
                    return false;
                }
                if (
                    this.filters.concentration !== undefined &&
                    sp.concentration !== this.filters.concentration
                ) {
                    return false;
                }

                if (
                    sp.level < this.filters.minLevel ||
                    sp.level > this.filters.maxLevel
                ) {
                    return false;
                }

                return true;
            });

            return filtered;
        },
        selectedSpellDescription(): string {
            if (this.spellToView) {
                return marked(this.spellToView.description);
            }
            return "";
        },
        levelText(): string {
            if (this.spellToView) {
                return this.spellToView.level === 0
                    ? "Cantrip"
                    : `Level ${this.spellToView.level}`;
            }
            return "";
        },
        mgSrc(): MagicSource[] {
            return this.character.magic.magicSources;
        },
        magicSources(): {
            magicSource: MagicSource;
            isKnown: boolean;
        }[] {
            // return (this.changeTracker &&
            //     this.mgSrc.map((src: MagicSource) => [
            //         src,
            //         this.spellToView !== undefined &&
            //             src.isSpellKnown(this.spellToView),
            //     ])) as [MagicSource, boolean][];
            return (this.changeTracker &&
                this.mgSrc.map((src) => {
                    const isKnown =
                        this.spellToView !== undefined &&
                        src.isSpellKnown(this.spellToView);
                    return {
                        magicSource: src,
                        isKnown,
                    };
                })) as {
                magicSource: MagicSource;
                isKnown: boolean;
            }[];
        },
    },
    data() {
        const spells = Object.values(spellsRaw) as Spell[];
        const spellcastingClasses = (classes as SourceClass[])
            .filter((cl) => cl.spellcasting !== undefined)
            .map((cl) => cl.name);
        return {
            spellToView: undefined as Spell | undefined,
            spells,
            fuse: undefined as Fuse<Spell> | undefined,
            searchTerm: "",
            filters: {
                ritual: false,
                concentration: undefined as boolean | undefined,
                minLevel: 0,
                maxLevel: 9,
                allowedClasses: [] as string[],
            },
            spellcastingClasses,
            concentrationOptions: [
                { text: "Any", value: undefined },
                { text: "Yes", value: true },
                { text: "No", value: false },
            ],
            maxScore: 0.4,
            changeTracker: 1,
        };
    },
    methods: {
        select(spell: Spell) {
            this.spellToView = spell;
        },
        toggleCurrentSpell(magicSource: MagicSource) {
            console.log("Toggling " + magicSource.name);
            if (this.spellToView === undefined) return;
            // console.log("SpellToView exists");
            if (magicSource.isSpellKnown(this.spellToView)) {
                console.log("KNOWN");
                magicSource.unlearnSpell(this.spellToView.slug);
            } else {
                console.log("NOT KNOWN");
                magicSource.learnSpell(this.spellToView.slug);
            }
            this.changeTracker++;
            console.log(magicSource.knownSpells);
        },
    },
    mounted() {
        this.fuse = new Fuse(this.spells, {
            keys: ["name"],
            includeScore: true,
        });
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.container {
    height: 60vh;
    display: flex;
    flex-direction: column;
}

.apparatus {
    // display: table-row;
    margin: 10px;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    max-height: 100%;

    .list {
        // height: 100%;
        max-height: 100%;
        overflow-y: scroll;

        .spell {
            padding: 10px;
            border-radius: 1px;
            cursor: pointer;
            // margin: 2px;
            border-left: 1px solid $lightText;
            border-right: 1px solid $lightText;
            border-top: 1px solid $lightText;
            &:last-child {
                border-bottom: 1px solid $lightText;
            }

            &:hover {
                background: $tango;
                color: $lightText;
            }
        }
    }
}
</style>
