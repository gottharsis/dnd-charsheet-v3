import { Type, plainToClass, Transform, classToPlain } from "class-transformer";
import "reflect-metadata"
export class DeathSaves {
    success: number = 0;
    failure: number = 0;

    succeed(): boolean {
        return (++this.success === 3);
    }

    fail(): boolean {
        return (++this.failure === 3);
    }
}

export class Health {
    currentHp: number;
    tempHp: number;
    maxHp: number;

    @Transform(value => new Map(Object.entries(value).map(([k, v]) => [Number(k), Number(v)])),
        {
            toClassOnly: true
        })
    hitDice: Map<number, number>;
    @Type(() => DeathSaves)
    deathSaves: DeathSaves;

    constructor() {
        this.currentHp = 0;
        this.tempHp = 0;
        this.maxHp = 0;
        this.hitDice = new Map<number, number>();
        this.deathSaves = new DeathSaves();
    }
    damage(amt: number) {
        // temp hp logic
        const carryover = amt - this.tempHp;
        this.tempHp = Math.max(0, this.tempHp - amt);
        this.currentHp = Math.max(this.currentHp - carryover, 0);
    }

    get isUnconscious(): boolean {
        return this.currentHp === 0;
    }

    heal(amt: number) {
        this.currentHp = Math.min(this.currentHp + amt, this.maxHp);
    }
}


