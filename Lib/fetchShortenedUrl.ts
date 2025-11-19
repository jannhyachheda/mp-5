import { accessCollection, LINK_COLLECTION } from "@/db" ;

// Finds the destination URL for a given alias.
export default async function fetchShortenedUrl(aliasKey: string): Promise<string | null> {
    if (!aliasKey) {
        return null;
    }
    const collection = await accessCollection(LINK_COLLECTION);
    const document = await collection.findOne({ alias: aliasKey });
    if (!document) {
        return null;
    }
    return document.url;
}
