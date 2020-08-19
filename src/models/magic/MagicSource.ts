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
export class KnownSpell {
    spell: string;
    prepared: boolean;
    alwaysPrepared: boolean;

    constructor(args?: KnownSpellConstructorArgs) {
        this.spell = args?.spell ?? "";
        this.prepared = args?.prepared ?? false;
        this.alwaysPrepared = args?.alwaysPrepared ?? false;
    }

    prepare() {
        this.prepared = true;
    }

    unprepare() {
        this.prepared = false;
    }

    alwaysPrepare() {
        this.alwaysPrepared = true;
    }

    alwaysUnprepare() {
        this.alwaysPrepared = false;
    }
}

export class MagicSource {
    name = "";
    spellSlotProgression = 0;
    dc: number;
    hitBonus: number;
    level = 0;
    @Type(() => KnownSpell)
    knownSpells: Map<string, KnownSpell>;
    // includes both unpreparable spells and always prepared spells

    @Type(() => SingleUseSpell)
    singleUseSpells: Record<string, SingleUseSpell>;

    castingStat?: ScoreAbility;
    toPrepare?: number;

    constructor(name = "", castingStat?: ScoreAbility) {
        this.name = name;
        this.knownSpells = new Map();
        this.singleUseSpells = {};
        this.dc = 8;
        this.hitBonus = 0;
        if (castingStat) {
            this.castingStat = castingStat;
        }
    }

    get preparedSpells(): string[] {
        return [...this.knownSpells.entries()].reduce(
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
            if (this.knownSpells.has(sp)) return;
            this.knownSpells.set(
                sp,
                new KnownSpell({
                    spell: sp,
                })
            );
        });
    }

    unlearnSpell(...spells: string[]) {
        // this.knownSpells.delete(spell);
        spells.forEach((spell) => {
            this.knownSpells.delete(spell);
        });
    }

    prepareSpell(...spells: string[]) {
        // this.preparedSpells.add(spell);
        spells.forEach((spell) => {
            this.knownSpells.get(spell)?.prepare();
        });
    }

    unprepareSpell(...spells: string[]) {
        spells.forEach((spell) => {
            this.knownSpells.get(spell)?.unprepare();
        });
    }

    alwaysPrepare(...spells: string[]) {
        spells.forEach((spell) => {
            this.knownSpells.get(spell)?.alwaysPrepare();
        });
    }

    alwaysUnprepare(...spells: string[]) {
        spells.forEach((spell) => {
            this.knownSpells.get(spell)?.alwaysUnprepare();
        });
    }

    get adjustedLevel(): number {
        return this.spellSlotProgression * this.level;
    }

    preparedSpellsBySource(): SpellBySource[] {
        return [...this.knownSpells.entries()]
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
        return [...this.knownSpells.keys()].map((spell) => ({
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

    isSpellKnown(spell: string | Spell) {
        const txt = typeof spell === "string" ? spell : spell.slug;
        return this.knownSpells.has(txt);
    }

    isSpellPrepared(spell: string | Spell): boolean {
        const txt = typeof spell === "string" ? spell : spell.slug;
        const sp = this.knownSpells.get(txt);
        return (sp?.prepared || sp?.alwaysPrepared) ?? false;
    }

    get numPrepared(): number {
        return [...this.knownSpells.values()].reduce(
            (acc, i) => (i.prepared && !i.alwaysPrepared ? acc + 1 : acc),
            0
        );
    }
}
