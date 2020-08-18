<template>
    <div id="prepare-spells-tab">
        <h2>Prepare spells</h2>
        <el-collapse accordion>
            <magic-source-display
                v-for="src in magicSources"
                :key="src.name"
                :magicSource="src"
            />
        </el-collapse>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MagicSourceDisplay from "./PrepareSpells/MagicSource.vue";
import { store } from "@/store";
import { MagicSource } from "@/models/magic/MagicSource";
export default Vue.extend({
    name: "PrepareSpellsTab",
    components: {
        MagicSourceDisplay,
    },
    computed: {
        magicSources(): MagicSource[] {
            return store.character.magic.magicSources;
        },
    },
});
</script>
