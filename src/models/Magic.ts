import { Slot, createSlots } from "./magic/SpellSlots";
import { Type } from "class-transformer";
import { MagicSource } from "./magic/MagicSource";

export class Magic {
    @Type(() => Slot)
    multiclassSlots: Slot[];
    @Type(() => Slot)
    pactSlot?: Slot;
    @Type(() => MagicSource)
    magicSources: MagicSource[];

    constructor() {
        this.magicSources = [];
        this.multiclassSlots = createSlots(0);
    }

    computeMulticlassSlots() {
        const level = Math.floor(
            this.magicSources
                .map((i) => i.adjustedLevel)
                .reduce((a, b) => a + b)
        );
        this.multiclassSlots = createSlots(level);
    }

    // will attempt to cast from pact slot first if it is of the same level as pact magic, and then will use
    // multiclass slots.
    cast(level: number) {
        if (
            this.pactSlot &&
            this.pactSlot.level === level &&
            this.pactSlot.remaining > 0
        ) {
            this.pactSlot.cast();
        } else if (level > 0 && level <= 9) {
            return this.multiclassSlots[level].cast();
        }
    }

    /**
     * Recovers all spell slots
     */
    recoverAllSlots() {
        this.pactSlot?.recover();
        this.multiclassSlots.forEach((i) => i.recover());
    }

    /**
     * Recovers slots of a certain level
     * @param level The level to recover, or "pact" to recover pact slots
     * @param amount the amount to recover; leave blank to recover all
     */
    recoverSlot(level: number | "pact", amount?: number) {
        if (level === "pact") {
            this.pactSlot?.recover(amount);
        } else if (level > 0 && level <= 9) {
            this.multiclassSlots[level].recover(amount);
        }
    }
}
