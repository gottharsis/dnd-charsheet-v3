<template>
    <div id="edit-classes">
        <h2>Classes</h2>

        <el-form>
            <div v-for="(cl, i) in playerClass.classes" :key="cl.name">
                <el-row>
                    <el-col>
                        <h4>{{ cl.name }}</h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Level">
                            <el-input
                                type="number"
                                v-model.number="cl.level"
                                @input="recalculate"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Subclass">
                            <el-select v-model="cl.subclass">
                                <el-option
                                    v-for="subclass in subClasses[i]"
                                    :key="subclass"
                                    :value="subclass"
                                    :label="subclass"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="danger" @click="deleteClass(cl.name)">
                        <i class="far fa-trash-alt"></i>
                        Delete Class
                    </el-button>
                </el-row>
            </div>
            <h2>Add new Class</h2>
            <el-row>
                <el-form-item label="Class">
                    <el-select v-model="chosenClass" value-key="name">
                        <el-option
                            v-for="cl in availableClasses"
                            :key="cl.name"
                            :value="cl"
                            :label="cl.name"
                        />
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="level">
                        <el-input
                            type="number"
                            v-model.number="chosenClassLevel"
                        />
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Subclass">
                        <el-select
                            v-model="chosenClassSubclass"
                            clearable
                            placeholder="None"
                        >
                            <el-option
                                v-for="subclass in (chosenClass &&
                                    chosenClass.subclasses) ||
                                []"
                                :key="subclass"
                                :value="subclass"
                                :label="subclass"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-button
                    type="primary"
                    :disabled="!chosenClass"
                    @click="addClass"
                >
                    <i class="fas fa-plus"></i>
                    Add class
                </el-button>
            </el-row>
        </el-form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { PlayerClass, PClass } from "@/models/PlayerClass";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
import sCls from "@/reference/classes.json";
import { Character } from "@/models/Character";
const sourceClasses = sCls as SourceClass[];
export default Vue.extend({
    name: "EditClasses",
    computed: {
        character(): Character {
            return store.character;
        },
        playerClass(): PlayerClass {
            return store.character.playerClass;
        },
        subClasses(): string[][] {
            return this.playerClass.classes.map((pclass) => {
                const src = sourceClasses.find(
                    ({ name }) => name === pclass.name
                );
                return src!!.subclasses;
            });
        },
        availableClasses(): SourceClass[] {
            return sourceClasses.filter(
                ({ name }) =>
                    !this.playerClass.classes.some(
                        ({ name: pcname }) => pcname === name
                    )
            );
        },
    },
    methods: {
        recalculate() {
            this.character.recompute();
        },
        addClass() {
            if (this.chosenClass) {
                this.character.addClass(
                    this.chosenClass,
                    this.chosenClassLevel,
                    this.chosenClassSubclass
                );
                this.chosenClass = undefined;
                this.chosenClassLevel = 1;
                this.chosenClassSubclass = "";
            }
        },
        deleteClass(className: string) {
            if (this.playerClass.classes.length > 1) {
                this.character.removeClass(className);
            }
        },
    },
    data() {
        return {
            chosenClass: undefined as undefined | SourceClass,
            chosenClassLevel: 1,
            chosenClassSubclass: "",
        };
    },
    beforeDestroy() {
        this.character.recompute();
    },
});
</script>
