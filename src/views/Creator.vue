<template>
    <div id="creator">
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-menu-item index="1">
                        Basic Information
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
