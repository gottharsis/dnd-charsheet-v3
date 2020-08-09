import { Magic } from "./Magic";
import { Type, classToPlain } from "class-transformer";
import { Armor } from "./Armor";
import { Health } from "./Health";
import { PlayerClass, PClass } from "./PlayerClass";
import { Inventory } from "./Inventory";

import { v4 as uuid } from "uuid";
import { Feature } from "./Feature";
import { Ability } from "./Ability";
import { AbilityScore, AbilityScores, ScoreAbility } from "./AbilityScores";
import { Proficiencies } from "./Proficiency";
import { SourceClass } from "./sourceinfo/SourceClass";
import { MagicSource } from "./magic/MagicSource";
import { Skill } from "./sourceinfo/SourceSkill";
import sourceSkills from "@/reference/skills.json";

export class Character {
    id: string;
    name: string;
    race: string;
    size: string;
    speed: string;

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

    private getAbility(skillName: string): ScoreAbility | undefined {
        return (sourceSkills as Skill[]).find((i) => i.name === skillName)
            ?.stat;
    }

    skillModifier(skill: Skill | string): number {
        const stat =
            typeof skill === "string" ? this.getAbility(skill) : skill.stat;
        if (!stat) {
            throw "Invalid Skill Name";
        }
        const abilityMod = this.abilityScores[stat].modifier;
        const name = typeof skill === "string" ? skill : skill.name;
        const prof =
            (this.proficiencies.skills.get(name) ?? 0) *
            this.playerClass.proficiencyBonus;
        return abilityMod + prof;
    }

    passive(skill: Skill | string): number {
        return 10 + this.skillModifier(skill);
    }
}
