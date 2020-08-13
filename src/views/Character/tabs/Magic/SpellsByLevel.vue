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
                    <spell-card :spell="spellSrc" />
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
    },
    components: {
        SpellCard,
    },
    data() {
        return {
            descriptionHtml: "",
        };
    },
});
</script>
