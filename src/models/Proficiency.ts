import { ScoreAbility } from "./AbilityScores";
import { Type } from "class-transformer";

export class Proficiencies {
    @Type(() => String)
    armor: Set<string>;
    @Type(() => String)
    weapons: Set<string>;

    @Type(() => String)
    savingThrows: Set<ScoreAbility>;

    @Type(() => Number)
    tools: Map<string, number>;

    @Type(() => Number)
    skills: Map<string, number>;

    @Type(() => String)
    languages: Set<string>;

    constructor() {
        this.armor = new Set();
        this.weapons = new Set();
        this.savingThrows = new Set();
        this.tools = new Map();
        this.skills = new Map();
        this.languages = new Set();
    }
}
