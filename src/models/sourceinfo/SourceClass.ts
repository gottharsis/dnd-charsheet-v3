export interface SourceMagic {
    ability: string;
    progression: number;
}

export interface SourceClass {
    name: string;
    hitDice: number;
    subclasses: string[];
    spellcasting?: SourceMagic;
}
