import type { Metadata } from 'next';
import NavBar from '../components/Header';

export const metadata: Metadata = {
    title: "ShortLinker - CS391",
    description: "Create and manage custom short links with ease.",
};

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #baf3fc 0%, #fcfcfc 100%)',
            fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
        }}>
        <NavBar />
        <main style={{ paddingTop: '2rem', minHeight: 'calc(100vh - 80px)' }}>
            {children}
        </main>
        </body>
        </html>
    );
}
