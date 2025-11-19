import { accessCollection, LINK_COLLECTION } from "@/db";

type ShortLinkEntry = {
    alias: string;
    url: string;
    addedOn?: string;
};

export default async function LinksListing() {
    const linksCollection = await accessCollection(LINK_COLLECTION);
    const rawEntries = await linksCollection.find({}).toArray();
    const allEntries: ShortLinkEntry[] = rawEntries.map((entry: any) => ({
        alias: entry.alias || "",
        url: entry.url || "",
        addedOn: entry.addedOn,
    }));

    return (
        <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#165dab', marginBottom: '1rem' }}>
                All Shortened Links
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {allEntries.map((entry, index) => (
                    <div key={index} style={{
                        background: '#f5f8fa',
                        borderRadius: '10px',
                        padding: '1rem',
                        width: '100%',
                        maxWidth: '340px',
                        boxShadow: '0 2px 8px rgba(120,120,120,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0b7285' }}>{entry.alias}</h3>
                        <div style={{ fontSize: '0.95rem', color: '#333', marginBottom: '0.5rem' }}>
                            <p>Added: {entry.addedOn ? entry.addedOn : "No date"}</p>
                            <a href={entry.url} target="_blank" rel="noopener noreferrer"
                               style={{ color: '#2870f2', wordBreak: 'break-all' }}>
                                {entry.url}
                            </a>
                        </div>
                        <a href={`/${entry.alias}`} target="_blank" rel="noopener noreferrer">
                            Go to Short Link
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
