<template>
    <div id="tracked-abilities">
        <h2>
            Tracked Abilities
            <el-button type="success" @click="showAddDialog = true">
                <i class="fas fa-plus"></i>
            </el-button>
        </h2>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col
                :span="6"
                v-for="[ability, desc] in abilities"
                :key="ability.id"
            >
                <el-card class="overview-card" style="position: relative;">
                    <span
                        class="delete-ability"
                        @click="deleteConfirm(ability)"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </span>

                    <span class="edit-ability" @click="edit(ability)">
                        <i class="fas fa-edit"></i>
                    </span>
                    <h3 style="margin-top: 0;">
                        <a>{{ ability.name }}</a>
                    </h3>
                    <div>
                        <span class="major-number">
                            {{ ability.remainingUses }}
                        </span>
                        / {{ ability.maxUses }}
                    </div>

                    <el-button-group>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="use(ability)"
                        >
                            <i class="fas fa-dragon"></i>
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="restore(ability)"
                        >
                            <i class="fas fa-plus"></i>
                        </el-button>
                    </el-button-group>
                    <div v-html="desc"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="Delete Ability" :visible.sync="showDelete">
            <p>
                Are you sure you want to delete
                <b>{{ (toDelete && toDelete.name) || "" }}</b>
                ?
            </p>
            <span slot="footer">
                <el-button @click="cancelDelete">
                    <i class="fas fa-times"></i>
                    Cancel
                </el-button>

                <el-button type="danger" @click="deleteFinal">
                    <i class="fas fa-trash"></i>
                    Delete
                </el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit Ability" :visible.sync="showEdit">
            <el-form v-if="toEdit !== undefined">
                <el-form-item label="Name">
                    <el-input v-model="toEdit.name"></el-input>
                </el-form-item>

                <el-form-item label="Uses">
                    <el-input v-model.number="toEdit.maxUses"></el-input>
                </el-form-item>

                <el-form-item label="Description (supports markdown)">
                    <el-input
                        type="textarea"
                        v-model="toEdit.description"
                    ></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog label="Add New Ability" :visible.sync="showAddDialog">
            <el-form>
                <el-form-item label="Name">
                    <el-input v-model="newAbility.name"></el-input>
                </el-form-item>

                <el-form-item label="Uses">
                    <el-input v-model.number="newAbility.uses"></el-input>
                </el-form-item>

                <el-form-item label="Description (supports markdown)">
                    <el-input
                        type="textarea"
                        v-model="newAbility.description"
                    ></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button type="success" @click="addNewAbility">
                    <i class="fas fa-plus"></i>
                    Add
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Ability } from "@/models/Ability";
import marked from "marked";

export default Vue.extend({
    name: "TrackedAbilities",
    computed: {
        character(): Character {
            return store.character;
        },
        abilities(): [Ability, string][] {
            return this.character.abilities.map((ability) => {
                const desc = marked(ability.description);
                return [ability, desc];
            });
        },
    },
    methods: {
        use(ability: Ability) {
            ability.use();
        },
        restore(ability: Ability) {
            ability.restore();
        },
        deleteConfirm(ability: Ability) {
            this.showDelete = true;
            this.toDelete = ability;
        },
        deleteFinal() {
            if (!this.toDelete) return;
            this.character.deleteAbility(this.toDelete.id);
            this.toDelete = undefined;
            this.showDelete = false;
        },
        cancelDelete() {
            this.toDelete = undefined;
            this.showDelete = false;
        },
        edit(ability: Ability) {
            this.toEdit = ability;
            this.showEdit = true;
        },
        addNewAbility() {
            this.character.abilities.push(
                new Ability({
                    name: this.newAbility.name,
                    description: this.newAbility.description,
                    uses: this.newAbility.uses,
                })
            );

            this.newAbility = {
                name: "",
                description: "",
                uses: 0,
            };
            this.showAddDialog = false;
        },
    },
    data() {
        return {
            toDelete: undefined as Ability | undefined,
            showDelete: false,
            showEdit: false,
            toEdit: undefined as Ability | undefined,
            newAbility: {
                name: "",
                description: "",
                uses: 0,
            },
            showAddDialog: false,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
.delete-ability,
.edit-ability {
    position: absolute;
    color: grey;
    cursor: pointer;
    &:hover {
        color: $crimson;
        background: rgba(black, 0.2);
    }
    padding: 10px;
    border-radius: 1px;
}

.delete-ability {
    top: 5px;
    left: 5px;
}

.edit-ability {
    top: 5px;
    right: 5px;
}
</style>
