import getCollection from "@/db";
import { LinkDoc } from "../types";

export default async function getLinkByAlias(alias: string): Promise<string | null> {
    const col = await getCollection<LinkDoc>("shortenedLinks");
    const doc = await col.findOne({ alias });
    return doc ? doc.url : null;
}
