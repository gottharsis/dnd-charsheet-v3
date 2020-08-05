import { Type } from "class-transformer";
import { ScoreAbility } from "../AbilityScores";

export class MagicSource {
    name = "";
    spellSlotProgression = 0;
    dc: number;
    hitBonus: number;
    level = 0;
    @Type(() => String)
    knownSpells: Set<String>;
    // includes both unpreparable spells and always prepared spells
    @Type(() => String)
    preparedSpells: Set<String>;
    @Type(() => String)
    alwaysPrepared: Set<String>;

    @Type(() => Number)
    singleUseSpells: Map<String, Number>;

    constructor() {
        this.knownSpells = new Set();
        this.preparedSpells = new Set();
        this.alwaysPrepared = new Set();
        this.singleUseSpells = new Map();
        this.dc = 8;
        this.hitBonus = 0;
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
}
