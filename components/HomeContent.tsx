"use client";
export default function HomeContent({ message, shortLink }: { message: string, shortLink: string }) {
    let urlValue = "";
    let aliasValue = "";
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        urlValue = params.get("url") || "";
        aliasValue = params.get("alias") || "";
    }

    return (
        <form method="GET" action="/" style={{ maxWidth: 400, margin: "2rem auto" }}>
            <label>
                Long URL:
                <input
                    type="url"
                    name="url"
                    required
                    defaultValue={urlValue}
                />
            </label>
            <br />
            <label>
                Alias:
                <input
                    type="text"
                    name="alias"
                    defaultValue={aliasValue}
                />
            </label>
            <br />
            <button type="submit">Make Short Link</button>
            {message && <div style={{ color: "red", marginTop: "1em" }}>{message}</div>}
            {shortLink && (
                <div style={{ marginTop: "1em" }}>
                    Short Link: <a href={shortLink} target="_blank" rel="noopener noreferrer">{shortLink}</a>
                </div>
            )}
        </form>
    );
}
