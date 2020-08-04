import { Type } from "class-transformer";

export class PClass {
    name: String;
    level: number;
    subclass: String;
    constructor() {
        this.name = "";
        this.subclass = "";
        this.level = 0;
    }

    toString(): string {
        return `${this.subclass} ${this.name} ${this.level}`;
    }
}
export class PlayerClass {
    @Type(() => PClass)
    classes: PClass[];

    constructor() {
        this.classes = [];
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
}
