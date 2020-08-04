import { v4 as uuid } from "uuid";

export class Item {
    id: string;
    name: string = '';
    weight: number = 0;
    description = '';
    quantity = 0;

    constructor() {
        this.id = `item_${uuid()}`
    }
}