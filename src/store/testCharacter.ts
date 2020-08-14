import { Character } from "@/models/Character";
import { SourceClass } from "@/models/sourceinfo/SourceClass";
import SourceClasses from "@/reference/classes.json";
import { MagicSource } from "@/models/magic/MagicSource";
import { Ability } from "@/models/Ability";

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
    "revivify",
    "disintegrate",
    "wish",
    "mind-spike",
    "counterspell",
    "eldritch-blast",
];

// spells.forEach((sp) => {
//     magicSource.learnSpell(sp);
//     magicSource.prepareSpell(sp);
// });
magicSource.learnSpell(...spells);
magicSource.prepareSpell(...spells);

const magicSource2 = new MagicSource("Racial Casting", "cha");
magicSource2.spellSlotProgression = 0;

testCharacter.magic.addMagicSource(magicSource2);

testCharacter.abilities.push(
    new Ability({
        name: "Cast Darkness",
        uses: 1,
        description:
            "Cast Darkness once per day.\n\n***Source:*** Racial (Tiefling)",
    })
);

testCharacter.recompute();
