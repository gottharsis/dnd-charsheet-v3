import { Character } from "@/models/Character";
import Vue from "vue";

import { testCharacter } from "./testCharacter";

export class Store {
    character: Character;
    constructor() {
        this.character = new Character();
    }
}

export const store = Vue.observable(new Store());
store.character = testCharacter;
