import { redirect } from "next/navigation";
import getLinkByAlias from "../../lib/getLinkByAlias";

export default async function AliasPage(props: { params: Promise<{ alias: string }> }) {
    const { alias } = await props.params;
    const url = await getLinkByAlias(alias);

    if (!url) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '0.5rem' }}>404</h2>
                    <p style={{ color: '#4b5563' }}>
                        The shortened link <strong>/{alias}</strong> was not found.<br/>
                        <a href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>← Back to Home</a>
                    </p>
                </div>
            </main>
        );
    }

    redirect(url);
    return null;
}
