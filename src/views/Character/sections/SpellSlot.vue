<template>
    <div id="spell-slots">
        <el-row type="flex">
            <el-col v-for="slot in multiSlots" :key="slot.level">
                Level: {{ slot.level }} Remaining: {{ slot.remaining }}
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Magic } from "@/models/Magic";
import { store } from "@/store";
import { Slot } from "@/models/magic/SpellSlots";
export default Vue.extend({
    name: "SpellSlots",
    computed: {
        magic(): Magic {
            return store.character.magic;
        },
        multiSlots(): Slot[] {
            return this.magic.multiclassSlots
                .slice(1)
                .filter(({ quantity }) => quantity > 0);
        },
    },
});
</script>
