import { ScoreAbility } from "./AbilityScores";
import { Type } from "class-transformer";

export class Proficiencies {
    @Type(() => String)
    armor: Set<String>;
    @Type(() => String)
    weapons: Set<String>;

    @Type(() => String)
    savingThrows: Set<ScoreAbility>;

    @Type(() => Number)
    tools: Map<String, Number>;

    @Type(() => Number)
    skills: Map<String, Number>;

    @Type(() => String)
    languages: Set<String>;

    constructor() {
        this.armor = new Set();
        this.weapons = new Set();
        this.savingThrows = new Set();
        this.tools = new Map();
        this.skills = new Map();
        this.languages = new Set();
    }
}
