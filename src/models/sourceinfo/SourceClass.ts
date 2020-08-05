import { ScoreAbility } from "../AbilityScores";

export interface SourceMagic {
    ability: ScoreAbility;
    progression: number;
}

export interface SourceClass {
    name: string;
    hitDice: number;
    subclasses: string[];
    spellcasting?: SourceMagic;
}
