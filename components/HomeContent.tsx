"use client";
import { useState } from "react";

export default function HomeContent() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null); setResult(null); setLoading(true);
        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, alias })
            });
            const data = await res.json();
            if (data.shortUrl) setResult(data.shortUrl);
            else setError(data.error || "Something went wrong");
        } catch {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{
            padding: 24, background: "#eef7fa", borderRadius: 12, margin: "0 auto", maxWidth: 410, boxShadow: "0 6px 19px #bcf1e088"
        }}>
            <label style={{ fontWeight: 600, color: "#2b6073" }}>Long URL</label><br />
            <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
                style={{ width: "100%", marginBottom: 15, padding: 7, border: "1px solid #a1b3cc", borderRadius: 6 }}
                placeholder="https://example.com/your-link"
            />
            <label style={{ fontWeight: 600, color: "#2b6073" }}>Alias</label><br />
            <input
                type="text"
                value={alias}
                onChange={e => setAlias(e.target.value)}
                required
                style={{ width: "100%", marginBottom: 15, padding: 7, border: "1px solid #a1b3cc", borderRadius: 6 }}
                placeholder="your-alias"
            />
            <button type="submit" disabled={loading}
                    style={{
                        width: "100%", background: "#1f9571", color: "#fff", fontWeight: 600,
                        padding: 11, border: "none", borderRadius: 7, fontSize: 17, marginBottom: 10
                    }}>
                {loading ? "Shortening..." : "Shorten"}
            </button>
            {error && <div style={{ color: "#d23", background: "#faeaea", borderRadius: 6, padding: 8 }}>{error}</div>}
            {result && (
                <div style={{
                    background: "#e7fcee", border: "1px solid #9ee5c2", borderRadius: 6, padding: "13px 11px", marginTop: 10
                }}>
                    <b>Your short link:</b><br />
                    <a href={result} style={{ color: "#169b70", fontWeight: 500 }} target="_blank" rel="noopener noreferrer">{result}</a>
                </div>
            )}
        </form>
    );
}
