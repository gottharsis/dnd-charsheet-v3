<template>
    <div id="inventory">
        <items />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Items from "./Inventory/Items.vue";
export default Vue.extend({
    name: "InventoryTab",
    components: {
        Items,
    },
});
</script>
