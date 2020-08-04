export const multiclassProgression = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
    [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
    [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
    [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
    [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
    [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
    [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
    [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
    [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
    [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
];

export class Slot {
    level: number;
    quantity: number;
    used: number;
    constructor(level = 0, quantity = 0, used = 0) {
        this.level = level;
        this.quantity = quantity;
        this.used = used;
    }

    get remaining(): number {
        return this.quantity - this.used;
    }

    cast(): boolean {
        if (this.remaining <= 0) return false;
        this.used++;
        return true;
    }

    recover(amt?: number) {
        amt = amt ?? this.quantity;
        this.used = Math.max(0, this.used - amt);
    }
}

export const createSlots = (level: number) =>
    multiclassProgression[Math.floor(level)].map(
        (quantity, level) => new Slot(level, quantity)
    );
