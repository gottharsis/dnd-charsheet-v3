import { Type } from "class-transformer";
import { ScoreAbility } from "../AbilityScores";
import { SpellBySource, SingleUseSpellSource } from "../Magic";
import spellsRaw from "@/reference/spells.json";
import { Spell } from "../sourceinfo/Spell";
const allSpells = spellsRaw as Record<string, Spell>;

export class SingleUseSpell {
    total = 0;
    remaining = 0;
    name = "";

    use() {
        if (this.remaining === 0) throw "Cannot use!";
        this.remaining--;
    }

    reset(amt = this.total) {
        this.remaining = Math.min(this.remaining + amt, this.total);
    }

    constructor(spell: string, uses: number) {
        this.name = spell;
        this.total = uses;
        this.remaining = uses;
    }
}

export class MagicSource {
    name = "";
    spellSlotProgression = 0;
    dc: number;
    hitBonus: number;
    level = 0;
    @Type(() => String)
    knownSpells: Set<string>;
    // includes both unpreparable spells and always prepared spells
    @Type(() => String)
    preparedSpells: Set<string>;
    @Type(() => String)
    alwaysPrepared: Set<string>;

    @Type(() => SingleUseSpell)
    singleUseSpells: Record<string, SingleUseSpell>;

    castingStat?: ScoreAbility;

    constructor() {
        this.knownSpells = new Set();
        this.preparedSpells = new Set();
        this.alwaysPrepared = new Set();
        this.singleUseSpells = {};
        this.dc = 8;
        this.hitBonus = 0;
        this.castingStat = "int";
    }

    learnSpell(spell: string) {
        this.knownSpells.add(spell);
    }

    unlearnSpell(spell: string) {
        this.knownSpells.delete(spell);
    }

    prepareSpell(spell: string) {
        this.preparedSpells.add(spell);
    }

    unprepareSpell(spell: string) {
        this.preparedSpells.delete(spell);
    }

    get adjustedLevel(): number {
        return this.spellSlotProgression * this.level;
    }

    preparedSpellsBySource(): SpellBySource[] {
        const prepared = new Set([
            ...this.preparedSpells,
            ...this.alwaysPrepared,
        ]);
        return [...prepared].map((spell) => ({
            source: this.name,
            spell: allSpells[spell],
            dc: this.dc,
            hitBonus: this.hitBonus,
            key: allSpells[spell].slug + this.name,
        }));
    }

    knownSpellsBySource(): SpellBySource[] {
        return [...this.knownSpells].map((spell) => ({
            source: this.name,
            spell: allSpells[spell],
            dc: this.dc,
            hitBonus: this.hitBonus,
            key: allSpells[spell].slug + this.name,
        }));
    }

    singleUseSpellsBySource(): SingleUseSpellSource[] {
        return Object.entries(this.singleUseSpells).map(([spell, uses]) => ({
            spell: allSpells[spell],
            uses,
            source: this.name,
            dc: this.dc,
            hitBonus: this.hitBonus,
            key: allSpells[spell].slug + this.name,
        }));
    }

    addSingleUseSpell(...spells: { spell: string; uses: number }[]) {
        spells.forEach(({ spell, uses }) => {
            this.singleUseSpells[spell] = new SingleUseSpell(spell, uses);
        });
    }
}
