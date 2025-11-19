import { NextRequest, NextResponse } from "next/server";
import addShortenedUrl from "@/Lib/addShortenedUrl";

export async function POST(req: NextRequest) {
    const { url, alias } = await req.json();
    try {
        const result = await addShortenedUrl({ url, alias });
        if (result.startsWith("http")) return NextResponse.json({ shortUrl: result });
        return NextResponse.json({ error: result }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
