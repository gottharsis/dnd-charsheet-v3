import { ScoreAbility } from "../AbilityScores";

export interface SourceProficiencies {
    weapons?: String[];
    tools?: String[];
    armor?: String[];
}

export interface SourceRace {
    name: String;
    ability: Record<ScoreAbility, number>;
    size: String;
    senses: String[];
    proficiencies: SourceProficiencies;
    languages: String[];
    features: String[];
}
