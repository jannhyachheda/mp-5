"use client";
import { useState } from "react";
import createAlias from "../lib/createAlias";

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setResult("");
        setCopied(false);
        setLoading(true);
        const res = await createAlias(alias.trim(), url.trim());
        setLoading(false);
        if (res.success && res.data) {
            setResult(`${window.location.origin}/${res.data.alias}`);
            setUrl("");
            setAlias("");
        } else {
            setError(res.message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>
                Shorten a URL
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0' }}>
                Enter a long URL to create a shorter, shareable link
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="url" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                        URL
                    </label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/very/long/url"
                        required
                        style={{
                            width: '100%',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="alias" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                        Custom Alias
                    </label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        overflow: 'hidden'
                    }}>
            <span style={{
                padding: '0.75rem',
                background: '#f9fafb',
                borderRight: '1px solid #d1d5db',
                fontSize: '0.875rem',
                color: '#6b7280',
                userSelect: 'none'
            }}>
              {typeof window !== "undefined" ? window.location.origin + "/" : "https://your-app/"}
            </span>
                        <input
                            id="alias"
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            placeholder="your-custom-alias"
                            required
                            style={{
                                flex: 1,
                                border: 'none',
                                padding: '0.75rem',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#991b1b',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        background: loading ? '#10b981' : '#10b981',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.5 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    {loading ? "Shortening..." : "Shorten"}
                </button>
            </form>

            {result && (
                <div style={{
                    marginTop: '1.5rem',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                }}>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', margin: '0 0 0.75rem 0' }}>
                        Your shortened URL:
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={result}
                            readOnly
                            style={{
                                flex: 1,
                                background: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                fontSize: '0.875rem',
                                fontFamily: 'monospace',
                                textAlign: 'center'
                            }}
                        />
                        <button
                            onClick={handleCopy}
                            style={{
                                background: '#374151',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
