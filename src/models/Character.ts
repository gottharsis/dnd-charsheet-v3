import { Magic } from "./Magic";
import { Type, classToPlain } from "class-transformer";
import { Armor } from "./Armor";
import { Health } from "./Health";
import { PlayerClass } from "./PlayerClass";
import { Inventory } from "./Inventory";

import { v4 as uuid } from "uuid";
import { Feature } from "./Feature";
import { Ability } from "./Ability";
import { AbilityScore, AbilityScores } from "./AbilityScores";
import { Proficiencies } from "./Proficiency";

export class Character {
    id: String;
    name: String;
    race: String;
    size: String;
    speed: String;

    @Type(() => Magic)
    magic: Magic;

    @Type(() => Armor)
    armor: Armor;

    @Type(() => Health)
    health: Health;

    @Type(() => PlayerClass)
    playerClass: PlayerClass;

    @Type(() => Inventory)
    inventory: Inventory;

    @Type(() => Feature)
    features: Feature[];

    @Type(() => Ability)
    abilities: Ability[];

    @Type(() => AbilityScores)
    abilityScores: AbilityScores;

    @Type(() => Proficiencies)
    proficiencies: Proficiencies;

    constructor() {
        this.name = "";
        this.race = "";
        this.magic = new Magic();
        this.armor = new Armor();
        this.health = new Health();
        this.playerClass = new PlayerClass();
        this.inventory = new Inventory();
        this.features = [];
        this.abilities = [];
        this.id = `character_${uuid()}`;
        this.abilityScores = new AbilityScores();
        this.proficiencies = new Proficiencies();
        this.size = "med";
        this.speed = "30 ft.";
    }
}
