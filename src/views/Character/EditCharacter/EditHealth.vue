<template>
    <div id="edit-health">
        <h2>Health</h2>
        <el-form>
            <el-form-item label="Max HP">
                <el-input v-model="health.maxHp" />
            </el-form-item>

            <el-form-item label="Temp HP">
                <el-input v-model="health.tempHp" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { Health } from "@/models/Health";
export default Vue.extend({
    name: "EditHealth",
    computed: {
        health(): Health {
            return store.character.health;
        },
    },
});
</script>
