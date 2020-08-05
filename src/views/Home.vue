<template>
    <!-- <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div> -->
    <div class="home">
        <el-row>
            <el-col :span="24">
                Full width column
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">Half width</el-col>
            <el-col :span="12">Half width</el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        // HelloWorld,
    },
};
</script>
