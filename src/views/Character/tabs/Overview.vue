<template>
    <div id="overview">
        <h1>Overview</h1>
        <el-row>
            <el-col :span="8">
                <skills />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Skills from "../sections/Skills.vue";
export default Vue.extend({
    name: "OverviewTab",
    components: {
        Skills,
    },
});
</script>
<style></style>
