export const modifierString = (modifier: number): string => {
    if (modifier < 0) return String(modifier);
    else return `+${modifier}`;
};
