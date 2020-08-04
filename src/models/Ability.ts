import { v4 as uuid } from "uuid";
/**
 * Represents an ability that has a certain amount of uses.
 */
export class Ability {
    id: String;
    name: String;
    description: String;
    maxUses: number;
    remainingUses: number;

    constructor() {
        this.id = `ability_${uuid()}`;
        this.name = "";
        this.description = "";
        this.maxUses = 0;
        this.remainingUses = 0;
    }

    /**
     * Use some uses of the ability
     * @param amt The amount of uses to use
     */
    use(amt = 1): boolean {
        if (this.remainingUses < amt) {
            return false;
        }

        this.remainingUses -= amt;
        return true;
    }

    /**
     * Restore a certain amount of uses.
     * @param amt The number of uses to restore, leave undefined to restore all
     */
    restore(amt?: number) {
        amt = amt ?? this.maxUses;
        this.remainingUses = Math.min(this.maxUses, this.remainingUses + amt);
    }
}
