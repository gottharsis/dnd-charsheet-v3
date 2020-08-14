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

    addItem({
        name,
        weight = 0,
        description = "",
        quantity = 1,
    }: {
        name: string;
        weight?: number;
        description?: string;
        quantity?: number;
    }) {
        const item = new Item();
        item.name = name;
        item.weight = weight;
        item.description = description;
        item.quantity = quantity;
        this.items.push(item);
    }

    deleteItem(item: string | Item) {
        const itemId = typeof item === "string" ? item : item.id;
        this.items = this.items.filter((i) => i.id !== itemId);
    }
}
