import { Character } from "../models/Character";
import { SourceRace } from "@/models/sourceinfo/SourceRace";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
import { AbilityScores } from "@/models/AbilityScores";
import { Ability } from "@/models/Ability";
import { Proficiencies } from "@/models/Proficiency";
import { Feature } from "@/models/Feature";
import { PClass, HitDie } from "@/models/PlayerClass";
import { MagicSource } from "@/models/magic/MagicSource";

/**
 * Creates a character at level 1
 */
export class CharacterCreator {
    name: string;
    race?: SourceRace;
    class?: SourceClass;
    abilityScores: AbilityScores;
    customFeatures: Feature[];
    customAbilities: Ability[];
    customProficiencies: Proficiencies;

    constructor() {
        this.name = "";
        this.abilityScores = new AbilityScores();
        this.customFeatures = [];
        this.customAbilities = [];
        this.customProficiencies = new Proficiencies();
    }

    /**
     * Combine the racial ASI with the chosen ASI
     */
    _combineAbilityScores() {
        this.abilityScores.str.score += this.race?.ability.str ?? 0;
        this.abilityScores.dex.score += this.race?.ability.dex ?? 0;
        this.abilityScores.con.score += this.race?.ability.con ?? 0;
        this.abilityScores.int.score += this.race?.ability.int ?? 0;
        this.abilityScores.wis.score += this.race?.ability.wis ?? 0;
        this.abilityScores.cha.score += this.race?.ability.cha ?? 0;
    }

    build(): Character {
        if (!this.race || !this.class) throw "Cannot use char";
        const char = new Character();
        char.name = this.name;
        char.race = this.race.name;

        // ability scores
        this._combineAbilityScores();
        char.abilityScores = this.abilityScores;

        // class
        // const pclass = new PClass();
        // pclass.name = this.class.name;
        // pclass.level = 1;
        // pclass.subclass = "";
        // char.playerClass.classes.push(pclass);

        // health
        const hd = this.class.hitDice;

        char.health.maxHp = hd + this.abilityScores.con.modifier;
        char.health.currentHp = char.health.maxHp;

        // classes and magic
        char.addClass(this.class);

        // magic
        // if (this.class.spellcasting) {
        //     const magicSource = new MagicSource();
        //     magicSource.name = this.class.name;
        //     magicSource.spellSlotProgression = this.class.spellcasting.progression;
        //     const castingAbility = this.class.spellcasting.ability;
        //     magicSource.castingStat = castingAbility;
        //     magicSource.hitBonus =
        //         char.playerClass.proficiencyBonus +
        //         this.abilityScores[castingAbility].modifier;
        //     magicSource.dc = 8 + magicSource.hitBonus;

        //     char.magic.magicSources.push(magicSource);
        // }

        // features and abilities
        char.features = this.customFeatures;
        char.abilities = this.customAbilities;

        // proficiencies
        char.proficiencies = this.customProficiencies;

        // size and speed
        char.size = this.race.size;
        char.speed = this.race.speed;
        return char;
    }
}
