import { v4 as uuid } from "uuid";

export class MagicItem {
    id: string;
    name = "";
    description = "";
    requiresAttunement = false;
    isAttuned = false;
    charges = 0;
    maxCharges = 0;

    constructor() {
        this.id = `magic_item_${uuid()}`;
    }

    // return true if sufficient charges are there
    useCharges(amt: number): boolean {
        if (this.charges < amt) {
            return false;
        }
        this.charges -= amt;
        return true;
    }

    /**
     * Recovers a certain amount of charges
     * @param amt The number of charges to recover. If left undefined, it will restore all the charges.
     */
    recoverCharges(amt?: number) {
        amt = amt ?? this.maxCharges;
        this.charges = Math.min(this.maxCharges, this.charges + amt);
    }
}
