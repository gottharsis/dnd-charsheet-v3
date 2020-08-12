import { Character } from "@/models/Character";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
import SourceClasses from "@/reference/classes.json";

export const testCharacter = new Character();
testCharacter.name = "Bob the BUilder";
testCharacter.abilityScores.update({
    str: 10,
    int: 14,
    dex: 13,
});

testCharacter.race = "Bugbear";
testCharacter.addClass(SourceClasses[3] as SourceClass);
const magicSource = testCharacter.magic.magicSources[0];

const spells = [
    "toll-the-dead",
    "fireball",
    "crown-of-madness",
    "disguise-self",
    "shadow-of-moil",
    "sacred-flame",
    "thaumaturgy",
];

spells.forEach((sp) => {
    magicSource.learnSpell(sp);
    magicSource.prepareSpell(sp);
});
