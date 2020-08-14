<template>
    <div id="abilities">
        <tracked-abilities />
        <el-divider />
        <features />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrackedAbilities from "./Abilities/TrackedAbilities.vue";
import Features from "./Abilities/Features.vue";
export default Vue.extend({
    name: "AbilitiesTab",
    components: {
        TrackedAbilities,
        Features,
    },
});
</script>
