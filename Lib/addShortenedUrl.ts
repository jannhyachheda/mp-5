import { accessCollection, LINK_COLLECTION } from "@/db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface ShortenParams {
    url: string;
    alias: string;
}

export default async function addShortenedUrl({
                                                  url,
                                                  alias
                                              }: ShortenParams): Promise<string> {
    if (!url || !alias) {
        return "Missing URL or alias";
    }

    const collection = await accessCollection(LINK_COLLECTION);

    const exists = await collection.findOne({ alias });
    if (exists) {
        return "Alias already exists";
    }

    await collection.insertOne({
        url,
        alias,
        addedOn: new Date().toISOString()
    });

    return `${BASE_URL}/${alias}`;
}