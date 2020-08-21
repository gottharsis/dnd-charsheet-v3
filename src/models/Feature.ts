import { v4 as uuid } from "uuid";

export class Feature {
    name: string;
    description: string;
    source: string;
    id: string;
    constructor(obj?: { name: string; description?: string; source: string }) {
        this.name = obj?.name ?? "";
        this.description = obj?.description ?? "";
        this.source = obj?.source ?? "";
        this.id = `feature_${uuid()}`;
    }
}
