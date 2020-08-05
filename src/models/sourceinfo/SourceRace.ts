import { ScoreAbility } from "../AbilityScores";

export interface SourceProficiencies {
    weapons?: string[];
    tools?: string[];
    armor?: string[];
}

export interface SourceRace {
    name: string;
    ability: Record<ScoreAbility, number>;
    size: string;
    senses: string[];
    proficiencies: SourceProficiencies;
    languages: string[];
    features: string[];
    speed: string;
}
