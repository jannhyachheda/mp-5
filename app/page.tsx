import ShortenForm from "../components/ShortenForm";

export default function Page() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ background: 'white', padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    CS391 URL Shortener
                </h1>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.75rem 0' }}>
                        URL Shortener
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: '#4b5563', margin: 0 }}>
                        Shorten your long URLs into compact, shareable links
                    </p>
                </div>

                <div style={{ width: '100%', maxWidth: '48rem', padding: '0 1rem' }}>
                    <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', padding: '2rem' }}>
                        <ShortenForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
