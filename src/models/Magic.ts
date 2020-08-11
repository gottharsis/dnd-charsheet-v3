import { Slot, createSlots } from "./magic/SpellSlots";
import { Type } from "class-transformer";
import { MagicSource, SingleUseSpell } from "./magic/MagicSource";
import spellsRaw from "@/reference/spells.json";
import { Spell } from "./sourceinfo/Spell";
const allSpells = spellsRaw as Record<string, Spell>;

export interface SpellBySource {
    spell: string;
    source: string;
    dc: number;
    hitBonus: number;
}

export interface SingleUseSpellSource {
    spell: string;
    uses: SingleUseSpell;
    source: string;
    dc: number;
    hitBonus: number;
}

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

    addMagicSource(source: MagicSource) {
        this.magicSources.push(source);
        this.computeMulticlassSlots();
    }

    removeMagicSource(name: string) {
        this.magicSources = this.magicSources.filter((i) => i.name !== name);
        this.computeMulticlassSlots();
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

    preparedSpellsBySource(): SpellBySource[] {
        return this.magicSources.flatMap((magicSource) => {
            return magicSource.preparedSpellsBySource();
        });
    }

    preparedSpellsByLevel() {
        const spells = this.preparedSpellsBySource();

        const levels: SpellBySource[][] = [];
        for (let i = 0; i <= 9; i++) levels.push([]);

        spells.forEach((spell) => {
            const level = allSpells[spell.spell].level;
            levels[level].push(spell);
        });

        return levels;
    }

    singleUseSpells(): SingleUseSpellSource[] {
        return this.magicSources.flatMap((src) =>
            src.singleUseSpellsBySource()
        );
    }
}
