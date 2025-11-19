import getCollection from "./db";
import { LinkDoc } from "../types";

export default async function getLinkByAlias(alias: string): Promise<string | null> {
    const col = await getCollection("shortenedLinks");
    const doc = await col.findOne({ alias }) as LinkDoc | null;
    return doc ? doc.url : null;
}
