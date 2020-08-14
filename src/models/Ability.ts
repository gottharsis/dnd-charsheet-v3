import { v4 as uuid } from "uuid";
/**
 * Represents an ability that has a certain amount of uses.
 */
export class Ability {
    id: string;
    name: string;
    description: string;
    maxUses: number;
    remainingUses: number;

    constructor({
        name,
        description = "",
        uses,
    }: {
        description?: string;
        name: string;
        uses: number;
    }) {
        this.id = `ability_${uuid()}`;
        this.name = name;
        this.description = description;
        this.maxUses = uses;
        this.remainingUses = uses;
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
