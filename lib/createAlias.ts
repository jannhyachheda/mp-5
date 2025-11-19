"use server";
import getCollection from "@/db";
import { LinkDoc } from "../types";

export default async function createAlias(
    alias: string,
    url: string
): Promise<{ success: boolean; message: string; data?: LinkDoc }> {
    try { new URL(url); } catch { return { success: false, message: "Invalid URL format" }; }
    const col = await getCollection<LinkDoc>("shortenedLinks");
    const existing = await col.findOne({ alias });
    if (existing) return { success: false, message: "Alias already taken" };
    const doc: LinkDoc = { alias, url, addedOn: new Date().toISOString() };
    await col.insertOne(doc);
    // Remove _id for client!
    return { success: true, message: "Shortened!", data: doc };
}
