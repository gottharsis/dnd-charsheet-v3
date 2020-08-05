export interface SourceMagic {
    ability: String;
    progression: number;
}

export interface SourceClass {
    name: String;
    hitDice: number;
    subclasses: String[];
    spellcasting?: SourceMagic;
}
