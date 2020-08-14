<template>
    <div id="features">
        <h2>
            Features
            <el-button type="success" @click="showNewFeature = true">
                <i class="fas fa-plus"></i>
            </el-button>
        </h2>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col
                :span="6"
                v-for="[feature, desc] in features"
                :key="feature.id"
            >
                <el-card class="overview-card" style="position: relative;">
                    <span class="edit" @click="edit(feature)">
                        <i class="fas fa-edit"></i>
                    </span>

                    <span class="delete" @click="deleteFeature(feature)">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <h3>{{ feature.name }}</h3>
                    <p v-html="desc"></p>
                    <p>
                        <i>Source: {{ feature.source }}</i>
                    </p>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="New Feature" :visible.sync="showNewFeature">
            <el-form>
                <el-form-item label="Name">
                    <el-input v-model="newFeature.name"></el-input>
                </el-form-item>

                <el-form-item label="Description">
                    <el-input
                        type="textarea"
                        v-model="newFeature.description"
                    ></el-input>
                </el-form-item>

                <el-form-item label="Source">
                    <el-input v-model="newFeature.source" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="success" @click="addFeature">
                    <i class="fas fa-plus"></i>
                    Add
                </el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit Feature" :visible.sync="showEdit">
            <el-form v-if="featureToEdit !== undefined">
                <el-form-item label="Name">
                    <el-input v-model="featureToEdit.name"></el-input>
                </el-form-item>

                <el-form-item label="Description">
                    <el-input
                        type="textarea"
                        v-model="featureToEdit.description"
                    ></el-input>
                </el-form-item>

                <el-form-item label="Source">
                    <el-input v-model="featureToEdit.source" />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Feature } from "@/models/Feature";
import marked from "marked";
export default Vue.extend({
    name: "Features",
    computed: {
        character(): Character {
            return store.character;
        },
        features(): [Feature, string][] {
            return this.character.features.map((f) => [
                f,
                marked(f.description),
            ]);
        },
    },
    data() {
        return {
            newFeature: {
                name: "",
                description: "",
                source: "",
            },
            featureToEdit: undefined as Feature | undefined,
            showEdit: false,
            showNewFeature: false,
        };
    },
    methods: {
        addFeature() {
            this.character.features.push(new Feature(this.newFeature));
            this.newFeature = {
                name: "",
                description: "",
                source: "",
            };

            this.showNewFeature = false;
        },
        edit(feature: Feature) {
            console.log("Editing " + feature.name);
            this.featureToEdit = feature;
            this.showEdit = true;
        },
        deleteFeature(feature: Feature) {
            this.character.deleteFeature(feature.id);
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.edit,
.delete {
    position: absolute;
    color: grey;
    cursor: pointer;
    padding: 10px;
    border-radius: 1px;
}

.delete {
    top: 5px;
    left: 5px;
    &:hover {
        color: $crimson;
    }
}

.edit {
    top: 5px;
    right: 5px;
    &:hover {
        color: $tango;
    }
}
</style>
