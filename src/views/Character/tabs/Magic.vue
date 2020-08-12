<template>
    <div id="magic-tab">
        <h1>Magic!!!</h1>
        <spell-slot />
        <spells-by-level />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import spellsRaw from "@/reference/spells.json";
import { Spell } from "@/models/sourceinfo/Spell";
import { Magic } from "@/models/Magic";
import { store } from "@/store";

import SpellSlot from "../sections/SpellSlot.vue";
import SpellsByLevel from "./Magic/SpellsByLevel.vue";

const spells = spellsRaw as Record<string, Spell>;

export default Vue.extend({
    name: "MagicTab",
    computed: {
        magic(): Magic {
            return store.character.magic;
        },
    },
    components: {
        SpellSlot,
        SpellsByLevel,
    },
});
</script>
