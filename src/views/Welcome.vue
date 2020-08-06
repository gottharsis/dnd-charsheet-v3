<template>
    <el-container id="welcome">
        <el-main>
            <el-row>
                <h1>Welcome to the app!</h1>
            </el-row>
            <template v-if="loaded">
                <div class="spaced" v-if="characterData.length > 0">
                    <el-row><h2>Select a Character</h2></el-row>
                    <el-row
                        v-for="(row, i) in characterRows"
                        :key="i"
                        :gutter="20"
                        type="flex"
                        class="row-bg"
                        justify="center"
                    >
                        <el-col
                            :span="characterColSpan"
                            v-for="[id, name] in row"
                            :key="id"
                        >
                            <el-card class="box-card">
                                <el-row>
                                    <h3>
                                        {{ name }}
                                    </h3>
                                </el-row>
                                <el-row>
                                    <el-button
                                        type="primary"
                                        @click.prevent="load(id)"
                                    >
                                        Load
                                    </el-button>
                                    <el-button
                                        type="danger"
                                        @click.prevent="remove(id)"
                                    >
                                        <i class="far fa-trash-alt"></i>
                                        Delete
                                    </el-button>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </template>
            <el-row>
                <el-button @click="navigateToCreator">
                    Create new Character
                </el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
    readIndexFile,
    loadCharacter,
    deleteCharacter,
} from "@/persist-data/persistCharacter";
import { chunk } from "@/util/chunk";
import { store } from "@/store/store";

export default Vue.extend({
    data() {
        return {
            characters: undefined as Record<string, string> | undefined,
            loaded: false,
            displayWidth: 4, // number of characters per row
        };
    },
    async mounted() {
        try {
            const characters = await readIndexFile();
            // const characters = {
            //     idA: "Aurore",
            //     idB: "Default name 2",
            // };
            this.characters = characters;
        } catch (e) {
            console.error(e);
            this.characters = {};
        } finally {
            this.loaded = true;
        }
    },
    computed: {
        characterData(): [string, string][] {
            return Object.entries(this.characters as Record<string, any>);
        },
        characterRows(): string[][][] {
            return chunk(this.characterData, this.displayWidth);
        },
        characterColSpan(): number {
            return Math.floor(24 / this.displayWidth);
        },
    },
    methods: {
        navigateToCreator() {
            this.$router.push("/creator");
        },
        async load(id: string) {
            const character = await loadCharacter(id);
            store.character = character;
            this.navigateToMainPage();
        },
        navigateToMainPage() {
            console.log(store.character.name);
        },
        async remove(id: string) {
            deleteCharacter(id);
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/element-variables.scss";

.spaced {
    margin-top: 40px;
    margin-bottom: 40px;
}
</style>
