import { Type, plainToClass, Transform, classToPlain } from "class-transformer";
export class DeathSaves {
    success = 0;
    failure = 0;

    succeed(): boolean {
        return ++this.success === 3;
    }

    fail(): boolean {
        return ++this.failure === 3;
    }
}

export class Health {
    currentHp: number;
    tempHp: number;
    maxHp: number;

    // @Transform(
    //     (value) =>
    //         new Map(
    //             Object.entries(value).map(([k, v]) => [Number(k), Number(v)])
    //         ),
    //     {
    //         toClassOnly: true,
    //     }
    // )

    @Type(() => DeathSaves)
    deathSaves: DeathSaves;

    constructor() {
        this.currentHp = 0;
        this.tempHp = 0;
        this.maxHp = 0;
        this.deathSaves = new DeathSaves();
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

    heal(amt?: number) {
        if (amt === undefined) {
            this.currentHp = this.maxHp;
        } else {
            this.currentHp = Math.min(this.currentHp + amt, this.maxHp);
        }
    }
}
