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
}

export type ScoreAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";

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
    getArrayForm(): [string, AbilityScore][] {
        return [
            ["str", this.str],
            ["dex", this.dex],
            ["con", this.con],
            ["int", this.int],
            ["wis", this.wis],
            ["cha", this.cha],
        ];
    }
}
