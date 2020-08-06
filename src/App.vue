<template>
    <div id="app">
        <!-- <img src="./assets/logo.png" />
        <div>
            <p>
                If Element is successfully added to this project, you'll see an
                <code v-text="'<el-button>'"></code>
                below
            </p>
            <el-button>el-button</el-button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import "reflect-metadata";
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "app",
    components: {
        // HelloWorld,
    },
};
</script>

<style lang="scss">
@import "element-variables";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
}

html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    box-sizing: border-box;
}
body {
    padding: 8px;
    background: $--color-white;
}

#app {
    height: 100%;
    box-sizing: border-box;
}
</style>
