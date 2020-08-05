import { v4 as uuid } from "uuid";

export class Feature {
    name: string;
    description: string;
    source: string;
    id: string;
    constructor() {
        this.name = "";
        this.description = "";
        this.source = "";
        this.id = `feature_${uuid()}`;
    }
}
