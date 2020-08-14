<template>
    <div id="inventory-items">
        <h2>
            Items
            <el-button type="success" @click="showNewDialog = true">
                <i class="fas fa-plus"></i>
            </el-button>
        </h2>
        <el-card class="overview-card">
            <el-table
                :data="items"
                cell-class-name="skill-cell"
                header-row-class-name="skill-cell"
            >
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="description" label="Description" />
                <el-table-column prop="weight" label="Weight" />
                <el-table-column prop="quantity" label="Quantity" />
                <el-table-column label="Operations">
                    <template slot-scope="scope">
                        <el-button
                            type="danger"
                            size="mini"
                            @click="deleteItem(scope.row)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </el-button>
                        <el-button
                            type="info"
                            size="mini"
                            @click="editItem(scope.row)"
                        >
                            <i class="fas fa-edit"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="New Item" :visible.sync="showNewDialog">
            <el-form>
                <el-form-item label="Name">
                    <el-input v-model="newItem.name" />
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="newItem.description" type="textarea" />
                </el-form-item>
                <el-form-item label="Quantity">
                    <el-input v-model.number="newItem.quantity" />
                </el-form-item>
                <el-form-item label="Weight">
                    <el-input v-model.number="newItem.weight" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="success" @click="addNewItem">
                    <i class="fas fa-plus"></i>
                    Add
                </el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit Item" :visible.sync="showEdit">
            <el-form v-if="itemToEdit !== undefined">
                <el-form-item label="Name">
                    <el-input v-model="itemToEdit.name" />
                </el-form-item>
                <el-form-item label="Description">
                    <el-input
                        v-model="itemToEdit.description"
                        type="textarea"
                    />
                </el-form-item>
                <el-form-item label="Quantity">
                    <el-input v-model.number="itemToEdit.quantity" />
                </el-form-item>
                <el-form-item label="Weight">
                    <el-input v-model.number="itemToEdit.weight" />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/models/Character";
import { store } from "@/store";
import { Inventory } from "@/models/Inventory";
import { Item } from "@/models/inventory/Item";
export default Vue.extend({
    name: "InventoryItems",
    computed: {
        character(): Character {
            return store.character;
        },
        inventory(): Inventory {
            return this.character.inventory;
        },
        items(): Item[] {
            return this.inventory.items;
        },
    },
    data() {
        return {
            showNewDialog: false,
            newItem: {
                name: "",
                weight: 0,
                description: "",
                quantity: 1,
            },
            itemToEdit: undefined as Item | undefined,
            showEdit: false,
        };
    },
    methods: {
        addNewItem() {
            this.inventory.addItem(this.newItem);
            this.newItem = {
                name: "",
                weight: 0,
                description: "",
                quantity: 1,
            };
            this.showNewDialog = false;
        },
        deleteItem(item: Item) {
            this.inventory.deleteItem(item);
        },
        editItem(item: Item) {
            this.itemToEdit = item;
            this.showEdit = true;
        },
    },
});
</script>
