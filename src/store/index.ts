import { Character } from "@/models/Character";

export class Store {
    character: Character;
    constructor() {
        this.character = new Character();
    }
}

export const store = new Store();
