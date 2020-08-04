import { Type } from "class-transformer";
import { Item } from "./inventory/Item";
import { MagicItem } from "./inventory/MagicItem";
export class Inventory {
    @Type(() => Item)
    items: Item[];
    @Type(() => MagicItem)
    magicItems: MagicItem[];

    constructor() {
        this.items = [];
        this.magicItems = [];
    }

    get totalWeight(): number {
        return this.items
            .map((i) => i.quantity * i.weight)
            .reduce((a, b) => a + b);
    }
}
