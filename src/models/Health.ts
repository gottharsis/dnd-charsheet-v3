import { Type, plainToClass, Transform, classToPlain } from "class-transformer";
export class DeathSaves {
    success: number = 0;
    failure: number = 0;

    succeed(): boolean {
        return ++this.success === 3;
    }

    fail(): boolean {
        return ++this.failure === 3;
    }
}

class HitDie {
    max: number;
    remaining: number;
    die: number;

    constructor() {
        this.max = 0;
        this.remaining = 0;
        this.die = 0;
    }

    /**
     * Uses some hit dice
     * @param amount the number of hit dice to use of this level
     * @return true if it is valid else false
     */
    use(amount: number): boolean {
        if (amount <= this.remaining) {
            this.remaining -= amount;
            return true;
        } else {
            return false;
        }
    }

    restore(amount?: number) {
        amount = amount ?? this.max;
        this.remaining += amount;
        this.remaining = Math.min(this.remaining, this.max);
    }
}

export class Health {
    currentHp: number;
    tempHp: number;
    maxHp: number;

    @Transform(
        (value) =>
            new Map(
                Object.entries(value).map(([k, v]) => [Number(k), Number(v)])
            ),
        {
            toClassOnly: true,
        }
    )
    @Type(() => HitDie)
    hitDice: HitDie[];
    @Type(() => DeathSaves)
    deathSaves: DeathSaves;

    constructor() {
        this.currentHp = 0;
        this.tempHp = 0;
        this.maxHp = 0;
        this.deathSaves = new DeathSaves();
        this.hitDice = [];
    }
    damage(amt: number) {
        // temp hp logic
        const carryover = amt - this.tempHp;
        this.tempHp = Math.max(0, this.tempHp - amt);
        if (carryover <= 0) return;
        this.currentHp = Math.max(this.currentHp - carryover, 0);
    }

    get isUnconscious(): boolean {
        return this.currentHp === 0;
    }

    heal(amt: number) {
        this.currentHp = Math.min(this.currentHp + amt, this.maxHp);
    }
}
