<template>
    <div id="edit-basic-info">
        <h2>Basic Information</h2>
        <el-form>
            <el-form-item label="Name">
                <el-input v-model="character.name" />
            </el-form-item>

            <el-form-item label="Race">
                <el-input v-model="character.race" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
export default Vue.extend({
    name: "EditBasicInfo",
    // props: {
    //     character: Object as PropType<Character>,
    // },
    // data() {
    //     return {
    //         character: store.character,
    //     };
    // },
    computed: {
        character(): Character {
            return store.character;
        },
    },
});
</script>
