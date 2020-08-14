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

interface KnownSpellConstructorArgs {
    spell: string;
    prepared?: boolean;
    alwaysPrepared?: boolean;
}
class KnownSpell {
    spell: string;
    prepared?: boolean;
    alwaysPrepared?: boolean;

    constructor(args?: KnownSpellConstructorArgs) {
        this.spell = args?.spell ?? "";
        this.prepared = args?.prepared ?? false;
        this.alwaysPrepared = args?.alwaysPrepared ?? false;
    }
}

export class MagicSource {
    name = "";
    spellSlotProgression = 0;
    dc: number;
    hitBonus: number;
    level = 0;
    @Type(() => KnownSpell)
    knownSpells: Record<string, KnownSpell>;
    // includes both unpreparable spells and always prepared spells

    @Type(() => SingleUseSpell)
    singleUseSpells: Record<string, SingleUseSpell>;

    castingStat?: ScoreAbility;
    toPrepare?: number;

    constructor(name = "", castingStat?: ScoreAbility) {
        this.name = name;
        this.knownSpells = {};
        this.singleUseSpells = {};
        this.dc = 8;
        this.hitBonus = 0;
        if (castingStat) {
            this.castingStat = castingStat;
        }
    }

    get preparedSpells(): string[] {
        return Object.entries(this.knownSpells).reduce(
            (arr: string[], [slug, { prepared, alwaysPrepared }]) => {
                if (prepared || alwaysPrepared) {
                    return arr.concat(slug);
                }
                return arr;
            },
            []
        );
    }

    get alwaysPrepared(): string[] {
        return Object.entries(this.knownSpells).reduce(
            (arr: string[], [slug, { alwaysPrepared }]) => {
                if (alwaysPrepared) {
                    return arr.concat(slug);
                }
                return arr;
            },
            []
        );
    }

    learnSpell(...spells: string[]) {
        spells.forEach((sp) => {
            if (sp in this.knownSpells) return;
            this.knownSpells[sp] = new KnownSpell({ spell: sp });
        });
    }

    unlearnSpell(...spells: string[]) {
        // this.knownSpells.delete(spell);
        spells.forEach((spell) => {
            delete this.knownSpells[spell];
        });
    }

    prepareSpell(...spells: string[]) {
        // this.preparedSpells.add(spell);
        spells.forEach((spell) => {
            if (spell in this.knownSpells)
                this.knownSpells[spell].prepared = true;
        });
    }

    unprepareSpell(...spells: string[]) {
        spells.forEach((spell) => {
            if (spell in this.knownSpells) {
                this.knownSpells[spell].prepared = false;
            }
        });
    }

    get adjustedLevel(): number {
        return this.spellSlotProgression * this.level;
    }

    preparedSpellsBySource(): SpellBySource[] {
        return Object.entries(this.knownSpells)
            .filter(
                ([slug, { prepared, alwaysPrepared }]) =>
                    prepared || alwaysPrepared
            )
            .map(([slug, spell]) => {
                return {
                    source: this.name,
                    spell: allSpells[slug],
                    dc: this.dc,
                    hitBonus: this.hitBonus,
                    key: slug + this.name,
                };
            });
    }

    knownSpellsBySource(): SpellBySource[] {
        return Object.keys(this.knownSpells).map((spell) => ({
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
