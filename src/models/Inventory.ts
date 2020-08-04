import { Type } from "class-transformer";
import { Item } from "./inventory/Item";
import { MagicItem } from "./inventory/MagicItem";
import { Currency } from "./inventory/Currency";
export class Inventory {
    @Type(() => Item)
    items: Item[];
    @Type(() => MagicItem)
    magicItems: MagicItem[];
    @Type(() => Currency)
    money: Currency;

    constructor() {
        this.items = [];
        this.magicItems = [];
        this.money = new Currency();
    }

    get totalWeight(): number {
        return this.items
            .map((i) => i.quantity * i.weight)
            .reduce((a, b) => a + b);
    }
}
