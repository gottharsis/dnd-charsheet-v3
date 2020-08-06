import { remote } from "electron";
import { Character } from "@/models/Character";
import { promises as fs } from "fs";
import { classToPlain, plainToClass } from "class-transformer";
import { join } from "path";

const userPath = remote.app.getPath("userData");

const characterPath = join(userPath, "characters");
const indexPath = join(characterPath, "index.json");

export const readIndexFile = async (): Promise<Record<string, string>> => {
    try {
        return JSON.parse(await fs.readFile(indexPath, "utf-8"));
    } catch (error) {
        return {};
    }
};

export const writeIndexFile = async (index: Record<string, string>) => {
    try {
        await fs.writeFile(indexPath, JSON.stringify(index));
    } catch (error) {
        console.error("Unable to write to index file!");
    }
};
export const saveCharacter = async (character: Character) => {
    const filename = character.id + ".json";

    const { id, name } = character;
    const plainObject = classToPlain(character);
    const json = JSON.stringify(plainObject);

    const filepath = join(characterPath, filename);

    try {
        const indexData = await readIndexFile();
        indexData[id] = name;
        await writeIndexFile(indexData);
        await fs.writeFile(filepath, json);
    } catch (error) {
        console.error("Unable to save file!!");
        console.error(error);
    }
};

export const loadCharacter = async (
    characterId: string
): Promise<Character> => {
    const filename = characterId + ".json";
    const filepath = join(characterPath, filename);
    try {
        const json = await fs.readFile(filepath, "utf-8");
        const object = JSON.parse(json);
        const revived = plainToClass(Character, object);
        return revived;
    } catch (error) {
        throw `Unable to open ${characterId}.json: file not found`;
    }
};

export const deleteCharacter = async (characterId: string) => {
    try {
        const data = await readIndexFile();
        if (!(characterId in data)) {
            return;
        }
        delete data[characterId];
        writeIndexFile(data);

        const filepath = join(characterPath, `${characterId}.json`);
        fs.unlink(filepath);
    } catch (error) {
        throw "Unable to delete character";
    }
};
