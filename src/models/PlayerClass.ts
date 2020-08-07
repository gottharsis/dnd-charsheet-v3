import { Type } from "class-transformer";
import { SourceClass } from "./sourceinfo/SourceClass";
import { MagicSource } from "./magic/MagicSource";
export class HitDie {
    max: number;
    remaining: number;
    die: number;

    constructor(hd?: { max: number; remaining?: number; die: number }) {
        this.max = hd?.max ?? 0;
        this.remaining = hd?.remaining ?? hd?.max ?? 0;
        this.die = hd?.die ?? 0;
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
export class PClass {
    name: string;
    level: number;
    subclass: string;
    hitDie: number;
    constructor() {
        this.name = "";
        this.subclass = "";
        this.level = 0;
        this.hitDie = 0;
    }

    toString(): string {
        return `${this.subclass} ${this.name} ${this.level}`;
    }
}
export class PlayerClass {
    @Type(() => PClass)
    classes: PClass[];

    @Type(() => HitDie)
    hitDice: HitDie[];

    constructor() {
        this.classes = [];
        this.hitDice = [];
    }

    get totalLevel(): number {
        return this.classes.map((i) => i.level).reduce((a, b) => a + b);
    }

    get proficiencyBonus(): number {
        return 1 + Math.ceil(this.totalLevel / 4);
    }

    toString(): string {
        return this.classes.map((i) => i.toString()).join(" / ");
    }

    recalculateHitDice() {
        const map = new Map<number, number>();
        this.classes.forEach(({ hitDie, level }) => {
            map.set(hitDie, level + (map.get(hitDie) ?? 0));
        });

        this.hitDice = [];
        map.forEach((count, die) =>
            this.hitDice.push(
                new HitDie({
                    max: count,
                    die,
                })
            )
        );
    }
    addClass(cl: SourceClass, level = 1, subclass = "") {
        if (this.classes.some((i) => i.name === cl.name)) {
            throw "Cannot add same class";
        }
        const pcl = new PClass();
        pcl.name = cl.name;
        pcl.level = level;
        pcl.subclass = subclass;
        pcl.hitDie = cl.hitDice;
        this.classes.push(pcl);
        if (cl.spellcasting) {
            const magicSource = new MagicSource();
            magicSource.name = cl.name;
            magicSource.level = level;
            magicSource.spellSlotProgression = cl.spellcasting.progression;

            // TODO: finish
        }
        this.recalculateHitDice();
    }

    removeClass(name: string) {
        this.classes = this.classes.filter((i) => i.name !== name);
        this.recalculateHitDice();
    }
}
