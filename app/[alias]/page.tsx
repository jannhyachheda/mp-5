import { redirect } from "next/navigation";
import getLinkByAlias from "../../lib/getLinkByAlias";

export default async function AliasPage(props: { params: Promise<{ alias: string }> }) {
    // Must unwrap param Promise!
    const { alias } = await props.params;
    const url = await getLinkByAlias(alias);

    if (!url) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-10 rounded-xl text-center shadow">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">404</h2>
                    <p>
                        The shortened link <strong>/{alias}</strong> was not found.<br/>
                        <a href="/" className="text-blue-600 underline">← Back to Home</a>
                    </p>
                </div>
            </main>
        );
    }
    redirect(url);
    return null;
}
