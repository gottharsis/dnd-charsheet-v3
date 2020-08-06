import { Type, classToPlain, plainToClass } from "class-transformer";
import "reflect-metadata";

export class AbilityScore {
    score: number;
    constructor() {
        this.score = 8;
    }
    get modifier() {
        return Math.floor((this.score - 10) / 2);
    }

    get modifierString() {
        if (this.modifier >= 0) {
            return `+${this.modifier}`;
        } else {
            return String(this.modifier);
        }
    }
}

export type ScoreAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";
export const abilityOrder: ScoreAbility[] = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha",
];

export class AbilityScores {
    @Type(() => AbilityScore)
    str: AbilityScore;
    @Type(() => AbilityScore)
    dex: AbilityScore;
    @Type(() => AbilityScore)
    con: AbilityScore;
    @Type(() => AbilityScore)
    int: AbilityScore;
    @Type(() => AbilityScore)
    wis: AbilityScore;
    @Type(() => AbilityScore)
    cha: AbilityScore;

    constructor() {
        this.str = new AbilityScore();
        this.dex = new AbilityScore();
        this.con = new AbilityScore();
        this.int = new AbilityScore();
        this.wis = new AbilityScore();
        this.cha = new AbilityScore();
    }

    /**
     * Represent as an array of tuples [stat, score]
     */
    getArrayForm(): [ScoreAbility, AbilityScore][] {
        return abilityOrder.map((stat) => [stat, this[stat]]);
    }
}
