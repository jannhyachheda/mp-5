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
    try {
      const res = await createAlias(alias.trim(), url.trim());
      setLoading(false);
      if (res.success && res.data) {
        setResult(`${window.location.origin}/${res.data.alias}`);
        setUrl("");
        setAlias("");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#a03217', margin: '0 0 0.25rem 0' }}>
        Shorten a URL
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#ff834c', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
        Enter a long URL to create a shorter, shareable link
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="url" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#a03217', marginBottom: '0.5rem' }}>
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
              border: '1.5px solid #ffb79c',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff6f4'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="alias" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#a03217', marginBottom: '0.5rem' }}>
            Custom Alias
          </label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #ffb79c', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <span style={{ padding: '0.75rem', background: '#ffeae3', borderRight: '1px solid #ffb79c', fontSize: '0.875rem', color: '#e26626', whiteSpace: 'nowrap' }}>
              {typeof window !== "undefined" ? `${window.location.origin}/` : ""}
            </span>
            <input
              id="alias"
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="your-custom-alias"
              required
              style={{ flex: 1, border: 'none', padding: '0.75rem', fontSize: '1rem', outline: 'none', background: '#fff6f4' }}
            />
          </div>
        </div>

        {error && (
          <div style={{ background: '#fff1ed', border: '1.5px solid #ff6d38', color: '#a73213', padding: '0.75rem 1rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#ffb79c' : '#fe5d13',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            boxShadow: '0 2px 8px -4px #fe5d1340',
            letterSpacing: 1,
            transition: 'all 0.18s'
          }}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '1.5rem', background: '#fff6f4', border: '1.5px solid #ffd5cb', borderRadius: '0.5rem', padding: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#ad482c', fontWeight: '500', margin: '0 0 0.75rem 0' }}>
            Your shortened URL:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={result}
              readOnly
              style={{ flex: 1, background: 'white', border: '1px solid #ffd6c5', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontFamily: 'monospace', textAlign: 'center' }}
            />
            <button
              onClick={handleCopy}
              style={{ background: '#ad482c', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
