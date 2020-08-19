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

            <h3>Overrides</h3>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Passive Perception">
                        <el-input
                            :value="overrides.passivePerception"
                            @input="setPP"
                            clearable
                            placeholder="Default Value"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Initiative">
                        <el-input
                            :value="overrides.initiative"
                            @input="setInitiative"
                            clearable
                            placeholder="Default Value"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Character, StatOverrides } from "@/models/Character";
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
        overrides(): StatOverrides {
            return (this.changeTracker &&
                this.character.statOverrides) as StatOverrides;
        },
    },
    data() {
        return {
            changeTracker: 1,
        };
    },
    methods: {
        setPP(input: string) {
            if (input === "") {
                this.overrides.passivePerception = undefined;
            } else {
                const n = Number(input);
                if (!isNaN(n)) {
                    this.overrides.passivePerception = n;
                }
            }
            this.changeTracker++;
        },

        setInitiative(input: string) {
            if (input === "") {
                this.overrides.initiative = undefined;
            } else {
                const n = Number(input);
                if (!isNaN(n)) {
                    this.overrides.initiative = n;
                }
            }
            this.changeTracker++;
        },
    },
});
</script>
