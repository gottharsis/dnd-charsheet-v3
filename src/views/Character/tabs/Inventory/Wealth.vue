<template>
    <div id="wealth">
        <h2>Wealth</h2>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-card class="overview-card">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <h4>PP</h4>
                            <el-input v-model.number="wealth.pp" />
                        </el-col>
                        <el-col :span="6">
                            <h4>GP</h4>
                            <el-input v-model.number="wealth.gp" />
                        </el-col>
                        <el-col :span="6">
                            <h4>SP</h4>
                            <el-input v-model.number="wealth.sp" />
                        </el-col>
                        <el-col :span="6">
                            <h4>CP</h4>
                            <el-input v-model.number="wealth.cp" />
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Currency } from "@/models/inventory/Currency";
import { store } from "@/store";

export default Vue.extend({
    name: "InventoryWealth",
    computed: {
        wealth(): Currency {
            return store.character.inventory.money;
        },
    },
});
</script>
