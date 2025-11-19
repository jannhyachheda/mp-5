import HomeContent from "../components/HomeContent";

export default function HomePage() {
    return (
        <main style={{
            minHeight: "100vh", background: "linear-gradient(120deg, #e3f4fc, #fafcfb)", padding: "2.5rem"
        }}>
            <h1 style={{
                color: "#295a6d", letterSpacing: 2, fontSize: "2.2rem", textAlign: "center", marginBottom: 28
            }}>
                CS391 URL Shortener
            </h1>
            <HomeContent />
        </main>
    );
}
