import { accessCollection, LINK_COLLECTION } from "@/db";
import fetchShortenedUrl from './fetchShortenedUrl';

interface ShortenProps {
    url: string;
    alias: string;
}

// Handles creation of a new shortened URL record with error handling.
export default async function addShortenedUrl({ url, alias }: ShortenProps): Promise<string> {
    if (!url || !alias) {
        return "Both URL and alias are mandatory.";
    }

    // Prevent loops with known project URLs
    if (url.startsWith("https://myshortenerapp.vercel.app") || url.startsWith("http://localhost:3000")) {
        return "Loopback URLs are disallowed.";
    }

    // Validate characters for alias
    if (encodeURIComponent(url) === alias) {
        return "Invalid alias: characters not allowed.";
    }

    // Attempt to check actual URL
    try {
        const response = await fetch(url);
        if (response.status < 200 || response.status > 299) {
            return `Provided URL could not be verified (${response.status}).`;
        }
    } catch {
        return "Provided URL could not be reached.";
    }

    // Prevent duplicate alias
    const alreadyUsed = await fetchShortenedUrl(alias);
    if (alreadyUsed) {
        return "Alias already exists! Choose a new one.";
    }

    // Save entry to DB
    const collection = await accessCollection(LINK_COLLECTION);
    const dataToStore = {
        alias,
        url,
        addedOn: new Date().toISOString(),
    };
    const insertion = await collection.insertOne(dataToStore);

    return insertion.acknowledged
        ? `${process.env.BASE_URL}/${alias}`
        : "URL creation failed. Try again.";
}
