<template>
    <div id="inventory">
        <wealth />
        <el-divider />
        <items />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Items from "./Inventory/Items.vue";
import Wealth from "./Inventory/Wealth.vue";
export default Vue.extend({
    name: "InventoryTab",
    components: {
        Items,
        Wealth,
    },
});
</script>
