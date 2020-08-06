<template>
    <div id="creator-basic-info">
        <h1>Basic Information</h1>
        <el-row>
            <el-col :offset="6" :span="12">
                <el-form>
                    <el-form-item label="Character Name">
                        <el-input
                            v-model="creator.name"
                            placeholder="Enter the character name"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { CharacterCreator } from "@/creator/CharacterCreator";
export default {
    name: "Creator_BasicInfo",
    props: {
        creator: CharacterCreator,
    },
};
</script>

<style></style>
