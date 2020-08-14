<template>
    <div id="abilities">
        <tracked-abilities />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrackedAbilities from "./Abilities/TrackedAbilities.vue";
export default Vue.extend({
    name: "AbilitiesTab",
    components: {
        TrackedAbilities,
    },
});
</script>
