<template>
    <div id="edit-armor">
        <h2>Edit Armor</h2>
        <el-form>
            <el-form-item label="Name">
                <el-input v-model="armor.name" />
            </el-form-item>

            <el-form-item label="AC">
                <el-input v-model.number="armor.ac" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Armor } from "@/models/Armor";
import { store } from "@/store";
export default Vue.extend({
    name: "EditArmor",
    computed: {
        armor(): Armor {
            return store.character.armor;
        },
    },
});
</script>
