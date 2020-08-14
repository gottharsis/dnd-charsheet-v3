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

    addClass(cl: SourceClass, level = 1, subclass = "") {
        if (this.playerClass.classes.some((i) => i.name === cl.name)) {
            throw "Cannot add same class";
        }
        const pcl = new PClass();
        pcl.name = cl.name;
        pcl.level = level;
        pcl.subclass = subclass;
        pcl.hitDie = cl.hitDice;
        this.playerClass.classes.push(pcl);
        if (cl.spellcasting) {
            const magicSource = new MagicSource(
                cl.name,
                cl.spellcasting.ability
            );
            magicSource.level = level;
            magicSource.spellSlotProgression = cl.spellcasting.progression;

            magicSource.hitBonus =
                this.playerClass.proficiencyBonus +
                this.abilityScores[cl.spellcasting.ability].modifier;
            magicSource.dc = 8 + magicSource.hitBonus;

            this.magic.addMagicSource(magicSource);
        }
        this.playerClass.recalculateHitDice();
    }

    removeClass(name: string) {
        this.playerClass.classes = this.playerClass.classes.filter(
            (i) => i.name !== name
        );
        this.playerClass.recalculateHitDice();
        this.magic.removeMagicSource(name);
    }

    recompute() {
        const computeDcAndBonus = (source: MagicSource) => {
            if (!source.castingStat) return;
            source.hitBonus =
                this.playerClass.proficiencyBonus +
                this.abilityScores[source.castingStat!!].modifier;
            source.dc = 8 + source.hitBonus;
        };

        const setMSourceClsLvl = (source: MagicSource) => {
            const cls = this.playerClass.classes.find(
                (i) => i.name === source.name || i.subclass === source.name
            );
            if (!cls) return;
            source.level = cls.level;
        };

        this.magic.magicSources.forEach((source) => {
            computeDcAndBonus(source);
            setMSourceClsLvl(source);
        });
        this.magic.computeMulticlassSlots();
        this.playerClass.recalculateHitDice();
    }

    deleteAbility(id: string) {
        this.abilities = this.abilities.filter((ab) => ab.id !== id);
    }

    deleteFeature(id: string) {
        this.features = this.features.filter((f) => f.id !== id);
    }
}
