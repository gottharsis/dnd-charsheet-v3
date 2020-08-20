import { ScoreAbility, AbilityScores } from "./AbilityScores";
import { v4 as uuid } from "uuid";
import { modifierString } from "@/util/modifierString";

export class Weapon {
    name: string;
    damageDie: string;
    ability: ScoreAbility[];
    abilityBonus: number;
    bonusToHit: number;
    proficiencyBonus: number;
    isProficient: boolean;
    id: string;

    constructor(obj?: {
        name: string;
        damage: string;
        abilities?: ScoreAbility[];
        isProficient?: boolean;
        bonusToHit?: number;
    }) {
        this.id = `weapon_${uuid()}`;
        this.name = obj?.name ?? "";
        this.damageDie = obj?.damage ?? "";
        this.ability = obj?.abilities ?? ["str"];
        this.abilityBonus = 0;
        this.bonusToHit = obj?.bonusToHit ?? 0;
        this.isProficient = obj?.isProficient ?? false;
        this.proficiencyBonus = 0;
    }

    get damage(): string {
        const bonus = this.abilityBonus;
        if (bonus === 0) return this.damageDie;
        return this.damageDie + modifierString(bonus);
    }

    get hitBonus(): number {
        let bonus = this.abilityBonus + this.bonusToHit;
        if (this.isProficient) {
            bonus += this.proficiencyBonus;
        }
        return bonus;
    }

    recompute(abilityScores: AbilityScores, proficiencyBonus: number) {
        if (this.ability.length > 0) {
            this.abilityBonus = Math.max(
                ...this.ability.map((stat) => abilityScores[stat].modifier)
            );
        }

        this.proficiencyBonus = proficiencyBonus;
    }
}
