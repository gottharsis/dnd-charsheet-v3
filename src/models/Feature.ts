import { v4 as uuid } from "uuid";

export class Feature {
    name: String;
    description: String;
    source: String;
    id: String;
    constructor() {
        this.name = "";
        this.description = "";
        this.source = "";
        this.id = `feature_${uuid()}`;
    }
}
