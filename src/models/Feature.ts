import { v4 as uuid } from "uuid";

export class Feature {
    name: string;
    description: string;
    source: string;
    id: string;
    constructor({
        name,
        description = "",
        source,
    }: {
        name: string;
        description?: string;
        source: string;
    }) {
        this.name = name;
        this.description = description;
        this.source = source;
        this.id = `feature_${uuid()}`;
    }
}
