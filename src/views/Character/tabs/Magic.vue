<template>
    <div id="magic-tab">
        <h1>Magic!!!</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import spellsRaw from "@/reference/spells.json";
import { Spell } from "@/models/sourceinfo/Spell";
const spells = spellsRaw as Record<string, Spell>;

export default Vue.extend({
    name: "MagicTab",
});
</script>
