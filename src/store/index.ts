import { Character } from "@/models/Character";
import Vue from "vue";

import SourceClasses from "@/reference/classes.json";
import { SourceClass } from "@/models/sourceinfo/SourceClass";

export class Store {
    character: Character;
    constructor() {
        this.character = new Character();
    }
}

const testCharacter = new Character();
testCharacter.name = "Bob the BUilder";
testCharacter.abilityScores.update({
    str: 10,
    int: 14,
    dex: 13,
});

testCharacter.race = "Bugbear";
testCharacter.addClass(SourceClasses[3] as SourceClass);

export const store = Vue.observable(new Store());
store.character = testCharacter;
